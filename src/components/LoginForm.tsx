"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import {
  acceptPlanner,
  confirmEmail,
  googleSignIn,
  resendConfirmationEmail,
  signIn,
} from "@/services/authService";
import LoginActionEnum from "@/models/enums/LoginActionEnum";
import ErrorHelper from "@/helpers/ErrorHelper";
import CookieHelper from "@/lib/CookieHelper";
import { DASHBOARD } from "@/services/BaseService";
import UniversalPostNames from "@/lib/UniversalPostNames";
import { GoogleLogin } from "@react-oauth/google";

// Accept optional props for action and token
interface LoginFormProps {
  action?: LoginActionEnum;
  token?: string;
}

export default function LoginForm(props: LoginFormProps = {}) {
  const locale = useLocale();
  const [password, setPassword] = useState("");
  const t = useTranslations("Login");
  const searchParams = useSearchParams();
  const params = useParams();
  const [isAcceptPlanner, setIsAcceptPlanner] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showGoogleTooltip, setShowGoogleTooltip] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);

  // Check if user has seen tooltip too many times
  const getTooltipViewCount = useCallback(() => {
    if (typeof window === "undefined") return 0;
    const count = CookieHelper.googleLoginViews.get();
    return count ? parseInt(count, 10) : 0;
  }, []);

  const incrementTooltipViewCount = useCallback(() => {
    if (typeof window === "undefined") return;
    const currentCount = getTooltipViewCount();
    CookieHelper.googleLoginViews.set((currentCount + 1).toString());
  }, [getTooltipViewCount]);

  const shouldShowTooltip = useCallback(() => {
    const maxViews = 3; // Show tooltip maximum 3 times
    return getTooltipViewCount() < maxViews;
  }, [getTooltipViewCount]);

  // Read action/token from params if present, then props, then query string
  const action =
    params?.action ?? props.action ?? searchParams.get("action") ?? undefined;
  const token =
    params?.token ?? props.token ?? searchParams.get("token") ?? undefined;

  // New: show info for registration and email confirmation actions
  const showRegistered = action === LoginActionEnum.registered;
  // const showEmailConfirmation = action === LoginActionEnum.emailConfirmed;

  // Google login success handler
  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    try {
      if (!credentialResponse.credential)
        throw new Error("Google didnt give credential.");
      await googleSignIn({ token: credentialResponse.credential });
      window.location.href = DASHBOARD;
    } catch (error) {
      console.error("Google login error:", error);
      alert(t("googleLoginError"));
    }
  };

  // Google login error handler
  const handleGoogleError = () => {
    console.error("Google login failed");
    alert(t("googleLoginError"));
  };

  // Prostota - obsługa submit wyświetla alert
  async function handleSubmit(e: React.FormEvent) {
    console.log("Form submitted with:", { email, password, action, token });
    e.preventDefault();
    try {
      await signIn({ username: email, password });

      if (action === LoginActionEnum.plannerAccept) return onAcceptPlanner();

      window.location.href = DASHBOARD;
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
      return;
    }
  }

  const onAcceptPlanner = async () => {
    if (!token) {
      alert(t("missingToken"));
      return;
    }

    await acceptPlanner(typeof token === "string" ? token : token[0]);
    setIsAcceptPlanner(true);
  };

  async function resendAnEmail(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (!email) {
      alert(t("TypeEmailInEmailInput"));
      return;
    }

    try {
      await resendConfirmationEmail(email);
      alert(t("ResendSuccessfully"));
    } catch (error) {
      alert(
        ErrorHelper.getErrorMessage(error).join(", ") || "An error occurred"
      );
    }
  }

  const sendEmailConfirmation = useCallback(async () => {
    if (action !== LoginActionEnum.emailConfirmed) return;
    try {
      if (token) {
        await confirmEmail(token as string);
        setIsConfirmed(true);
        alert(t("emailConfirmationInfo"));
      }
    } catch (error) {
      alert(
        ErrorHelper.getErrorMessage(error).join(", ") || "An error occurred"
      );
      return;
    }
  }, [action, token, t]);

  useEffect(() => {
    if (action) return;

    if (CookieHelper.token.get()) {
      window.location.href = DASHBOARD;
    }
  }, [action]);

  useEffect(() => {
    void sendEmailConfirmation();
  }, [sendEmailConfirmation]);

  // Auto-show Google tooltip after 4 seconds if user hasn't interacted
  useEffect(() => {
    if (action || hasShownTooltip || !shouldShowTooltip()) {
      // Log tooltip view count for debugging
      if (process.env.NODE_ENV === "development") {
        console.log(`Google tooltip view count: ${getTooltipViewCount()}/3`);
      }
      return;
    }

    const timer = setTimeout(() => {
      setShowGoogleTooltip(true);
      setHasShownTooltip(true);
      incrementTooltipViewCount();

      if (process.env.NODE_ENV === "development") {
        console.log(
          `Google tooltip shown. New count: ${getTooltipViewCount() + 1}/3`
        );
      }

      // Hide tooltip after 15 seconds
      setTimeout(() => {
        setShowGoogleTooltip(false);
      }, 15000);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [
    action,
    hasShownTooltip,
    shouldShowTooltip,
    incrementTooltipViewCount,
    getTooltipViewCount,
  ]);

  // Hide tooltip when user starts typing
  useEffect(() => {
    if (email || password) {
      setShowGoogleTooltip(false);
    }
  }, [email, password]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-xl shadow-md bg-white border border-primary-50"
      >
        {isAcceptPlanner && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-white rounded">
            {t("plannerAcceptedInfo")}
          </div>
        )}
        {showRegistered && (
          <div className="mb-4 p-4 bg-primary-80 border-2 border-primary-100 text-white rounded text-center font-semibold">
            <div>{t("registeredInfo")}</div>
          </div>
        )}
        {isConfirmed && (
          <div className="mb-4 p-4 bg-green-80 border-2 border-green-100 text-white rounded text-center font-semibold">
            {t("emailConfirmationInfo")}
          </div>
        )}

        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold text-primary-100">{t("title")}</h1>
        </div>

        <label
          className="block mb-2 font-semibold text-primary-70"
          htmlFor="email"
        >
          {t("email")}
        </label>
        <input
          id="email"
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label
          className="block mb-2 font-semibold text-primary-70"
          htmlFor="password"
        >
          {t("password")}
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {showRegistered && (
          <>
            <div className="p-4 bg-yellow-100 border-2 border-yellow-100 text-white rounded text-center font-normal text-sm">
              {t("notConfirmedInfo")} (
              <span className="font-bold">{email || t("typeEmailAbove")}</span>){" "}
              {t("notConfirmedInfoSecond")}
            </div>
            <a
              href="#"
              className={`text-primary-80 hover:underline cursor-pointer text-sm font-normal${
                !email
                  ? " opacity-50 pointer-events-none cursor-not-allowed"
                  : ""
              }`}
              onClick={resendAnEmail}
              aria-disabled={!email}
            >
              {t("resendConfirmation")}
            </a>
          </>
        )}
        {/* Help link - positioned as helpful guidance */}
        <div className="text-center">
          <Link
            href={`/blog/${UniversalPostNames.HowToLoginRegister[locale]}`}
            target="_blank"
            className="text-xs text-primary-60 hover:text-primary-80 hover:underline"
          >
            {t("howToLoginRegister")}
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-primary-80 text-white font-semibold py-3 rounded-lg hover:bg-primary-90 transition cursor-pointer"
        >
          {t("loginButton")}
        </button>

        {/* Google Login - poza formularzem */}
        <div className="w-full max-w-md mt-6 relative">
          <div className="flex items-center mb-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">{t("or")}</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="flex justify-center relative">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signin_with"
              shape="rectangular"
              theme="outline"
              size="large"
              locale={locale}
            />

            {/* Google Login Tooltip */}
            {showGoogleTooltip && (
              <div
                className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-primary-80 text-white px-6 py-4 rounded-lg shadow-lg z-10 w-80 text-center cursor-pointer transition-opacity duration-300"
                onClick={() => setShowGoogleTooltip(false)}
                title={t("clickToClose") || "Click to close"}
              >
                <div className="text-sm font-semibold">{t("quickLogin")}</div>
                <div className="text-xs mt-2">{t("quickLoginDescription")}</div>
                {/* Tooltip arrow pointing up */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-primary-80"></div>
              </div>
            )}
          </div>
        </div>

        {/* Linki rejestracji i przypomnienia hasła */}
        <div className="flex justify-between mt-4 text-sm text-primary-70">
          <Link href="/register" className="hover:underline cursor-pointer">
            {t("register")}
          </Link>
          <Link
            href="/forgot-password"
            className="hover:underline cursor-pointer"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        {/* Sticky App News Button */}
        <div className="hidden md:block fixed bottom-4 right-4 z-50">
          <Link
            href="https://pigeon-map.digging.pl/news"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="bg-primary-80 hover:bg-primary-90 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
          >
            {t("appNews")}
          </Link>
        </div>
      </form>
    </div>
  );
}

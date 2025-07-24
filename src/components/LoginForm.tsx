"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import {
  acceptPlanner,
  confirmEmail,
  resendConfirmationEmail,
  signIn,
} from "@/services/authService";
import LoginActionEnum from "@/models/enums/LoginActionEnum";
import ErrorHelper from "@/helpers/ErrorHelper";
import CookieHelper from "@/lib/CookieHelper";
import { DASHBOARD } from "@/services/BaseService";
import UniversalPostNames from "@/lib/UniversalPostNames";

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

  // Read action/token from params if present, then props, then query string
  const action =
    params?.action ?? props.action ?? searchParams.get("action") ?? undefined;
  const token =
    params?.token ?? props.token ?? searchParams.get("token") ?? undefined;

  // New: show info for registration and email confirmation actions
  const showRegistered = action === LoginActionEnum.registered;
  // const showEmailConfirmation = action === LoginActionEnum.emailConfirmed;

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

  const sendEmailConfirmation = async () => {
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
  };

  useEffect(() => {
    if (action) return;

    if (CookieHelper.token.get()) {
      window.location.href = DASHBOARD;
    }
  }, []);

  useEffect(() => {
    void sendEmailConfirmation();
  }, [action, token]);

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
          className="mt-2 w-full bg-primary-80 text-white font-semibold py-3 rounded-lg hover:bg-primary-90 transition"
        >
          {t("loginButton")}
        </button>

        {/* Linki rejestracji i przypomnienia hasła */}
        <div className="flex justify-between mt-4 text-sm text-primary-70">
          <Link href="/register" className="hover:underline">
            {t("register")}
          </Link>
          <Link href="/forgot-password" className="hover:underline">
            {t("forgotPassword")}
          </Link>
        </div>

        {/* Sticky App News Button */}
        <div className="hidden md:block fixed bottom-4 right-4 z-50">
          <Link
            href="https://pigeon-map.digging.pl/news"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-80 hover:bg-primary-90 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
          >
            {t("appNews")}
          </Link>
        </div>
      </form>
    </div>
  );
}

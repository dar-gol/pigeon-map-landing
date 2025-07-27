"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signUp } from "@/services/authService";
import { AxiosError } from "axios";

const getPhoneCountry = (locale: string) => {
  switch (locale) {
    case "en":
      return "us";
    default:
      return locale;
  }
};

export default function RegisterForm() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Register");
  const errorT = useTranslations("Error");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: locale,
    acceptPrivacyPolicy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const registerSchema = z
    .object({
      username: z.string().min(3, t("usernameMin")),
      email: z.string().email(t("emailInvalid")),
      password: z.string().min(6, t("passwordMin")),
      passwordRepeat: z.string(),
      firstName: z.string().min(1, t("firstNameRequired")).or(z.literal("")),
      lastName: z.string().min(1, t("lastNameRequired")).or(z.literal("")),
      phoneNumber: z
        .string()
        .regex(/^\+\d{7,15}$/, t("phoneInvalid"))
        .optional()
        .or(z.literal("")),
      country: z.string().min(1, t("countryRequired")),
      acceptPrivacyPolicy: z.literal(true, {
        errorMap: () => ({ message: t("errorAcceptPrivacyPolicy") }),
      }),
    })
    .refine((data) => data.password === data.passwordRepeat, {
      message: t("passwordsMustMatch"),
      path: ["passwordRepeat"],
    });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Zamiana phoneNumber na "" jeśli to tylko prefix
    let phoneNumber = formData.phoneNumber;
    if (!phoneNumber || /^\d{1,4}$/.test(phoneNumber)) {
      phoneNumber = "";
    } else phoneNumber = `+${phoneNumber}`;
    const dataToValidate = { ...formData, phoneNumber };

    // Walidacja Zod
    const result = registerSchema.safeParse(dataToValidate);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path.length > 0) {
          fieldErrors[issue.path[0]] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Tu wykonaj request do API np. fetch('/api/register', { ... })
      // Symulacja delay i sukcesu:
      await signUp(dataToValidate);
      // Po sukcesie przekieruj
      router.push(`/login?action=registered&email=${dataToValidate.email}`);
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
      if (error instanceof AxiosError) {
        const messages = error.response?.data?.message as string[];
        setSubmitError(
          messages?.map((msg) => errorT(msg)).join(", ") ||
            errorT("registrationFailed")
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="border-primary-50 bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6"
        noValidate
      >
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold text-primary-100">{t("title")}</h1>
        </div>

        {/* Username */}
        <label
          htmlFor="username"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("username")}
        </label>
        <input
          id="username"
          name="username"
          placeholder="john_doe"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
        />
        {errors.username && (
          <p className="text-red-600 text-sm mt-1">{errors.username}</p>
        )}

        {/* Email */}
        <label
          htmlFor="email"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john_doe@email.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}

        {/* Password */}
        <label
          htmlFor="password"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}

        {/* Password Repeat */}
        <label
          htmlFor="passwordRepeat"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("passwordRepeat")}
        </label>
        <input
          id="passwordRepeat"
          name="passwordRepeat"
          type="password"
          placeholder="********"
          value={formData.passwordRepeat}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
        />
        {errors.passwordRepeat && (
          <p className="text-red-600 text-sm mt-1">{errors.passwordRepeat}</p>
        )}

        {/* First Name */}
        <label
          htmlFor="firstName"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("firstName")}
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
        />
        {errors.firstName && (
          <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
        )}

        {/* Last Name */}
        <label
          htmlFor="lastName"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("lastName")}
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
        />
        {errors.lastName && (
          <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
        )}

        {/* Country Select */}
        <label
          htmlFor="country"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("country")}
        </label>
        <select
          id="country"
          name="country"
          value={getPhoneCountry(formData.country)}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60 bg-white text-gray-700"
          required
        >
          <option value="">
            {t("countrySelectPlaceholder") || "Select your country"}
          </option>
          <option value="al">{t("Albania")}</option>
          <option value="at">{t("Austria")}</option>
          <option value="ba">{t("Bosnia and Herzegovina")}</option>
          <option value="be">{t("Belgium")}</option>
          <option value="bg">{t("Bulgaria")}</option>
          <option value="by">{t("Belarus")}</option>
          <option value="cz">{t("Czech Republic")}</option>
          <option value="de">{t("Germany")}</option>
          <option value="dk">{t("Denmark")}</option>
          <option value="ee">{t("Estonia")}</option>
          <option value="es">{t("Spain")}</option>
          <option value="fi">{t("Finland")}</option>
          <option value="fr">{t("France")}</option>
          <option value="gb">{t("United Kingdom")}</option>
          <option value="gr">{t("Greece")}</option>
          <option value="hr">{t("Croatia")}</option>
          <option value="hu">{t("Hungary")}</option>
          <option value="ie">{t("Ireland")}</option>
          <option value="it">{t("Italy")}</option>
          <option value="lt">{t("Lithuania")}</option>
          <option value="lv">{t("Latvia")}</option>
          <option value="md">{t("Moldova")}</option>
          <option value="me">{t("Montenegro")}</option>
          <option value="mk">{t("North Macedonia")}</option>
          <option value="nl">{t("Netherlands")}</option>
          <option value="no">{t("Norway")}</option>
          <option value="pl">{t("Poland")}</option>
          <option value="pt">{t("Portugal")}</option>
          <option value="ro">{t("Romania")}</option>
          <option value="rs">{t("Serbia")}</option>
          <option value="ru">{t("Russia")}</option>
          <option value="se">{t("Sweden")}</option>
          <option value="ch">{t("Switzerland")}</option>
          <option value="si">{t("Slovenia")}</option>
          <option value="sk">{t("Slovakia")}</option>
          <option value="tr">{t("Turkey")}</option>
          <option value="ua">{t("Ukraine")}</option>
          <option value="us">{t("United States")}</option>
          <option value="other">{t("Other")}</option>
        </select>
        {errors.country && (
          <p className="text-red-600 text-sm mt-1">{errors.country}</p>
        )}

        {/* Phone Number (react-phone-input-2) */}
        <label
          htmlFor="phoneNumber"
          className="block mb-2 font-semibold text-primary-70"
        >
          {t("phoneNumber")}
        </label>
        <PhoneInput
          country={getPhoneCountry(locale)}
          value={formData.phoneNumber}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, phoneNumber: value }));
            setErrors((prev) => ({ ...prev, phoneNumber: "" }));
            setSubmitError(null);
          }}
          inputProps={{
            name: "phoneNumber",
            id: "phoneNumber",
            required: false,
            className:
              "flex h-10 w-full rounded-md border border-input border-primary-30 bg-background-100 pl-14 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          }}
          specialLabel=""
        />
        {errors.phoneNumber && (
          <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
        )}

        {/* Accept Privacy Policy */}
        <div className="flex items-center mb-4">
          <input
            id="acceptPrivacyPolicy"
            name="acceptPrivacyPolicy"
            type="checkbox"
            checked={formData.acceptPrivacyPolicy}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="acceptPrivacyPolicy" className="text-gray-700">
            {t("acceptPrivacyPolicy")}{" "}
            <a
              href="/privacy-policy"
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              {t("privacyPolicyLink")}
            </a>
          </label>
        </div>
        {errors.acceptPrivacyPolicy && (
          <p className="text-red-600 text-sm mt-1">
            {errors.acceptPrivacyPolicy}
          </p>
        )}

        {submitError && (
          <div className="my-4 p-3 rounded-lg bg-red-100 border border-red-400 text-white text-center font-semibold shadow-sm animate-pulse">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-80 text-white font-semibold py-3 rounded-lg hover:bg-primary-90 transition disabled:bg-primary-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? t("submitting") : t("registerButton")}
        </button>

        {/* Links to login and forgot password */}
        <div className="flex justify-between mt-4 text-sm text-primary-70">
          <Link href="/login" className="hover:underline cursor-pointer">
            {t("login")}
          </Link>
          <Link
            href="/forgot-password"
            className="hover:underline cursor-pointer"
          >
            {t("forgotPassword")}
          </Link>
        </div>
      </form>
    </div>
  );
}

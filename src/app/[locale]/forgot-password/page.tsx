"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPassword");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError(t("emailRequired"));
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className=" border-primary-50 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-primary-100 mb-6">
            {t("title")}
          </h1>
          {submitted ? (
            <p className="text-green-700 text-center">{t("successMessage")}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary-70 mb-1"
                >
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg border-primary-30 focus:outline-none focus:ring-2 focus:ring-primary-60"
                />
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-primary-80 text-white font-semibold py-3 rounded-lg hover:bg-primary-90 transition"
              >
                {t("submitButton")}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

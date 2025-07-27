"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Landing.nav");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Image src="/assets/logo192.png" alt="Logo" width={36} height={36} />
          <span className="text-xl font-bold text-primary-100">Pigeon Map</span>
        </Link>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-primary-80 cursor-pointer"
          aria-label={t("toggleMenu")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
          <li>
            <Link
              href="/login"
              className="hover:text-primary-100 text-primary-80"
            >
              {t("login")}
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="hover:text-primary-100 text-primary-80"
            >
              {t("news")}
            </Link>
          </li>
          <li>
            <a
              href="https://digging.pl"
              target="_blank"
              className="hover:text-primary-100 text-primary-80"
              rel="noopener noreferrer nofollow"
            >
              {t("shop")}
            </a>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-primary-100 text-primary-80"
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden text-sm font-medium">
          <li>
            <Link
              className="hover:text-primary-100 text-primary-80"
              href="/login"
              onClick={() => setIsOpen(false)}
            >
              {t("login")}
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary-100 text-primary-80"
              href="/blog"
              onClick={() => setIsOpen(false)}
            >
              {t("news")}
            </Link>
          </li>
          <li>
            <a
              className="hover:text-primary-100 text-primary-80"
              href="https://digging.pl"
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={() => setIsOpen(false)}
            >
              {t("shop")}
            </a>
          </li>
          <li>
            <Link
              className="hover:text-primary-100 text-primary-80"
              href="/contact"
              onClick={() => setIsOpen(false)}
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

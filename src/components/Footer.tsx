import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-60 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Pigeon Map</h3>
            <p className="text-grey-10 mb-4 max-w-md">{t("description")}</p>
            <p className="text-grey-20 text-sm">
              © {currentYear} Pigeon Map. {t("rights")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("login")}
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("register")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <a
                  href="https://pigeon.digging.pl/news"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("news")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:kontakt@digging.pl"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("support")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-grey-20 mt-8 pt-6 text-center">
          <p className="text-grey-15 text-sm">
            {t("madeWith")} ❤️ {t("forPigeonCommunity")}
          </p>
        </div>
      </div>
    </footer>
  );
}

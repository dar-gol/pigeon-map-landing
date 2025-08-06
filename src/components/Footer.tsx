import { useTranslations, useLocale } from "next-intl";
import { Link as I18nLink } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  // Category mapping - maps display names to actual category names in markdown files
  const getCategoryName = (categoryKey: string): string => {
    const categoryMappings = {
      pl: {
        news: "Nowości",
        health: "Zdrowie",
        tutorial: "Poradnik",
        pigeonMap: "Pigeon Map",
      },
      en: {
        news: "News",
        health: "Health",
        tutorial: "Tutorial",
        pigeonMap: "Pigeon Map",
      },
      de: {
        news: "News", // German posts likely use English category names or need verification
        health: "Health",
        tutorial: "Tutorial",
        pigeonMap: "Pigeon Map",
      },
      cs: {
        news: "News", // Czech posts likely use English category names or need verification
        health: "Health",
        tutorial: "Tutorial",
        pigeonMap: "Pigeon Map",
      },
      nl: {
        news: "News", // Dutch posts likely use English category names or need verification
        health: "Health",
        tutorial: "Tutorial",
        pigeonMap: "Pigeon Map",
      },
    };

    return (
      categoryMappings[locale as keyof typeof categoryMappings]?.[
        categoryKey as keyof typeof categoryMappings.pl
      ] || categoryKey
    );
  };

  return (
    <footer className="bg-primary-60 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
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
                <I18nLink
                  href="/login"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("login")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/register"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("register")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/about"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("about")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/faq"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("faq")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/blog"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("blog")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/contact"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("contact")}
                </I18nLink>
              </li>
            </ul>
          </div>

          {/* Blog Categories */}
          <div>
            <h4 className="font-semibold mb-4">{t("blogCategories")}</h4>
            <ul className="space-y-2">
              <li>
                <I18nLink
                  href={{
                    pathname: "/blog/category/[category]",
                    params: { category: getCategoryName("news") },
                  }}
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("news")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href={{
                    pathname: "/blog/category/[category]",
                    params: { category: getCategoryName("health") },
                  }}
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("health")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href={{
                    pathname: "/blog/category/[category]",
                    params: { category: getCategoryName("tutorial") },
                  }}
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("tutorial")}
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href={{
                    pathname: "/blog/category/[category]",
                    params: { category: getCategoryName("pigeonMap") },
                  }}
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  Pigeon Map
                </I18nLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2">
              <li>
                <I18nLink
                  href="/privacy-policy"
                  className="text-grey-10 hover:text-white transition-colors"
                >
                  {t("privacyPolicy")}
                </I18nLink>
              </li>
              <li>
                <a
                  href="https://pigeon.digging.pl/news"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
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

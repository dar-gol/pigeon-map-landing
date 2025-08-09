import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl = locale === "pl" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [
      { name: "DIGGING Barbara Skrzypnik" },
      { name: "Dariusz Golomski", url: "https://github.com/dar-gol" },
    ],
    creator: "DIGGING Barbara Skrzypnik",
    publisher: "DIGGING Barbara Skrzypnik",
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: currentUrl,
      title: t("title"),
      description: t("description"),
      siteName: "Pigeon Map",
      images: [
        {
          url: `${baseUrl}/assets/logo512.png`,
          width: 512,
          height: 512,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/assets/logo512.png`],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        pl: baseUrl,
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
        nl: `${baseUrl}/nl`,
        cs: `${baseUrl}/cs`,
      },
    },
    verification: {
      google: "b3A7r7ByTZgtn6o7GHCtAlnzFaamkQdNM7mor1lrdKk", // Replace with actual code
    },
    other: {
      "theme-color": "#009fbe",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/logo192.png" />
        <link rel="apple-touch-icon" href="/assets/logo192.png" />
        <link type="text/plain" rel="author" href="/humans.txt" />

        {/* Video preload for better LCP */}
        <link
          rel="preload"
          as="video"
          href="/assets/Pigeon-map-map-presentation.mp4"
          type="video/mp4"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/dashboard-manifest.json" />

        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Pigeon Map Dashboard"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* PWA Initialization Script */}
        <script src="/dashboard-pwa.js" defer />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Pigeon Map",
              url: "https://pigeon-map.digging.pl",
              description:
                "Nowoczesna platforma dla hodowców gołębi. Śledź, zarządzaj i udostępniaj loty oraz rodowody online.",
              publisher: {
                "@type": "Organization",
                name: "DIGGING Barbara Skrzypnik",
                url: "https://pigeon-map.digging.pl",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://pigeon-map.digging.pl/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-grey-100 transition-colors duration-300">
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

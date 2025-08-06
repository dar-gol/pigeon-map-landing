import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FullFAQ from "@/components/FullFAQ";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQ" });
  const meta = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl =
    locale === "pl" ? `${baseUrl}/faq` : `${baseUrl}/${locale}/faq`;

  return {
    title: `${t("title")} | ${meta("title")}`,
    description: t("subtitle"),
    keywords: "FAQ, pytania, odpowiedzi, pomoc, Pigeon Map, hodowla gołębi",
    openGraph: {
      title: `${t("title")} | ${meta("title")}`,
      description: t("subtitle"),
      url: currentUrl,
      type: "website",
      siteName: "Pigeon Map",
      locale: locale,
      images: [
        {
          url: `${baseUrl}/assets/logo512.png`,
          width: 512,
          height: 512,
          alt: "Pigeon Map Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | ${meta("title")}`,
      description: t("subtitle"),
      images: [`${baseUrl}/assets/logo512.png`],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        pl: `${baseUrl}/faq`,
        en: `${baseUrl}/en/faq`,
        de: `${baseUrl}/de/faq`,
        nl: `${baseUrl}/nl/faq`,
        cs: `${baseUrl}/cs/faq`,
      },
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("FAQ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.from({ length: 15 }, (_, i) => ({
      "@type": "Question",
      name: t(`items.${i + 1}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`items.${i + 1}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          <FullFAQ />
        </main>
        <Footer />
      </div>
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl =
    locale === "pl" ? `${baseUrl}/contact` : `${baseUrl}/${locale}/contact`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: currentUrl,
      type: "website",
      siteName: "Pigeon Map",
      locale: locale,
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default function ContactPage() {
  return (
    <>
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Kontakt - Pigeon Map",
            description: "Skontaktuj się z zespołem Pigeon Map",
            url: "https://pigeon-map.digging.pl/contact",
            mainEntity: {
              "@type": "Organization",
              name: "DIGGING Barbara Skrzypnik",
              email: "kontakt@digging.pl",
              url: "https://pigeon-map.digging.pl",
              contactPoint: {
                "@type": "ContactPoint",
                email: "kontakt@digging.pl",
                contactType: "customer service",
                areaServed: "PL",
                availableLanguage: ["Polish", "English"],
              },
            },
          }),
        }}
      />
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-xl shadow-lg border border-primary-20 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-3xl font-bold mb-6 text-primary-100 text-center md:text-left">
              Contact
            </h1>
            <p className="mb-4 text-grey-80 text-center md:text-left">
              If you have any questions, suggestions, or want to get in touch,
              feel free to email us at:
            </p>
            <div className="flex justify-center md:justify-start mb-8">
              <a
                href="mailto:kontakt@digging.pl"
                className="inline-block text-primary-80 hover:underline hover:text-primary-100 font-medium transition text-lg"
              >
                kontakt@digging.pl
              </a>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2 text-primary-90 text-center md:text-left">
                Social Media
              </h2>
              <ul className="flex flex-col gap-2 items-center md:items-start text-grey-70">
                <li>
                  <a
                    href="https://digging.pl/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:underline text-primary-80"
                  >
                    Digging shop
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@diggingtv-pigeonmap"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:underline text-primary-80"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://patronite.pl/pigeonmap"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:underline text-primary-80"
                  >
                    Patronite
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary-90 text-center md:text-left">
              Our Address
            </h2>
            <div className="bg-primary-10/30 border border-primary-20 rounded-lg p-4 text-center md:text-left text-grey-80 mb-8">
              <div className="font-semibold">DIGGING Barbara Skrzypnik</div>
              <div className="mb-1">NIP: 879 153 05 59</div>
              <div>Poland</div>
              <div>Woj. kujawsko-pomorskie</div>
              <div>88-100 Inowrocław</div>
              <div>Sikorowo 32</div>
              <div className="mt-2">
                Call:{" "}
                <a
                  href="tel:607701351"
                  className="text-primary-80 hover:underline"
                >
                  607701351
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import PWARedirect from "@/components/PWARedirect";

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
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: currentUrl,
      siteName: "Pigeon Map",
      images: [
        {
          url: `${baseUrl}/assets/logo512.png`,
          width: 512,
          height: 512,
          alt: t("title"),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/assets/logo512.png`],
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default async function LandingPage() {
  const t = await getTranslations("Landing");
  const meta = await getTranslations("meta");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: meta("title"),
    url: "https://pigeon-map.digging.pl",
    description: meta("description"),
    publisher: {
      "@type": "Organization",
      name: "DIGGING Barbara Skrzypnik",
      url: "https://pigeon-map.digging.pl",
      logo: {
        "@type": "ImageObject",
        url: "https://pigeon-map.digging.pl/assets/logo512.png",
      },
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Pigeon Map",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      description: meta("description"),
      url: "https://pigeon-map.digging.pl/login",
      screenshot: [
        "https://pigeon-map.digging.pl/assets/Dashboard-pigeon-detail.PNG",
        "https://pigeon-map.digging.pl/assets/Dashboard-pigeon-flight-with-weather.PNG",
        "https://pigeon-map.digging.pl/assets/Dashboard-pigeon-season.PNG",
        "https://pigeon-map.digging.pl/assets/Dashboard-weather-layer.PNG",
      ],
      featureList: [
        "Pigeon registry and management",
        "Real-time flight tracking",
        "Weather condition monitoring",
        "Performance analytics",
        "Breeding management",
        "Community features",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "PLN",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://pigeon-map.digging.pl/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <PWARedirect />
      <main className="min-h-screen bg-white text-grey-100 transition-colors duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <section className="relative px-6 py-28 text-center bg-primary-1 overflow-hidden">
          {/* Duże logo w tle */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <Image
              src="/assets/logo512.png"
              alt="Pigeon Map Logo Background"
              width={500}
              height={500}
              className="opacity-10"
              priority
            />
          </div>

          {/* Treść hero */}
          <div className="relative z-10 max-w-3xl mx-auto text-grey-100">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-grey-70">
              {t("hero.subtitle")}
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary-100 hover:bg-primary-80 text-white font-semibold px-6 py-3 rounded-xl shadow"
            >
              {t("hero.cta")}
            </Link>
          </div>
        </section>

        {/* About App - Detailed functionality description */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("aboutApp.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("aboutApp.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Flight Tracking */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                <div className="w-12 h-12 bg-grey-10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("aboutApp.tracking.title")}
                </h3>
                <ul className="space-y-2 text-grey-70">
                  <li>• {t("aboutApp.tracking.realTime")}</li>
                  <li>• {t("aboutApp.tracking.flightDetails")}</li>
                  <li>• {t("aboutApp.tracking.flightHistory")}</li>
                </ul>
              </div>

              {/* Pigeon Management */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                <div className="w-12 h-12 bg-grey-10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🐦</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("aboutApp.pigeons.title")}
                </h3>
                <ul className="space-y-2 text-grey-70">
                  <li>• {t("aboutApp.pigeons.catalog")}</li>
                  <li>• {t("aboutApp.pigeons.profiles")}</li>
                  <li>• {t("aboutApp.pigeons.seasonal")}</li>
                </ul>
              </div>

              {/* Community */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                <div className="w-12 h-12 bg-grey-10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("aboutApp.community.title")}
                </h3>
                <ul className="space-y-2 text-grey-70">
                  <li>• {t("aboutApp.community.breeders")}</li>
                  <li>• {t("aboutApp.community.profiles")}</li>
                  <li>• {t("aboutApp.community.sharing")}</li>
                </ul>
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {/* Analytics & Reports */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                <div className="w-12 h-12 bg-grey-10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-grey-100">
                  {t("aboutApp.analytics.title")}
                </h3>
                <ul className="space-y-2 text-grey-70">
                  <li>• {t("aboutApp.analytics.performance")}</li>
                  <li>• {t("aboutApp.analytics.weather")}</li>
                  <li>• {t("aboutApp.analytics.reports")}</li>
                </ul>
              </div>

              {/* Competition Management */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                <div className="w-12 h-12 bg-grey-10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-grey-100">
                  {t("aboutApp.competitions.title")}
                </h3>
                <ul className="space-y-2 text-grey-70">
                  <li>• {t("aboutApp.competitions.events")}</li>
                  <li>• {t("aboutApp.competitions.results")}</li>
                  <li>• {t("aboutApp.competitions.rankings")}</li>
                </ul>
              </div>

              <div className="bg-white border border-grey-20 rounded-2xl p-6 shadow-sm transition">
                <div
                  className={`w-12 h-12 bg-grey-10 rounded-lg flex items-center justify-center mb-4`}
                >
                  <span className="text-white text-xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-grey-100">
                  {t(`features.3.title`)}
                </h3>
                <ul className="space-y-2 text-grey-70">
                  <li>• {t(`features.3.desc`)}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* App Screenshots Section */}
        <section className="px-6 py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("screenshots.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("screenshots.subtitle")}
              </p>
            </div>

            <div className="space-y-12 md:space-y-16">
              {/* Screenshot 1 - Pigeon Detail */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="flex justify-end order-2 md:order-1">
                  <div className="relative w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
                    <Image
                      src="/assets/Dashboard-pigeon-detail.PNG"
                      alt={t("screenshots.items.1.title")}
                      width={300}
                      height={450}
                      className="rounded-2xl shadow-lg w-full h-auto"
                      priority
                      sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2 text-center md:text-left md:pl-4 lg:pl-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-grey-100">
                    {t("screenshots.items.1.title")}
                  </h3>
                  <p className="text-base md:text-lg text-grey-70 leading-relaxed">
                    {t("screenshots.items.1.description")}
                  </p>
                </div>
              </div>

              {/* Screenshot 2 - Flight with Weather */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="text-center md:text-left md:pr-4 lg:pr-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-grey-100">
                    {t("screenshots.items.2.title")}
                  </h3>
                  <p className="text-base md:text-lg text-grey-70 leading-relaxed">
                    {t("screenshots.items.2.description")}
                  </p>
                </div>
                <div className="relative w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
                  <Image
                    src="/assets/Dashboard-pigeon-flight-with-weather.PNG"
                    alt={t("screenshots.items.2.title")}
                    width={300}
                    height={450}
                    className="rounded-2xl shadow-lg w-full h-auto"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                  />
                </div>
              </div>

              {/* Screenshot 3 - Season Management */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="flex justify-end order-2 md:order-1">
                    <div className="relative w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
                      <Image
                        src="/assets/Dashboard-pigeon-season.PNG"
                        alt={t("screenshots.items.3.title")}
                        width={300}
                        height={450}
                        className="rounded-2xl shadow-lg w-full h-auto"
                        sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2 text-center md:text-left md:pl-4 lg:pl-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-grey-100">
                    {t("screenshots.items.3.title")}
                  </h3>
                  <p className="text-base md:text-lg text-grey-70 leading-relaxed">
                    {t("screenshots.items.3.description")}
                  </p>
                </div>
              </div>

              {/* Screenshot 4 - Weather Layer */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="text-center md:text-left md:pr-4 lg:pr-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-grey-100">
                    {t("screenshots.items.4.title")}
                  </h3>
                  <p className="text-base md:text-lg text-grey-70 leading-relaxed">
                    {t("screenshots.items.4.description")}
                  </p>
                </div>
                <div className="relative w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
                  <Image
                    src="/assets/Dashboard-weather-layer.PNG"
                    alt={t("screenshots.items.4.title")}
                    width={300}
                    height={450}
                    className="rounded-2xl shadow-lg w-full h-auto"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Register Section */}
        <section className="px-6 py-20 max-w-4xl mx-auto text-center">
          <div className="bg-primary-1 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
              {t("register.title")}
            </h2>
            <p className="text-lg text-grey-70 mb-8">
              {t("register.subtitle")}
            </p>

            {/* Benefits List */}
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
              {(t.raw("register.benefits") as string[]).map(
                (benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-80 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-grey-100">{benefit}</span>
                  </div>
                )
              )}
            </div>

            <Link
              href="/register"
              className="inline-block bg-primary-100 hover:bg-primary-80 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              {t("register.button")}
            </Link>
          </div>
        </section>

        {/* Privacy Notice */}
        <div className="mt-8 bg-gray-100 rounded-xl p-6 text-center">
          <p className="text-grey-70 mb-2">
            {t("aboutApp.privacy.description")}
          </p>
          <Link
            href="/privacy-policy"
            className="text-primary-80 hover:text-primary-100 font-semibold underline"
          >
            {t("aboutApp.privacy.link")}
          </Link>
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

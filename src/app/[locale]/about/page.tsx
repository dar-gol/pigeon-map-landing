import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  Users,
  Target,
  CloudSun,
  Calendar,
  Database,
  Users2,
  Trophy,
  Heart,
  Mail,
  CheckCircle,
  Building2,
  Clock,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { SiYoutube, SiFacebook } from "react-icons/si";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl =
    locale === "pl" ? `${baseUrl}/o-nas` : `${baseUrl}/${locale}/about`;

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
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/assets/logo512.png`],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        pl: `${baseUrl}/o-nas`,
        en: `${baseUrl}/en/about`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("title"),
    description: t("description"),
    url: `https://pigeon-map.digging.pl/${
      locale === "pl" ? "o-nas" : `${locale}/about`
    }`,
    mainEntity: {
      "@type": "Organization",
      name: "DIGGING Barbara Skrzypnik",
      description: t("whoCreates.description"),
      url: "https://pigeon-map.digging.pl",
      contactPoint: {
        "@type": "ContactPoint",
        email: "kontakt@digging.pl",
        contactType: "customer service",
        areaServed: ["PL", "EN"],
        availableLanguage: ["Polish", "English"],
      },
      founder: {
        "@type": "Person",
        name: "Barbara Skrzypnik",
        jobTitle: "Founder & CEO",
      },
      employee: {
        "@type": "Person",
        name: "Marek Skrzypnik",
        jobTitle: "Pigeon Breeding Expert",
        description: t("whoCreates.marekDescription"),
      },
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Pigeon Map",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          description: t("description"),
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "PLN",
            availability: "https://schema.org/InStock",
          },
        },
      },
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("forWho.title"),
        acceptedAnswer: {
          "@type": "Answer",
          text:
            t("forWho.description") +
            " " +
            [
              t("forWho.breeders"),
              t("forWho.enthusiasts"),
              t("forWho.organizers"),
              t("forWho.recordKeepers"),
              t("forWho.pedigreeCreators"),
              t("forWho.weatherUsers"),
            ].join(", "),
        },
      },
      {
        "@type": "Question",
        name: t("whoCreates.title"),
        acceptedAnswer: {
          "@type": "Answer",
          text:
            t("whoCreates.description") +
            " " +
            t("whoCreates.familyBusiness") +
            " " +
            t("whoCreates.experience") +
            " " +
            t("whoCreates.marekDescription"),
        },
      },
      {
        "@type": "Question",
        name: "Czy Pigeon Map jest darmowe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: t("freeApp.description") + " " + t("freeApp.commitment"),
        },
      },
      {
        "@type": "Question",
        name: t("features.title"),
        acceptedAnswer: {
          "@type": "Answer",
          text:
            t("features.description") +
            " " +
            [
              t("features.weather.title") +
                ": " +
                t("features.weather.description"),
              t("features.flightManagement.title") +
                ": " +
                t("features.flightManagement.description"),
              t("features.pigeonRegistry.title") +
                ": " +
                t("features.pigeonRegistry.description"),
              t("features.pedigrees.title") +
                ": " +
                t("features.pedigrees.description"),
              t("features.competitions.title") +
                ": " +
                t("features.competitions.description"),
            ].join("; "),
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <main className="min-h-screen bg-white text-grey-100">
        <Navbar />

        {/* Hero Section */}
        <section className="relative px-6 py-20 text-center bg-gradient-to-br from-primary-5 to-primary-10 overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
            <Image
              src="/assets/logo512.png"
              alt="Pigeon Map Background"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-60 rounded-full mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-grey-100">
              {t("hero.title")}
            </h1>

            <p className="text-xl text-grey-70 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* For Who Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("forWho.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("forWho.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("forWho.pigeonBreeders")}
                </h3>
                <p className="text-grey-70">{t("forWho.breeders")}</p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("forWho.pigeonEnthusiasts")}
                </h3>
                <p className="text-grey-70">{t("forWho.enthusiasts")}</p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("forWho.flightOrganizers")}
                </h3>
                <p className="text-grey-70">{t("forWho.organizers")}</p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("forWho.recordKeepers")}
                </h3>
                <p className="text-grey-70">{t("forWho.recordKeepersDesc")}</p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Users2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("forWho.pedigreeCreators")}
                </h3>
                <p className="text-grey-70">
                  {t("forWho.pedigreeCreatorsDesc")}
                </p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4">
                  <CloudSun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("forWho.weatherCheckers")}
                </h3>
                <p className="text-grey-70">{t("forWho.weatherUsers")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Creates Section */}
        <section className="py-16 px-6 bg-grey-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("whoCreates.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("whoCreates.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Story Cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center p-2">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-grey-100">
                        {t("whoCreates.familyBusinessTitle")}
                      </h3>
                      <p className="text-grey-70">
                        {t("whoCreates.familyBusiness")}{" "}
                        {t("whoCreates.familyBusinessExtended")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center p-2">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-grey-100">
                        {t("whoCreates.innovativeSolutions")}
                      </h3>
                      <p className="text-grey-70">
                        {t("whoCreates.experience")}{" "}
                        {t("whoCreates.innovativeSolutionsExtended")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center p-2">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-grey-100">
                        {t("whoCreates.pigeonExpert")}
                      </h3>
                      <p className="text-grey-70">
                        {t("whoCreates.marekDescription")}{" "}
                        {t("whoCreates.expertDescriptionExtended")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center p-2">
                      <Handshake className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-grey-100">
                        {t("whoCreates.communityCollaborationTitle")}
                      </h3>
                      <p className="text-grey-70">
                        {t("whoCreates.teamPassion")}{" "}
                        {t("whoCreates.communityCollaborationExtended")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Team Showcase */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-10 to-primary-20 rounded-2xl p-8">
                  <div className="relative mb-6">
                    <Image
                      src="/assets/logo512.png"
                      alt="Pigeon Map Team"
                      width={300}
                      height={300}
                      className="mx-auto rounded-xl"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-grey-100">
                    DIGGING Barbara Skrzypnik
                  </h3>

                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-4 h-4 text-primary-60" />
                    <span className="text-sm text-grey-70">
                      {t("whoCreates.itExperience")}
                    </span>
                  </div>

                  <p className="text-grey-70 text-lg mb-6">
                    {t("whoCreates.passionQuote")}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.youtube.com/@diggingtv-pigeonmap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 transition-colors cursor-pointer"
                    >
                      <SiYoutube className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-grey-100">YouTube</span>
                    </a>
                    <a
                      href="https://www.facebook.com/digging.skrzypnik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 transition-colors cursor-pointer"
                    >
                      <SiFacebook className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-grey-100">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Team Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("meetTheTeam.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("meetTheTeam.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Team Photo */}
              <div className="text-center">
                <div className="relative">
                  <Image
                    src="/assets/pigeon-map-team.png"
                    alt="Zespół Pigeon Map"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary-60 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Right Column - Team Story */}
              <div>
                <p className="text-lg text-grey-70 mb-8 leading-relaxed">
                  {t("meetTheTeam.teamStory")}
                </p>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-grey-100 mb-4">
                    {t("meetTheTeam.values.title")}
                  </h3>

                  <div className="grid gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-60 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-grey-70 leading-relaxed">
                        {t("meetTheTeam.values.passion")}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-60 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-grey-70 leading-relaxed">
                        {t("meetTheTeam.values.community")}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-60 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-grey-70 leading-relaxed">
                        {t("meetTheTeam.values.innovation")}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-60 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-grey-70 leading-relaxed">
                        {t("meetTheTeam.values.support")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("features.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("features.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <CloudSun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("features.weather.title")}
                </h3>
                <p className="text-grey-70">
                  {t("features.weather.description")}
                </p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("features.flightManagement.title")}
                </h3>
                <p className="text-grey-70">
                  {t("features.flightManagement.description")}
                </p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("features.pigeonRegistry.title")}
                </h3>
                <p className="text-grey-70">
                  {t("features.pigeonRegistry.description")}
                </p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Users2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs bg-primary-80 text-white px-2 py-1 rounded-full">
                  {t("features.earlyAccessLabel")}
                </span>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("features.pedigrees.title")}
                </h3>
                <p className="text-grey-70">
                  {t("features.pedigrees.description")}
                </p>
              </div>

              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("features.competitions.title")}
                </h3>
                <p className="text-grey-70">
                  {t("features.competitions.description")}
                </p>
              </div>

              {/* Free App Highlight */}
              <div className="bg-primary-5 rounded-xl p-6 border border-primary-20 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary-60 rounded-lg flex items-center justify-center mb-4 p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  {t("freeApp.title")}
                </h3>
                <p className="text-grey-70 mb-4">{t("freeApp.description")}</p>
                <p className="text-sm text-primary-80 font-medium">
                  {t("freeApp.commitment")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-primary-60 to-primary-80">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("earlyAccess.title")}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {t("earlyAccess.description")}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <p className="text-lg mb-4">{t("earlyAccess.contact")}</p>
              <p className="text-sm opacity-80">{t("earlyAccess.limited")}</p>
            </div>
            <a
              href="mailto:kontakt@digging.pl?subject=Wczesny dostęp do rodowodów - Pigeon Map"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-60 font-semibold rounded-lg hover:bg-grey-5 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              {t("socialMedia.contactUs")}
            </a>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 px-6 bg-grey-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grey-100">
                {t("socialMedia.title")}
              </h2>
              <p className="text-lg text-grey-70 max-w-3xl mx-auto">
                {t("socialMedia.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-grey-20 hover:shadow-lg transition-shadow">
                <a
                  href="https://www.youtube.com/@diggingtv-pigeonmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="w-16 h-16 bg-primary-60 hover:bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <SiYoutube className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-grey-100">
                    YouTube
                  </h3>
                </a>
                <p className="text-grey-70 mb-4">{t("socialMedia.youtube")}</p>
                <a
                  href="https://www.youtube.com/@diggingtv-pigeonmap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
                >
                  {t("socialMedia.visitChannel")}
                  <span className="ml-1">→</span>
                </a>
              </div>

              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-grey-20 hover:shadow-lg transition-shadow">
                <a
                  href="https://www.facebook.com/digging.skrzypnik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="w-16 h-16 bg-primary-60 hover:bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <SiFacebook className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-grey-100">
                    Facebook
                  </h3>
                </a>
                <p className="text-grey-70 mb-4">{t("socialMedia.facebook")}</p>
                <a
                  href="https://www.facebook.com/digging.skrzypnik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {t("socialMedia.visitPage")}
                  <span className="ml-1">→</span>
                </a>
              </div>

              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-grey-20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-60 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-100">
                  Email
                </h3>
                <p className="text-grey-70 mb-4">{t("socialMedia.contact")}</p>
                <a
                  href="mailto:kontakt@digging.pl"
                  className="inline-flex items-center text-primary-60 font-medium hover:text-primary-70 transition-colors"
                >
                  kontakt@digging.pl
                  <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

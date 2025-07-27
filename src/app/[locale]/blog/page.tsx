import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogFilter from "@/components/BlogFilter";
import { useLocale } from "next-intl";
import { logger } from "@/services/LoggingService";
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
  const currentUrl =
    locale === "pl" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;

  return {
    title: `Blog | ${t("title")}`,
    description:
      "Najnowsze aktualności ze świata hodowli gołębi, porady, wiadomości i nowości na Pigeon Map.",
    openGraph: {
      title: `Blog | ${t("title")}`,
      description:
        "Najnowsze aktualności ze świata hodowli gołębi, porady, wiadomości i nowości na Pigeon Map.",
      url: currentUrl,
      siteName: "Pigeon Map",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Blog | ${t("title")}`,
      description:
        "Najnowsze aktualności ze świata hodowli gołębi, porady, wiadomości i nowości na Pigeon Map.",
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default function BlogPage() {
  const locale = useLocale();

  try {
    logger.blogInfo("Loading blog listing page", { locale });

    const posts = getAllPosts(locale);
    logger.blogDebug("Posts loaded for blog listing", {
      locale,
      count: posts.length,
    });

    return (
      <>
        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-2xl mx-auto py-10 px-4">
            <Breadcrumbs
              items={[{ label: "Strona główna", href: "/" }, { label: "Blog" }]}
            />
            <h1 className="text-3xl font-bold mb-6 text-primary-100">Blog</h1>

            <BlogFilter posts={posts} />
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Critical error in BlogPage component", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return a basic error page instead of crashing
    return (
      <>
        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-red-600">
              Error Loading Blog
            </h1>
            <p className="text-lg text-gray-600">
              There was an error loading the blog posts. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

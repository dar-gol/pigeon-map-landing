import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogFilter from "@/components/BlogFilter";
import { logger } from "@/services/LoggingService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl =
    locale === "pl"
      ? `${baseUrl}/blog/category/${category}`
      : `${baseUrl}/${locale}/blog/category/${category}`;

  // Decode the category for display
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} | Blog`,
    description: `Artykuły z kategorii ${decodedCategory} - porady, wiadomości i nowości na Pigeon Map.`,
    openGraph: {
      title: `${decodedCategory} | Blog`,
      description: `Artykuły z kategorii ${decodedCategory} - porady, wiadomości i nowości na Pigeon Map.`,
      url: currentUrl,
      siteName: "Pigeon Map",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${decodedCategory} | Blog`,
      description: `Artykuły z kategorii ${decodedCategory} - porady, wiadomości i nowości na Pigeon Map.`,
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const decodedCategory = decodeURIComponent(category);

  try {
    logger.blogInfo("Loading blog category page", {
      locale,
      category: decodedCategory,
    });

    const allPosts = getAllPosts(locale);

    // Filter posts by category
    const categoryPosts = allPosts.filter(
      (post) => post?.metadata?.category === decodedCategory
    );

    logger.blogDebug("Posts loaded for category", {
      locale,
      category: decodedCategory,
      totalPosts: allPosts.length,
      categoryPosts: categoryPosts.length,
    });

    // If no posts found in this category, show 404
    if (categoryPosts.length === 0) {
      logger.blogWarn("No posts found for category", {
        category: decodedCategory,
      });
      notFound();
    }

    return (
      <>
        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-2xl mx-auto py-10 px-4">
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: decodedCategory },
              ]}
            />
            <h1 className="text-3xl font-bold mb-2 text-primary-100">
              {decodedCategory}
            </h1>
            <p className="text-grey-60 mb-6">
              {categoryPosts.length}{" "}
              {categoryPosts.length === 1 ? "artykuł" : "artykułów"}
            </p>

            {/* Show posts using the same component but with pre-filtered posts */}
            <BlogFilter posts={categoryPosts} />
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Critical error in CategoryPage component", {
      error: errorMessage,
      category: decodedCategory,
      locale,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return a basic error page instead of crashing
    return (
      <>
        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-red-600">
              Błąd ładowania kategorii
            </h1>
            <p className="text-lg text-gray-600">
              Wystąpił błąd podczas ładowania artykułów z kategorii {'"'}
              {decodedCategory}
              {'"'}. Spróbuj ponownie później.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

// Add at the top of the file
export const dynamic = "force-dynamic";

// And simplify generateStaticParams
export async function generateStaticParams() {
  return []; // Generate all pages on-demand
}

// Generate static params for known categories
// export async function generateStaticParams({
//   params,
// }: {
//   params: { locale: string };
// }) {
//   const { locale } = params;

//   try {
//     const allPosts = getAllPosts(locale);
//     const categories = Array.from(
//       new Set(
//         allPosts
//           .filter((post) => post !== null)
//           .map((post) => post?.metadata?.category)
//           .filter((category): category is string => Boolean(category))
//       )
//     );

//     return categories.map((category) => ({
//       category: encodeURIComponent(category),
//     }));
//   } catch (error) {
//     logger.blogError("Error generating static params for categories", {
//       locale,
//       error: error instanceof Error ? error.message : String(error),
//     });
//     return [];
//   }
// }

import { getAllPosts, getLatestPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogFilter from "@/components/BlogFilter";
import FeaturedPosts from "@/components/FeaturedPosts";
import { useLocale, useTranslations } from "next-intl";
import { logger } from "@/services/LoggingService";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Pobieramy najnowszy post dla lepszego SEO
  const latestPost = getLatestPosts(locale, 1)[0];

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl =
    locale === "pl" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;

  // Dynamiczny opis z najnowszym postem
  const dynamicDescription = latestPost
    ? `Najnowszy artykuł: "${latestPost.metadata.title}". ${
        latestPost.metadata.description || ""
      } Oraz inne aktualności ze świata hodowli gołębi na Pigeon Map.`
    : "Najnowsze aktualności ze świata hodowli gołębi, porady, wiadomości i nowości na Pigeon Map.";

  return {
    title: "Blog",
    description: dynamicDescription,
    keywords: latestPost
      ? `blog, pigeon map, gołębie, hodowla, ${
          latestPost.metadata.category || ""
        }, ${latestPost.metadata.title}`
      : "blog, pigeon map, gołębie, hodowla, nowości",
    openGraph: {
      title: "Blog",
      description: dynamicDescription,
      url: currentUrl,
      siteName: "Pigeon Map",
      locale: locale,
      type: "website",
      // Dodatkowe informacje o najnowszym poście
      ...(latestPost && {
        images: [
          {
            url: `${baseUrl}/assets/logo512.png`,
            width: 512,
            height: 512,
            alt: latestPost.metadata.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog",
      description: dynamicDescription,
      ...(latestPost && {
        images: [`${baseUrl}/assets/logo512.png`],
      }),
    },
    alternates: {
      canonical: currentUrl,
    },
    // Dodanie informacji o najnowszym artykule
    ...(latestPost && {
      other: {
        "article:latest": latestPost.metadata.title,
        "article:latest-date": latestPost.metadata.date,
        "article:latest-category": latestPost.metadata.category || "",
      },
    }),
  };
}

// JSON-LD structured data for SEO
function generateBlogJsonLd(
  locale: string,
  posts: NonNullable<ReturnType<typeof getAllPosts>>,
  translations: {
    jsonLdDescription: string;
    jsonLdReadAction: string;
    jsonLdAboutDescription: string;
    jsonLdAudienceType: string;
    jsonLdPigeonBreeding: string;
    breadcrumbHome: string;
    breadcrumbBlog: string;
  },
  latestPost?: NonNullable<ReturnType<typeof getLatestPosts>>[0]
) {
  const baseUrl = "https://pigeon-map.digging.pl";
  const blogUrl =
    locale === "pl" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogUrl,
    url: blogUrl,
    name: "Pigeon Map Blog",
    description: translations.jsonLdDescription,
    inLanguage: locale,
    // Główna treść strony - najnowszy post
    ...(latestPost && {
      mainEntity: {
        "@type": "BlogPosting",
        "@id": `${blogUrl}/${latestPost.slug}`,
        url: `${blogUrl}/${latestPost.slug}`,
        headline: latestPost.metadata.title,
        description: latestPost.metadata.description || "",
        datePublished: latestPost.metadata.date,
        dateModified: latestPost.metadata.date,
        author: {
          "@type": "Organization",
          name: "Pigeon Map",
        },
        publisher: {
          "@type": "Organization",
          name: "Pigeon Map",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/assets/logo512.png`,
          },
        },
        articleSection: latestPost.metadata.category || "Blog",
        keywords: `pigeon map, gołębie, hodowla, ${
          latestPost.metadata.category || ""
        }, najnowsze`,
        about: {
          "@type": "Thing",
          name:
            latestPost.metadata.category || translations.jsonLdPigeonBreeding,
          description: translations.jsonLdAboutDescription,
        },
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Pigeon Map",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/logo512.png`,
      },
    },
    // Potencjalne akcje dla najnowszego posta
    ...(latestPost && {
      potentialAction: {
        "@type": "ReadAction",
        target: `${blogUrl}/${latestPost.slug}`,
        name: `${translations.jsonLdReadAction}: ${latestPost.metadata.title}`,
      },
    }),
    blogPost: posts
      .filter((post) => post)
      .slice(0, 10)
      .map((post) => ({
        "@type": "BlogPosting",
        "@id": `${blogUrl}/${post!.slug}`,
        url: `${blogUrl}/${post!.slug}`,
        headline: post!.metadata.title,
        description: post!.metadata.description || "",
        datePublished: post!.metadata.date,
        dateModified: post!.metadata.date,
        // Oznaczenie najnowszego posta
        ...(latestPost &&
          post!.slug === latestPost.slug && {
            isAccessibleForFree: true,
            isFamilyFriendly: true,
            audience: {
              "@type": "Audience",
              audienceType: translations.jsonLdAudienceType,
            },
          }),
        author: {
          "@type": "Organization",
          name: "Pigeon Map",
        },
        publisher: {
          "@type": "Organization",
          name: "Pigeon Map",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/assets/logo512.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${blogUrl}/${post!.slug}`,
        },
        image: `${baseUrl}/assets/logo512.png`,
        articleSection: post!.metadata.category || "Blog",
        keywords: `pigeon map, gołębie, hodowla, ${
          post!.metadata.category || ""
        }`,
      })),
    // Breadcrumbs dla lepszej nawigacji
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: translations.breadcrumbHome,
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: translations.breadcrumbBlog,
          item: blogUrl,
        },
      ],
    },
  };

  return JSON.stringify(jsonLd);
}

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("Blog");

  try {
    logger.blogInfo("Loading blog listing page", { locale });

    const posts = getAllPosts(locale);
    const latestPost = getLatestPosts(locale, 1)[0] || null;

    logger.blogDebug("Posts loaded for blog listing", {
      locale,
      count: posts.length,
      latestPost: latestPost?.metadata.title,
    });

    // Przygotowanie tłumaczeń dla JSON-LD
    const translations = {
      jsonLdDescription: t("jsonLdDescription"),
      jsonLdReadAction: t("jsonLdReadAction"),
      jsonLdAboutDescription: t("jsonLdAboutDescription"),
      jsonLdAudienceType: t("jsonLdAudienceType"),
      jsonLdPigeonBreeding: t("jsonLdPigeonBreeding"),
      breadcrumbHome: t("breadcrumbHome"),
      breadcrumbBlog: t("breadcrumbBlog"),
    };

    const jsonLd = generateBlogJsonLd(locale, posts, translations, latestPost);
    console.log({ jsonLd });
    return (
      <>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-2xl mx-auto py-10 px-4">
            <Breadcrumbs
              items={[
                { label: t("breadcrumbHome"), href: "/" },
                { label: t("breadcrumbBlog") },
              ]}
            />
            <h1 className="text-3xl font-bold mb-6 text-primary-100">
              {t("pageTitle")}
            </h1>

            {/* Featured Posts Section */}
            <FeaturedPosts latestPost={latestPost} />

            {/* All Posts with Filter */}
            <div className="border-t border-primary-20 pt-6">
              <h2 className="text-lg font-semibold mb-4 text-primary-100">
                {t("allPosts")}
              </h2>
              <BlogFilter posts={posts} showLatestByCategory={true} />
            </div>
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

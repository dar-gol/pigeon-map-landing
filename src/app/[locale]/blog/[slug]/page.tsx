import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { logger } from "@/services/LoggingService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const actualLocale = locale || "en";

  const post = getPostBySlug(slug, actualLocale);
  const t = await getTranslations({ locale: actualLocale, namespace: "meta" });

  if (!post) {
    return {
      title: `Post nie znaleziony | ${t("title")}`,
      description: "Nie znaleziono żądanego artykułu.",
    };
  }

  const baseUrl = "https://pigeon-map.digging.pl";
  const currentUrl =
    actualLocale === "pl"
      ? `${baseUrl}/blog/${slug}`
      : `${baseUrl}/${actualLocale}/blog/${slug}`;

  return {
    title: `${post.metadata.title} | Blog | ${t("title")}`,
    description:
      post.metadata.description ||
      "Artykuł z bloga Pigeon Map - platform dla hodowców gołębi.",
    keywords: `${
      post.metadata.category || ""
    }, pigeon map, gołębie, hodowla, blog`,
    authors: [{ name: "Pigeon Map Team" }],
    openGraph: {
      title: `${post.metadata.title} | ${t("title")}`,
      description: post.metadata.description || "Artykuł z bloga Pigeon Map",
      url: currentUrl,
      siteName: "Pigeon Map",
      locale: actualLocale,
      type: "article",
      publishedTime: post.metadata.date,
      modifiedTime: post.metadata.date,
      section: post.metadata.category || "Blog",
      images: [
        {
          url: `${baseUrl}/assets/logo512.png`,
          width: 512,
          height: 512,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.metadata.title} | ${t("title")}`,
      description: post.metadata.description || "Artykuł z bloga Pigeon Map",
      images: [`${baseUrl}/assets/logo512.png`],
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

// JSON-LD structured data for individual blog post
function generatePostJsonLd(
  post: NonNullable<ReturnType<typeof getPostBySlug>>,
  locale: string,
  slug: string
) {
  const baseUrl = "https://pigeon-map.digging.pl";
  const postUrl =
    locale === "pl"
      ? `${baseUrl}/blog/${slug}`
      : `${baseUrl}/${locale}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    url: postUrl,
    headline: post.metadata.title,
    description: post.metadata.description || "Artykuł z bloga Pigeon Map",
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    author: {
      "@type": "Organization",
      name: "Pigeon Map",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Pigeon Map",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/logo512.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/logo512.png`,
      width: 512,
      height: 512,
    },
    articleSection: post.metadata.category || "Blog",
    keywords: `pigeon map, gołębie, hodowla, ${post.metadata.category || ""}, ${
      post.metadata.title
    }`,
    inLanguage: locale,
    isPartOf: {
      "@type": "Blog",
      name: "Pigeon Map Blog",
      url: locale === "pl" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`,
    },
  };

  return JSON.stringify(jsonLd);
}

export async function generateStaticParams() {
  logger.blogInfo("Generating static params for blog posts");

  try {
    const locales = ["en", "pl", "de", "cs", "nl"];
    const allParams = [];

    for (const locale of locales) {
      logger.blogDebug("Processing locale for static params", { locale });
      const posts = getAllPosts(locale);
      logger.blogDebug("Posts found for locale", {
        locale,
        count: posts.length,
      });

      for (const post of posts) {
        if (post) {
          allParams.push({ slug: post.slug, locale });
          logger.blogDebug("Added param", { slug: post.slug, locale });
        }
      }
    }

    logger.blogInfo("Generated static params completed", {
      totalParams: allParams.length,
      params: allParams,
    });
    return allParams;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error generating static params", { error: errorMessage });
    return [];
  }
}

export default async function PostPage({ params }: Props) {
  try {
    const { slug, locale } = await params;
    const actualLocale = locale || "en";

    logger.blogInfo("Loading blog post page", { slug, locale, actualLocale });

    const post = getPostBySlug(slug, actualLocale);
    logger.blogDebug("Post loading result", {
      slug,
      actualLocale,
      found: !!post,
    });

    if (!post) {
      logger.blogWarn("Post not found, returning 404", { slug, actualLocale });
      return notFound();
    }

    logger.blogDebug("Processing markdown content", {
      slug,
      contentLength: post.content.length,
    });

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw) // This allows raw HTML in markdown
      .use(rehypeStringify)
      .process(post.content);
    const contentHtml = processedContent.toString();

    logger.blogInfo("Successfully loaded and processed blog post", {
      slug,
      actualLocale,
    });

    const jsonLd = generatePostJsonLd(post, actualLocale, slug);

    return (
      <>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-3xl mx-auto py-10 px-4">
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.metadata.title || "Post" },
              ]}
            />
            <h1 className="text-4xl font-extrabold mb-4 text-primary-100 leading-tight drop-shadow-sm">
              {post.metadata.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm text-primary-60 italic border-l-4 border-primary-30 pl-4 bg-primary-10/20 inline-block">
                {post.metadata.date}
              </p>
              {post.metadata.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-80 text-white border border-primary-30">
                  {post.metadata.category}
                </span>
              )}
            </div>
            <article
              className="prose prose-lg max-w-none bg-white rounded-xl shadow-lg p-8 border border-primary-20 transition-shadow duration-200 hover:shadow-2xl text-grey-80"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-block text-primary-80 hover:underline hover:text-primary-100 font-medium transition"
              >
                ← Back to all blog posts
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Critical error in PostPage component", {
      slug: "unknown",
      locale: "unknown",
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return a basic error page instead of crashing
    return (
      <>
        <main className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-4xl font-extrabold mb-4 text-red-600">
              Error Loading Post
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              There was an error loading this blog post. Please try again later.
            </p>
            <Link
              href="/blog"
              className="inline-block text-primary-80 hover:underline hover:text-primary-100 font-medium transition"
            >
              ← Back to all blog posts
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

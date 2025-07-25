import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLocale } from "next-intl";
import { logger } from "@/services/LoggingService";

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
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-2xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6 text-primary-100">Blog</h1>
          <ul className="space-y-4">
            {posts.filter(Boolean).map(
              (post) =>
                post && (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="border border-primary-30 rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg hover:border-primary-80 p-4 cursor-pointer">
                        <div className="text-grey-80 font-medium hover:underline">
                          {post.metadata.title}
                        </div>
                        <div className="text-sm text-grey-50">
                          {post.metadata.date}
                        </div>
                      </div>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      </main>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Critical error in BlogPage component", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return a basic error page instead of crashing
    return (
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
    );
  }
}

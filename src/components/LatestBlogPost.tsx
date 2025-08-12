"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface Post {
  slug: string;
  metadata: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  content: string;
  locale: string | null;
}

interface LatestBlogPostProps {
  latestPost?: Post | null;
}

export default function LatestBlogPost({ latestPost }: LatestBlogPostProps) {
  const t = useTranslations("Landing");

  if (!latestPost) {
    return null;
  }

  return (
    <section className="py-16 bg-primary-1">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-primary-80 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary-80 uppercase tracking-wide">
              {t("latestFromBlog")}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-primary-100 mb-2">
            {t("stayUpdated")}
          </h2>
          <p className="text-grey-60 max-w-2xl mx-auto">
            {t("blogDescription")}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-primary-20 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {latestPost.metadata.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-80 text-white">
                    {latestPost.metadata.category}
                  </span>
                )}
                <span className="text-sm text-primary-60 font-medium">
                  {latestPost.metadata.date}
                </span>
              </div>
              <div className="text-primary-80 hover:text-primary-100 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>

            <Link href={`/blog/${latestPost.slug}`}>
              <h3 className="text-xl font-bold text-primary-100 mb-3 hover:underline cursor-pointer">
                {latestPost.metadata.title}
              </h3>
            </Link>

            {latestPost.metadata.description && (
              <p className="text-grey-70 text-base leading-relaxed mb-4">
                {latestPost.metadata.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <Link
                href={`/blog/${latestPost.slug}`}
                className="text-sm font-medium text-primary-80 hover:underline"
              >
                {t("readMore")}
              </Link>
              <Link
                href="/blog"
                className="text-sm text-grey-60 hover:text-primary-80 transition-colors"
              >
                {t("viewAllPosts")} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

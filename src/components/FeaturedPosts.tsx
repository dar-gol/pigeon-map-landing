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

interface FeaturedPostsProps {
  latestPost?: Post | null;
}

export default function FeaturedPosts({ latestPost }: FeaturedPostsProps) {
  const t = useTranslations("Blog");

  return (
    <div className="mb-8">
      {/* Latest Post */}
      {latestPost && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-6 bg-primary-80 rounded"></div>
            <h2 className="text-xl font-bold text-primary-100">
              {t("latestPost")}
            </h2>
          </div>

          <Link href={`/blog/${latestPost.slug}`}>
            <div className="bg-gradient-to-r from-primary-1 to-primary-20 border-2 border-primary-30 rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:border-primary-80 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
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
              </div>

              <h3 className="text-xl font-bold text-primary-100 mb-2 hover:underline">
                {latestPost.metadata.title}
              </h3>

              {latestPost.metadata.description && (
                <p className="text-grey-70 text-base leading-relaxed">
                  {latestPost.metadata.description}
                </p>
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

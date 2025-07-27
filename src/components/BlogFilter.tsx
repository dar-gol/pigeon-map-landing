"use client";

import { useState } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  metadata: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  content: string;
  locale: string | null;
}

interface BlogFilterProps {
  posts: (Post | null)[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(
      posts
        .filter((post): post is Post => post !== null)
        .map((post) => post.metadata?.category)
        .filter((category): category is string => Boolean(category))
    )
  );

  // Filter posts based on selected category
  const filteredPosts = posts.filter((post): post is Post => post !== null);
  const finalPosts = selectedCategory
    ? filteredPosts.filter(
        (post) => post.metadata?.category === selectedCategory
      )
    : filteredPosts;

  return (
    <div>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-grey-60 mb-3">Filtruj według kategorii:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                selectedCategory === null
                  ? "bg-primary-80 text-white border-primary-80"
                  : "bg-white text-primary-80 border-primary-30 hover:bg-primary-10"
              }`}
            >
              Wszystkie
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary-80 text-white border-primary-80"
                    : "bg-white text-primary-80 border-primary-30 hover:bg-primary-10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show active filter info */}
      {selectedCategory && (
        <div className="mb-4">
          <p className="text-sm text-grey-60">
            Pokazuję posty w kategorii:{" "}
            <span className="font-medium text-primary-80">
              {selectedCategory}
            </span>{" "}
            ({finalPosts.length} {finalPosts.length === 1 ? "post" : "postów"})
          </p>
        </div>
      )}

      {/* Posts list */}
      <ul className="space-y-4">
        {finalPosts.map(
          (post) =>
            post && (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="border border-primary-30 rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg hover:border-primary-80 p-4 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-grey-80 font-medium hover:underline">
                        {post.metadata.title}
                      </div>
                      {post.metadata.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-80 text-white border border-primary-30">
                          {post.metadata.category}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-grey-50">
                      {post.metadata.date}
                    </div>
                    {post.metadata.description && (
                      <div className="text-sm text-grey-60 mt-2">
                        {post.metadata.description}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            )
        )}
      </ul>

      {/* No posts message */}
      {finalPosts.length === 0 && selectedCategory && (
        <div className="text-center py-8">
          <p className="text-grey-60 text-lg">
            Brak postów w kategorii &quot;{selectedCategory}&quot;
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-2 text-primary-80 hover:underline"
          >
            Pokaż wszystkie posty
          </button>
        </div>
      )}
    </div>
  );
}

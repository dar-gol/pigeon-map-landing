import fs from "fs";
import path from "path";
import matter from "gray-matter";
import UniversalPostNames from "./UniversalPostNames";
import { logger } from "@/services/LoggingService";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getPostSlugs(locale?: string) {
  logger.blogDebug("Getting post slugs", { locale, postsDirectory });

  try {
    if (!fs.existsSync(postsDirectory)) {
      logger.blogError("Posts directory does not exist", { postsDirectory });
      return [];
    }

    const allFiles = fs.readdirSync(postsDirectory);
    logger.blogDebug("All files in posts directory", { allFiles });

    const filteredFiles = allFiles.filter((f) => f.endsWith(`.${locale}.md`));
    logger.blogDebug("Filtered files for locale", { locale, filteredFiles });

    return filteredFiles;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error reading posts directory", {
      postsDirectory,
      error: errorMessage,
    });
    return [];
  }
}

const getRealSlug = (slug: string, locale?: string) => {
  logger.blogDebug("Getting real slug", { slug, locale });

  const universalName = UniversalPostNames[slug];
  if (!universalName) {
    logger.blogDebug("No universal name found, using slug as-is", { slug });
    return slug.replace(/\.[a-z]{2}\.md$/, "");
  }

  const realSlug = universalName[locale || "en"];
  if (!realSlug) {
    logger.blogWarn("No universal name found for slug in locale", {
      slug,
      locale,
    });
    return slug.replace(/\.[a-z]{2}\.md$/, "");
  }

  logger.blogDebug("Found real slug from universal names", {
    originalSlug: slug,
    realSlug,
  });
  return realSlug.replace(/\.[a-z]{2}\.md$/, "");
};

export function getPostBySlug(slug: string, locale?: string) {
  try {
    logger.blogDebug("Getting post by slug", { slug, locale });

    const realSlug = getRealSlug(slug, locale);
    const fileName = locale ? `${realSlug}.${locale}.md` : `${realSlug}.md`;
    const fullPath = path.join(postsDirectory, fileName);

    logger.blogDebug("Attempting to read post file", { fileName, fullPath });

    if (!fs.existsSync(fullPath)) {
      logger.blogWarn("Post file does not exist", { fullPath });
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const postData = {
      slug: realSlug,
      metadata: data,
      content,
      locale: locale || null,
    };

    logger.blogDebug("Successfully loaded post", {
      slug: realSlug,
      hasContent: !!content,
      metadata: data,
    });

    return postData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error loading post by slug", {
      slug,
      locale,
      error: errorMessage,
    });
    return null;
  }
}

export function getAllPosts(locale?: string) {
  logger.blogInfo("Fetching all posts for locale", { locale });

  try {
    const slugs = getPostSlugs(locale);
    logger.blogDebug("Found slugs", { slugs, count: slugs.length });

    const posts = slugs
      .map((slug) => {
        const realSlug = slug.replace(/\.[a-z]{2}\.md$/, "");
        logger.blogDebug("Processing slug", { originalSlug: slug, realSlug });

        const post = getPostBySlug(realSlug, locale) || getPostBySlug(realSlug);
        if (!post) {
          logger.blogWarn("Failed to load post", { slug, realSlug, locale });
        }
        return post;
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (!a || !b) return 0;
        return a.metadata.date > b.metadata.date ? -1 : 1;
      });

    logger.blogInfo("Successfully loaded posts", {
      count: posts.length,
      locale,
    });
    return posts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error loading all posts", {
      locale,
      error: errorMessage,
    });
    return [];
  }
}

export function getAllCategories(locale?: string): string[] {
  logger.blogInfo("Fetching all categories for locale", { locale });

  try {
    const posts = getAllPosts(locale);

    const categories = Array.from(
      new Set(
        posts
          .filter((post): post is NonNullable<typeof post> => post !== null)
          .map((post) => post.metadata?.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    logger.blogDebug("Found unique categories", {
      locale,
      categories,
      count: categories.length,
    });
    return categories;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error loading categories", {
      locale,
      error: errorMessage,
    });
    return [];
  }
}

export function getLatestPosts(locale?: string, limit: number = 3) {
  try {
    logger.blogDebug("Getting latest posts", { locale, limit });

    const posts = getAllPosts(locale);
    const latestPosts = posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .slice(0, limit);

    logger.blogDebug("Found latest posts", {
      count: latestPosts.length,
      locale,
    });
    return latestPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error getting latest posts", {
      locale,
      error: errorMessage,
    });
    return [];
  }
}

export function getLatestPostsByCategory(
  category: string,
  locale?: string,
  limit: number = 2
) {
  try {
    logger.blogDebug("Getting latest posts by category", {
      category,
      locale,
      limit,
    });

    const posts = getAllPosts(locale);
    const categoryPosts = posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .filter((post) => post.metadata?.category === category)
      .slice(0, limit);

    logger.blogDebug("Found latest posts by category", {
      category,
      count: categoryPosts.length,
      locale,
    });
    return categoryPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.blogError("Error getting latest posts by category", {
      category,
      locale,
      error: errorMessage,
    });
    return [];
  }
}

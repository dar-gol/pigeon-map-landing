import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pigeon-map.digging.pl";

  // Generate URLs for all locales
  const staticPages = ["/", "/contact", "/about", "/privacy-policy", "/blog"];
  const locales = ["", ...routing.locales];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const url = `/${locale}${page}`.replace("//", "/");
      const allUrl = `${baseUrl}${url}`;
      sitemapEntries.push({
        url: url === `${baseUrl}/` ? baseUrl : allUrl,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "daily" : "weekly",
        priority: page === "/" ? 1.0 : 0.8,
      });
    });
  });

  // Add dynamic blog posts from actual content
  locales.forEach((locale) => {
    try {
      const posts = getAllPosts(locale);
      posts.forEach((post) => {
        if (post && post.slug) {
          const url = `/${locale}/blog/${post.slug}`.replace("//", "/");
          const allUrl = `${baseUrl}${url}`;

          // Extract date from post metadata if available
          const postDate = post.metadata?.date
            ? new Date(post.metadata.date)
            : new Date();

          sitemapEntries.push({
            url: allUrl,
            lastModified: postDate,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    } catch (error) {
      console.error(`Error loading posts for locale ${locale}:`, error);
    }
  });

  // Add blog category pages for SEO
  locales.forEach((locale) => {
    try {
      const categories = getAllCategories(locale);
      categories.forEach((category) => {
        const categoryPath =
          locale === "pl" ? "/blog/kategoria" : "/blog/category";
        const url = `/${locale}${categoryPath}/${encodeURIComponent(
          category
        )}`.replace("//", "/");
        const allUrl = `${baseUrl}${url}`;

        sitemapEntries.push({
          url: allUrl,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    } catch (error) {
      console.error(`Error loading categories for locale ${locale}:`, error);
    }
  });

  return sitemapEntries;
}

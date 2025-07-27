import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pigeon-map.digging.pl";

  // Generate URLs for all locales
  const staticPages = ["/", "/contact", "/privacy-policy", "/blog"];
  const locales = routing.locales;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const url =
        locale === "pl" ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`;
      sitemapEntries.push({
        url: url === `${baseUrl}/` ? baseUrl : url,
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
          const url =
            locale === "pl"
              ? `${baseUrl}/blog/${post.slug}`
              : `${baseUrl}/${locale}/blog/${post.slug}`;

          // Extract date from post metadata if available
          const postDate = post.metadata?.date
            ? new Date(post.metadata.date)
            : new Date();

          sitemapEntries.push({
            url,
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
        const url =
          locale === "pl"
            ? `${baseUrl}${categoryPath}/${encodeURIComponent(category)}`
            : `${baseUrl}/${locale}${categoryPath}/${encodeURIComponent(
                category
              )}`;

        sitemapEntries.push({
          url,
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

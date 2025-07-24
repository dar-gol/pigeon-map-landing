import fs from "fs";
import path from "path";
import matter from "gray-matter";
import UniversalPostNames from "./UniversalPostNames";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getPostSlugs(locale?: string) {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(`.${locale}.md`));
}

const getRealSlug = (slug: string, locale?: string) => {
  const universalName = UniversalPostNames[slug];
  if (!universalName) return slug.replace(/\.[a-z]{2}\.md$/, "");

  const realSlug = universalName[locale || "en"];
  if (!realSlug) {
    console.warn(
      `No universal name found for slug: ${slug} in locale: ${locale}`
    );
    return slug.replace(/\.[a-z]{2}\.md$/, "");
  }
  return realSlug.replace(/\.[a-z]{2}\.md$/, "");
};

export function getPostBySlug(slug: string, locale?: string) {
  const realSlug = getRealSlug(slug, locale);
  const fileName = locale ? `${realSlug}.${locale}.md` : `${realSlug}.md`;
  console.log("Fetching post:", fileName, "for locale:", locale);
  const fullPath = path.join(postsDirectory, fileName);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug: realSlug,
    metadata: data,
    content,
    locale: locale || null,
  };
}

export function getAllPosts(locale?: string) {
  console.log("Fetching posts for locale:", locale);
  const slugs = getPostSlugs(locale);
  return slugs
    .map((slug) => {
      const realSlug = slug.replace(/\.[a-z]{2}\.md$/, "");
      return getPostBySlug(realSlug, locale) || getPostBySlug(realSlug);
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (!a || !b) return 0;
      return a.metadata.date > b.metadata.date ? -1 : 1;
    });
}

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import Navbar from "@/components/Navbar";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => post && { slug: post.slug });
}

export default async function PostPage({ params }: Props) {
  const { slug, locale } = await params;
  const actualLocale = locale || "en";
  const post = getPostBySlug(slug, actualLocale);
  console.log("Post data:", post);
  if (!post) return notFound();

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // This allows raw HTML in markdown
    .use(rehypeStringify)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-primary-100 leading-tight drop-shadow-sm">
          {post.metadata.title}
        </h1>
        <p className="text-sm text-primary-60 mb-8 italic border-l-4 border-primary-30 pl-4 bg-primary-10/20 inline-block">
          {post.metadata.date}
        </p>
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
  );
}

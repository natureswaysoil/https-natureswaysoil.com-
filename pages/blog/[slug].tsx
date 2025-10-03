import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

interface BlogPostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
    videoUrl?: string;
    thumbnail?: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Nature's Way Soil Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/blog" className="text-green-600 hover:text-green-700 mb-6 inline-block">
            ← Back to Blog
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <time className="text-gray-600">{post.date}</time>
          </header>

          {post.videoUrl && (
            <div className="mb-8 aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={post.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {post.thumbnail && !post.videoUrl && (
            <div className="mb-8">
              <img 
                src={post.thumbnail} 
                alt={post.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/blog"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(postsDirectory)) {
    return { paths: [], fallback: false };
  }

  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: { slug: filename.replace('.md', '') },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = marked(content);

  return {
    props: {
      post: {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        content: htmlContent,
        videoUrl: data.videoUrl || null,
        thumbnail: data.thumbnail || null,
      },
    },
    revalidate: 60,
  };
};

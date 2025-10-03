import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  videoUrl?: string;
  thumbnail?: string;
}

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <>
      <Head>
        <title>Natural Gardening Blog | Nature's Way Soil</title>
        <meta name="description" content="Expert tips and guides for natural, organic gardening" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-green-800 mb-4">
              Natural Gardening Blog
            </h1>
            <p className="text-xl text-gray-600">
              Tips, guides, and inspiration for organic gardening success
            </p>
            <Link href="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
              ← Back to Home
            </Link>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {post.thumbnail && (
                  <div className="aspect-video bg-gray-200">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {post.videoUrl && !post.thumbnail && (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                )}
                
                <div className="p-6">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-green-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return { props: { posts: [] } };
  }

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        videoUrl: data.videoUrl || null,
        thumbnail: data.thumbnail || null,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
    revalidate: 60, // Revalidate every minute
  };
};

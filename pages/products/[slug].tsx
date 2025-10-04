import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '@/data/products.json';
import videoConfig from '@/config/videos.json';
import ProductVideoPlayer from '@/components/ProductVideoPlayer';
import type { Product } from '@/lib/cart';

interface ProductPageProps {
  product: Product;
  productVideo?: {
    url: string;
    title: string;
    description: string;
  };
}

export default function ProductPage({ product, productVideo }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#products" className="hover:text-green-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.category}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Product Image & Video */}
          <div className="space-y-6">
            {/* Product Video */}
            {productVideo && (
              <ProductVideoPlayer
                videoUrl={productVideo.url}
                title={productVideo.title}
                description={productVideo.description}
              />
            )}

            {/* Product Image */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src={product.images[0] || '/placeholder-product.png'}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>

            {/* Additional Product Images (if available) */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="bg-white rounded border p-2">
                    <Image
                      src={img}
                      alt={`${product.title} - Image ${idx + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-auto rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Title & Category */}
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>

            {/* Price */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500">per unit</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">About This Product</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-3">Key Benefits</h2>
                <ul className="space-y-2">
                  {product.benefits.split(',').map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Audience */}
            {product.target_audience && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Perfect for:</strong> {product.target_audience}
                </p>
              </div>
            )}

            {/* Keywords/Tags */}
            {product.keywords && (
              <div className="flex flex-wrap gap-2">
                {product.keywords.split(',').map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Buy Now Button */}
            <div className="space-y-3">
              <Link
                href={`/checkout?slug=${product.slug}&qty=1`}
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-4 px-6 rounded-lg shadow-lg transition-colors"
              >
                Buy Now - ${product.price.toFixed(2)}
              </Link>

              {/* Amazon Link */}
              {product.asin && (
                <a
                  href={`https://www.amazon.com/dp/${product.asin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold py-4 px-6 rounded-lg shadow-lg transition-colors"
                >
                  Also Available on Amazon
                </a>
              )}
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">🌱</div>
                  <p className="text-xs text-gray-600">100% Organic</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🇺🇸</div>
                  <p className="text-xs text-gray-600">Made in USA</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">♻️</div>
                  <p className="text-xs text-gray-600">Eco-Friendly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.category === 'Fertilizer' && (
                <>
                  Our organic liquid fertilizers work with nature, not against it. Unlike synthetic fertilizers that 
                  provide a quick nutrient spike and then fade, our formulas feed the soil microbiome. These beneficial 
                  microorganisms break down organic matter and make nutrients available to plants in a slow, steady 
                  release that promotes healthy, sustainable growth.
                </>
              )}
              {product.category === 'Soil Amendment' && (
                <>
                  Soil amendments improve the physical structure and biological activity of your soil. By adding organic 
                  matter, beneficial microbes, and minerals, these products create an environment where plants can thrive. 
                  They improve water retention, drainage, aeration, and nutrient availability—all essential for healthy 
                  root development and vigorous plant growth.
                </>
              )}
              {product.category === 'Compost' && (
                <>
                  Compost is nature's perfect soil builder. Our enhanced living compost contains billions of beneficial 
                  microorganisms that work together to break down organic matter, suppress plant diseases, and make 
                  nutrients available to your plants. It's like adding a thriving ecosystem to your garden that works 
                  24/7 to improve soil health.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productsData
              .filter((p: Product) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct: Product) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={relatedProduct.images[0] || '/placeholder-product.png'}
                    alt={relatedProduct.title}
                    width={200}
                    height={200}
                    className="w-full h-auto rounded mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-green-600 font-bold">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = productsData;
  // Filter out products with empty or invalid slugs
  const paths = products
    .filter((product) => product.slug && product.slug.trim() !== '' && product.active)
    .map((product) => ({
      params: { slug: product.slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const products: Product[] = productsData;
  const product = products.find((p) => p.slug === params?.slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  // Find matching video for this product
  const productVideos = (videoConfig as any).productVideos || [];
  const productVideo = productVideos.find((v: any) => v.productId === product.id);

  return {
    props: {
      product,
      productVideo: productVideo || null,
    },
  };
};

import Link from 'next/link';
import Image from 'next/image';
import bundlesData from '@/data/bundles.json';
import productsData from '@/data/products.json';

interface Bundle {
  id: string;
  slug: string;
  title: string;
  description: string;
  products: string[];
  regularPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
  active: boolean;
  image: string;
  badge: string;
  benefits: string[];
}

export default function BundlesPage() {
  const bundles: Bundle[] = bundlesData.filter(b => b.active);

  const getProductsInBundle = (productIds: string[]) => {
    return productsData.filter(p => productIds.includes(p.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌱 Product Bundles - Save Up To 20%
          </h1>
          <p className="text-xl mb-2">
            Complete growing systems at unbeatable prices
          </p>
          <p className="text-lg opacity-90">
            Everything you need for organic gardening success
          </p>
        </div>
      </section>

      {/* Bundles Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {bundles.map((bundle) => {
            const bundleProducts = getProductsInBundle(bundle.products);
            
            return (
              <div key={bundle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Badge */}
                <div className="relative">
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    {bundle.badge}
                  </div>
                  <div className="bg-green-100 p-8 text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-2xl font-bold text-gray-800">{bundle.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{bundle.description}</p>

                  {/* Pricing */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Regular Price:</span>
                      <span className="text-gray-500 line-through text-lg">
                        ${bundle.regularPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-gray-800">Bundle Price:</span>
                      <span className="text-3xl font-bold text-green-600">
                        ${bundle.bundlePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-center pt-2 border-t border-yellow-300">
                      <span className="text-green-700 font-semibold">
                        💰 Save ${bundle.savings.toFixed(2)} ({bundle.savingsPercent}% OFF)
                      </span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">📦 What's Included:</h3>
                    <ul className="space-y-1">
                      {bundleProducts.map((product) => (
                        <li key={product.id} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>{product.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">🌟 Bundle Benefits:</h3>
                    <ul className="space-y-1">
                      {bundle.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/checkout?bundle=${bundle.slug}`}
                    className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Add Bundle to Cart - ${bundle.bundlePrice.toFixed(2)}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Buy Bundles Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Buy Bundles?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">
                Get up to 20% off compared to buying products individually
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Complete Systems</h3>
              <p className="text-gray-600 text-sm">
                Everything you need for success - no guessing what to buy
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Faster Results</h3>
              <p className="text-gray-600 text-sm">
                Synergistic products that work together for maximum growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Not Sure Which Bundle is Right for You?</h2>
          <p className="text-gray-700 mb-6">
            Check out our individual products or contact us for personalized recommendations
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/#products"
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Individual Products
            </Link>
            <Link
              href="/contact"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

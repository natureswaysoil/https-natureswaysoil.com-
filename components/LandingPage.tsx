import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json';
import videoConfig from '@/config/videos.json';
import AutoplayHeroVideo from '@/components/AutoplayHeroVideo';
import Testimonials from '@/components/Testimonials';
import TrustBadges from '@/components/TrustBadges';
import EmailPopup from '@/components/EmailPopup';
import GuaranteeBadge from '@/components/GuaranteeBadge';
import type { Product } from '@/lib/cart';
import type { LandingContent } from '@/lib/cms';

export default function LandingPage({ content }: { content: LandingContent }) {
        const products: Product[] = productsData;
        const heroVideo = videoConfig.heroVideo;
        
        return (
                <>
                        {/* Email Popup for Exit Intent */}
                        <EmailPopup />

                        {/* Trust Badges Bar */}
                        <TrustBadges />

                        {/* Autoplay Educational Video Hero */}
                        {heroVideo.enabled && (
                                <AutoplayHeroVideo 
                                        videoUrl={heroVideo.url}
                                        title={heroVideo.title}
                                        description={heroVideo.description}
                                />
                        )}

                        <section className="flex flex-col items-center text-center bg-gradient-to-b from-green-50 to-green-100 p-8 md:p-12">
                                <div className="mb-4 bg-yellow-400 text-gray-800 px-4 py-2 rounded-full font-bold text-sm md:text-base animate-pulse">
                                        🎉 LIMITED TIME: Free Shipping on Orders $75+ 🎉
                                </div>
                                <Image
                                        src={content.heroImage}
                                        alt="Nature's Way Soil logo"
                                        width={300}
                                        height={300}
                                        className="mb-4"
                                />
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                                        Get 40% Greener Grass in Just 14 Days
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-700 mb-2 font-semibold">
                                        Horse-Safe, Organic Fertilizers That Actually Work
                                </p>
                                <p className="max-w-2xl mb-6 text-gray-600 text-lg">
                                        Family-owned farm that restored 100+ acres of depleted soil. 
                                        Trusted by 500+ organic farmers and gardeners nationwide.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                        <Link 
                                                href="#products" 
                                                className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-all text-lg font-bold transform hover:scale-105"
                                        >
                                                🌱 Start Healing Your Soil Today
                                        </Link>
                                        <Link 
                                                href="#testimonials" 
                                                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg shadow hover:bg-green-50 transition-all text-lg font-bold"
                                        >
                                                See Real Results
                                        </Link>
                                </div>
                                <div className="max-w-md w-full mt-4">
                                        <GuaranteeBadge />
                                </div>
                        </section>

                        <section className="p-8 bg-white text-center">
                                <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
                                <ul className="max-w-3xl mx-auto text-left list-disc list-inside space-y-2">
                                        {content.promise.map((item) => (
                                                <li key={item}>{item}</li>
                                        ))}
                                </ul>
                        </section>

                        <section className="p-8 text-center bg-green-50">
                                <h2 className="text-2xl font-semibold mb-4">Why We Do It</h2>
                                {content.why.map((p, i) => (
                                        <p key={i} className={i === 0 ? 'max-w-2xl mx-auto mb-2' : 'max-w-2xl mx-auto'}>
                                                {p}
                                        </p>
                                ))}
                        </section>

                        <section className="p-8 flex justify-center bg-gray-100">
                                <div className="w-full max-w-3xl aspect-video">
                                        <iframe
                                                className="w-full h-full rounded"
                                                src={content.videoUrl}
                                                title="Benefits of Nature's Way Soil products"
                                                allowFullScreen
                                        ></iframe>
                                </div>
                        </section>

                        {/* Testimonials Section */}
                        <div id="testimonials">
                                <Testimonials />
                        </div>

                        <main id="products" className="p-8 md:p-12 bg-gray-50">
                                <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-10">
                                                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
                                                        Our Premium Organic Products
                                                </h2>
                                                <p className="text-gray-600 text-lg">
                                                        Choose the perfect solution for your soil health needs
                                                </p>
                                        </div>
                                        
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {products.map((p, index) => (
                                                        <div key={p.id} className="bg-white border-2 border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-xl hover:border-green-500 transition-all relative">
                                                                {/* Bestseller Badge */}
                                                                {index === 0 && (
                                                                        <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-3 py-1 rounded-bl-lg rounded-tr-lg font-bold text-xs">
                                                                                ⭐ BESTSELLER
                                                                        </div>
                                                                )}
                                                                
                                                                <Link href={`/products/${p.slug}`}>
                                                                        <Image
                                                                                src={p.images[0] || '/placeholder-product.png'}
                                                                                alt={p.title}
                                                                                width={300}
                                                                                height={300}
                                                                                className="mb-3 cursor-pointer hover:opacity-90 transition-opacity rounded"
                                                                        />
                                                                </Link>
                                                                
                                                                {/* Star Rating */}
                                                                <div className="flex items-center gap-1 mb-2">
                                                                        {[...Array(5)].map((_, i) => (
                                                                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                                                </svg>
                                                                        ))}
                                                                        <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                                                                </div>
                                                                
                                                                <Link href={`/products/${p.slug}`} className="hover:text-green-600 transition-colors">
                                                                        <h2 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{p.title}</h2>
                                                                </Link>
                                                                
                                                                <p className="flex-grow text-sm text-gray-600 mb-3 line-clamp-3">{p.description}</p>
                                                                
                                                                <div className="mb-3">
                                                                        <p className="text-2xl font-bold text-green-600">
                                                                                Starting at ${p.price.toFixed(2)}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">Free shipping on orders $75+</p>
                                                                </div>
                                                                
                                                                <div className="flex flex-col gap-2">
                                                                        <Link
                                                                                href={`/checkout?slug=${p.slug}&qty=1`}
                                                                                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg text-center hover:bg-green-700 transition-colors font-bold shadow-md hover:shadow-lg transform hover:scale-105"
                                                                        >
                                                                                🛒 Add to Cart - Start Today
                                                                        </Link>
                                                                        <Link
                                                                                href={`/products/${p.slug}`}
                                                                                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center hover:bg-gray-200 transition-colors text-sm"
                                                                        >
                                                                                View Full Details →
                                                                        </Link>
                                                                </div>
                                                                
                                                                {/* Trust indicators */}
                                                                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-600">
                                                                        <span>✓ 30-Day Guarantee</span>
                                                                        <span>•</span>
                                                                        <span>✓ Pet Safe</span>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </main>

                        <section className="p-8 md:p-12 text-center bg-gradient-to-b from-green-100 to-green-200">
                                <div className="max-w-3xl mx-auto">
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                                Ready to Transform Your Soil?
                                        </h2>
                                        <p className="text-lg text-gray-700 mb-6">
                                                Join 500+ satisfied customers who've restored their soil naturally
                                        </p>
                                        
                                        <div className="mb-6">
                                                <GuaranteeBadge size="large" />
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                                                <Link 
                                                        href="#products" 
                                                        className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-all text-lg font-bold transform hover:scale-105"
                                                >
                                                        🌱 Shop Now - Free Shipping $75+
                                                </Link>
                                                <Link 
                                                        href="/contact" 
                                                        className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg shadow hover:bg-green-50 transition-all text-lg font-bold"
                                                >
                                                        💬 Get Expert Advice
                                                </Link>
                                        </div>
                                        
                                        <div className="bg-white rounded-lg p-6 shadow-md">
                                                <p className="text-gray-700 mb-3">
                                                        <strong>Prefer Amazon?</strong>{' '}
                                                        <a
                                                                href="https://www.amazon.com"
                                                                className="text-green-600 underline hover:text-green-700"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                Find us on Amazon →
                                                        </a>
                                                </p>
                                                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 flex-wrap">
                                                        <span>🔒 Secure checkout powered by Stripe</span>
                                                        <span>•</span>
                                                        <span>📦 Fast shipping nationwide</span>
                                                        <span>•</span>
                                                        <span>💯 100% satisfaction guaranteed</span>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </>
        );
}

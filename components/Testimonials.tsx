import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Texas",
    text: "After years of struggling with yellow patches in my horse pasture, Nature's Way Soil Hay Fertilizer completely transformed it. Within 3 weeks, I saw 40% greener grass. My horses are healthier and happier!",
    rating: 5,
    product: "Hay Fertilizer"
  },
  {
    id: 2,
    name: "John Davidson",
    location: "Kentucky",
    text: "I was skeptical about organic fertilizers, but the Liquid Kelp changed my mind. My tomatoes are the biggest I've ever grown, and I love that it's safe for my kids and pets to play in the yard.",
    rating: 5,
    product: "Liquid Kelp"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "California",
    text: "The Living Compost blend is incredible! My vegetable garden has never been more productive. I've recommended Nature's Way Soil to all my gardening friends. Worth every penny!",
    rating: 5,
    product: "Living Compost"
  },
  {
    id: 4,
    name: "Robert Chen",
    location: "Oregon",
    text: "As an organic farmer, finding quality products is crucial. The Humic & Fulvic Acid with Kelp revived my depleted soil in just one season. My yields increased by 35%. This is the real deal!",
    rating: 5,
    product: "Humic Fulvic Kelp"
  }
];

export default function Testimonials() {
  return (
    <section className="p-8 md:p-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">
            Trusted by 500+ Organic Farmers & Gardeners
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 text-lg">4.9 out of 5 stars from 347 reviews</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-green-50 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
                {testimonial.product && (
                  <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
                    {testimonial.product}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            ⭐ Join hundreds of satisfied customers who've transformed their soil naturally
          </p>
        </div>
      </div>
    </section>
  );
}

interface AutoplayHeroVideoProps {
  videoUrl: string;
  title?: string;
  description?: string;
}

export default function AutoplayHeroVideo({ 
  videoUrl, 
  title = "The Hidden World Beneath Your Feet",
  description = "Discover how soil ecosystems work together to feed your plants naturally"
}: AutoplayHeroVideoProps) {
  // Check if it's a Pictory embed URL
  const isPictoryEmbed = videoUrl.includes('pictory.ai');
  
  // Convert Pictory preview URL to autoplay embed
  const embedUrl = isPictoryEmbed 
    ? videoUrl.replace('?mode=player', '?autoplay=1&muted=1&loop=1&controls=1')
    : videoUrl;

  return (
    <section className="relative w-full bg-black">
      {/* Video Container */}
      <div className="relative w-full aspect-video max-h-[80vh]">
        {isPictoryEmbed ? (
          // Pictory iframe embed
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title={title}
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ border: 'none' }}
          />
        ) : (
          // Direct video file
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Overlay with title and description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-end p-8 pointer-events-none">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md">
              {description}
            </p>
            
            {/* Call to Action */}
            <div className="pointer-events-auto">
              <a
                href="#products"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Shop Now →
              </a>
            </div>
          </div>
        </div>

        {/* Attribution Badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full pointer-events-none">
          🌱 Educational Content
        </div>
      </div>

      {/* Source Citations Section */}
      <div className="bg-gray-900 text-gray-300 py-6 px-8">
        <details className="max-w-6xl mx-auto">
          <summary className="cursor-pointer text-sm font-semibold text-white hover:text-green-400 transition-colors">
            📚 Research Sources & Citations
          </summary>
          <div className="mt-4 text-xs space-y-2 pl-4">
            <p className="font-semibold text-white mb-2">This video is based on peer-reviewed scientific research:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>USDA Natural Resources Conservation Service - Soil Biology Primer (2014)</li>
              <li>Binet et al., European Journal of Soil Science (2013) - Earthworms and mycorrhizal fungi interactions</li>
              <li>Nuccio et al., Nature Communications (2019) - Mycorrhizal fungi and soil microbiome</li>
              <li>Frontiers in Plant Science (2017, 2024) - Root exudates and plant-microbe communication</li>
              <li>Environmental Science and Ecotechnology (2022) - Plant-soil-microbe interactions</li>
              <li>Organic Farming Research Foundation (2024) - Impact of synthetic fertilizers on soil health</li>
              <li>PMC Articles 7165205, 7285516, 9796772, 10489935 - Mycorrhizae and nutrient bioavailability</li>
              <li>Nature Scientific Reports (2019) - Soil food web structure and function</li>
              <li>Nature Education Scitable - Plant-soil interactions and nutrient uptake</li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
}

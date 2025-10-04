import { useEffect, useRef, useState } from 'react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay when component mounts
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented:', error);
        // Autoplay was prevented, user will need to click play
      }
    };

    playVideo();

    // Intersection Observer for autoplay when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            video.play().catch(() => {});
          } else if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full bg-black">
      {/* Video Container */}
      <div className="relative w-full aspect-video max-h-[80vh]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with title and description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-end p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md">
              {description}
            </p>
            
            {/* Video Controls */}
            <div className="flex gap-4 items-center">
              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-200 flex items-center gap-2"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play
                  </>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <a
                href="#products"
                className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200 font-semibold"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>

        {/* Attribution Badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full">
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

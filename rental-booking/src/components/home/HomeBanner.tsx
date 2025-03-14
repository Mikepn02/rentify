import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: "/images/1.png",
    title: "Find Your Dream Vacation Rental",
    description:
      "Discover extraordinary properties for unforgettable experiences",
  },
  {
    id: 2,
    image: "/images/2.png",
    title: "Experience Luxury Redefined",
    description:
      "Premium accommodations in the world's most desirable locations",
  },
  {
    id: 3,
    image: "/images/3.png",
    title: "Modern Comfort Meets Style",
    description:
      "Contemporary homes designed for exceptional living experiences",
  },
];

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => resolve(true);
      });
    });

    Promise.all(imagePromises).then(() => {
      setImageLoaded(new Array(slides.length).fill(true));
    });

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 5000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || currentSlide === index) return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className={`absolute inset-0 ${
              imageLoaded[index] ? "" : "image-loading"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: currentSlide === index ? "scale(1.05)" : "scale(1)",
              transition: "transform 8s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center">
        <div className="container px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 transition-all duration-500"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? "translateY(20px)"
                  : "translateY(0)",
              }}
            >
              {slides[currentSlide].title}
            </h1>
            <p
              className="text-lg md:text-xl text-white/80 mb-8 transition-all duration-500 delay-100"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? "translateY(20px)"
                  : "translateY(0)",
              }}
            >
              {slides[currentSlide].description}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-200"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? "translateY(20px)"
                  : "translateY(0)",
              }}
            >
              <Link to="/listings">
                <Button className="h-12 px-6 text-base bg-white text-foreground hover:bg-white/90">
                  Browse Properties
                </Button>
              </Link>
              <Link to="/booking">
                <Button className="h-12 px-6 text-base" variant="outline">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-20 bottom-10 left-0 right-0">
        <div className="container px-6 lg:px-8 mx-auto">
          <div className="flex items-center justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

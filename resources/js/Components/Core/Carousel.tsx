import { Image } from "@/types";
import { useState } from "react";

function Carousel({ images }: { images: Image[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto py-2 px-1 md:px-0">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 w-14 h-14 border-2 rounded-md overflow-hidden ${
              index === activeIndex ? "border-orange-500" : "border-transparent"
            }`}
          >
            <img
              src={image.thumb}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden min-h-[300px] md:min-h-0">
        <img
          src={images[activeIndex]?.large || ""}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default Carousel;

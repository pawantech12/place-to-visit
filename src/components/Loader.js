"use client";
import Image from "next/image";

const Loader = ({ loader }) => {
  return (
    <>
      {loader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-[9999]">
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Rotating Border */}
            <div className="absolute w-full h-full border-[6px] border-white/30 border-t-white rounded-full animate-spin"></div>

            {/* Steady Image */}
            <div className="absolute">
              <Image
                src="/lookit.webp"
                width={100}
                height={100}
                alt="Loading"
                className="w-40 h-auto object-contain bg-transparent"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;

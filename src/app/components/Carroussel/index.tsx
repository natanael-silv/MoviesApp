import Image from "next/image";

import React, { ReactNode, useRef } from "react";

import { register } from "swiper/element/bundle";

register();

type CarrousselProps = {
  children: ReactNode;
};

const Carroussel = ({ children }: CarrousselProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const slidRight = (element: React.MutableRefObject<HTMLElement | null>) => {
    if (element.current) {
      element.current.scrollLeft += element.current.clientWidth;
    }
  };
  const slidLeft = (element: React.MutableRefObject<HTMLElement | null>) => {
    if (element.current) {
      element.current.scrollLeft -= element.current.clientWidth;
    }
  };
  return (
    <div className="">
      <button onClick={() => slidRight(elementRef)}>
        <Image
          src="/Svg/right-arrow.svg"
          alt=""
          width={28}
          height={28}
          className="hidden  md:block absolute mt-28 z-10 right-0 cursor-pointer mx-8 "
        />
      </button>
      <button onClick={() => slidLeft(elementRef)}>
        <Image
          src="/Svg/left-arrow.svg"
          alt=""
          width={28}
          height={28}
          className="hidden  md:block absolute mt-28 z-10 left-0 cursor-pointer mx-8"
        />
      </button>

      <div
        className="flex overflow-x-auto w-full gap-4 no-scrollbar scroll-smooth"
        ref={elementRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Carroussel;

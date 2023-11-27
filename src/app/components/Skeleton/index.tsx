import React from "react";

interface SkeletonProps {
  number: number;
}
export default function Skeleton({ number }: SkeletonProps) {
  return (
    <div>
      <div className="flex  overflow-x-auto w-full gap-4  scroll-smooth  no-scrollbar ">
        {Array(number)
          .fill(0)
          .map((el, index) => (
            <div key={index}>
              <div className="relative text-sm  md:h-[268px] md:w-[178px] w-[128px] h-[180px] bg-[#232323] rounded-lg my-0 mx-auto overflow-hidden animate-pulse"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface RatingScaleProps {
  statement: string;
}

export default function RatingScale({ statement }: RatingScaleProps) {
  const [selectedValue, setSelectedValue] = useState(-1);

  const totalPoints = 5;

  const handlePointClick = (index: number) => {
    setSelectedValue(index);
  };

  return (
    <div className="w-min-[346px] w-full bg-[#F9F9F9] rounded-lg">
      <h2 className="text-black text-[14px] font-medium ml-5 mt-6 mb-10">
        {statement}
      </h2>

      <div className="relative mb-4 px-8">
        {/* Line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#d9d9d9] -translate-y-1/2"></div>

        {/* Points */}
        <div className="flex justify-between relative">
          {Array.from({ length: totalPoints }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePointClick(index)}
              className={`w-[18px] h-[18px] rounded-full border-4 border-gray-300 z-10 hover:cursor-pointer 
            ${
              index === selectedValue
                ? "bg-yellow-400 border-yellow-400"
                : "bg-gray-50"
            }`}
              aria-label={`Rating ${index + 1} of ${totalPoints}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between px-4 pb-6 mt-4">
        <span className="text-[11px] text-[#878787] font-medium text-center">
          전혀 아니다
        </span>
        <span className="text-[11px] text-[#878787] font-medium text-center">
          매우 그렇다
        </span>
      </div>
    </div>
  );
}

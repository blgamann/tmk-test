"use client";

import { useState } from "react";

interface ChatBubbleProps {
  message: string;
  variant?: "default" | "highlight";
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`w-full flex gap-3.5 rounded-[6px] bg-[#F9F9F9] items-center h-14 cursor-pointer ${
        isSelected ? "border border-[#FFC744] bg-[rgba(255,199,68,0.20)]" : ""
      }`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <button
        className={`ml-3.5 w-[18px] h-[18px] rounded-full border-4 flex-shrink-0 hover:cursor-pointer
            ${
              isSelected
                ? "bg-yellow-400 border-yellow-400"
                : "border-gray-300 bg-gray-50"
            }
          `}
      />
      <p className="text-black text-[14px] font-medium">{message}</p>
    </div>
  );
}

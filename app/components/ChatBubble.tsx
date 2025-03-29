"use client";

interface ChatBubbleProps {
  message: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatBubble({
  message,
  isSelected,
  onClick,
}: ChatBubbleProps) {
  return (
    <div
      className={`w-full flex gap-3.5 rounded-[6px] bg-[#F9F9F9] items-center h-14 cursor-pointer ${
        isSelected ? "border border-[#FFC744] bg-[rgba(255,199,68,0.20)]" : ""
      }`}
      onClick={onClick}
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
      <p className="text-black text-[14px] font-medium mr-3.5">{message}</p>
    </div>
  );
}

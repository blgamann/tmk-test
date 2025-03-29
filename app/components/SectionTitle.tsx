import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <div className="relative inline-block mb-4">
      <span className="relative z-10 text-[18px] font-bold text-black px-0.5">
        {children}
      </span>
      <span
        className="absolute bottom-0 left-[-6px] right-[-6px] h-[50%] bg-[rgba(255,199,68,0.2)] -z-0"
        aria-hidden="true"
      />
    </div>
  );
};

export default SectionTitle;

"use client";

interface GuideProps {
  topic: string;
  description: string;
  isMultiSelection: boolean;
}

export default function Guide({
  topic,
  description,
  isMultiSelection,
}: GuideProps) {
  return (
    <div className="pt-9">
      <div className="text-black text-[15px] font-normal mb-3">{topic}</div>
      <div
        className={`whitespace-pre-line text-black text-[21px] font-semibold leading-[28px] ${
          !isMultiSelection ? "mb-10" : ""
        }`}
      >
        {description}
      </div>
      {isMultiSelection && (
        <div className="text-black text-[15px] font-normal mt-3 mb-8">
          해당되는 걸 모두 고르세요.
        </div>
      )}
    </div>
  );
}

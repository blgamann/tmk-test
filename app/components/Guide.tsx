"use client";

export default function Guide() {
  const option = true;

  return (
    <div className="pt-9">
      <div className="text-black text-[15px] font-normal mb-3">
        에너지 테스트
      </div>
      <div
        className={`whitespace-pre-line text-black text-[21px] font-semibold leading-[28px] ${
          !option ? "mb-10" : ""
        }`}
      >
        {"요즘 나의 상태를\n솔직하게 체크해볼까요?"}
      </div>
      {option && (
        <div className="text-black text-[15px] font-normal mt-3 mb-8">
          해당되는 걸 모두 고르세요.
        </div>
      )}
    </div>
  );
}

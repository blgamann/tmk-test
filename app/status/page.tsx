"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Status() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [testType, setTestType] = useState<string | null>(null);
  // 클라이언트 사이드에서만 렌더링되도록 상태 추가
  const [isMounted, setIsMounted] = useState(false);
  // 모든 테스트가 완료되었는지 확인
  const [allTestsCompleted, setAllTestsCompleted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 모든 테스트 완료 여부 확인
    if (typeof window !== "undefined") {
      const energyCompleted =
        localStorage.getItem("energy_test_results") !== null;
      const focusCompleted =
        localStorage.getItem("focus_test_results") !== null;
      const mindCompleted = localStorage.getItem("mind_test_results") !== null;

      setAllTestsCompleted(energyCompleted && focusCompleted && mindCompleted);
    }
  }, []);

  // 테스트 버튼 클릭 처리
  const handleTestClick = (type: string) => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") return;

    const testKey = `${type}_test_results`;
    const hasTestData = localStorage.getItem(testKey) !== null;

    if (hasTestData) {
      setTestType(type);
      setShowModal(true);
    } else {
      router.push(`/status/${type}`);
    }
  };

  // 확인 모달에서 '네' 버튼 클릭 처리
  const handleConfirm = () => {
    if (testType) {
      localStorage.removeItem(`${testType}_test_results`);
      setShowModal(false);
      router.push(`/status/${testType}`);
    }
  };

  // 확인 모달에서 '아니오' 버튼 클릭 처리
  const handleCancel = () => {
    setShowModal(false);
  };

  // 결과 보고서 클릭 처리
  const handleReportClick = () => {
    if (allTestsCompleted) {
      router.push("/report/energy");
    }
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 py-10">
      <div className="text-black text-[26px] font-bold leading-[35px] whitespace-pre-line">
        {"나의 상태를 하나씩\n알아보러 갈까요? 👋"}
      </div>
      <div className="text-black text-[15px] font-normal leading-[22px] whitespace-pre-line mt-5">
        {
          "에너지, 집중력, 마음 상태 테스트를\n차례대로, 모두 하셔야 결과 보고서를 받을 수 있어요."
        }
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3.5">
        <div
          onClick={() => handleTestClick("energy")}
          className="w-full h-[100px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer bg-[#F9F9F9] px-6 flex hover:bg-[#FFD351] transition-colors duration-200"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] text-black font-semibold">
              💪️ 에너지 상태 테스트하기
            </div>
            <Image src="/arrow.svg" alt="arrow" width={12} height={6} />
          </div>
        </div>
        <div
          onClick={() => handleTestClick("focus")}
          className="w-full h-[100px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer bg-[#F9F9F9] px-6 flex hover:bg-[#FFD351] transition-colors duration-200"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] text-black font-semibold">
              ⏳ 집중력 상태 테스트하기
            </div>
            <Image src="/arrow.svg" alt="arrow" width={12} height={6} />
          </div>
        </div>
        <div
          onClick={() => handleTestClick("mind")}
          className="w-full h-[100px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer bg-[#F9F9F9] px-6 flex hover:bg-[#FFD351] transition-colors duration-200"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] text-black font-semibold">
              🧡 마음 상태 테스트하기
            </div>
            <Image src="/arrow.svg" alt="arrow" width={12} height={6} />
          </div>
        </div>
        {allTestsCompleted ? (
          <div
            onClick={handleReportClick}
            className="w-full h-[100px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer bg-[#F9F9F9] px-6 flex hover:bg-[#FFD351] transition-colors duration-200"
          >
            <div className="flex items-center justify-between w-full">
              <div className="text-[20px] text-black font-semibold">
                📑 결과 보고서 확인하기
              </div>
              <Image src="/arrow.svg" alt="arrow" width={12} height={6} />
            </div>
          </div>
        ) : (
          <div className="w-full h-[100px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-not-allowed bg-[#F9F9F9] px-6 flex">
            <div className="flex items-center justify-between w-full">
              <div className="text-[20px] text-black font-semibold">
                📑 결과 보고서 확인하기
              </div>
              <Image src="/lock.svg" alt="lock" width={16} height={20} />
            </div>
          </div>
        )}
      </div>

      {/* 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="bg-white rounded-[6px] shadow-lg px-6 py-8 max-w-sm w-full mx-4 border border-gray-200">
            <div className="text-[18px] font-bold mb-4">
              이미 완료한 설문입니다
            </div>
            <div className="text-[14px] mb-6">
              다시 진행하시겠습니까? 진행 시 기존 결과는 삭제됩니다.
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 rounded-[6px] bg-gray-100 py-3 text-[16px] font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                돌아가기
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-[6px] bg-yellow-400 py-3 text-[16px] font-medium hover:bg-yellow-500 transition-colors duration-200"
              >
                다시 하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

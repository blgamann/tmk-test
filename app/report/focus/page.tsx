"use client";

import { useState, useEffect } from "react";
import SectionTitle from "@/app/components/SectionTitle";
import Button from "@/app/components/Button";
import DownloadButtonSimple from "@/app/components/DownloadButtonSimple";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type PersistenceType =
  | "🔥강한 집중 지속력"
  | "⛈️잘 변하는 집중 지속력"
  | "🌪️약한 집중 지속력";
type ContextType = "문맥형" | "비확장형";

// 테스트 결과 타입 정의
interface FocusTestResults {
  persistence: {
    score: number;
    type: PersistenceType;
  };
  typeScores: {
    sensory: number;
    environment: number;
    time: number;
  };
  contextType: ContextType;
}

export default function FocusReportPage() {
  const router = useRouter();
  const [results, setResults] = useState<FocusTestResults | null>(null);
  const [loading, setLoading] = useState(true);

  // Debug 모드 설정 (개발용)
  const [debug] = useState(false);

  // 각 섹션별 다른 답변 보기 상태
  const [showAlternatePersistence, setShowAlternatePersistence] = useState(0); // 0: 실제 결과, 1,2,3: 다른 결과들
  const [showAlternateFocusType, setShowAlternateFocusType] = useState(0);

  // 테스트 결과 가져오기
  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("focus_test_results");
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 집중력 지속성 메시지 생성
  const getPersistenceTypeMessage = (type: PersistenceType) => {
    switch (type) {
      case "🔥강한 집중 지속력":
        return "한 번 집중을 시작하면 오랜 시간 깊은 몰입을 유지할 수 있으며, 외부 환경이나 감정 변화에도 크게 흔들리지 않는 편이에요.";
      case "⛈️잘 변하는 집중 지속력":
        return "집중하는 것은 어렵지 않지만, 일정하지 않은 편이네요. 한번 시작하면 지속될 수 있도록 나만의 방법을 찾아보면 좋을 것 같아요.";
      case "🌪️약한 집중 지속력":
        return "집중이 오래 유지되지 않는 스타일이네요. 긴 시간 집중할 결심보다, 짧은 시간을 집중하려고 노력해 보면 좋을 것 같아요.";
      default:
        return "";
    }
  };

  // 모든 집중력 지속성 타입 정보
  const getAllPersistenceInfo = () => [
    {
      type: "🔥 강한 집중 지속력",
      message: getPersistenceTypeMessage("🔥강한 집중 지속력"),
    },
    {
      type: "⛈️ 잘 변하는 집중 지속력",
      message: getPersistenceTypeMessage("⛈️잘 변하는 집중 지속력"),
    },
    {
      type: "🌪️ 약한 집중 지속력",
      message: getPersistenceTypeMessage("🌪️약한 집중 지속력"),
    },
  ];

  // 모든 집중력 환경 타입 정보
  const getAllFocusTypeInfo = () => [
    {
      type: "주변 영향에 크게 휘둘리지 않는 무던형",
      emoji: "🌳",
      message:
        "특정 공간이나 감각 조건이 없어도 몰입 가능, 환경 변화나 장소 이동에 크게 영향을 받는 편이에요. 카페, 도서관, 집, 지하철 어디서든 집중할 수 있는 사람이기 때문에, 오히려 환경의 변화를 잘 활용하면 좋아요. 일의 특성에 따라 어떤 환경이 좋을지 업무에 따라 환경을 배치해도 좋아요.",
    },
    {
      type: "외부 자극에 민감한 감각형",
      emoji: "🌬️",
      message:
        "주변 소음, 조명의 밝기, 정돈 상태, 향기 등 감각 자극이나, 알림, 진동, 배경 소리 등에 예민한 편이에요. 이런 자극들 때문에 집중이 잘 되기도 하고, 잘 맞지 않는 자극이면 쉽게 집중이 흐트러질 수 있어요. 정돈된 환경과 감각 조절이 집중력 향상에 매우 중요할 수 있으니, 조용하고 단순한 공간이나, 미니멀한 환경에서 집중해 보세요.",
    },
    {
      type: "일정한 환경을 선호하는 루틴형",
      emoji: "🗓️",
      message:
        "익숙한 환경과 일정한 루틴에서 집중력이 높아지는 스타일이에요. 고정된 자리나 특정 공간에서 집중력이 높아질 수 있고, 자리를 많이 이동하거나 환경이 많이 바뀌면 집중력이 사라질 수 있어요. 반복되는 루틴이 몰입을 높여주기도 하고요. 낯선 환경이나 갑작스러운 변화에 쉽게 흐름이 끊길 수 있으니, 장소를 잘 고려해서 일에 집중해 보세요.",
    },
    {
      type: "시간대에 민감한 시간대형",
      emoji: "⏰",
      message:
        "하루 중 특정 시간에 집중력이 가장 잘 발휘되는 스타일이에요. 생체 리듬에 맞춤 시간대별 집중이 가장 잘 맞아요. 시간에 따라 효율이 크게 달라지는 타입이라, 집중이 잘 되는 시간을 파악하고, 중요한 일은 그때 배치하면 좋아요. 생체리듬에 맞춰서 시간의 리듬을 찾으면, 집중력도 올라갈 수 있어요.",
    },
  ];

  // 집중력 유형 결정 및 메시지 반환
  const getFocusTypeInfo = () => {
    if (!results) return { type: "", message: "", emoji: "" };

    const { sensory, environment, time } = results.typeScores;

    // 무던형(둔감형) 판단: 모든 영역이 낮은 점수일 때만 무던형으로 판단
    // 각 영역별 점수가 모두 2점 이하인 경우를 무던형으로 분류
    if (sensory <= 2 && environment <= 2 && time <= 2) {
      return {
        type: "주변 영향에 크게 휘둘리지 않는 무던형",
        emoji: "🌳",
        message:
          "특정 공간이나 감각 조건이 없어도 몰입 가능, 환경 변화나 장소 이동에 크게 영향을 받는 편이에요. 카페, 도서관, 집, 지하철 어디서든 집중할 수 있는 사람이기 때문에, 오히려 환경의 변화를 잘 활용하면 좋아요. 일의 특성에 따라 어떤 환경이 좋을지 업무에 따라 환경을 배치해도 좋아요.",
      };
    }

    // 가장 높은 점수 찾기
    const maxScore = Math.max(sensory, environment, time);

    // 동점인 경우 감각 > 환경 > 시간 순으로 우선 순위
    if (sensory === maxScore) {
      return {
        type: "외부 자극에 민감한 감각형",
        emoji: "🌬️",
        message:
          "주변 소음, 조명의 밝기, 정돈 상태, 향기 등 감각 자극이나, 알림, 진동, 배경 소리 등에 예민한 편이에요. 이런 자극들 때문에 집중이 잘 되기도 하고, 잘 맞지 않는 자극이면 쉽게 집중이 흐트러질 수 있어요. 정돈된 환경과 감각 조절이 집중력 향상에 매우 중요할 수 있으니, 조용하고 단순한 공간이나, 미니멀한 환경에서 집중해 보세요.",
      };
    } else if (environment === maxScore) {
      return {
        type: "일정한 환경을 선호하는 루틴형",
        emoji: "🗓️",
        message:
          "익숙한 환경과 일정한 루틴에서 집중력이 높아지는 스타일이에요. 고정된 자리나 특정 공간에서 집중력이 높아질 수 있고, 자리를 많이 이동하거나 환경이 많이 바뀌면 집중력이 사라질 수 있어요. 반복되는 루틴이 몰입을 높여주기도 하고요. 낯선 환경이나 갑작스러운 변화에 쉽게 흐름이 끊길 수 있으니, 장소를 잘 고려해서 일에 집중해 보세요.",
      };
    } else {
      return {
        type: "시간대에 민감한 시간대형",
        emoji: "⏰",
        message:
          "하루 중 특정 시간에 집중력이 가장 잘 발휘되는 스타일이에요. 생체 리듬에 맞춤 시간대별 집중이 가장 잘 맞아요. 시간에 따라 효율이 크게 달라지는 타입이라, 집중이 잘 되는 시간을 파악하고, 중요한 일은 그때 배치하면 좋아요. 생체리듬에 맞춰서 시간의 리듬을 찾으면, 집중력도 올라갈 수 있어요.",
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>데이터 로딩 중...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">
            테스트 결과가 없습니다
          </div>
          <div>먼저 집중력 테스트를 완료해주세요.</div>
        </div>
      </div>
    );
  }

  const persistenceMessage = getPersistenceTypeMessage(
    results.persistence.type
  );
  const focusTypeInfo = getFocusTypeInfo();

  return (
    <div id="focus-report-content" className="bg-white min-h-screen py-12 px-6">
      <BackButton className="mb-8" />

      <div className="text-[26px] text-black font-bold mb-16">
        나의 집중력 상태 보고서
      </div>

      <div className="flex flex-col gap-12">
        <div>
          <SectionTitle>첫 번째, 나의 집중력 지속 상태</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
            {
              "내가 얼마나 오래 집중력을 지속할 수 있는지를 보여주는 결과입니다.\n집중력이 강해야, 하나의 일을 오래 할 수 있어요."
            }
          </div>
          <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px] mt-6">
            {(() => {
              const allPersistenceInfo = getAllPersistenceInfo();
              const currentInfo =
                showAlternatePersistence === 0
                  ? {
                      type: results.persistence.type
                        .replace("🔥", "🔥 ")
                        .replace("⛈️", "⛈️ ")
                        .replace("🌪️", "🌪️ "),
                      message: persistenceMessage,
                    }
                  : allPersistenceInfo[showAlternatePersistence - 1];

              return (
                <>
                  <div className="text-[16px] text-black font-bold mb-3.5">
                    {currentInfo.type}
                    {debug && showAlternatePersistence === 0 && (
                      <span className="ml-2 text-[12px] bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        나의 결과
                      </span>
                    )}
                  </div>
                  <div className="text-[14px] text-black font-medium leading-[26px] mb-4">
                    {currentInfo.message}
                  </div>
                  {debug && (
                    <button
                      onClick={() =>
                        setShowAlternatePersistence((prev) => (prev + 1) % 4)
                      }
                      className="text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                    >
                      다른 답변 보기 ({showAlternatePersistence + 1}/4)
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <div>
          <SectionTitle>두 번째, 나의 집중력이 영향받는 환경</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
            {
              "환경에 따라 집중력이 좋아지기도, 나빠지기도 해요.\n내 집중력이 어떤 영향에 예민한 타입인지 확인하세요."
            }
          </div>
          <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px] mt-6">
            {(() => {
              const allFocusTypeInfo = getAllFocusTypeInfo();
              const currentInfo =
                showAlternateFocusType === 0
                  ? {
                      emoji: focusTypeInfo.emoji,
                      type: focusTypeInfo.type,
                      message: focusTypeInfo.message,
                    }
                  : allFocusTypeInfo[showAlternateFocusType - 1];

              return (
                <>
                  <div className="text-[16px] text-black font-bold mb-3.5">
                    {currentInfo.emoji} {currentInfo.type}
                    {debug && showAlternateFocusType === 0 && (
                      <span className="ml-2 text-[12px] bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        나의 결과
                      </span>
                    )}
                  </div>
                  <div className="text-[14px] text-black font-medium leading-[26px] mb-4">
                    {currentInfo.message}
                  </div>
                  {debug && (
                    <button
                      onClick={() =>
                        setShowAlternateFocusType((prev) => (prev + 1) % 5)
                      }
                      className="text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                    >
                      다른 답변 보기 ({showAlternateFocusType + 1}/5)
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <DownloadButtonSimple
        targetElementId="focus-report-content"
        filename="focus-report"
        className="mt-12"
      />

      <div className="mt-15">
        <Button activated={true} onClick={() => router.push("/report/mind")}>
          마음 상태 결과지로 넘어가기
        </Button>
      </div>
    </div>
  );
}

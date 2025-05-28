"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Guide from "@/app/components/Guide";
import RatingScale from "@/app/components/RatingScale";
import ProgressBar from "@/app/components/ProgressBar";
import RealTimeFocusScoreDisplay from "@/app/components/RealTimeFocusScoreDisplay";
import Button from "@/app/components/Button";
import ChatBubble from "@/app/components/ChatBubble";

export default function StatusFocus() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [debug] = useState(false);

  // step 1 평가 응답 (집중 지속력 측정)
  const [focusRatings, setFocusRatings] = useState<{
    [key: number]: number[];
  }>({
    1: Array(4).fill(-1),
  });

  // step 2-5 선택 (집중력 유형 측정)
  const [selectedFocusTypes, setSelectedFocusTypes] = useState<{
    [key: number]: number[];
  }>({
    2: [],
    3: [],
    4: [],
    5: [],
  });

  // 스크롤 효과
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleRating = (
    stepNum: number,
    questionIndex: number,
    rating: number
  ) => {
    setFocusRatings((prev) => ({
      ...prev,
      [stepNum]: prev[stepNum].map((r, idx) =>
        idx === questionIndex ? rating : r
      ),
    }));
  };

  const handleBubbleToggle = (stepNum: number, id: number) => {
    setSelectedFocusTypes((prev) => {
      const currentStepSelections = prev[stepNum] || [];
      if (currentStepSelections.includes(id)) {
        return {
          ...prev,
          [stepNum]: currentStepSelections.filter(
            (bubbleId) => bubbleId !== id
          ),
        };
      }
      return {
        ...prev,
        [stepNum]: [...currentStepSelections, id],
      };
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4 w-full">
            <RatingScale
              statement="한 가지 일을 할 때, 집중이 오래 유지된다."
              onRating={(rating) => handleRating(1, 0, rating)}
              selectedValue={focusRatings[1][0]}
            />
            <RatingScale
              statement="일하면서도 자꾸 딴 생각이 든다."
              onRating={(rating) => handleRating(1, 1, rating)}
              selectedValue={focusRatings[1][1]}
            />
            <RatingScale
              statement="일에 몰입하면 시간 가는 줄 모른다."
              onRating={(rating) => handleRating(1, 2, rating)}
              selectedValue={focusRatings[1][2]}
            />
            <RatingScale
              statement="집중 상태가 쉽게 끊기지 않는다."
              onRating={(rating) => handleRating(1, 3, rating)}
              selectedValue={focusRatings[1][3]}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="주변 소음이나 움직임에 예민하게 반응한다."
              isSelected={selectedFocusTypes[2].includes(1)}
              onClick={() => handleBubbleToggle(2, 1)}
            />
            <ChatBubble
              message="일정한 공간에서 일할 때 집중이 대체로 더 잘 된다."
              isSelected={selectedFocusTypes[2].includes(2)}
              onClick={() => handleBubbleToggle(2, 2)}
            />
            <ChatBubble
              message="머리가 맑아지는 시간이 하루 중 일정하게 정해져 있다."
              isSelected={selectedFocusTypes[2].includes(3)}
              onClick={() => handleBubbleToggle(2, 3)}
            />
            <ChatBubble
              message="특정 감각(음악, 향기, 조명 등)이 집중을 도와준다."
              isSelected={selectedFocusTypes[2].includes(4)}
              onClick={() => handleBubbleToggle(2, 4)}
            />
            <ChatBubble
              message="집중을 시작할 때 꼭 나만의 준비 과정이나 루틴이 필요하다."
              isSelected={selectedFocusTypes[2].includes(5)}
              onClick={() => handleBubbleToggle(2, 5)}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="같은 일을 하더라도, 아침과 저녁에 따라 몰입의 정도가 다르다."
              isSelected={selectedFocusTypes[3].includes(6)}
              onClick={() => handleBubbleToggle(3, 6)}
            />
            <ChatBubble
              message="집중 중일 때 누가 다가오는 기척만으로도 흐름이 깨지는 느낌이 든다."
              isSelected={selectedFocusTypes[3].includes(7)}
              onClick={() => handleBubbleToggle(3, 7)}
            />
            <ChatBubble
              message="하루 중 정해진 시간에 집중이 가장 잘 된다."
              isSelected={selectedFocusTypes[3].includes(8)}
              onClick={() => handleBubbleToggle(3, 8)}
            />
            <ChatBubble
              message="특정 환경(카페, 도서관 등)에서 집중이 더 잘 된다."
              isSelected={selectedFocusTypes[3].includes(9)}
              onClick={() => handleBubbleToggle(3, 9)}
            />
            <ChatBubble
              message="조명이 너무 밝거나 어두우면 집중이 흐트러진다."
              isSelected={selectedFocusTypes[3].includes(10)}
              onClick={() => handleBubbleToggle(3, 10)}
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="공간의 배치나 분위기에 따라 집중력이 확연히 달라지는 편이다."
              isSelected={selectedFocusTypes[4].includes(11)}
              onClick={() => handleBubbleToggle(4, 11)}
            />
            <ChatBubble
              message="휴대폰 알림 혹은 SNS 때문에 집중이 자주 깨진다."
              isSelected={selectedFocusTypes[4].includes(12)}
              onClick={() => handleBubbleToggle(4, 12)}
            />
            <ChatBubble
              message="일을 할 때 일이 잘되는 나만의 장소가 정해져 있는 편이다."
              isSelected={selectedFocusTypes[4].includes(13)}
              onClick={() => handleBubbleToggle(4, 13)}
            />
            <ChatBubble
              message="일정한 리듬이 흐트러지면 집중력도 흐트러진다."
              isSelected={selectedFocusTypes[4].includes(14)}
              onClick={() => handleBubbleToggle(4, 14)}
            />
            <ChatBubble
              message="공간이 어지럽거나 정돈되지 않으면 집중이 어렵다."
              isSelected={selectedFocusTypes[4].includes(15)}
              onClick={() => handleBubbleToggle(4, 15)}
            />
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="소리나 냄새가 조금만 달라져도 신경이 쓰인다."
              isSelected={selectedFocusTypes[5].includes(16)}
              onClick={() => handleBubbleToggle(5, 16)}
            />
            <ChatBubble
              message="물건이 제자리에 있지 않으면 마음이 어수선해진다."
              isSelected={selectedFocusTypes[5].includes(17)}
              onClick={() => handleBubbleToggle(5, 17)}
            />
            <ChatBubble
              message="집중이 잘 되는 시간대를 놓치면 다시 흐름을 잡기 어렵다."
              isSelected={selectedFocusTypes[5].includes(18)}
              onClick={() => handleBubbleToggle(5, 18)}
            />
            <ChatBubble
              message="환경을 정리하고 나면 자연스럽게 집중할 준비가 된 기분이 든다."
              isSelected={selectedFocusTypes[5].includes(19)}
              onClick={() => handleBubbleToggle(5, 19)}
            />
          </div>
        );
      case 6:
        return (
          <div className="w-full flex flex-col items-center justify-between h-full min-h-[calc(100vh-80px)]">
            <div className="flex flex-col items-center justify-center mt-12">
              <Image src="/finish.svg" alt="finish" width={46} height={46} />
              <div className="text-center text-[21px] text-black font-semibold leading-[28px] whitespace-pre-line mb-6 mt-9">
                {"집중력 테스트가\n완료되었습니다"}
              </div>
              <div className="text-center text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
                {"모든 테스트를 완료하시면\n결과 보고서가 열립니다."}
              </div>
            </div>
            <div className="w-full px-5">
              <Button activated={true} onClick={() => router.push("/status")}>
                다른 설문 하러 가기
              </Button>
            </div>
          </div>
        );
    }
  };

  // 버튼 활성화 조건
  const isButtonActivated = () => {
    if (step === 1) {
      return focusRatings[step]?.every((rating) => rating !== -1) ?? false;
    }
    // step 2-5: 집중력 유형 중 하나라도 선택되어 있으면 버튼 활성화
    if (step >= 2 && step <= 5) {
      return (selectedFocusTypes[step]?.length ?? 0) > 0;
    }
    return false;
  };

  // 집중력 지속성 점수 계산
  const calculateFocusPersistenceScore = () => {
    // 1단계 평가 응답의 총점 계산 (0->1, 1->2, 2->3, 3->4, 4->5로 변환)
    const totalScore = focusRatings[1].reduce((sum, rating) => {
      return rating !== -1 ? sum + (rating + 1) : sum;
    }, 0);

    let persistenceType;
    if (totalScore >= 4 && totalScore <= 9) {
      persistenceType = "🔥강한 집중 지속력";
    } else if (totalScore >= 10 && totalScore <= 14) {
      persistenceType = "⛈️잘 변하는 집중 지속력";
    } else if (totalScore >= 15 && totalScore <= 20) {
      persistenceType = "🌪️약한 집중 지속력";
    } else {
      persistenceType = "측정 중...";
    }

    return {
      score: totalScore,
      type: persistenceType,
    };
  };

  // 집중력 유형 점수 계산 - 감각형, 환경형, 시간형 매핑
  const FOCUS_TYPE_MAPPING: { [key: number]: string } = {
    // step 2
    1: "sensory", // 주변 소음이나 움직임에 예민하게 반응
    2: "environment", // 일정한 공간에서 일할 때 집중이 대체로 더 잘 됨
    3: "time", // 머리가 맑아지는 시간이 하루 중 일정하게 정해져 있음
    4: "sensory", // 특정 감각이 집중을 도움
    5: "environment", // 집중을 위한 루틴 필요

    // step 3
    6: "time", // 아침/저녁에 따라 몰입 정도가 다름
    7: "sensory", // 기척만으로도 흐름이 깨짐
    8: "time", // 정해진 시간에 집중이 잘 됨
    9: "environment", // 특정 환경에서 집중 잘 됨
    10: "sensory", // 조명에 민감

    // step 4
    11: "environment", // 공간 배치에 민감
    12: "sensory", // 휴대폰/SNS에 주의 분산
    13: "environment", // '딱 그 정도'가 정해져 있음
    14: "time", // 리듬 중요
    15: "sensory", // 공간 정돈 중요

    // step 5
    16: "sensory", // 소리/냄새 변화에 민감
    17: "environment", // 물건 위치 중요
    18: "time", // 시간대 중요
    19: "environment", // 환경 정리가 집중에 영향
  };

  // 선택된 항목으로 유형별 점수 업데이트
  const updateFocusTypeScores = () => {
    let tempSensory = 0;
    let tempEnvironment = 0;
    let tempTime = 0;

    // 모든 step의 선택 항목들을 합산
    Object.entries(selectedFocusTypes).forEach(([, selections]) => {
      selections.forEach((id) => {
        const type = FOCUS_TYPE_MAPPING[id];
        if (type === "sensory") tempSensory += 1;
        else if (type === "environment") tempEnvironment += 1;
        else if (type === "time") {
          // 시간 집중형 문항에는 가중치 1.4 적용
          tempTime += 1.4;
        }
      });
    });

    return {
      sensory: tempSensory,
      environment: tempEnvironment,
      time: tempTime,
    };
  };

  // 집중력 특성 타입 결정
  const determineFocusCharacteristicType = () => {
    const { sensory, environment, time } = updateFocusTypeScores();
    const totalSelections = Object.values(selectedFocusTypes).reduce(
      (sum, selections) => sum + selections.length,
      0
    );

    if (totalSelections === 0) return "미정";

    // 3점 이상인 유형들 확인
    const hasHighSensory = sensory >= 3;
    const hasHighEnvironment = environment >= 3;
    const hasHighTime = time >= 3;

    // 모든 유형이 3점 미만이면 둔감형
    if (!hasHighSensory && !hasHighEnvironment && !hasHighTime) {
      return "둔감형/미확정형";
    }

    // 3점 이상인 유형 중에서 최고 점수 찾기
    let maxScore = 0;
    let candidateTypes: string[] = [];

    if (hasHighSensory) {
      if (sensory > maxScore) {
        maxScore = sensory;
        candidateTypes = ["감각"];
      } else if (sensory === maxScore) {
        candidateTypes.push("감각");
      }
    }

    if (hasHighEnvironment) {
      if (environment > maxScore) {
        maxScore = environment;
        candidateTypes = ["환경"];
      } else if (environment === maxScore) {
        candidateTypes.push("환경");
      }
    }

    if (hasHighTime) {
      if (time > maxScore) {
        maxScore = time;
        candidateTypes = ["시간"];
      } else if (time === maxScore) {
        candidateTypes.push("시간");
      }
    }

    // 점수가 같은 경우 우선순위: 감각 > 환경 > 시간
    if (candidateTypes.includes("감각")) {
      return "감각 민감형";
    } else if (candidateTypes.includes("환경")) {
      return "환경 루틴형";
    } else if (candidateTypes.includes("시간")) {
      return "시간 집중형";
    }

    return "미정";
  };

  // 이전 스텝으로 이동
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      // 첫 번째 스텝에서 이전 버튼을 누르면 상태 선택 페이지로 이동
      router.push("/status");
    }
  };

  // 다음 스텝으로 이동 및 점수 계산
  const handleNextStep = () => {
    if (step <= 5) {
      if (step === 1 && focusRatings[step].every((rating) => rating !== -1)) {
        setStep(step + 1);
      } else if (
        step >= 2 &&
        step <= 4 &&
        selectedFocusTypes[step].length > 0
      ) {
        setStep(step + 1);
      } else if (step === 5 && selectedFocusTypes[step].length > 0) {
        // 마지막 스텝에서 최종 결과 계산 및 저장
        const persistenceResult = calculateFocusPersistenceScore();
        const typeScores = updateFocusTypeScores();
        const contextType = determineFocusCharacteristicType();

        // 최종 결과 객체 구성
        const finalResults = {
          persistence: persistenceResult,
          typeScores: typeScores,
          contextType: contextType,
        };

        console.log("Final Results:", finalResults);

        // 결과를 localStorage에 저장
        try {
          localStorage.setItem(
            "focus_test_results",
            JSON.stringify(finalResults)
          );
          console.log("Test results saved to localStorage");
        } catch (error) {
          console.error("Error saving results to localStorage:", error);
        }

        setStep(step + 1);
      }
    }
  };

  const getDescription = () => {
    if (step === 1) {
      return "나에게 해당되는 정도를 골라보세요.";
    } else if (step >= 2 && step <= 5) {
      return "나에게 해당된다고 생각하는 것을 모두 골라주세요. (해당되는 것을 모두 선택하세요)";
    }
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ProgressBar currentStep={step} totalSteps={5} />

      {debug && (
        <div className="px-5">
          <RealTimeFocusScoreDisplay
            currentStep={step}
            focusRatings={focusRatings}
            selectedFocusTypes={selectedFocusTypes}
          />
        </div>
      )}
      <div className="w-full px-5 flex-1 flex flex-col">
        {step < 6 && (
          <Guide
            topic="집중력 상태 테스트"
            description={getDescription()}
            isMultiSelection={false}
          />
        )}
        {renderStep()}
        {step < 6 && (
          <div className="mt-9 mb-4 space-y-3">
            <Button activated={isButtonActivated()} onClick={handleNextStep}>
              다 골랐어요!
            </Button>
            <button
              onClick={handlePreviousStep}
              className="w-full h-[50px] rounded-[6px] border border-gray-300 bg-white text-gray-600 text-[16px] font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              이전으로
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

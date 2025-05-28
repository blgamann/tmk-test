"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Guide from "@/app/components/Guide";
import ProgressBar from "@/app/components/ProgressBar";
import Button from "@/app/components/Button";
import ChatBubble from "@/app/components/ChatBubble";

// 마음 상태 타입 정의
type MindType =
  | "불안"
  | "비교"
  | "완벽주의"
  | "자기의심"
  | "눈치"
  | "회피"
  | "긍정";

export default function StatusMind() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // 각 상황별 선택 항목 저장
  const [selectedMindChoices, setSelectedMindChoices] = useState<{
    [key: number]: number[];
  }>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  // 스크롤 효과
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // 선택 토글 처리
  const handleBubbleToggle = (stepNum: number, id: number) => {
    setSelectedMindChoices((prev) => {
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

  // 마음 상태 점수 업데이트
  const updateMindScores = () => {
    const scores: { [key in MindType]: number } = {
      불안: 0,
      비교: 0,
      완벽주의: 0,
      자기의심: 0,
      눈치: 0,
      회피: 0,
      긍정: 0,
    };

    // 상황 1
    if (selectedMindChoices[1]?.includes(1)) scores.불안 += 1.5;
    if (selectedMindChoices[1]?.includes(2)) scores.비교 += 1;
    if (selectedMindChoices[1]?.includes(3)) scores.완벽주의 += 2;
    if (selectedMindChoices[1]?.includes(4)) scores.자기의심 += 1;
    if (selectedMindChoices[1]?.includes(5)) scores.긍정 -= 1;
    if (selectedMindChoices[1]?.includes(6)) scores.회피 += 1;
    if (selectedMindChoices[1]?.includes(7)) scores.눈치 += 1;

    // 상황 2
    if (selectedMindChoices[2]?.includes(1)) scores.완벽주의 += 1;
    if (selectedMindChoices[2]?.includes(2)) scores.회피 += 1;
    if (selectedMindChoices[2]?.includes(3)) scores.자기의심 += 1;
    if (selectedMindChoices[2]?.includes(4)) scores.비교 += 1.5;
    if (selectedMindChoices[2]?.includes(5)) scores.불안 += 1;
    if (selectedMindChoices[2]?.includes(6)) scores.눈치 += 1;
    if (selectedMindChoices[2]?.includes(7)) scores.긍정 -= 1;

    // 상황 3
    if (selectedMindChoices[3]?.includes(1)) scores.자기의심 += 1;
    if (selectedMindChoices[3]?.includes(2)) scores.긍정 -= 1;
    if (selectedMindChoices[3]?.includes(3)) scores.완벽주의 += 1.5;
    if (selectedMindChoices[3]?.includes(4)) scores.눈치 += 1;
    if (selectedMindChoices[3]?.includes(5)) scores.비교 += 1;
    if (selectedMindChoices[3]?.includes(6)) scores.회피 += 1;
    if (selectedMindChoices[3]?.includes(7)) scores.불안 += 1;

    // 상황 4
    if (selectedMindChoices[4]?.includes(1)) scores.불안 += 1;
    if (selectedMindChoices[4]?.includes(2)) scores.비교 += 1;
    if (selectedMindChoices[4]?.includes(3)) scores.완벽주의 += 1;
    if (selectedMindChoices[4]?.includes(4)) scores.자기의심 += 1.5;
    if (selectedMindChoices[4]?.includes(5)) scores.긍정 -= 1;
    if (selectedMindChoices[4]?.includes(6)) scores.눈치 += 1;
    if (selectedMindChoices[4]?.includes(7)) scores.회피 += 1;

    // 상황 5
    if (selectedMindChoices[5]?.includes(1)) scores.눈치 += 1.5;
    if (selectedMindChoices[5]?.includes(2)) scores.회피 += 1;
    if (selectedMindChoices[5]?.includes(3)) scores.자기의심 += 1;
    if (selectedMindChoices[5]?.includes(4)) scores.긍정 -= 1;
    if (selectedMindChoices[5]?.includes(5)) scores.불안 += 1;
    if (selectedMindChoices[5]?.includes(6)) scores.비교 += 1;
    if (selectedMindChoices[5]?.includes(7)) scores.완벽주의 += 1;

    // 상황 6
    if (selectedMindChoices[6]?.includes(1)) scores.불안 += 1;
    if (selectedMindChoices[6]?.includes(2)) scores.눈치 += 1;
    if (selectedMindChoices[6]?.includes(3)) scores.긍정 -= 1;
    if (selectedMindChoices[6]?.includes(4)) scores.비교 += 1;
    if (selectedMindChoices[6]?.includes(5)) scores.완벽주의 += 1;
    if (selectedMindChoices[6]?.includes(6)) scores.회피 += 1.5;
    if (selectedMindChoices[6]?.includes(7)) scores.자기의심 += 1;

    return scores;
  };

  // 마음 상태 유형 계산
  const determineMindType = () => {
    const scores = updateMindScores();

    // 점수 중 가장 높은 항목 찾기 (긍정 제외)
    const scoresWithoutPositive = { ...scores };
    const positiveKey = "긍정" as MindType;
    delete scoresWithoutPositive[positiveKey];

    const maxScore = Math.max(...Object.values(scoresWithoutPositive));

    // 최고 점수를 가진 유형들 찾기
    const topTypes = Object.entries(scoresWithoutPositive)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type as MindType);

    // 긍정 점수 계산 (음수로 저장되므로 절대값 사용)
    const positiveScore = Math.abs(scores.긍정);

    // 타입 결정 로직: 긍정 유형 판별
    let finalType: MindType | "긍정" = topTypes[0]; // 기본값으로 최고 점수 유형 중 첫 번째 설정

    // 모든 성향 점수가 마이너스이거나 0~1점으로 고르게 분포된 경우 긍정 유형으로 판별
    const allTypesLowOrEqual = Object.entries(scoresWithoutPositive).every(
      ([, score]) => score <= 1
    );

    // 모든 점수가 1점 이하이고 고르게 분산되어 있거나, 긍정 점수가 다른 점수보다 현저히 높을 경우
    if (allTypesLowOrEqual || positiveScore > maxScore) {
      finalType = "긍정";
    }

    return {
      topTypes,
      scores,
      positiveScore,
      finalType, // 최종 유형 반환
    };
  };

  const getDescription = () => {
    if (step >= 1 && step <= 6) {
      const situation: { [key: number]: string } = {
        1: "💬 상황 1. 새로운 일을 시작할 때 나는…",
        2: "💬 상황 2. 다른 사람이 나보다 더 잘해 보일 때 나는…",
        3: "💬 상황 3. 누군가 내 일에 솔직한 피드백을 줄 때 나는…",
        4: "💬 상황 4. 잘하고 싶은 일에서 실수했을 때 나는…",
        5: "💬 상황 5. 중요한 프로젝트 팀에 합류했을 때 나는...",
        6: "💬 상황 6. 감정을 표현해야 하는 상황에서, 나는…",
      };

      return `${situation[step]}`;
    }
    return "";
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="혹시 실수하면 어쩌지? 걱정이 앞선다."
              isSelected={selectedMindChoices[1]?.includes(1)}
              onClick={() => handleBubbleToggle(1, 1)}
            />
            <ChatBubble
              message="다른 사람들은 나보다 잘할 텐데… 비교하게 된다."
              isSelected={selectedMindChoices[1]?.includes(2)}
              onClick={() => handleBubbleToggle(1, 2)}
            />
            <ChatBubble
              message="완벽하게 준비되지 않으면 시작할 수 없다."
              isSelected={selectedMindChoices[1]?.includes(3)}
              onClick={() => handleBubbleToggle(1, 3)}
            />
            <ChatBubble
              message="내가 이걸 해도 괜찮을까? 자신이 없다."
              isSelected={selectedMindChoices[1]?.includes(4)}
              onClick={() => handleBubbleToggle(1, 4)}
            />
            <ChatBubble
              message="재밌게 잘해낼 것이 상상이 간다."
              isSelected={selectedMindChoices[1]?.includes(5)}
              onClick={() => handleBubbleToggle(1, 5)}
            />
            <ChatBubble
              message="실패할까 봐 아예 시작이 망설여진다."
              isSelected={selectedMindChoices[1]?.includes(6)}
              onClick={() => handleBubbleToggle(1, 6)}
            />
            <ChatBubble
              message="주변 사람들이 나를 어떻게 볼지 먼저 생각한다."
              isSelected={selectedMindChoices[1]?.includes(7)}
              onClick={() => handleBubbleToggle(1, 7)}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="나도 완벽하게 해내야 할 것 같다."
              isSelected={selectedMindChoices[2]?.includes(1)}
              onClick={() => handleBubbleToggle(2, 1)}
            />
            <ChatBubble
              message="애초에 경쟁을 피하고 싶어진다."
              isSelected={selectedMindChoices[2]?.includes(2)}
              onClick={() => handleBubbleToggle(2, 2)}
            />
            <ChatBubble
              message="역시 나는 부족한 사람인 것 같다."
              isSelected={selectedMindChoices[2]?.includes(3)}
              onClick={() => handleBubbleToggle(2, 3)}
            />
            <ChatBubble
              message="자꾸 스스로를 비교하며 초라하게 느껴진다."
              isSelected={selectedMindChoices[2]?.includes(4)}
              onClick={() => handleBubbleToggle(2, 4)}
            />
            <ChatBubble
              message="나도 잘해야 한다는 압박감이 든다."
              isSelected={selectedMindChoices[2]?.includes(5)}
              onClick={() => handleBubbleToggle(2, 5)}
            />
            <ChatBubble
              message="괜히 주변 반응이 신경 쓰인다."
              isSelected={selectedMindChoices[2]?.includes(6)}
              onClick={() => handleBubbleToggle(2, 6)}
            />
            <ChatBubble
              message="잘하는 사람과 같이 하니까 뿌듯하다."
              isSelected={selectedMindChoices[2]?.includes(7)}
              onClick={() => handleBubbleToggle(2, 7)}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="역시 난 못하고 있는 것 같다는 생각이 든다."
              isSelected={selectedMindChoices[3]?.includes(1)}
              onClick={() => handleBubbleToggle(3, 1)}
            />
            <ChatBubble
              message="이유가 있겠지 생각하며, 스스로 돌아본다."
              isSelected={selectedMindChoices[3]?.includes(2)}
              onClick={() => handleBubbleToggle(3, 2)}
            />
            <ChatBubble
              message="부족한 부분이 보이면 자책하게 된다."
              isSelected={selectedMindChoices[3]?.includes(3)}
              onClick={() => handleBubbleToggle(3, 3)}
            />
            <ChatBubble
              message="이게 다른 사람들에게 어떻게 보일까 생각한다."
              isSelected={selectedMindChoices[3]?.includes(4)}
              onClick={() => handleBubbleToggle(3, 4)}
            />
            <ChatBubble
              message="다른 사람들은 이런 피드백 안 받았을 텐데…"
              isSelected={selectedMindChoices[3]?.includes(5)}
              onClick={() => handleBubbleToggle(3, 5)}
            />
            <ChatBubble
              message="상처받을까 봐 피드백을 회피한다."
              isSelected={selectedMindChoices[3]?.includes(6)}
              onClick={() => handleBubbleToggle(3, 6)}
            />
            <ChatBubble
              message="혹시 비난일까 봐 긴장된다."
              isSelected={selectedMindChoices[3]?.includes(7)}
              onClick={() => handleBubbleToggle(3, 7)}
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="다시는 그런 일이 생길까 봐 걱정이 계속된다."
              isSelected={selectedMindChoices[4]?.includes(1)}
              onClick={() => handleBubbleToggle(4, 1)}
            />
            <ChatBubble
              message="다른 사람들은 이런 실수 안 하는데…"
              isSelected={selectedMindChoices[4]?.includes(2)}
              onClick={() => handleBubbleToggle(4, 2)}
            />
            <ChatBubble
              message="왜 완벽히 못했을까 자책한다."
              isSelected={selectedMindChoices[4]?.includes(3)}
              onClick={() => handleBubbleToggle(4, 3)}
            />
            <ChatBubble
              message="나는 역시 뭘 해도 안 되는 사람인가 싶다."
              isSelected={selectedMindChoices[4]?.includes(4)}
              onClick={() => handleBubbleToggle(4, 4)}
            />
            <ChatBubble
              message="그럴수도 있지..다음을 기약한다."
              isSelected={selectedMindChoices[4]?.includes(5)}
              onClick={() => handleBubbleToggle(4, 5)}
            />
            <ChatBubble
              message="사람들이 나를 어떻게 볼까 불안하다."
              isSelected={selectedMindChoices[4]?.includes(6)}
              onClick={() => handleBubbleToggle(4, 6)}
            />
            <ChatBubble
              message="다음엔 아예 시도하지 않게 된다."
              isSelected={selectedMindChoices[4]?.includes(7)}
              onClick={() => handleBubbleToggle(4, 7)}
            />
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="내가 잘하고 있는지 계속 주변 눈치를 본다."
              isSelected={selectedMindChoices[5]?.includes(1)}
              onClick={() => handleBubbleToggle(5, 1)}
            />
            <ChatBubble
              message="혼자 일하는 게 더 편하다고 느낀다."
              isSelected={selectedMindChoices[5]?.includes(2)}
              onClick={() => handleBubbleToggle(5, 2)}
            />
            <ChatBubble
              message="내가 이 팀에 도움이 되긴 할까? 자꾸 의문이 든다."
              isSelected={selectedMindChoices[5]?.includes(3)}
              onClick={() => handleBubbleToggle(5, 3)}
            />
            <ChatBubble
              message="내가 하면, 다른 사람에게 도움이 될 거라는 확신이 든다."
              isSelected={selectedMindChoices[5]?.includes(4)}
              onClick={() => handleBubbleToggle(5, 4)}
            />
            <ChatBubble
              message="내 몫을 잘 못하면 민폐가 될까 걱정된다."
              isSelected={selectedMindChoices[5]?.includes(5)}
              onClick={() => handleBubbleToggle(5, 5)}
            />
            <ChatBubble
              message="다른 사람들은 잘하는데, 나만 못할까봐 걱정이 된다."
              isSelected={selectedMindChoices[5]?.includes(6)}
              onClick={() => handleBubbleToggle(5, 6)}
            />
            <ChatBubble
              message="내가 맡은 부분은 완벽하게 해내야 한다고 느낀다."
              isSelected={selectedMindChoices[5]?.includes(7)}
              onClick={() => handleBubbleToggle(5, 7)}
            />
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="혹시 이 말로 관계가 틀어질까 봐 계속 불안하다."
              isSelected={selectedMindChoices[6]?.includes(1)}
              onClick={() => handleBubbleToggle(6, 1)}
            />
            <ChatBubble
              message="혹시 상대가 기분 나쁘지 않을까 계속 신경 쓰인다."
              isSelected={selectedMindChoices[6]?.includes(2)}
              onClick={() => handleBubbleToggle(6, 2)}
            />
            <ChatBubble
              message="솔직히 말하는 것이 가장 좋은 방식이라고 생각한다."
              isSelected={selectedMindChoices[6]?.includes(3)}
              onClick={() => handleBubbleToggle(6, 3)}
            />
            <ChatBubble
              message="다른 사람들은 자연스럽게 말 잘하던데, 나는 왜 이렇게 힘들까."
              isSelected={selectedMindChoices[6]?.includes(4)}
              onClick={() => handleBubbleToggle(6, 4)}
            />
            <ChatBubble
              message="어떻게 말해야 완벽하게 전달될까 고민하다 결국 미룬다."
              isSelected={selectedMindChoices[6]?.includes(5)}
              onClick={() => handleBubbleToggle(6, 5)}
            />
            <ChatBubble
              message="괜히 일이 커질까 봐 그냥 말 안 하고 넘긴다."
              isSelected={selectedMindChoices[6]?.includes(6)}
              onClick={() => handleBubbleToggle(6, 6)}
            />
            <ChatBubble
              message="나 같은 사람이 이런 말을 해도 괜찮을까? 의심이 든다."
              isSelected={selectedMindChoices[6]?.includes(7)}
              onClick={() => handleBubbleToggle(6, 7)}
            />
          </div>
        );
      case 7:
        return (
          <div className="w-full flex flex-col items-center justify-between h-full min-h-[calc(100vh-80px)]">
            <div className="flex flex-col items-center justify-center mt-12">
              <Image src="/finish.svg" alt="finish" width={46} height={46} />
              <div className="text-center text-[21px] text-black font-semibold leading-[28px] whitespace-pre-line mb-6 mt-9">
                {"마음 상태 테스트가\n완료되었습니다"}
              </div>
              <div className="text-center text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
                {
                  "모든 테스트를 완료하시면\n결과 보고서가 열립니다."
                }
              </div>
            </div>
            <div className="w-full px-5">
              <Button activated={true} onClick={() => router.push("/status")}>
                홈으로 가기
              </Button>
            </div>
          </div>
        );
    }
  };

  // 버튼 활성화 조건
  const isButtonActivated = () => {
    // step 1-6: 적어도 하나 이상 선택되어 있으면 버튼 활성화
    if (step >= 1 && step <= 6) {
      return (selectedMindChoices[step]?.length ?? 0) > 0;
    }
    return false;
  };

  // 다음 스텝으로 이동 및 점수 계산
  const handleNextStep = () => {
    if (step <= 6) {
      if (selectedMindChoices[step]?.length > 0) {
        if (step === 6) {
          // 마지막 스텝에서 최종 결과 계산 및 저장
          const mindResult = determineMindType();

          // 최종 결과 객체 구성
          const finalResults = {
            mindScores: mindResult.scores,
            topTypes: mindResult.topTypes,
            positiveScore: mindResult.positiveScore,
            finalType: mindResult.finalType, // 최종 마음 유형 추가
          };

          console.log("Final Results:", finalResults);

          // 결과를 localStorage에 저장
          try {
            localStorage.setItem(
              "mind_test_results",
              JSON.stringify(finalResults)
            );
            console.log("Test results saved to localStorage");
          } catch (error) {
            console.error("Error saving results to localStorage:", error);
          }
        }
        setStep(step + 1);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      <ProgressBar currentStep={step} totalSteps={6} />
      <div className="w-full px-5 flex-1 flex flex-col">
        {step < 7 && (
          <Guide
            topic="마음 상태 테스트"
            description={getDescription()}
            isMultiSelection={true}
          />
        )}
        {renderStep()}
        {step < 7 && (
          <div className="mt-9 mb-4">
            <Button activated={isButtonActivated()} onClick={handleNextStep}>
              다 골랐어요!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

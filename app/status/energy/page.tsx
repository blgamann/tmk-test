"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Guide from "@/app/components/Guide";
import RatingScale from "@/app/components/RatingScale";
import ProgressBar from "@/app/components/ProgressBar";
import Button from "@/app/components/Button";
import ChatBubble from "@/app/components/ChatBubble";

type EnergyType = "사람과의 연결" | "혼자만의 시간" | "감각 몰입";
type TimeEnergyType =
  | "아침 에너지 타입"
  | "낮 에너지 타입"
  | "저녁 에너지 타입"
  | "밤 에너지 타입";
type SleepRhythmType =
  | "회복형 수면 리듬"
  | "불균형 수면 리듬"
  | "에너지 고갈형 수면 습관";

// 에너지 충전 유형 매핑
const ENERGY_TYPE_MAPPING: { [key: number]: EnergyType } = {
  1: "사람과의 연결", // 깊은 대화
  6: "혼자만의 시간", // 혼자 산책
  11: "감각 몰입", // 음악, 향, 색감
  4: "사람과의 연결", // 팀 활동
  13: "감각 몰입", // 새로운 공간
  3: "사람과의 연결", // 새로운 사람
  7: "혼자만의 시간", // 나만의 루틴
  15: "감각 몰입", // 자연
  9: "혼자만의 시간", // 아무도 신경쓰지 않는 시간
  5: "사람과의 연결", // 웃고 떠들기
  10: "혼자만의 시간", // 함께 있을 때 에너지 빠짐
  12: "감각 몰입", // 취미 활동
  2: "사람과의 연결", // 친구들과 어울리기
  14: "감각 몰입", // 일상 꾸미기
  8: "혼자만의 시간", // 감정정리
};

// 시간대별 에너지 타입 매핑
const TIME_ENERGY_TYPE_MAPPING: {
  [key: number]: { [key: number]: TimeEnergyType };
} = {
  6: {
    1: "아침 에너지 타입", // 아침에 눈을 뜨자마자 머리가 맑고 집중이 잘 된다
    2: "낮 에너지 타입", // 오전엔 조금 느리지만, 점심 이후 집중력이 올라온다
    3: "저녁 에너지 타입", // 하루가 지나야 머리가 맑아지고 컨디션이 좋아진다
    4: "밤 에너지 타입", // 밤 10시 이후에 집중력과 창의력이 확 올라간다
  },
  7: {
    5: "아침 에너지 타입", // 오전 시간이 가장 생산적이고 일처리 속도가 빠르다
    6: "낮 에너지 타입", // 오후 2~4시 사이가 가장 활기차고 생산적인 시간대다
    7: "저녁 에너지 타입", // 오후 늦게부터 집중이 잘 되고 몰입이 시작된다
    8: "밤 에너지 타입", // 늦은 시간에 오히려 아이디어가 잘 떠오른다
  },
  8: {
    9: "아침 에너지 타입", // 오후가 되면 기운이 쉽게 빠지고 집중력이 떨어진다
    10: "낮 에너지 타입", // 저녁이 되면 에너지가 점점 빠지는 느낌이 든다
    11: "저녁 에너지 타입", // 저녁 일정이 오히려 가장 활기차게 느껴진다
    12: "밤 에너지 타입", // 밤이 되면 오히려 기분이 좋아지고 하고 싶은 일이 많아진다
  },
};

export default function StatusEnergy() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [statusRatings, setStatusRating] = useState<{
    [key: number]: number[];
  }>({
    1: Array(5).fill(-1),
    2: Array(5).fill(-1),
  });

  // 에너지 충전 방식 선택 (step 3-5)
  const [selectedEnergyMethods, setSelectedEnergyMethods] = useState<{
    [key: number]: number[];
  }>({
    3: [],
    4: [],
    5: [],
  });

  // 컨디션 시간대 선택 (step 6-8)
  const [selectedTimeConditions, setSelectedTimeConditions] = useState<{
    [key: number]: number[];
  }>({
    6: [],
    7: [],
    8: [],
  });

  // 잠자는 방식 (step 9-10)
  const [sleepRatings, setSleepRatings] = useState<{ [key: number]: number[] }>(
    {
      9: Array(5).fill(-1),
      10: Array(5).fill(-1),
    }
  );

  // Add effect to scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleRating = (
    stepNum: number,
    questionIndex: number,
    rating: number
  ) => {
    if (stepNum <= 2) {
      setStatusRating((prev) => ({
        ...prev,
        [stepNum]: prev[stepNum].map((r, idx) =>
          idx === questionIndex ? rating : r
        ),
      }));
    } else if (stepNum >= 9) {
      setSleepRatings((prev) => ({
        ...prev,
        [stepNum]: prev[stepNum].map((r, idx) =>
          idx === questionIndex ? rating : r
        ),
      }));
    }
  };

  const handleBubbleToggle = (stepNum: number, id: number) => {
    if (stepNum >= 6 && stepNum <= 8) {
      // 컨디션 시간대 선택 처리
      setSelectedTimeConditions((prev) => {
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
    } else {
      // 에너지 충전 방식 선택 처리
      setSelectedEnergyMethods((prev) => {
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
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4 w-full">
            <RatingScale
              statement="사람 많은 장소에 오래 있으면 지친다."
              onRating={(rating) => handleRating(1, 0, rating)}
              selectedValue={statusRatings[1][0]}
            />
            <RatingScale
              statement="감정적인 갈등이나 눈치를 봐야하는 상황이 많다."
              onRating={(rating) => handleRating(1, 1, rating)}
              selectedValue={statusRatings[1][1]}
            />
            <RatingScale
              statement="해야 할 일은 많은데, 어디서부터 손대야 할지 모르겠다."
              onRating={(rating) => handleRating(1, 2, rating)}
              selectedValue={statusRatings[1][2]}
            />
            <RatingScale
              statement="휴식시간에도 머릿속은 멈추지 않는다."
              onRating={(rating) => handleRating(1, 3, rating)}
              selectedValue={statusRatings[1][3]}
            />
            <RatingScale
              statement="원하는 건 많은데, 몸이 잘 따라주지 않는다."
              onRating={(rating) => handleRating(1, 4, rating)}
              selectedValue={statusRatings[1][4]}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4 w-full">
            <RatingScale
              statement="내가 하고 싶은 것보다 남의 기대에 더 맞추고 있다."
              onRating={(rating) => handleRating(2, 0, rating)}
              selectedValue={statusRatings[2][0]}
            />
            <RatingScale
              statement="피곤한데도 괜히 SNS나 유튜브를 오래 하는 편이다."
              onRating={(rating) => handleRating(2, 1, rating)}
              selectedValue={statusRatings[2][1]}
            />
            <RatingScale
              statement="자꾸 비교하게 되고, 나 자신이 초라해진다."
              onRating={(rating) => handleRating(2, 2, rating)}
              selectedValue={statusRatings[2][2]}
            />
            <RatingScale
              statement="나만을 위한 시간이 요즘 거의 없다."
              onRating={(rating) => handleRating(2, 3, rating)}
              selectedValue={statusRatings[2][3]}
            />
            <RatingScale
              statement="잠을 자도 개운하지 않고 무기력하다."
              onRating={(rating) => handleRating(2, 4, rating)}
              selectedValue={statusRatings[2][4]}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="누군가와 깊은 대화를 나누면 기분이 좋아진다."
              isSelected={selectedEnergyMethods[3].includes(1)}
              onClick={() => handleBubbleToggle(3, 1)}
            />
            <ChatBubble
              message="혼자 산책하거나 조용한 공간에 있고 싶다."
              isSelected={selectedEnergyMethods[3].includes(6)}
              onClick={() => handleBubbleToggle(3, 6)}
            />
            <ChatBubble
              message="좋아하는 음악, 향, 색감을 보면 기분이 한결 좋아진다."
              isSelected={selectedEnergyMethods[3].includes(11)}
              onClick={() => handleBubbleToggle(3, 11)}
            />
            <ChatBubble
              message="팀 활동이나 함께하는 프로젝트가 즐겁다."
              isSelected={selectedEnergyMethods[3].includes(4)}
              onClick={() => handleBubbleToggle(3, 4)}
            />
            <ChatBubble
              message="새로운 공간, 예쁜 카페, 전시 등에서 기분 전환이 된다."
              isSelected={selectedEnergyMethods[3].includes(13)}
              onClick={() => handleBubbleToggle(3, 13)}
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="새로운 사람을 만나는 게 자극이 된다."
              isSelected={selectedEnergyMethods[4].includes(3)}
              onClick={() => handleBubbleToggle(4, 3)}
            />
            <ChatBubble
              message="나만의 루틴(차 마시기, 독서, 음악 듣기 등)이 힐링된다."
              isSelected={selectedEnergyMethods[4].includes(7)}
              onClick={() => handleBubbleToggle(4, 7)}
            />
            <ChatBubble
              message="자연 속에 있을 때 마음이 맑아진다."
              isSelected={selectedEnergyMethods[4].includes(15)}
              onClick={() => handleBubbleToggle(4, 15)}
            />
            <ChatBubble
              message="아무도 신경 쓰지 않아도 되는 시간이 필요하다."
              isSelected={selectedEnergyMethods[4].includes(9)}
              onClick={() => handleBubbleToggle(4, 9)}
            />
            <ChatBubble
              message="웃고 떠들며 노는 시간이 리프레시가 된다."
              isSelected={selectedEnergyMethods[4].includes(5)}
              onClick={() => handleBubbleToggle(4, 5)}
            />
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="혼자있는 시간을 반드시 가져야, 에너지가 채워지는 편이다."
              isSelected={selectedEnergyMethods[5].includes(10)}
              onClick={() => handleBubbleToggle(5, 10)}
            />
            <ChatBubble
              message="좋아하는 취미 활동에 몰입하면 에너지가 돈다."
              isSelected={selectedEnergyMethods[5].includes(12)}
              onClick={() => handleBubbleToggle(5, 12)}
            />
            <ChatBubble
              message="친구들과 어울리는 시간이 활력을 준다."
              isSelected={selectedEnergyMethods[5].includes(2)}
              onClick={() => handleBubbleToggle(5, 2)}
            />
            <ChatBubble
              message="일상을 새롭게 꾸미거나 정리할 때 활기가 생긴다."
              isSelected={selectedEnergyMethods[5].includes(14)}
              onClick={() => handleBubbleToggle(5, 14)}
            />
            <ChatBubble
              message="고요히 감정정리 하는 시간을 가지는게 도움이 된다."
              isSelected={selectedEnergyMethods[5].includes(8)}
              onClick={() => handleBubbleToggle(5, 8)}
            />
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="이른 아침 시간에 머리가 맑고 집중이 잘 된다."
              isSelected={selectedTimeConditions[6].includes(1)}
              onClick={() => handleBubbleToggle(6, 1)}
            />
            <ChatBubble
              message="오전엔 조금 느리지만, 점심 이후 집중력이 올라온다."
              isSelected={selectedTimeConditions[6].includes(2)}
              onClick={() => handleBubbleToggle(6, 2)}
            />
            <ChatBubble
              message="해가 지기 시작하는 저녁 시간때부터 컨디션이 올라가기 시작한다."
              isSelected={selectedTimeConditions[6].includes(3)}
              onClick={() => handleBubbleToggle(6, 3)}
            />
            <ChatBubble
              message="늦은 밤이나 새벽의 고요한 시간대에 해야겠다고 생각한 일이 더 잘 된다."
              isSelected={selectedTimeConditions[6].includes(4)}
              onClick={() => handleBubbleToggle(6, 4)}
            />
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="오전 시간이 가장 생산적이고 일처리 속도가 빠르다."
              isSelected={selectedTimeConditions[7].includes(5)}
              onClick={() => handleBubbleToggle(7, 5)}
            />
            <ChatBubble
              message="오후 2~4시 사이가 가장 활기차고 생산적인 시간대다."
              isSelected={selectedTimeConditions[7].includes(6)}
              onClick={() => handleBubbleToggle(7, 6)}
            />
            <ChatBubble
              message="오후 늦게부터 집중이 잘 되고 몰입이 시작된다."
              isSelected={selectedTimeConditions[7].includes(7)}
              onClick={() => handleBubbleToggle(7, 7)}
            />
            <ChatBubble
              message="늦은 시간에 오히려 아이디어가 잘 떠오른다."
              isSelected={selectedTimeConditions[7].includes(8)}
              onClick={() => handleBubbleToggle(7, 8)}
            />
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col gap-4 w-full">
            <ChatBubble
              message="오후가 되면 기운이 쉽게 빠지고 집중력이 떨어진다."
              isSelected={selectedTimeConditions[8].includes(9)}
              onClick={() => handleBubbleToggle(8, 9)}
            />
            <ChatBubble
              message="저녁이 되면 에너지가 점점 빠지는 느낌이 든다."
              isSelected={selectedTimeConditions[8].includes(10)}
              onClick={() => handleBubbleToggle(8, 10)}
            />
            <ChatBubble
              message="저녁 일정이 오히려 가장 활기차게 느껴진다."
              isSelected={selectedTimeConditions[8].includes(11)}
              onClick={() => handleBubbleToggle(8, 11)}
            />
            <ChatBubble
              message="밤이 되면 오히려 기분이 좋아지고 하고 싶은 일이 많아진다."
              isSelected={selectedTimeConditions[8].includes(12)}
              onClick={() => handleBubbleToggle(8, 12)}
            />
          </div>
        );
      case 9:
        return (
          <div className="flex flex-col gap-4 w-full">
            <RatingScale
              statement="잠드는 시간이 들쑥날쑥하다."
              onRating={(rating) => handleRating(9, 0, rating)}
              selectedValue={sleepRatings[9][0]}
            />
            <RatingScale
              statement="자고 일어나도 피로가 덜 풀리는 느낌이다."
              onRating={(rating) => handleRating(9, 1, rating)}
              selectedValue={sleepRatings[9][1]}
            />
            <RatingScale
              statement="하루에 6시간 이하로 자는 날이 많다."
              onRating={(rating) => handleRating(9, 2, rating)}
              selectedValue={sleepRatings[9][2]}
            />
            <RatingScale
              statement="침대에 누워서도 휴대폰을 오래 본다."
              onRating={(rating) => handleRating(9, 3, rating)}
              selectedValue={sleepRatings[9][3]}
            />
            <RatingScale
              statement="자기 전까지 생각이 많아 잠드는 게 어렵다."
              onRating={(rating) => handleRating(9, 4, rating)}
              selectedValue={sleepRatings[9][4]}
            />
          </div>
        );
      case 10:
        return (
          <div className="flex flex-col gap-4 w-full">
            <RatingScale
              statement="주말에 몰아서 자는 패턴이 있다."
              onRating={(rating) => handleRating(10, 0, rating)}
              selectedValue={sleepRatings[10][0]}
            />
            <RatingScale
              statement="자는 중에 자주 깨거나, 뒤척임이 많다."
              onRating={(rating) => handleRating(10, 1, rating)}
              selectedValue={sleepRatings[10][1]}
            />
            <RatingScale
              statement="푹 잔 날은 하루가 확실히 다르다."
              onRating={(rating) => handleRating(10, 2, rating)}
              selectedValue={sleepRatings[10][2]}
            />
            <RatingScale
              statement="아침 기상이 힘들고 늘 알람을 미루는 편이다."
              onRating={(rating) => handleRating(10, 3, rating)}
              selectedValue={sleepRatings[10][3]}
            />
            <RatingScale
              statement="수면의 절대적 시간보다 수면의 질이 좋지 않다고 느낀다."
              onRating={(rating) => handleRating(10, 4, rating)}
              selectedValue={sleepRatings[10][4]}
            />
          </div>
        );
      case 11:
        return (
          <div className="w-full flex flex-col items-center justify-between h-full min-h-[calc(100vh-80px)]">
            <div className="flex flex-col items-center justify-center mt-12">
              <Image src="/finish.svg" alt="finish" width={46} height={46} />
              <div className="text-center text-[21px] text-black font-semibold leading-[28px] whitespace-pre-line mb-6 mt-9">
                {"에너지 상태 테스트가\n완료되었습니다"}
              </div>
              <div className="text-center text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
                {
                  "집중력, 마음 상태 테스트까지 완료하시면\n결과 보고서가 열립니다."
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

  const isButtonActivated = () => {
    if (step === 1 || step === 2) {
      return statusRatings[step]?.every((rating) => rating !== -1) ?? false;
    }
    // step 3-5: 에너지 충전 방식 중 하나라도 선택되어 있으면 버튼 활성화
    if (step >= 3 && step <= 5) {
      return (selectedEnergyMethods[step]?.length ?? 0) > 0;
    }
    // step 6-8: 컨디션 시간대 중 하나라도 선택되어 있으면 버튼 활성화
    if (step >= 6 && step <= 8) {
      return (selectedTimeConditions[step]?.length ?? 0) > 0;
    }
    // step 9-10: 모든 항목이 선택되어 있어야 버튼 활성화
    if (step >= 9 && step <= 10) {
      return sleepRatings[step]?.every((rating) => rating !== -1) ?? false;
    }
    return false;
  };

  // 에너지 상태 판단
  const getEnergyStatus = (score: number) => {
    if (score <= 20) {
      return {
        level: "good",
        percentage: "80% 이상",
      };
    } else if (score <= 35) {
      return {
        level: "not bad",
        percentage: "50~70%",
      };
    } else {
      return {
        level: "bad",
        percentage: "0~40%",
      };
    }
  };

  // 에너지 점수 계산
  const calculateEnergyScore = () => {
    let totalScore = 0;

    // step 1과 2의 모든 응답을 1-5점으로 변환하여 합산
    [1, 2].forEach((stepNum) => {
      statusRatings[stepNum].forEach((rating) => {
        if (rating !== -1) {
          // 0->1, 1->2, 2->3, 3->4, 4->5로 변환
          totalScore += rating + 1;
        }
      });
    });

    return {
      score: totalScore,
      status: getEnergyStatus(totalScore),
    };
  };

  // 에너지 충전 유형 계산
  const calculateEnergyType = () => {
    const typeCounts: Record<EnergyType, number> = {
      "사람과의 연결": 0,
      "혼자만의 시간": 0,
      "감각 몰입": 0,
    };

    // step 3-5의 모든 선택을 합산
    [3, 4, 5].forEach((step) => {
      selectedEnergyMethods[step].forEach((id) => {
        const type = ENERGY_TYPE_MAPPING[id];
        if (type) {
          typeCounts[type]++;
        }
      });
    });

    // 최고 점수 찾기
    const maxScore = Math.max(...Object.values(typeCounts));

    // 최고 점수를 가진 모든 유형 찾기
    const topTypes = Object.entries(typeCounts)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type as EnergyType);

    return {
      types: topTypes,
      scores: typeCounts,
    };
  };

  // 시간대별 에너지 타입 계산
  const calculateTimeEnergyType = () => {
    const typeCounts: Record<TimeEnergyType, number> = {
      "아침 에너지 타입": 0,
      "낮 에너지 타입": 0,
      "저녁 에너지 타입": 0,
      "밤 에너지 타입": 0,
    };

    // step 6-8의 모든 선택을 합산
    [6, 7, 8].forEach((step) => {
      selectedTimeConditions[step].forEach((id) => {
        const type = TIME_ENERGY_TYPE_MAPPING[step]?.[id];
        if (type) {
          typeCounts[type]++;
        }
      });
    });

    // 최고 점수 찾기
    const maxScore = Math.max(...Object.values(typeCounts));

    // 최고 점수를 가진 모든 유형 찾기
    const topTypes = Object.entries(typeCounts)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type as TimeEnergyType);

    return {
      types: topTypes,
      scores: typeCounts,
    };
  };

  // 수면 리듬 타입 계산
  const calculateSleepRhythmType = () => {
    let totalScore = 0;

    // step 9과 10의 모든 응답을 1-5점으로 변환하여 합산
    [9, 10].forEach((stepNum) => {
      sleepRatings[stepNum].forEach((rating) => {
        if (rating !== -1) {
          // 0->1, 1->2, 2->3, 3->4, 4->5로 변환
          totalScore += rating + 1;
        }
      });
    });

    let type: SleepRhythmType;

    if (totalScore <= 20) {
      type = "회복형 수면 리듬";
    } else if (totalScore <= 35) {
      type = "불균형 수면 리듬";
    } else {
      type = "에너지 고갈형 수면 습관";
    }

    return {
      type,
      score: totalScore,
    };
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (statusRatings[1].every((rating) => rating !== -1)) {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (statusRatings[2].every((rating) => rating !== -1)) {
        const result = calculateEnergyScore();
        console.log("Energy Score:", result.score);
        console.log("Energy Status:", result.status);
        setStep(step + 1);
      }
    } else if (step >= 3 && step <= 4) {
      if (selectedEnergyMethods[step].length > 0) {
        setStep(step + 1);
      }
    } else if (step === 5) {
      if (selectedEnergyMethods[step].length > 0) {
        const energyType = calculateEnergyType();
        console.log("Energy Type Result:", energyType);
        setStep(step + 1);
      }
    } else if (step >= 6 && step <= 7) {
      if (selectedTimeConditions[step].length > 0) {
        setStep(step + 1);
      }
    } else if (step === 8) {
      if (selectedTimeConditions[step].length > 0) {
        const timeEnergyType = calculateTimeEnergyType();
        console.log("Time Energy Type Result:", timeEnergyType);
        setStep(step + 1);
      }
    } else if (step === 9) {
      if (sleepRatings[step].every((rating) => rating !== -1)) {
        setStep(step + 1);
      }
    } else if (step === 10) {
      if (sleepRatings[step].every((rating) => rating !== -1)) {
        setStep(step + 1);
        // 모든 결과 계산하기
        const batteryResult = calculateEnergyScore();
        const energyTypeResult = calculateEnergyType();
        const timeEnergyTypeResult = calculateTimeEnergyType();
        const sleepRhythmTypeResult = calculateSleepRhythmType();

        // 모든 결과 출력
        console.log("Battery Status:", batteryResult);
        console.log("Energy Type Result:", energyTypeResult);
        console.log("Time Energy Type Result:", timeEnergyTypeResult);
        console.log("Sleep Rhythm Type Result:", sleepRhythmTypeResult);

        // 최종 결과 객체 구성
        const finalResults = {
          battery: batteryResult,
          energyType: energyTypeResult,
          timeEnergyType: timeEnergyTypeResult,
          sleepRhythm: sleepRhythmTypeResult,
        };

        console.log("Final Results:", finalResults);

        // 결과를 localStorage에 저장
        try {
          localStorage.setItem(
            "energy_test_results",
            JSON.stringify(finalResults)
          );
          console.log("Test results saved to localStorage");
        } catch (error) {
          console.error("Error saving results to localStorage:", error);
        }

        // 여기에 결과 페이지로 이동하거나 결과를 저장하는 로직을 추가할 수 있음
      }
    }
  };

  const getDescription = () => {
    if (step === 1 || step === 2) {
      return "요즘 나의 상태를\n솔직하게 체크해볼까요?";
    }
    if (step >= 3 && step <= 5) {
      return "에너지가 떨어졌을 때,\n어떤 걸 하면 채워지나요?";
    }
    if (step >= 6 && step <= 8) {
      return "나에게 해당되는 컨디션을 골라볼까요?";
    }
    if (step >= 9 && step <= 10) {
      return "잠과 관련된 나는 어떤가요?";
    }
    return "";
  };

  const isMultiSelection = () => {
    if (step >= 3 && step <= 5) {
      return true;
    }
    if (step >= 6 && step <= 8) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      <ProgressBar currentStep={step} totalSteps={10} />
      <div className="w-full px-5 flex-1 flex flex-col">
        {step < 11 && (
          <Guide
            topic="에너지 상태 테스트"
            description={getDescription()}
            isMultiSelection={isMultiSelection()}
          />
        )}
        {renderStep()}
        {step < 11 && (
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

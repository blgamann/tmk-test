interface RealTimeEnergyScoreDisplayProps {
  currentStep: number;
  statusRatings: { [key: number]: number[] };
  selectedEnergyMethods: { [key: number]: number[] };
  selectedTimeConditions: { [key: number]: number[] };
  sleepRatings: { [key: number]: number[] };
}

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

export default function RealTimeEnergyScoreDisplay({
  currentStep,
  statusRatings,
  selectedEnergyMethods,
  selectedTimeConditions,
  sleepRatings,
}: RealTimeEnergyScoreDisplayProps) {
  // 에너지 상태 점수 계산
  const calculateEnergyScore = () => {
    let totalScore = 0;

    // step 1과 2의 모든 응답을 1-5점으로 변환하여 합산
    [1, 2].forEach((stepNum) => {
      if (statusRatings[stepNum]) {
        statusRatings[stepNum].forEach((rating) => {
          if (rating !== -1) {
            // 0->1, 1->2, 2->3, 3->4, 4->5로 변환
            totalScore += rating + 1;
          }
        });
      }
    });

    return totalScore;
  };

  // 에너지 상태 판단
  const getEnergyStatus = (score: number) => {
    if (score <= 20) {
      return {
        level: "good",
        percentage: "80% 이상",
        emoji: "🔋",
        description: "에너지 배터리 good 80% 이상",
      };
    } else if (score <= 35) {
      return {
        level: "not bad",
        percentage: "50~70%",
        emoji: "⚡",
        description: "에너지 배터리 not bad 50~70%",
      };
    } else {
      return {
        level: "bad",
        percentage: "0~40%",
        emoji: "🪫",
        description: "에너지 배터리 bad 0~40%",
      };
    }
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
      if (selectedEnergyMethods[step]) {
        selectedEnergyMethods[step].forEach((id) => {
          const type = ENERGY_TYPE_MAPPING[id];
          if (type) {
            typeCounts[type]++;
          }
        });
      }
    });

    return typeCounts;
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
      if (selectedTimeConditions[step]) {
        selectedTimeConditions[step].forEach((id) => {
          const type = TIME_ENERGY_TYPE_MAPPING[step]?.[id];
          if (type) {
            typeCounts[type]++;
          }
        });
      }
    });

    return typeCounts;
  };

  // 수면 리듬 점수 계산
  const calculateSleepScore = () => {
    let totalScore = 0;

    // step 9과 10의 모든 응답을 1-5점으로 변환하여 합산
    [9, 10].forEach((stepNum) => {
      if (sleepRatings[stepNum]) {
        sleepRatings[stepNum].forEach((rating) => {
          if (rating !== -1) {
            // 0->1, 1->2, 2->3, 3->4, 4->5로 변환
            totalScore += rating + 1;
          }
        });
      }
    });

    return totalScore;
  };

  // 수면 리듬 타입 판단
  const getSleepRhythmType = (
    score: number
  ): { type: SleepRhythmType; emoji: string; description: string } => {
    if (score >= 10 && score <= 20) {
      return {
        type: "회복형 수면 리듬",
        emoji: "☀️",
        description: "수면의 질과 루틴이 안정적으로 유지되고 있음",
      };
    } else if (score >= 21 && score <= 35) {
      return {
        type: "불균형 수면 리듬",
        emoji: "🌥",
        description: "불규칙하거나, 질적인 회복에 한계가 있는 상태",
      };
    } else if (score >= 36 && score <= 50) {
      return {
        type: "에너지 고갈형 수면 습관",
        emoji: "🌙",
        description:
          "수면 리듬이 무너져 에너지 회복이 어려운 상태. 루틴 개편 필요",
      };
    } else {
      return {
        type: "회복형 수면 리듬",
        emoji: "☀️",
        description: "측정 중...",
      };
    }
  };

  // 주도적 에너지 타입 찾기
  const getDominantEnergyType = () => {
    const typeCounts = calculateEnergyType();
    const maxScore = Math.max(...Object.values(typeCounts));

    if (maxScore === 0) return "미정";

    // 최고 점수를 가진 모든 유형 찾기
    const topTypes = Object.entries(typeCounts)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type);

    // 최고 점수가 1개 타입이면 대표 타입, 2개 이상이면 복합유형
    if (topTypes.length === 1) {
      return topTypes[0];
    } else {
      return "복합유형";
    }
  };

  // 주도적 시간 에너지 타입 찾기
  const getDominantTimeEnergyType = () => {
    const typeCounts = calculateTimeEnergyType();
    const maxScore = Math.max(...Object.values(typeCounts));

    if (maxScore === 0) return "미정";

    // 최고 점수를 가진 모든 유형 찾기
    const topTypes = Object.entries(typeCounts)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type);

    // 최고 점수가 1개 타입이면 대표 타입, 2개 이상이면 자유자재 에너지 타입
    if (topTypes.length === 1) {
      return topTypes[0];
    } else {
      return "자유자재 에너지 타입";
    }
  };

  const energyScore = calculateEnergyScore();
  const energyStatus = getEnergyStatus(energyScore);
  const energyTypeCounts = calculateEnergyType();
  const timeEnergyTypeCounts = calculateTimeEnergyType();
  const sleepScore = calculateSleepScore();
  const sleepRhythm = getSleepRhythmType(sleepScore);
  const dominantEnergyType = getDominantEnergyType();
  const dominantTimeEnergyType = getDominantTimeEnergyType();

  return (
    <div className="w-full bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 mb-4 border border-orange-200">
      <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        ⚡ 실시간 에너지 점수 현황
      </div>

      <div className="grid grid-cols-1 gap-3 text-xs">
        {/* 에너지 상태 점수 */}
        {currentStep >= 1 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">
              {energyStatus.emoji} 에너지 상태
            </div>
            <div className="text-lg font-bold text-orange-600">
              {energyScore}점
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              {energyScore > 0 ? energyStatus.description : "측정 중..."}
            </div>
            <div className="text-gray-500 text-xs">
              {currentStep <= 2 ? `진행중 (${currentStep}/2단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 에너지 충전 유형 */}
        {currentStep >= 3 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-2">
              ⚡ 에너지 충전 유형
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>👥 사람과의 연결:</span>
                <span className="font-semibold text-blue-600">
                  {energyTypeCounts["사람과의 연결"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🧘 혼자만의 시간:</span>
                <span className="font-semibold text-green-600">
                  {energyTypeCounts["혼자만의 시간"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🎨 감각 몰입:</span>
                <span className="font-semibold text-purple-600">
                  {energyTypeCounts["감각 몰입"]}
                </span>
              </div>
            </div>
            <div className="text-sm font-medium text-indigo-600 mt-2">
              주도 유형: {dominantEnergyType}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {currentStep <= 5 ? `진행중 (${currentStep - 2}/3단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 시간대별 에너지 타입 */}
        {currentStep >= 6 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-2">
              🕐 시간대별 에너지
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>🌅 아침:</span>
                <span className="font-semibold text-yellow-600">
                  {timeEnergyTypeCounts["아침 에너지 타입"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>☀️ 낮:</span>
                <span className="font-semibold text-orange-600">
                  {timeEnergyTypeCounts["낮 에너지 타입"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🌆 저녁:</span>
                <span className="font-semibold text-red-600">
                  {timeEnergyTypeCounts["저녁 에너지 타입"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🌙 밤:</span>
                <span className="font-semibold text-indigo-600">
                  {timeEnergyTypeCounts["밤 에너지 타입"]}
                </span>
              </div>
            </div>
            <div className="text-sm font-medium text-indigo-600 mt-2">
              주도 시간: {dominantTimeEnergyType}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {currentStep <= 8 ? `진행중 (${currentStep - 5}/3단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 수면 리듬 */}
        {currentStep >= 9 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">
              {sleepRhythm.emoji} 수면 리듬
            </div>
            <div className="text-lg font-bold text-blue-600">
              {sleepScore}점
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              {sleepScore > 0 ? sleepRhythm.description : "측정 중..."}
            </div>
            <div className="text-gray-500 text-xs">
              {currentStep <= 10 ? `진행중 (${currentStep - 8}/2단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 총 응답 수 */}
        {currentStep >= 3 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">📊 응답 현황</div>
            <div className="text-lg font-bold text-gray-600">
              {Object.values(selectedEnergyMethods).reduce(
                (sum, selections) => sum + selections.length,
                0
              ) +
                Object.values(selectedTimeConditions).reduce(
                  (sum, selections) => sum + selections.length,
                  0
                )}
              개
            </div>
            <div className="text-gray-500 text-xs">총 선택한 항목</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RealTimeScoreDisplayProps {
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

// 에너지 충전 유형 매핑
const ENERGY_TYPE_MAPPING: { [key: number]: EnergyType } = {
  1: "사람과의 연결",
  6: "혼자만의 시간",
  11: "감각 몰입",
  4: "사람과의 연결",
  13: "감각 몰입",
  3: "사람과의 연결",
  7: "혼자만의 시간",
  15: "감각 몰입",
  9: "혼자만의 시간",
  5: "사람과의 연결",
  10: "혼자만의 시간",
  12: "감각 몰입",
  2: "사람과의 연결",
  14: "감각 몰입",
  8: "혼자만의 시간",
};

// 시간대별 에너지 타입 매핑
const TIME_ENERGY_TYPE_MAPPING: {
  [key: number]: { [key: number]: TimeEnergyType };
} = {
  6: {
    1: "아침 에너지 타입",
    2: "낮 에너지 타입",
    3: "저녁 에너지 타입",
    4: "밤 에너지 타입",
  },
  7: {
    5: "아침 에너지 타입",
    6: "낮 에너지 타입",
    7: "저녁 에너지 타입",
    8: "밤 에너지 타입",
  },
  8: {
    9: "아침 에너지 타입",
    10: "낮 에너지 타입",
    11: "저녁 에너지 타입",
    12: "밤 에너지 타입",
  },
};

export default function RealTimeScoreDisplay({
  currentStep,
  statusRatings,
  selectedEnergyMethods,
  selectedTimeConditions,
  sleepRatings,
}: RealTimeScoreDisplayProps) {
  // 에너지 배터리 점수 계산
  const calculateBatteryScore = () => {
    let totalScore = 0;
    [1, 2].forEach((stepNum) => {
      statusRatings[stepNum]?.forEach((rating) => {
        if (rating !== -1) {
          totalScore += rating + 1;
        }
      });
    });
    return totalScore;
  };

  // 에너지 충전 타입 점수 계산
  const calculateEnergyTypeScores = () => {
    const typeCounts: Record<EnergyType, number> = {
      "사람과의 연결": 0,
      "혼자만의 시간": 0,
      "감각 몰입": 0,
    };

    [3, 4, 5].forEach((step) => {
      selectedEnergyMethods[step]?.forEach((id) => {
        const type = ENERGY_TYPE_MAPPING[id];
        if (type) {
          typeCounts[type]++;
        }
      });
    });

    return typeCounts;
  };

  // 시간대별 에너지 타입 점수 계산
  const calculateTimeEnergyScores = () => {
    const typeCounts: Record<TimeEnergyType, number> = {
      "아침 에너지 타입": 0,
      "낮 에너지 타입": 0,
      "저녁 에너지 타입": 0,
      "밤 에너지 타입": 0,
    };

    [6, 7, 8].forEach((step) => {
      selectedTimeConditions[step]?.forEach((id) => {
        const type = TIME_ENERGY_TYPE_MAPPING[step]?.[id];
        if (type) {
          typeCounts[type]++;
        }
      });
    });

    return typeCounts;
  };

  // 수면 점수 계산
  const calculateSleepScore = () => {
    let totalScore = 0;
    [9, 10].forEach((stepNum) => {
      sleepRatings[stepNum]?.forEach((rating) => {
        if (rating !== -1) {
          totalScore += rating + 1;
        }
      });
    });
    return totalScore;
  };

  const batteryScore = calculateBatteryScore();
  const energyTypeScores = calculateEnergyTypeScores();
  const timeEnergyScores = calculateTimeEnergyScores();
  const sleepScore = calculateSleepScore();

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-200">
      <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        📊 실시간 점수 현황
      </div>

      <div className="grid grid-cols-1 gap-3 text-xs">
        {/* 에너지 배터리 점수 */}
        {currentStep >= 1 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">
              ⚡ 에너지 배터리
            </div>
            <div className="text-lg font-bold text-blue-600">
              {batteryScore}점
            </div>
            <div className="text-gray-500 text-xs">
              {currentStep <= 2 ? `진행중 (${currentStep}/2단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 에너지 충전 타입 */}
        {currentStep >= 3 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-2">
              🔋 에너지 충전 타입
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>💬 사람과의 연결:</span>
                <span className="font-semibold text-green-600">
                  {energyTypeScores["사람과의 연결"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🌿 혼자만의 시간:</span>
                <span className="font-semibold text-blue-600">
                  {energyTypeScores["혼자만의 시간"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🎨 감각 몰입:</span>
                <span className="font-semibold text-purple-600">
                  {energyTypeScores["감각 몰입"]}
                </span>
              </div>
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
              ⏰ 시간대별 에너지
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>🌅 아침:</span>
                <span className="font-semibold text-orange-600">
                  {timeEnergyScores["아침 에너지 타입"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🌤 낮:</span>
                <span className="font-semibold text-yellow-600">
                  {timeEnergyScores["낮 에너지 타입"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🌇 저녁:</span>
                <span className="font-semibold text-red-600">
                  {timeEnergyScores["저녁 에너지 타입"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🌙 밤:</span>
                <span className="font-semibold text-indigo-600">
                  {timeEnergyScores["밤 에너지 타입"]}
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {currentStep <= 8 ? `진행중 (${currentStep - 5}/3단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 수면 리듬 점수 */}
        {currentStep >= 9 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">😴 수면 리듬</div>
            <div className="text-lg font-bold text-purple-600">
              {sleepScore}점
            </div>
            <div className="text-gray-500 text-xs">
              {currentStep <= 10 ? `진행중 (${currentStep - 8}/2단계)` : "완료"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RealTimeFocusScoreDisplayProps {
  currentStep: number;
  focusRatings: { [key: number]: number[] };
  selectedFocusTypes: { [key: number]: number[] };
}

// 집중력 유형 매핑
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

export default function RealTimeFocusScoreDisplay({
  currentStep,
  focusRatings,
  selectedFocusTypes,
}: RealTimeFocusScoreDisplayProps) {
  // 집중력 지속성 점수 계산
  const calculatePersistenceScore = () => {
    if (!focusRatings[1]) return 0;
    return focusRatings[1].reduce((sum, rating) => {
      return rating !== -1 ? sum + (rating + 1) : sum; // 0->1, 1->2, 2->3, 3->4, 4->5로 변환
    }, 0);
  };

  // 집중력 지속성 타입 계산
  const getPersistenceType = (score: number) => {
    if (score >= 4 && score <= 9) {
      return "🔥 집중 지속력 안정형";
    } else if (score >= 10 && score <= 14) {
      return "⛈️ 집중 지속력 가변형";
    } else if (score >= 15 && score <= 20) {
      return "🌪️ 집중 흐름 불안정형";
    } else {
      return "측정 중...";
    }
  };

  // 집중력 유형별 점수 계산
  const calculateFocusTypeScores = () => {
    let sensory = 0;
    let environment = 0;
    let time = 0;

    Object.entries(selectedFocusTypes).forEach(([, selections]) => {
      selections.forEach((id) => {
        const type = FOCUS_TYPE_MAPPING[id];
        if (type === "sensory") sensory += 1;
        else if (type === "environment") environment += 1;
        else if (type === "time") time += 1.4; // 시간형에 가중치 1.4 적용
      });
    });

    return { sensory, environment, time };
  };

  // 집중력 특성 타입 결정
  const getFocusCharacteristicType = () => {
    const { sensory, environment, time } = calculateFocusTypeScores();
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

  const persistenceScore = calculatePersistenceScore();
  const persistenceType = getPersistenceType(persistenceScore);
  const focusTypeScores = calculateFocusTypeScores();
  const focusCharacteristicType = getFocusCharacteristicType();

  return (
    <div className="w-full bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4 border border-green-200">
      <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        🎯 실시간 집중력 점수 현황
      </div>

      <div className="grid grid-cols-1 gap-3 text-xs">
        {/* 집중력 지속성 점수 */}
        {currentStep >= 1 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">
              ⏱️ 집중력 지속성
            </div>
            <div className="text-lg font-bold text-blue-600">
              {persistenceScore}점
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              {persistenceScore > 0 ? persistenceType : "측정 중..."}
            </div>
            <div className="text-gray-500 text-xs">
              {currentStep === 1 ? "진행중 (1/1단계)" : "완료"}
            </div>
          </div>
        )}

        {/* 집중력 유형별 점수 */}
        {currentStep >= 2 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-2">🧠 집중력 유형</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>🎨 감각형:</span>
                <span className="font-semibold text-purple-600">
                  {focusTypeScores.sensory.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🏠 환경형:</span>
                <span className="font-semibold text-green-600">
                  {focusTypeScores.environment.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>⏰ 시간형:</span>
                <span className="font-semibold text-orange-600">
                  {focusTypeScores.time.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {currentStep <= 5 ? `진행중 (${currentStep - 1}/4단계)` : "완료"}
            </div>
          </div>
        )}

        {/* 집중력 특성 타입 */}
        {currentStep >= 2 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">🎯 집중력 특성</div>
            <div className="text-lg font-bold text-indigo-600">
              {focusCharacteristicType}
            </div>
            <div className="text-gray-500 text-xs">
              {focusCharacteristicType === "감각 민감형"
                ? "소음, 조명 등 감각 자극에 민감"
                : focusCharacteristicType === "환경 루틴형"
                ? "공간, 루틴 등 환경 요소가 중요"
                : focusCharacteristicType === "시간 집중형"
                ? "특정 시간대에 집중력이 높음"
                : focusCharacteristicType === "둔감형/미확정형"
                ? "더 많은 답변이 필요합니다"
                : "미정"}
            </div>
          </div>
        )}

        {/* 총 선택 항목 수 */}
        {currentStep >= 2 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">📊 선택 항목</div>
            <div className="text-lg font-bold text-gray-600">
              {Object.values(selectedFocusTypes).reduce(
                (sum, selections) => sum + selections.length,
                0
              )}
              개
            </div>
            <div className="text-gray-500 text-xs">총 선택한 집중력 특성</div>
          </div>
        )}
      </div>
    </div>
  );
}

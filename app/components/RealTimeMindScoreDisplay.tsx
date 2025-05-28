interface RealTimeMindScoreDisplayProps {
  currentStep: number;
  selectedMindChoices: { [key: number]: number[] };
}

// 마음 상태 타입 정의
type MindType =
  | "불안"
  | "비교"
  | "완벽주의"
  | "자기의심"
  | "눈치"
  | "회피"
  | "긍정";

export default function RealTimeMindScoreDisplay({
  currentStep,
  selectedMindChoices,
}: RealTimeMindScoreDisplayProps) {
  // 마음 상태 점수 계산
  const calculateMindScores = () => {
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
    if (selectedMindChoices[1]?.includes(5)) scores.긍정 += 1;
    if (selectedMindChoices[1]?.includes(6)) scores.회피 += 1;
    if (selectedMindChoices[1]?.includes(7)) scores.눈치 += 1;

    // 상황 2
    if (selectedMindChoices[2]?.includes(1)) scores.완벽주의 += 1;
    if (selectedMindChoices[2]?.includes(2)) scores.회피 += 1;
    if (selectedMindChoices[2]?.includes(3)) scores.자기의심 += 1;
    if (selectedMindChoices[2]?.includes(4)) scores.비교 += 1.5;
    if (selectedMindChoices[2]?.includes(5)) scores.불안 += 1;
    if (selectedMindChoices[2]?.includes(6)) scores.눈치 += 1;
    if (selectedMindChoices[2]?.includes(7)) scores.긍정 += 1;

    // 상황 3
    if (selectedMindChoices[3]?.includes(1)) scores.자기의심 += 1;
    if (selectedMindChoices[3]?.includes(2)) scores.긍정 += 1;
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
    if (selectedMindChoices[4]?.includes(5)) scores.긍정 += 1;
    if (selectedMindChoices[4]?.includes(6)) scores.눈치 += 1;
    if (selectedMindChoices[4]?.includes(7)) scores.회피 += 1;

    // 상황 5
    if (selectedMindChoices[5]?.includes(1)) scores.눈치 += 1.5;
    if (selectedMindChoices[5]?.includes(2)) scores.회피 += 1;
    if (selectedMindChoices[5]?.includes(3)) scores.자기의심 += 1;
    if (selectedMindChoices[5]?.includes(4)) scores.긍정 += 1;
    if (selectedMindChoices[5]?.includes(5)) scores.불안 += 1;
    if (selectedMindChoices[5]?.includes(6)) scores.비교 += 1;
    if (selectedMindChoices[5]?.includes(7)) scores.완벽주의 += 1;

    // 상황 6
    if (selectedMindChoices[6]?.includes(1)) scores.불안 += 1;
    if (selectedMindChoices[6]?.includes(2)) scores.눈치 += 1;
    if (selectedMindChoices[6]?.includes(3)) scores.긍정 += 1;
    if (selectedMindChoices[6]?.includes(4)) scores.비교 += 1;
    if (selectedMindChoices[6]?.includes(5)) scores.완벽주의 += 1;
    if (selectedMindChoices[6]?.includes(6)) scores.회피 += 1.5;
    if (selectedMindChoices[6]?.includes(7)) scores.자기의심 += 1;

    return scores;
  };

  // 주도적 마음 상태 타입 찾기
  const getDominantMindType = () => {
    const scores = calculateMindScores();

    // 점수 중 가장 높은 항목 찾기 (긍정 제외)
    const scoresWithoutPositive = { ...scores };
    const positiveKey = "긍정" as MindType;
    delete scoresWithoutPositive[positiveKey];

    const maxScore = Math.max(...Object.values(scoresWithoutPositive));

    // 최고 점수를 가진 유형들 찾기
    const topTypes = Object.entries(scoresWithoutPositive)
      .filter(([, score]) => score === maxScore)
      .map(([type]) => type as MindType);

    // 긍정 점수 (이제 양수)
    const positiveScore = scores.긍정;

    // 타입 결정 로직: 긍정 유형 판별
    let finalType: MindType | "긍정" = topTypes[0] || "불안"; // 기본값

    // 1. 모든 성향 점수가 1점 이하인 경우 → 무조건 긍정
    const allTypesLowOrEqual = Object.entries(scoresWithoutPositive).every(
      ([, score]) => score <= 1
    );

    // 2. 점수가 고르게 분산되어 있는지 체크 (최고점과 최저점의 차이가 1 이하)
    const minScore = Math.min(...Object.values(scoresWithoutPositive));
    const isEvenlyDistributed = maxScore - minScore <= 1;

    // 3. 긍정 유형 판별 조건
    const shouldBePositive =
      allTypesLowOrEqual || // 모든 성향 점수가 1점 이하면 무조건 긍정
      (positiveScore >= 2 && positiveScore > maxScore) || // 긍정 점수가 2점 이상이면서 다른 점수보다 높음
      (maxScore === 0 && positiveScore > 0); // 다른 모든 점수가 0이고 긍정만 있음

    if (shouldBePositive) {
      finalType = "긍정";
    }

    return {
      finalType,
      scores,
      positiveScore,
      maxScore,
      isEvenlyDistributed,
      allTypesLowOrEqual,
    };
  };

  // 마음 상태별 이모지와 설명 매핑
  const getMindTypeInfo = (type: MindType | "긍정") => {
    const typeMap = {
      불안: { emoji: "😰", description: "불안 성향" },
      비교: { emoji: "😔", description: "비교 성향" },
      완벽주의: { emoji: "🎯", description: "완벽주의 성향" },
      자기의심: { emoji: "🤔", description: "자기의심 성향" },
      눈치: { emoji: "👀", description: "눈치보기 성향" },
      회피: { emoji: "🚪", description: "회피 성향" },
      긍정: { emoji: "😊", description: "긍정 성향" },
    };
    return typeMap[type] || { emoji: "🤔", description: "분석 중..." };
  };

  const mindScores = calculateMindScores();
  const {
    finalType,
    positiveScore,
    maxScore,
    isEvenlyDistributed,
    allTypesLowOrEqual,
  } = getDominantMindType();
  const dominantTypeInfo = getMindTypeInfo(finalType);

  // 총 선택 항목 수 계산
  const totalSelections = Object.values(selectedMindChoices).reduce(
    (sum, selections) => sum + selections.length,
    0
  );

  return (
    <div className="w-full bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-200">
      <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        🧠 실시간 마음상태 분석
      </div>

      <div className="grid grid-cols-1 gap-3 text-xs">
        {/* 주도적 마음 상태 */}
        {currentStep >= 1 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">
              {dominantTypeInfo.emoji} 주도적 마음상태
            </div>
            <div className="text-lg font-bold text-purple-600">
              {dominantTypeInfo.description}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {totalSelections > 0
                ? `${currentStep}/6 상황 완료`
                : "분석 중..."}
            </div>
          </div>
        )}

        {/* 마음 상태별 점수 */}
        {currentStep >= 1 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-2">
              🎭 마음상태 점수
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>😰 불안:</span>
                <span className="font-semibold text-red-600">
                  {mindScores.불안.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>😔 비교:</span>
                <span className="font-semibold text-orange-600">
                  {mindScores.비교.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🎯 완벽주의:</span>
                <span className="font-semibold text-yellow-600">
                  {mindScores.완벽주의.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🤔 자기의심:</span>
                <span className="font-semibold text-gray-600">
                  {mindScores.자기의심.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>👀 눈치:</span>
                <span className="font-semibold text-blue-600">
                  {mindScores.눈치.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>🚪 회피:</span>
                <span className="font-semibold text-indigo-600">
                  {mindScores.회피.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>😊 긍정:</span>
                <span className="font-semibold text-green-600">
                  {mindScores.긍정.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {currentStep <= 6 ? `진행중 (${currentStep}/6상황)` : "완료"}
            </div>
          </div>
        )}

        {/* 상황별 진행 현황 */}
        {currentStep >= 1 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">📊 진행 현황</div>
            <div className="text-lg font-bold text-gray-600">
              {totalSelections}개 응답
            </div>
            <div className="text-gray-500 text-xs">
              {currentStep}/6 상황 (
              {
                Object.keys(selectedMindChoices).filter(
                  (key) => selectedMindChoices[parseInt(key)]?.length > 0
                ).length
              }
              상황 완료)
            </div>
          </div>
        )}

        {/* 분석 상태 */}
        {currentStep >= 3 && (
          <div className="bg-white rounded-md p-3 shadow-sm">
            <div className="font-medium text-gray-700 mb-1">🔍 분석 상태</div>
            <div className="text-sm text-gray-600">
              {finalType === "긍정" ? (
                <span className="text-green-600 font-medium">
                  긍정적 마음상태 패턴 감지
                  {allTypesLowOrEqual && " (모든 성향 1점 이하)"}
                  {positiveScore >= 2 &&
                    positiveScore > maxScore &&
                    " (높은 긍정 점수)"}
                </span>
              ) : maxScore > 0 ? (
                <span className="text-purple-600 font-medium">
                  {dominantTypeInfo.description} 패턴 감지
                </span>
              ) : (
                <span className="text-gray-500">더 많은 응답이 필요합니다</span>
              )}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              최고 점수: {maxScore.toFixed(1)}점 | 긍정 점수:{" "}
              {positiveScore.toFixed(1)}점
            </div>
            {finalType === "긍정" && (
              <div className="text-gray-500 text-xs mt-1">
                {allTypesLowOrEqual ? "✓ 모든 성향 1점 이하 → 긍정" : ""}
                {positiveScore >= 2 && positiveScore > maxScore
                  ? " ✓ 높은 긍정 점수"
                  : ""}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

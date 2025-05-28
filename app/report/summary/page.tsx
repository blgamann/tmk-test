"use client";

import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import SectionTitle from "@/app/components/SectionTitle";
import DownloadButtonSimple from "@/app/components/DownloadButtonSimple";
import BackButton from "@/app/components/BackButton";

// 에너지 상태 관련 타입
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

// 집중력 관련 타입
type PersistenceType =
  | "🔥강한 집중 지속력"
  | "⛈️잘 변하는 집중 지속력"
  | "🌪️약한 집중 지속력";

// 마음 상태 관련 타입
type MindType =
  | "불안"
  | "비교"
  | "완벽주의"
  | "자기의심"
  | "눈치"
  | "회피"
  | "긍정";

// 테스트 결과 인터페이스
interface EnergyTestResults {
  battery: {
    score: number;
    status: {
      level: string;
      percentage: string;
    };
  };
  energyType: {
    types: EnergyType[];
    scores: Record<EnergyType, number>;
  };
  timeEnergyType: {
    types: TimeEnergyType[];
    scores: Record<TimeEnergyType, number>;
  };
  sleepRhythm: {
    type: SleepRhythmType;
    score: number;
  };
}

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
  contextType: "문맥형" | "비확장형";
}

interface MindTestResults {
  mindScores: {
    [key in MindType]: number;
  };
  topTypes: MindType[];
  positiveScore: number;
  finalType: MindType | "긍정";
}

export default function SummaryReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [energyResults, setEnergyResults] = useState<EnergyTestResults | null>(
    null
  );
  const [focusResults, setFocusResults] = useState<FocusTestResults | null>(
    null
  );
  const [mindResults, setMindResults] = useState<MindTestResults | null>(null);

  // 테스트 결과 로드
  useEffect(() => {
    try {
      // 에너지 테스트 결과
      const storedEnergyResults = localStorage.getItem("energy_test_results");
      if (storedEnergyResults) {
        setEnergyResults(JSON.parse(storedEnergyResults));
      }

      // 집중력 테스트 결과
      const storedFocusResults = localStorage.getItem("focus_test_results");
      if (storedFocusResults) {
        setFocusResults(JSON.parse(storedFocusResults));
      }

      // 마음 상태 테스트 결과
      const storedMindResults = localStorage.getItem("mind_test_results");
      if (storedMindResults) {
        setMindResults(JSON.parse(storedMindResults));
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 에너지 상태 정보 목록 가져오기
  const getEnergyInfoList = () => {
    if (!energyResults) return [];

    const energyInfoList = [];

    // 1. 배터리 수준
    const { status } = energyResults.battery;
    if (status.level === "good") {
      energyInfoList.push({
        emoji: "⚡",
        title: "에너지 배터리 " + status.percentage,
        description: "에너지 배터리가 80%이상",
      });
    } else if (status.level === "not bad") {
      energyInfoList.push({
        emoji: "🌥",
        title: "에너지 배터리 " + status.percentage,
        description: "에너지가 적당해요",
      });
    } else if (status.level === "bad") {
      energyInfoList.push({
        emoji: "🌪",
        title: "에너지 배터리 " + status.percentage,
        description: "에너지가 부족해요",
      });
    }

    // 2. 충전 타입 (사람과의 연결, 혼자만의 시간, 감각 몰입)
    const energyTypes = energyResults.energyType.types;

    if (energyTypes.length > 0) {
      let emoji = "🔁";
      let title = "";

      if (energyTypes.length > 1) {
        emoji = "🔁";
        title = "유연하게 충전 타입";
      } else if (energyTypes.includes("사람과의 연결")) {
        emoji = "💬";
        title = "사람과의 연결";
      } else if (energyTypes.includes("혼자만의 시간")) {
        emoji = "🌿";
        title = "혼자만의 시간";
      } else if (energyTypes.includes("감각 몰입")) {
        emoji = "🎨";
        title = "감각 몰입";
      }

      energyInfoList.push({
        emoji,
        title,
        description:
          energyTypes.length > 1 ? "유연하게 충전 타입" : energyTypes[0],
      });
    }

    // 3. 시간대별 에너지 타입
    const timeEnergyTypes = energyResults.timeEnergyType.types;
    if (timeEnergyTypes.length > 0) {
      let emoji = "🔁";
      let title = "";

      if (timeEnergyTypes.length > 1) {
        emoji = "🔁";
        title = "자유자재 에너지 타입";
      } else if (timeEnergyTypes.includes("아침 에너지 타입")) {
        emoji = "🌅";
        title = "아침 에너지 타입";
      } else if (timeEnergyTypes.includes("낮 에너지 타입")) {
        emoji = "🌤";
        title = "낮 에너지 타입";
      } else if (timeEnergyTypes.includes("저녁 에너지 타입")) {
        emoji = "🌇";
        title = "저녁 에너지 타입";
      } else if (timeEnergyTypes.includes("밤 에너지 타입")) {
        emoji = "🌙";
        title = "밤 에너지 타입";
      }

      energyInfoList.push({
        emoji,
        title,
        description:
          timeEnergyTypes.length > 1
            ? "자유자재 에너지 타입"
            : timeEnergyTypes[0],
      });
    }

    // 4. 수면 리듬 타입
    const { type: sleepType } = energyResults.sleepRhythm;
    let sleepEmoji = "☀️";

    if (sleepType === "회복형 수면 리듬") {
      sleepEmoji = "☀️";
    } else if (sleepType === "불균형 수면 리듬") {
      sleepEmoji = "🌥";
    } else if (sleepType === "에너지 고갈형 수면 습관") {
      sleepEmoji = "🌙";
    }

    energyInfoList.push({
      emoji: sleepEmoji,
      title: sleepType,
      description: sleepType,
    });

    return energyInfoList;
  };

  // 집중력 상태 정보 목록 가져오기
  const getFocusInfoList = () => {
    if (!focusResults) return [];

    const focusInfoList = [];

    // 1. 집중 지속력 타입
    const { type } = focusResults.persistence;
    let persistenceEmoji = "";
    let persistenceTitle = "";

    if (type === "🔥강한 집중 지속력") {
      persistenceEmoji = "🔥";
      persistenceTitle = "강한 집중 지속력";
    } else if (type === "⛈️잘 변하는 집중 지속력") {
      persistenceEmoji = "⛈️";
      persistenceTitle = "잘 변하는 집중 지속력";
    } else if (type === "🌪️약한 집중 지속력") {
      persistenceEmoji = "🌪️";
      persistenceTitle = "약한 집중 지속력";
    }

    focusInfoList.push({
      emoji: persistenceEmoji,
      title: persistenceTitle,
    });

    // 2. 집중 타입 (감각, 환경, 시간)
    const { typeScores } = focusResults;

    // 무던형(둔감형) 판단: 모든 영역이 낮은 점수일 때
    if (
      typeScores.sensory <= 2 &&
      typeScores.environment <= 2 &&
      typeScores.time <= 2
    ) {
      focusInfoList.push({
        emoji: "🌳",
        title: "주변 영향에 크게 휘둘리지 않는 무던형",
      });
      return focusInfoList;
    }

    // 가장 높은 점수 찾기
    const maxScore = Math.max(
      typeScores.sensory,
      typeScores.environment,
      typeScores.time
    );

    // 동점인 경우 감각 > 환경 > 시간 순으로 우선 순위
    if (typeScores.sensory === maxScore) {
      focusInfoList.push({
        emoji: "🌬️",
        title: "외부 자극에 민감한 감각형",
      });
    } else if (typeScores.environment === maxScore) {
      focusInfoList.push({
        emoji: "🗓️",
        title: "일정한 환경을 선호하는 루틴형",
      });
    } else {
      focusInfoList.push({
        emoji: "⏰",
        title: "시간대에 민감한 시간대형",
      });
    }

    return focusInfoList;
  };

  // 마음 상태 정보 목록 가져오기
  const getMindInfoList = () => {
    if (!mindResults) return [];

    const mindInfoList = [];

    // finalType 사용
    const mainType = mindResults.finalType;

    // 주요 심리 방어기제 정보 추가
    let emoji = "😊";
    let title = "";
    let ritual = "";

    switch (mainType) {
      case "긍정":
        emoji = "😊";
        title = "내 심리적 방어기제는 잘 다루고 있어요.";
        ritual = "🎁 스스로 풀어주는 연습으로 긍정성 유지하기";
        break;
      case "불안":
        emoji = "😰";
        title = "내 심리적 방어기제는 불안이에요.";
        ritual = "🎁 4초 호흡 명상과 걱정노트로 불안 내려놓기";
        break;
      case "회피":
        emoji = "🙈";
        title = "내 심리적 방어기제는 회피예요.";
        ritual = "🎁 소심한 도전 리스트 작성과 감정 일기 쓰기";
        break;
      case "완벽주의":
        emoji = "🎯";
        title = "내 심리적 방어기제는 완벽주의예요.";
        ritual = "🎁 형식 없는 드로잉과 셀프칭찬 일기 쓰기";
        break;
      case "비교":
        emoji = "🔍";
        title = "내 심리적 방어기제는 비교예요.";
        ritual = "🎁 나만의 행복한 순간과 영감 수집 리추얼";
        break;
      case "눈치":
        emoji = "👀";
        title = "내 심리적 방어기제는 눈치예요.";
        ritual = "🎁 4초 호흡 명상과 걱정노트로 불안 내려놓기";
        break;
      case "자기의심":
        emoji = "🤔";
        title = "내 심리적 방어기제는 자기의심이예요.";
        ritual = "🎁 셀프 인정과 긍정 감사 일기 쓰기";
        break;
    }

    mindInfoList.push({
      emoji,
      title,
    });

    mindInfoList.push({
      title: ritual,
    });

    return mindInfoList;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>데이터 로딩 중...</div>
      </div>
    );
  }

  if (!energyResults || !focusResults || !mindResults) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">
            테스트 결과가 없습니다
          </div>
          <div>모든 테스트를 완료해주세요.</div>
        </div>
      </div>
    );
  }

  const energyInfoList = getEnergyInfoList();
  const focusInfoList = getFocusInfoList();
  const mindInfoList = getMindInfoList();

  return (
    <div
      id="summary-report-content"
      className="bg-white min-h-screen py-12 px-6"
    >
      <BackButton className="mb-8" />

      <div className="text-[26px] text-black font-bold mb-16">
        현재 나의 종합 상태 결과를
        <br />
        모아봤어요!
      </div>

      <div className="flex flex-col gap-12">
        <div>
          <SectionTitle>에너지 상태</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line mb-6">
            {"나의 현재 에너지의 상태를 알려드려요."}
          </div>
          <div className="flex flex-col gap-3">
            {energyInfoList.map((info, index) => (
              <div
                key={index}
                className="rounded-[6px] bg-[#F9F9F9] py-[20px] px-[20px]"
              >
                <div className="text-[16px] text-black font-bold">
                  {info.emoji} {info.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>집중력 상태</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line mb-6">
            {"나의 현재 집중력 상태를 알려드려요."}
          </div>
          <div className="flex flex-col gap-3">
            {focusInfoList.map((info, index) => (
              <div
                key={index}
                className="rounded-[6px] bg-[#F9F9F9] py-[20px] px-[20px]"
              >
                <div className="text-[16px] text-black font-bold">
                  {info.emoji} {info.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>마음 상태</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line mb-6">
            {"나의 심리적 방어기제와 마음을 돌보는 팁을 알려드려요."}
          </div>
          <div className="flex flex-col gap-3">
            {mindInfoList.map((info, index) => (
              <div
                key={index}
                className="rounded-[6px] bg-[#F9F9F9] py-[20px] px-[20px]"
              >
                <div className="text-[16px] text-black font-bold">
                  {info.emoji} {info.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DownloadButtonSimple
        targetElementId="summary-report-content"
        filename="summary-report"
        className="mt-12"
      />

      <div className="mt-15">
        <Button activated={true} onClick={() => router.push("/")}>
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}

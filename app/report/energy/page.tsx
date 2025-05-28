"use client";

import { useState, useEffect } from "react";
import SectionTitle from "@/app/components/SectionTitle";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

// Raw data structure from localStorage
type EnergyTestResults = {
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
};

export default function EnergyReportPage() {
  const router = useRouter();
  const [results, setResults] = useState<EnergyTestResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("energy_test_results");
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 에너지 배터리 상태에 따른 메시지
  const getBatteryMessage = (level: string) => {
    switch (level) {
      case "good":
        return "현재 에너지 상태는 아주 좋아요. 마음먹은 것을 해낼 수 있는 동력이 강한 상태라, 집중하고 싶은 것이 있으면 좋은 타이밍이예요. 일상 속 스트레스 요인은 있지만, 스스로 에너지를 회복하는 루틴이나 방법을 잘 알고 있어요. 에너지를 어디에 쓰고 싶은지 잘 고민해서 쓰면 좋을 것 같아요.";
      case "not bad":
        return "현재 에너지 상태는 나쁘지 않지만, 조금씩 새고 있습니다. 아직 완전히 지친 건 아니지만, 마음이나 몸이 이미 '신호'를 보내고 있어요. 머릿속이 바쁜데 몸은 따라주지 않거나, 쉬어도 개운하지 않다는 느낌이 반복된다면, 에너지가 어디서 새는지 알아야 해요.";
      case "bad":
        return "지금 에너지 상태는 한계에 가까워지려고 해요. 해야 할 일은 많고, 나를 위한 시간은 점점 줄어든 상태네요. 몸도 마음도 '회복'이 아닌 '견디는 중'일 가능성이 높아요. 지금 필요한 건 큰 노력이 아니라, 충분한 쉬는 시간을 나에게 주는 것일지 몰라요.";
      default:
        return "";
    }
  };

  // 에너지 충전 유형에 따른 메시지
  const getEnergyTypeMessage = (types: EnergyType[]) => {
    const typeDescriptions: Record<EnergyType, string> = {
      "사람과의 연결":
        "사람과의 관계 속에서 활력을 얻어요. 친밀한 사람과의 깊은 대화, 활기가 있는 모임, 함께 하는 프로젝트에서 에너지가 충전됩니다. 사람과 연결되어 있을 때 더 창의적이고 기분도 올라갑니다.",
      "혼자만의 시간":
        "혼자만의 고요한 공간에서 에너지를 회복하는 사람입니다. 타인과 함께 있는 것도 좋아하지만, 에너지를 써야 하는 타입이라 혼자만의 시간이 중요해요. 나와 함께 온전히 있음으로써 휴식이 되는 타입이에요.",
      "감각 몰입":
        "감각 자극에서 생기를 찾는 사람입니다. 음악, 향, 자연, 색, 미적 자극이 있는 곳에서 에너지가 올라갑니다. 새로운 자극이 있는 감각적인 환경에서 깊이 회복할 수 있는 타입이에요.",
    };

    if (types.length > 1) {
      return "유연하게 충전 타입: 고정된 방식보다 다양한 자극을 통해 회복하는 타입입니다. 때로는 사람, 때로는 혼자, 때로는 감각이 에너지를 올리는데 도움이 되기 때문에, 스스로 어떤 날 어떤 충전이 필요한지를 직관적으로 살펴보는 게 중요합니다.";
    } else if (types.length === 1) {
      return typeDescriptions[types[0]];
    }
    return "";
  };

  // 시간대별 에너지 타입에 따른 메시지
  const getTimeEnergyTypeMessage = (types: TimeEnergyType[]) => {
    const typeDescriptions: Record<TimeEnergyType, string> = {
      "아침 에너지 타입":
        "하루를 가장 잘 시작하는 타입입니다. 아침에 머리가 맑고 집중력이 좋아, 기상 후~오전까지가 에너지 피크 타임이네요. 반대로 오후에는 에너지가 점차 빠져나가고 무기력이 올 수 있으므로, 중요한 일은 아침에 집중적으로 배치하는 것이 좋습니다.",
      "낮 에너지 타입":
        "오전보다 점심 이후에 에너지가 자연스럽게 올라가는 타입입니다. 아침에는 여유롭게 워밍업하는 루틴이 필요하며, 오후 2~4시 사이가 최고의 몰입 구간이 될 수 있어요. 하루 일정을 설계할 때, 핵심 활동은 오후로 배치해 보세요.",
      "저녁 에너지 타입":
        "해가 질 무렵부터 집중력과 활력이 상승하는 타입입니다. 오전에는 몸과 마음이 천천히 깨어나므로, 감각을 깨우는 시간을 가지고, 무리한 일정 배치는 피하는 것이 좋습니다. 창의적인 작업, 기획, 사람과의 소통 등은 오후~저녁에 배치하면 퍼포먼스가 극대화됩니다.",
      "밤 에너지 타입":
        "늦은 밤, 조용한 시간에 가장 에너지가 살아나는 타입입니다. 일반적인 낮 중심 생활 리듬과 어긋나기 쉬워, 낮 동안 피로가 쌓이고, 밤에야 비로소 나다워집니다. 창의적 작업과 자기 몰입은 심야에 잘 되지만, 수면 리듬 조정과 수면 질 확보가 매우 중요합니다. 기상 시간은 꼭 규칙적으로 할 수 있게 정하면 좋아요.",
    };

    if (types.length > 1) {
      return "자유자재 에너지 타입: 특정 시간대에만 에너지가 몰리지 않고, 여러 시간대에 걸쳐 다양한 리듬을 경험하는 타입입니다. 자신의 일/업무/생활 스타일에 따라 유연하게 시간을 활용하면 좋아요. 어떤 시간에 어떤 일을 하기에 가장 적합한지를 스스로 실험하고 찾는 것이 좋습니다. 아직 정확히 자신을 몰라서일 수 있거든요.";
    } else if (types.length === 1) {
      return typeDescriptions[types[0]];
    }
    return "";
  };

  // 수면 리듬 타입에 따른 정보
  const getSleepRhythmInfo = (type: SleepRhythmType) => {
    switch (type) {
      case "회복형 수면 리듬":
        return {
          emoji: "☀️",
          message:
            "비교적 안정적인 리듬과 수면의 질이 유지하고 있어요. 몸이 잠들고 깨어나는 리듬이 자연스럽고, 에너지 회복도 잘 이루어지는 편입니다. 지금처럼 일정하게 자고 일어나는 루틴을 유지하면 좋아요. 잠이 나에게 중요한 에너지원이 되고 있으니까요.",
        };
      case "불균형 수면 리듬":
        return {
          emoji: "🌥",
          message:
            "수면의 양이나 시간보다, 질과 패턴에서 불균형 신호가 나타나고 있네요. 생각이 많거나, 잠들기 전 디지털 사용으로 회복이 늦어지고 있을 수 있어요. 하루 에너지 흐름도 수면 상태와 연결되어 있으므로, 작은 루틴을 조정해 보세요.",
        };
      case "에너지 고갈형 수면 습관":
        return {
          emoji: "🌙",
          message:
            "수면이 회복이 아닌, '버티는 시간'처럼 느껴지는 상태일 수 있어요. 잠을 자도 개운하지 않거나, 밤에 제대로 잠들지 못한다면 몸이 보내는 중요한 신호이므로, 잠을 잘 자기 위한 나만의 방법을 찾는데 시간을 투자하세요. 잠이 회복되면, 에너지도 자연스레 해결될 수 있어요.",
        };
      default:
        return { emoji: "", message: "" };
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
          <div>먼저 에너지 상태 테스트를 완료해주세요.</div>
        </div>
      </div>
    );
  }

  const batteryMessage = getBatteryMessage(results.battery.status.level);
  const energyTypeMessage = getEnergyTypeMessage(results.energyType.types);
  const timeEnergyTypeMessage = getTimeEnergyTypeMessage(
    results.timeEnergyType.types
  );
  const sleepRhythmInfo = getSleepRhythmInfo(results.sleepRhythm.type);

  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <div className="text-[26px] text-black font-bold mb-16">
        나의 에너지 상태 보고서
      </div>
      <div className="flex flex-col gap-12">
        <div>
          <SectionTitle>첫 번째, 에너지 배터리</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
            {
              "내가 가지고 있는 에너지의 양을 말해주는 수치입니다.\n에너지 배터리가 있어야, 같은 시간도 잘 몰입할 수 있어요."
            }
          </div>
          <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px] mt-6">
            <div className="text-[16px] text-black font-bold mb-3.5">
              {results.battery.status.level === "good" && "⚡"}
              {results.battery.status.level === "not bad" && "🌥"}
              {results.battery.status.level === "bad" && "🌪"}
              {" 에너지 배터리 " + results.battery.status.percentage}
            </div>
            <div className="text-[14px] text-black font-medium leading-[26px]">
              {batteryMessage}
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>두 번째, 에너지 충전 타입</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
            {
              "에너지가 채워지는 스타일도 사람마다 다를 수 있어요.\n내가 어떻게 에너지를 채울 수 있는지 확인하세요."
            }
          </div>
          <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px] mt-6">
            <div className="text-[16px] text-black font-bold mb-3.5">
              {results.energyType.types.includes("사람과의 연결") && "💬 "}
              {results.energyType.types.includes("혼자만의 시간") && "🌿 "}
              {results.energyType.types.includes("감각 몰입") && "🎨 "}
              {results.energyType.types.length > 1 && "🔁 "}
              {results.energyType.types.length > 1
                ? "유연하게 충전 타입"
                : results.energyType.types.join(", ")}
            </div>
            <div className="text-[14px] text-black font-medium leading-[26px]">
              {energyTypeMessage}
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>세 번째, 시간대별 에너지 타입</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
            {
              "나에게 좋은 에너지를 주는 시간대가 있어요.\n어떤 시간대에 내가 가장 에너지가 좋은 타입인지 확인하세요."
            }
          </div>
          <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px] mt-6">
            <div className="text-[16px] text-black font-bold mb-3.5">
              {results.timeEnergyType.types.includes("아침 에너지 타입") &&
                "🌅 "}
              {results.timeEnergyType.types.includes("낮 에너지 타입") && "🌤 "}
              {results.timeEnergyType.types.includes("저녁 에너지 타입") &&
                "🌇 "}
              {results.timeEnergyType.types.includes("밤 에너지 타입") && "🌙 "}
              {results.timeEnergyType.types.length > 1 && "🔁 "}
              {results.timeEnergyType.types.length > 1
                ? "자유자재 에너지 타입"
                : results.timeEnergyType.types.join(", ")}
            </div>
            <div className="text-[14px] text-black font-medium leading-[26px]">
              {timeEnergyTypeMessage}
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>네 번째, 수면 리듬 타입</SectionTitle>
          <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
            {
              "에너지 관리에 있어 수면은 매우 중요합니다.\n당신의 수면 리듬은 어떤 상태인가요?"
            }
          </div>
          <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px] mt-6">
            <div className="text-[16px] text-black font-bold mb-3.5">
              {sleepRhythmInfo.emoji} {results.sleepRhythm.type}
            </div>
            <div className="text-[14px] text-black font-medium leading-[26px]">
              {sleepRhythmInfo.message}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 justify-center">
        {/* <div className="flex flex-col items-center gap-2 mt-12">
          <Image src="/share.svg" alt="Loading" width={40} height={100} />
          <span className="text-xs">이미지 다운 받기</span>
        </div> */}
        <div className="flex flex-col items-center gap-2 mt-12">
          <Image src="/download.svg" alt="Loading" width={40} height={100} />
          <span className="text-xs">이미지 다운 받기</span>
        </div>
      </div>

      <div className="mt-15">
        <Button activated={true} onClick={() => router.push("/report/focus")}>
          집중력 상태 결과지로 넘어가기
        </Button>
      </div>
    </div>
  );
}

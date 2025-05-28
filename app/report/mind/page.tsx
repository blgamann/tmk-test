"use client";

import { useState, useEffect } from "react";
import SectionTitle from "@/app/components/SectionTitle";
import Button from "@/app/components/Button";
import DownloadButtonSimple from "@/app/components/DownloadButtonSimple";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type MindType =
  | "불안"
  | "비교"
  | "완벽주의"
  | "자기의심"
  | "눈치"
  | "회피"
  | "긍정";

interface MindTestResult {
  mindScores: {
    [key in MindType]: number;
  };
  topTypes: MindType[];
  positiveScore: number;
  finalType: MindType | "긍정";
}

export default function MindReportPage() {
  const router = useRouter();
  const [results, setResults] = useState<MindTestResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Debug 모드 설정 (개발용)
  const [debug] = useState(false);

  // 다른 답변 보기 상태
  const [showAlternateMind, setShowAlternateMind] = useState(0); // 0: 실제 결과, 1-8: 다른 결과들

  // 테스트 결과 가져오기
  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("mind_test_results");
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 모든 마음 방어기제 타입 정보
  const getAllMindDefenseInfo = () => [
    {
      type: "긍정",
      emoji: "😊",
      title: "심리적 방어기제를 잘 다스리며 사는, 긍정멘탈이에요.",
      message: "",
      description:
        "심리적 방어기제를 잘 다스리며 사는, 긍정멘탈이에요. 심리적 방어기제가 골고루 있지만, 어디에도 끌려다니지 않고, 감정의 파도 속에서 중심을 잘 잡는 타입이에요. 불안하거나 움츠러드는 상황 속에서도, 스스로를 다독이고 균형을 찾을 줄 알아서, 어떤 일이든 마음먹은대로 시도하고 시작하는 편이에요. 크게 한쪽으로 치우치지 않는 감정 감각 덕분에, 타인의 감정에도 공감하면서도 나를 잃지 않네요. 때로는 너무 힘을 주기보다, 지금처럼 자연스럽게 감정을 흐르게 두는 것도 괜찮아요.",
    },
    {
      type: "불안",
      emoji: "😰",
      title: "내 심리적 방어기제는 불안이에요.",
      message: "불안에 시간을 많이 쓸 수 있어요.",
      description:
        "위험을 미리 감지하려는 섬세함이 있어, 준비도 철저하고 타인에게 민감하게 반응하는 사람이죠. 하지만 때론 무엇인가를 하기 전에, 혹시 실수하면 어쩌지… 하고 걱정을 많이 하는 편이기도 해요. 그런 감각이 때로는 당신의 용기를 앞서 멈추게 만들기도 해요.",
    },
    {
      type: "회피",
      emoji: "🙈",
      title: "내 심리적 방어기제는 회피예요.",
      message: "회피에 시간을 많이 쓸 수 있어요.",
      description:
        "감정에 예민하고 섬세한 사람이라, 마음이 다치지 않도록 자신을 지키는 능력이 있고, 불필요한 갈등이나 상처를 줄이기 위해 행동할 수 있어요. 다만, 상처받지 않기 위해 뒤로 한걸음 물러서는 선택을 자주 해요. 괜히 시도했다가 상처받을까 봐, 말하지 않고 넘어가거나, 기회를 미루는 순간이 잦은 편이에요.",
    },
    {
      type: "완벽주의",
      emoji: "🎯",
      title: "내 심리적 방어기제는 완벽주의예요.",
      message: "완벽주의에 시간을 많이 쓸 수 있어요.",
      description:
        "높은 기준과 기대를 하고 나를 대하기 때문에 늘 최선을 다하려고 노력해요. 하지만 혹여나 일어날 실수나 실패를 많이 두려워해요. 완벽하게 준비되지 않으면 시작하기가 힘든 타입일 수도 있어요. 실패와 실수를 할 바에는 시작하지 말자는 마음을 먹거나, 완벽한 타이밍을 기다리다, 좋은 기회를 놓칠 수 있어요.",
    },
    {
      type: "비교",
      emoji: "🔍",
      title: "내 심리적 방어기제는 비교예요.",
      message: "비교에 시간을 많이 쓸 수 있어요.",
      description:
        "스스로의 삶을 더 나아지게 만들고 싶은 마음이 큰 사람이예요. 주변을 살피며 배우고, 더 나은 방향을 고민해요. 하지만, 그 마음이 지나치게 타인에게 향할 때, '나는 왜 이럴까'라는 생각이 자주 떠오르고, 자신을 초라하게 봐요. 삶의 기준이 '나'가 아닌 타인이나 사회의 기준에 놓이면, 비교의 마음은 줄어들지 않고 더 커지게 돼요.",
    },
    {
      type: "눈치",
      emoji: "👀",
      title: "내 심리적 방어기제는 눈치예요.",
      message: "눈치에 시간을 많이 쓸 수 있어요.",
      description:
        "타인을 배려하고, 조화로운 관계를 소중히 여기는 사람이에요. 하지만 사람들이 어떻게 생각할지를 너무 신경쓰는 날이면, 다른 사람을 신경 쓰느라 스스로를 작게 만들기도 해요. 남을 신경 쓰는데 에너지를 다 소진하면, 자신을 돌볼 수 있는 에너지가 없어질 수 있어요.",
    },
    {
      type: "자기의심",
      emoji: "🤔",
      title: "내 심리적 방어기제는 자기의심이예요.",
      message: "자기의심에 시간을 많이 쓸 수 있어요.",
      description:
        "신중하게 생각하고, 깊이 돌아보는 타입이예요. 무언가를 하기 전에 스스로의 의도를 점검하고, 말 한 마디도 가볍게 흘려보내지 않으려는 섬세함이 있어요. 다만 그 진지함이 지나치게 자기 안으로만 향하면, '내가 이걸 해도 괜찮은 사람일까' '나는 과연 충분할까' 하는 생각을 자주 할 수 있어요. 자기의심이 짙어지는 날은 스스로의 가능성을 축소하고, 결정과 행동까지도 멈칫하게 되죠.",
    },
  ];

  // 모든 타입별 건강한/지나친 사용 메시지
  const getAllPositiveNegativeMessages = () => [
    {
      type: "긍정",
      positive: [
        "하루 10분, 감정을 자유롭게 표현하는 낙서나, 그림을 그려봐요.",
        "자주 가는 길을 산책하면서 떠오르는 생각을 돌아와서 메모해요.",
        "오늘 마음에 스쳐 간 감정 한 가지만 써보고 잠이 들어요.",
      ],
      negative: [],
    },
    {
      type: "불안",
      positive: [
        "꼼꼼하게 준비하고, 예상치 못한 상황에 민감하게 대응해요.",
        "주변 사람의 감정을 잘 캐치하고, 세심하게 배려할 수 있어요.",
      ],
      negative: [
        "아직 일어나지 않은 일에 마음이 붙잡혀 움직이기 어려워요.",
        "실수나 피드백에도 과도하게 긴장하고 움츠러들 수 있어요.",
      ],
    },
    {
      type: "회피",
      positive: [
        "조심스럽고 신중하게 상황을 판단하며, 충돌을 줄일 수 있어요.",
        "감정에 너무 몰입하지 않고, 상황을 여유 있게 바라볼 수 있어요.",
      ],
      negative: [
        "새로운 시도나 변화를 미루고, 도전을 피하고 싶어져요.",
        "감정을 들여다보는 게 어려워, 스스로의 마음을 알지 못할 때가 있어요.",
      ],
    },
    {
      type: "완벽주의",
      positive: [
        "디테일에 강하고, 신뢰감 있는 결과물을 만들어내요.",
        "책임감 있고 성실하게 일정을 이끌어갈 수 있어요.",
      ],
      negative: [
        "준비가 덜 되면 아무것도 시작하지 못할 수 있어요.",
        "작은 실수에도 자책하고, 스스로를 몰아붙이게 돼요.",
      ],
    },
    {
      type: "비교",
      positive: [
        "주변 사람들을 보며 동기를 얻고, 더 나은 방향을 고민할 수 있어요.",
        "자기개발에 진심이고, 배우려는 태도가 분명해요.",
      ],
      negative: [
        "타인의 성과에 압도되어 자존감이 흔들릴 수 있어요.",
        "나의 기준보다 타인의 기준에 끌려다니며 지치게 돼요.",
      ],
    },
    {
      type: "눈치",
      positive: [
        "관계를 부드럽게 이끌고, 민감한 분위기를 잘 조율해요.",
        "주변 사람들을 배려하며 신뢰를 얻는 사람이에요.",
      ],
      negative: [
        "타인의 시선에 지나치게 휘둘릴 수 있어요.",
        "자기표현 이후에 후회나 불안이 따라올 수 있어요.",
      ],
    },
    {
      type: "자기의심",
      positive: [
        "무언가를 시작할 때, 신중하게 자신을 돌아봐요.",
        "다른 사람의 편에 서서 많이 배려해요.",
      ],
      negative: [
        "칭찬을 받아도 스스로 인정하지 못해요.",
        "'나는 괜찮은 사람일까'를 의심해요.",
      ],
    },
  ];

  // 모든 타입별 마음 돌보는 팁
  const getAllTipsMessages = () => [
    {
      type: "긍정",
      title: "마음을 돌보는 팁",
      tips: [
        "이미 잘 하고 있지만, 스스로 풀어주는 연습을 계속하면, 긍정성을 유지할 수 있어요.",
      ],
    },
    {
      type: "불안",
      title: "마음을 돌보는 팁",
      tips: [
        "불안을 없앨 수 없으니, 제거하려는 노력보다 불안을 잘 다루는 연습을 하는 리추얼을 추천해요.",
        "4초 호흡 명상으로 마음을 진정시켜 주세요.",
        "걱정 노트에 떠오른 불안을 적고, 내려놓는 연습을 해보세요.",
      ],
    },
    {
      type: "회피",
      title: "마음을 돌보는 팁",
      tips: [
        "덜 생각하고, 바로 해볼 수 있는 시도가 있는 리추얼을 추천해요.",
        "하루 하나 소심한 도전 리스트를 적고, 시도해 봐요.",
        "가벼운 책을 읽고, 감정 일기를 솔직하게 써봐요.",
      ],
    },
    {
      type: "완벽주의",
      title: "마음을 돌보는 팁",
      tips: [
        "완벽한 기준을 다그치기보다, 내가 스스로 나를 인정해 주는 리추얼을 추천해요.",
        "형식 없는 드로잉이나 자유 글쓰기로 그냥 시도해 봐요.",
        "셀프칭찬 일기에 오늘 나를 칭찬해 보는 3줄을 써봐요.",
      ],
    },
    {
      type: "비교",
      title: "마음을 돌보는 팁",
      tips: [
        "타인이 아니라 나 자신을 위한 기준과 관점을 만드는 리추얼을 제안해요.",
        "SNS에 올리지 말고, 나를 웃게 만드는 행복한 순간을 수집하는 리추얼을 해요.",
        "내가 발견한 작은 영감이나 감동을 수집하는 리추얼을 해요.",
      ],
    },
    {
      type: "눈치",
      title: "마음을 돌보는 팁",
      tips: [
        "자기 자신을 더 아껴주고 위해주는 연습을 하는 리추얼을 제안해요.",
        "말했으면 좋았을 감정을 솔직히 토해내듯 써봐요.",
        "오늘 내가 잘한 일 한 가지를 기록하고, 토닥여줘요.",
      ],
    },
    {
      type: "자기의심",
      title: "마음을 돌보는 팁",
      tips: [
        "내가 한 것을 스스로 인정하고, 지지하는 리추얼을 추천해요.",
        "오늘 일을 회고하고, 오늘 내가 잘한 것 적어주기",
        "아침마다 나를 위한 긍정 일기와 감사일기 쓰기",
      ],
    },
  ];

  // 주요 심리 방어기제 메시지 생성
  const getMainDefenseMechanism = () => {
    if (!results) return null;

    const topType = results.finalType;

    switch (topType) {
      case "긍정":
        return {
          type: "긍정",
          emoji: "😊",
          title: "심리적 방어기제를 잘 다스리며 사는, 긍정멘탈이에요.",
          description:
            "심리적 방어기제를 잘 다스리며 사는, 긍정멘탈이에요. 심리적 방어기제가 골고루 있지만, 어디에도 끌려다니지 않고, 감정의 파도 속에서 중심을 잘 잡는 타입이에요. 불안하거나 움츠러드는 상황 속에서도, 스스로를 다독이고 균형을 찾을 줄 알아서, 어떤 일이든 마음먹은대로 시도하고 시작하는 편이에요. 크게 한쪽으로 치우치지 않는 감정 감각 덕분에, 타인의 감정에도 공감하면서도 나를 잃지 않네요. 때로는 너무 힘을 주기보다, 지금처럼 자연스럽게 감정을 흐르게 두는 것도 괜찮아요.",
        };
      case "불안":
        return {
          type: "불안",
          emoji: "😰",
          title: "내 심리적 방어기제는 불안이에요.",
          message: "불안에 시간을 많이 쓸 수 있어요.",
          description:
            "위험을 미리 감지하려는 섬세함이 있어, 준비도 철저하고 타인에게 민감하게 반응하는 사람이죠. 하지만 때론 무엇인가를 하기 전에, 혹시 실수하면 어쩌지… 하고 걱정을 많이 하는 편이기도 해요. 그런 감각이 때로는 당신의 용기를 앞서 멈추게 만들기도 해요.",
        };
      case "회피":
        return {
          type: "회피",
          emoji: "🙈",
          title: "내 심리적 방어기제는 회피예요.",
          message: "회피에 시간을 많이 쓸 수 있어요.",
          description:
            "감정에 예민하고 섬세한 사람이라, 마음이 다치지 않도록 자신을 지키는 능력이 있고, 불필요한 갈등이나 상처를 줄이기 위해 행동할 수 있어요. 다만, 상처받지 않기 위해 뒤로 한걸음 물러서는 선택을 자주 해요. 괜히 시도했다가 상처받을까 봐, 말하지 않고 넘어가거나, 기회를 미루는 순간이 잦은 편이에요.",
        };
      case "완벽주의":
        return {
          type: "완벽주의",
          emoji: "🎯",
          title: "내 심리적 방어기제는 완벽주의예요.",
          message: "완벽주의에 시간을 많이 쓸 수 있어요.",
          description:
            "높은 기준과 기대를 하고 나를 대하기 때문에 늘 최선을 다하려고 노력해요. 하지만 혹여나 일어날 실수나 실패를 많이 두려워해요. 완벽하게 준비되지 않으면 시작하기가 힘든 타입일 수도 있어요. 실패와 실수를 할 바에는 시작하지 말자는 마음을 먹거나, 완벽한 타이밍을 기다리다, 좋은 기회를 놓칠 수 있어요.",
        };
      case "비교":
        return {
          type: "비교",
          emoji: "🔍",
          title: "내 심리적 방어기제는 비교예요.",
          message: "비교에 시간을 많이 쓸 수 있어요.",
          description:
            "스스로의 삶을 더 나아지게 만들고 싶은 마음이 큰 사람이예요. 주변을 살피며 배우고, 더 나은 방향을 고민해요. 하지만, 그 마음이 지나치게 타인에게 향할 때, '나는 왜 이럴까'라는 생각이 자주 떠오르고, 자신을 초라하게 봐요. 삶의 기준이 '나'가 아닌 타인이나 사회의 기준에 놓이면, 비교의 마음은 줄어들지 않고 더 커지게 돼요.",
        };
      case "눈치":
        return {
          type: "눈치",
          emoji: "👀",
          title: "내 심리적 방어기제는 눈치예요.",
          message: "눈치에 시간을 많이 쓸 수 있어요.",
          description:
            "타인을 배려하고, 조화로운 관계를 소중히 여기는 사람이에요. 하지만 사람들이 어떻게 생각할지를 너무 신경쓰는 날이면, 다른 사람을 신경 쓰느라 스스로를 작게 만들기도 해요. 남을 신경 쓰는데 에너지를 다 소진하면, 자신을 돌볼 수 있는 에너지가 없어질 수 있어요.",
        };
      case "자기의심":
        return {
          type: "자기의심",
          emoji: "🤔",
          title: "내 심리적 방어기제는 자기의심이예요.",
          message: "자기의심에 시간을 많이 쓸 수 있어요.",
          description:
            "신중하게 생각하고, 깊이 돌아보는 타입이예요. 무언가를 하기 전에 스스로의 의도를 점검하고, 말 한 마디도 가볍게 흘려보내지 않으려는 섬세함이 있어요. 다만 그 진지함이 지나치게 자기 안으로만 향하면, '내가 이걸 해도 괜찮은 사람일까' '나는 과연 충분할까' 하는 생각을 자주 할 수 있어요. 자기의심이 짙어지는 날은 스스로의 가능성을 축소하고, 결정과 행동까지도 멈칫하게 되죠.",
        };
      default:
        return null;
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
          <div>먼저 마음 상태 테스트를 완료해주세요.</div>
        </div>
      </div>
    );
  }

  const mainDefense = getMainDefenseMechanism();

  return (
    <div id="mind-report-content" className="bg-white min-h-screen py-12 px-6">
      <BackButton className="mb-8" />

      <div className="text-[26px] text-black font-bold mb-16">
        나의 마음 상태 보고서
      </div>

      <div>
        <SectionTitle>내 마음의 심리적 방어기제</SectionTitle>
        <div className="text-[14px] text-black font-medium leading-[24px] whitespace-pre-line">
          {
            "심리적 방어기제는 우리가 스트레스나 불안의 감정 같은 것을 느낄 때, 자신을 보호하려고 무의식적으로 사용하는 마음 방어요. 나를 지키기 위한 자연스러운 방어이지만, 너무 자주 반복되면 감정을 직접하지 못하게 될 수도 있어요."
          }
        </div>
      </div>
      <div className="flex flex-col gap-3.5 mt-5">
        <div className="rounded-[6px] bg-[#F9F9F9] px-[21px] py-8">
          {(() => {
            const allMindDefenseInfo = getAllMindDefenseInfo();
            const currentInfo =
              showAlternateMind === 0
                ? {
                    type: mainDefense?.type,
                    emoji: mainDefense?.emoji,
                    title: mainDefense?.title,
                    message: mainDefense?.message,
                    description: mainDefense?.description,
                  }
                : allMindDefenseInfo[showAlternateMind - 1];

            return (
              <div>
                <div className="text-[16px] text-black font-bold whitespace-pre-line">
                  {currentInfo.emoji} {currentInfo.title}
                  {debug && showAlternateMind === 0 && (
                    <span className="ml-2 text-[12px] bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      나의 결과
                    </span>
                  )}
                </div>
                <div className="text-[16px] text-black font-bold whitespace-pre-line mb-3">
                  {currentInfo.message}
                </div>
                <div className="text-[14px] text-black font-medium leading-[26px] mb-4">
                  {currentInfo.description}
                </div>
                {debug && (
                  <button
                    onClick={() =>
                      setShowAlternateMind((prev) => (prev + 1) % 8)
                    }
                    className="text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    다른 답변 보기 ({showAlternateMind + 1}/8)
                  </button>
                )}
              </div>
            );
          })()}
        </div>

        {(() => {
          const allMindDefenseInfo = getAllMindDefenseInfo();
          const allPositiveNegativeMessages = getAllPositiveNegativeMessages();

          const currentType =
            showAlternateMind === 0
              ? results.finalType
              : allMindDefenseInfo[showAlternateMind - 1].type;

          const currentPosNegMessage = allPositiveNegativeMessages.find(
            (msg) => msg.type === currentType
          );

          if (currentType === "긍정") {
            return (
              <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px]">
                <div className="text-[16px] text-black font-bold mb-2.5">
                  이미 잘 하고 있지만, 스스로 풀어주는 연습을 계속하면, 긍정성을
                  유지할 수 있어요.
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {currentPosNegMessage?.positive.map((item, index) => (
                    <li
                      key={index}
                      className="text-[14px] text-black font-medium leading-[24px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <>
              {currentPosNegMessage?.positive &&
                currentPosNegMessage.positive.length > 0 && (
                  <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px]">
                    <div className="mb-2.5">
                      <div className="text-[16px] text-black font-bold">
                        👍 건강하게 나를 보호할 때
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentPosNegMessage.positive.map((item, index) => (
                        <li
                          key={index}
                          className="text-[14px] text-black font-medium leading-[24px]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {currentPosNegMessage?.negative &&
                currentPosNegMessage.negative.length > 0 && (
                  <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px]">
                    <div className="mb-2.5">
                      <div className="text-[16px] text-black font-bold">
                        👎 지나치게 나를 방어할 때
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentPosNegMessage.negative.map((item, index) => (
                        <li
                          key={index}
                          className="text-[14px] text-black font-medium leading-[24px]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          );
        })()}

        {(() => {
          const allMindDefenseInfo = getAllMindDefenseInfo();
          const allTipsMessages = getAllTipsMessages();

          const currentType =
            showAlternateMind === 0
              ? results.finalType
              : allMindDefenseInfo[showAlternateMind - 1].type;

          const currentTipsMessage = allTipsMessages.find(
            (msg) => msg.type === currentType
          );

          if (!currentTipsMessage || currentType === "긍정") {
            return null;
          }

          return (
            <div className="rounded-[6px] bg-[#F9F9F9] py-[33px] px-[21px]">
              <div className="mb-2.5">
                <div className="text-[16px] text-black font-bold">
                  🎁 마음을 돌보는 팁
                </div>
              </div>
              <div className="text-[14px] text-black font-medium leading-[24px] mb-7">
                {currentTipsMessage.tips[0]}
              </div>
              <div className="mb-2 text-[16px] text-black font-bold">
                {`${currentType}을 줄이기 위한 작은 리추얼`}
              </div>

              <ul className="list-disc pl-5 space-y-2">
                {currentTipsMessage.tips.slice(1).map((tip, index) => (
                  <li
                    key={index}
                    className="text-[14px] text-black font-medium leading-[24px]"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </div>

      <DownloadButtonSimple
        targetElementId="mind-report-content"
        filename="mind-report"
        className="mt-12"
      />

      <div className="mt-15">
        <Button activated={true} onClick={() => router.push("/report/summary")}>
          전체 결과지로 넘어가기
        </Button>
      </div>
    </div>
  );
}

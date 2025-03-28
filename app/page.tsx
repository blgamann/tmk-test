import Guide from "./components/Guide";
import RatingScale from "./components/RatingScale";
import ProgressBar from "./components/ProgressBar";
import Button from "./components/Button";
export default function Home() {
  return (
    <div className="min-h-screen flex-col items-center justify-center bg-white">
      <ProgressBar currentStep={1} totalSteps={5} />
      <div className="w-full px-5">
        <Guide />
        <div className="flex flex-col gap-4 w-full">
          <RatingScale statement="사람 많은 장소에 오래 있으면 지친다" />
          <RatingScale statement="감정적인 갈등이나 눈치를 봐야하는 상황이 많다" />
          <RatingScale statement="해야 할 일은 많은데, 어디서부터 손대야 할지 모르겠다" />
          <RatingScale statement="휴식시간에도 머릿속은 멈추지 않는다" />
          <RatingScale statement="원하는 건 많은데, 몸이 잘 따라주지 않는다" />
        </div>
        <Button>다음</Button>
      </div>
    </div>
  );
}

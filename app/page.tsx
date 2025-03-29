import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFD351] px-5 py-10">
      <div className="text-black text-[26px] font-bold leading-[35px] whitespace-pre-line">
        {"나의 상태를 관찰하러 오셨군요!\n반갑습니다. 👋"}
      </div>
      <div className="text-black text-[15px] font-normal leading-[22px] whitespace-pre-line mt-5">
        {
          "시간을 쓰는 나를 알아야, 시간의 주인이 될 수 있죠.\n나의 시간은 에너지, 집중력, 마음 상태와\n모두 연결되어 있어요.\n가장 솔직한 나로 테스트를 시작해 주세요."
        }
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10 flex justify-end">
          <Image src="/main.svg" alt="status" width={194} height={194} />
        </div>
        <Link
          href="/status"
          className="w-full h-[100px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer bg-white px-6 flex"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-[20px] text-black font-semibold">
              테스트 하러가기
            </div>
            <Image src="/arrow.svg" alt="arrow" width={12} height={6} />
          </div>
        </Link>
      </div>
    </div>
  );
}

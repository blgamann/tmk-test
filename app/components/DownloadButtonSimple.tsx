"use client";

import { toPng } from "html-to-image";
import Image from "next/image";
import { useState } from "react";

interface DownloadButtonSimpleProps {
  targetElementId: string;
  filename?: string;
  className?: string;
}

export default function DownloadButtonSimple({
  targetElementId,
  filename = "report",
  className = "",
}: DownloadButtonSimpleProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // 안전한 스타일 오버라이드
  const addSafeStyleOverride = () => {
    const style = document.createElement("style");
    style.id = "safe-override-" + Date.now();
    style.textContent = `
      #${targetElementId} * {
        color: rgb(0, 0, 0) !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
      }
      
      #${targetElementId} .bg-white {
        background-color: rgb(255, 255, 255) !important;
      }
      
      #${targetElementId} .bg-\\[\\#F9F9F9\\] {
        background-color: rgb(249, 249, 249) !important;
      }
      
      #${targetElementId} .text-black {
        color: rgb(0, 0, 0) !important;
      }
      
      #${targetElementId} .font-bold {
        font-weight: 700 !important;
      }
      
      #${targetElementId} .font-medium {
        font-weight: 500 !important;
      }
      
      #${targetElementId} .text-\\[26px\\] {
        font-size: 26px !important;
      }
      
      #${targetElementId} .text-\\[16px\\] {
        font-size: 16px !important;
      }
      
      #${targetElementId} .text-\\[14px\\] {
        font-size: 14px !important;
      }
      
      #${targetElementId} .text-xs {
        font-size: 12px !important;
      }
      
      #${targetElementId} .download-button {
        display: none !important;
      }
      
      /* 뒤로가기 버튼 숨기기 */
      #${targetElementId} button[class*="gap-2"][class*="text-gray-600"] {
        display: none !important;
      }
      
      /* 네비게이션 버튼과 영역 숨기기 */
      #${targetElementId} .mt-15 {
        display: none !important;
      }
      
      /* Button 컴포넌트 (w-full h-[70px] 속성으로 식별) */
      #${targetElementId} [class*="w-full"][class*="h-\\[70px\\]"] {
        display: none !important;
      }
      
      /* 일반적인 버튼들도 숨기기 */
      #${targetElementId} button[class*="w-full"] {
        display: none !important;
      }
      
      /* 배경 및 패딩 유지 */
      #${targetElementId} .py-12 {
        padding-top: 48px !important;
        padding-bottom: 48px !important;
      }
      
      #${targetElementId} .px-6 {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }
      
      #${targetElementId} .py-\\[33px\\] {
        padding-top: 33px !important;
        padding-bottom: 33px !important;
      }
      
      #${targetElementId} .px-\\[21px\\] {
        padding-left: 21px !important;
        padding-right: 21px !important;
      }
      
      #${targetElementId} .py-\\[20px\\] {
        padding-top: 20px !important;
        padding-bottom: 20px !important;
      }
      
      #${targetElementId} .px-\\[20px\\] {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      
      #${targetElementId} .rounded-\\[6px\\] {
        border-radius: 6px !important;
      }
      
      #${targetElementId} .mb-16 {
        margin-bottom: 64px !important;
      }
      
      #${targetElementId} .mb-6 {
        margin-bottom: 24px !important;
      }
      
      #${targetElementId} .mb-3 {
        margin-bottom: 12px !important;
      }
      
      #${targetElementId} .mb-4 {
        margin-bottom: 16px !important;
      }
      
      #${targetElementId} .mb-7 {
        margin-bottom: 28px !important;
      }
      
      #${targetElementId} .mt-5 {
        margin-top: 20px !important;
      }
      
      #${targetElementId} .mt-6 {
        margin-top: 24px !important;
      }
      
      #${targetElementId} .leading-\\[24px\\] {
        line-height: 24px !important;
      }
      
      #${targetElementId} .leading-\\[26px\\] {
        line-height: 26px !important;
      }
      
      #${targetElementId} .whitespace-pre-line {
        white-space: pre-line !important;
      }
      
      #${targetElementId} .flex {
        display: flex !important;
      }
      
      #${targetElementId} .flex-col {
        flex-direction: column !important;
      }
      
      #${targetElementId} .gap-3 {
        gap: 12px !important;
      }
      
      #${targetElementId} .gap-12 {
        gap: 48px !important;
      }
      
      #${targetElementId} ul {
        list-style-type: disc !important;
        padding-left: 20px !important;
      }
      
      #${targetElementId} li {
        display: list-item !important;
        margin-bottom: 8px !important;
      }
    `;
    document.head.appendChild(style);
    return style;
  };

  const removeSafeStyleOverride = (style: HTMLStyleElement) => {
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  };

  const downloadAsImage = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      const element = document.getElementById(targetElementId);
      if (!element) {
        alert("다운로드할 요소를 찾을 수 없습니다.");
        return;
      }

      // 스크롤을 맨 위로 이동
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 안전한 스타일 오버라이드 추가
      const overrideStyle = addSafeStyleOverride();

      // 렌더링 대기
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 실제 콘텐츠 높이 계산 (빈 공간 제외)
      const getActualContentHeight = (element: HTMLElement) => {
        // 모든 자식 요소들의 위치와 높이를 확인
        const children = Array.from(element.children) as HTMLElement[];
        if (children.length === 0) return element.offsetHeight;

        let maxBottom = 0;
        const elementRect = element.getBoundingClientRect();

        children.forEach((child) => {
          if (
            child instanceof HTMLElement &&
            !child.classList.contains("download-button")
          ) {
            const childRect = child.getBoundingClientRect();
            const relativeBottom = childRect.bottom - elementRect.top;
            maxBottom = Math.max(maxBottom, relativeBottom);
          }
        });

        // 패딩 추가 고려 (bottom padding)
        const computedStyle = window.getComputedStyle(element);
        const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;

        return Math.min(maxBottom + paddingBottom, element.offsetHeight);
      };

      const contentHeight = getActualContentHeight(element);

      try {
        const dataUrl = await toPng(element, {
          quality: 1.0,
          width: element.offsetWidth,
          height: contentHeight, // 실제 콘텐츠 높이만 사용
          backgroundColor: "#ffffff",
          pixelRatio: 2,
          skipFonts: true, // 폰트 처리 완전히 비활성화
          cacheBust: true, // 캐시 무효화
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            overflow: "hidden", // 넘치는 부분 숨기기
          },
          filter: (node) => {
            // 다운로드 버튼과 외부 스타일시트 제외
            if (node instanceof Element) {
              // 다운로드 버튼 제외
              if (node.classList.contains("download-button")) {
                return false;
              }

              // 외부 스타일시트 링크 제외
              if (
                node.tagName === "LINK" &&
                node.getAttribute("href")?.includes("pretendard")
              ) {
                return false;
              }

              // 외부 스타일 태그 제외
              if (
                node.tagName === "STYLE" &&
                node.textContent?.includes("pretendard")
              ) {
                return false;
              }
            }
            return true;
          },
        });

        // 스타일 정리
        removeSafeStyleOverride(overrideStyle);

        // 다운로드
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (imageError) {
        removeSafeStyleOverride(overrideStyle);
        console.error("이미지 생성 오류:", imageError);

        // 폴백: 더 단순한 옵션으로 재시도
        try {
          console.log("기본 설정으로 재시도 중...");
          const fallbackDataUrl = await toPng(element, {
            quality: 0.8,
            width: element.offsetWidth,
            height: contentHeight, // 폴백에서도 실제 콘텐츠 높이 사용
            backgroundColor: "#ffffff",
            skipFonts: true,
            cacheBust: true,
            style: {
              fontFamily: "Arial, sans-serif",
              overflow: "hidden",
            },
            filter: (node) => {
              if (node instanceof Element) {
                return !node.classList.contains("download-button");
              }
              return true;
            },
          });

          const link = document.createElement("a");
          link.download = `${filename}.png`;
          link.href = fallbackDataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (fallbackError) {
          console.error("폴백 이미지 생성도 실패:", fallbackError);
          throw fallbackError;
        }
      }
    } catch (error) {
      console.error("이미지 다운로드 오류:", error);
      alert(
        "이미지 다운로드에 실패했습니다. 브라우저의 스크린샷 기능을 사용해주세요."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center download-button ${className}`}
    >
      <div
        className={`flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${
          isDownloading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={downloadAsImage}
      >
        <Image
          src="/download.svg"
          alt="이미지 다운로드"
          width={40}
          height={40}
        />
        <span className="text-xs">
          {isDownloading ? "다운로드 중..." : "이미지 다운로드"}
        </span>
      </div>
    </div>
  );
}

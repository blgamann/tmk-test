import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "시간 진단 테스트",
  description: "남에게 쓰는 시간을 나에게 쓰는 법",
  openGraph: {
    title: "시간 진단 테스트",
    description: "남에게 쓰는 시간을 나에게 쓰는 법",
    images: [
      {
        url: "https://tmk-test.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "시간 진단 테스트",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "시간 진단 테스트",
    description: "남에게 쓰는 시간을 나에게 쓰는 법",
    images: ["https://tmk-test.vercel.app/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="font-['Pretendard'] max-w-[400px] mx-auto bg-gray-50">
        {children}
      </body>
    </html>
  );
}

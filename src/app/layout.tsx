import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "고무패킹 주문 전 확인사항 | 이에스리빙",
  description: "휘슬러 압력솥 고무패킹 구형/신형 모델을 올바르게 선택할 수 있는 안내 페이지입니다.",
  openGraph: {
    title: "휘슬러 고무패킹 주문 전 확인 안내 (이에스리빙)",
    description: "잘못된 모델 구매 방지를 위해 뚜껑 캡 모양을 꼭 확인해 주세요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}

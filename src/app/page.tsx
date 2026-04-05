"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AdminSection({ smsText, handleCopy, handleShare, copied }: { 
  smsText: string; 
  handleCopy: () => void; 
  handleShare: () => void;
  copied: boolean;
}) {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";

  if (!isAdmin) return null;

  return (
    <section className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 mt-4">
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h3 className="font-bold text-blue-900 text-base mb-1">운영자용: 안내 메시지 공유</h3>
          <p className="text-blue-700 text-xs leading-relaxed opacity-80">
            고객님께 보낼 문자 내용을 아래 링크를 포함해<br />공유하거나 복사할 수 있습니다.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleCopy}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
              copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-blue-100 text-blue-700 hover:bg-blue-50"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-xs font-bold">{copied ? "복사 완료!" : "문구 복사"}</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white border border-blue-100 text-blue-700 hover:bg-blue-50 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-xs font-bold">기기로 공유</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // 클라이언트 사이드에서만 실행됨
    // URL에 파라미터가 있다면 제거한 순수 주소만 공유용으로 사용
    setCurrentUrl(window.location.origin + window.location.pathname);
  }, []);

  const smsText = `압력솥 고무패킹 주문하신 
[이에스리빙]입니다.
고무패킹을 잘못 주문하는 경우가 
많아 발송전 확인하실 수 있도록 안내 문자 드리오니 확인해 주세요.

모델 확인 안내 페이지 :
${currentUrl}

문의 : 1877-6945`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(smsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복제 실패:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "[이에스리빙] 휘슬러 고무패킹 안내",
          text: smsText,
          url: currentUrl,
        });
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <main className="max-w-md mx-auto min-h-screen bg-white shadow-xl sm:my-8 sm:rounded-2xl overflow-hidden flex flex-col font-sans text-gray-800 relative">
      
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-100 flex items-center justify-center bg-white sticky top-0 z-10 text-center">
        <h1 className="font-bold text-lg md:text-xl tracking-tight text-gray-900">
          압력솥 고무패킹 주문하신 [이에스리빙]입니다
        </h1>
      </header>

      {/* Warning Banner */}
      <section className="bg-red-50 px-6 py-5 border-b border-red-100">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-red-800 font-bold text-lg">고무패킹 주문 전 확인사항</h2>
          </div>
          <div>
            <p className="text-red-700 text-sm leading-relaxed break-keep">
              제품 발송 전 고객님의 압력솥에 맞는 고무패킹을 주문하셨는지 확인차 안내 드립니다.<br />
              <strong>아래 내용을 통해 알맞은 고무패킹을 주문하셨는지 확인해 주세요!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col gap-6 bg-gray-50/50">
        
        {/* Correct Case (Old Model) */}
        <article className="bg-white rounded-2xl border-2 border-green-500 overflow-hidden shadow-sm relative">
          <div className="px-5 py-4 bg-green-50/50 border-b border-green-100 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-green-800 text-lg">맞는 제품으로 잘 주문하셨습니다</h3>
            </div>
            <p className="text-green-700 text-sm break-keep">
              고객님의 뚜껑 캡이 아래 사진의 <strong>모델</strong>과 똑같다면<br />
              알맞은 고무패킹(신형모델)을 주문하신겁니다.
            </p>
          </div>
          <div className="p-5 flex justify-center bg-white relative">
            <div className="relative w-full aspect-[3/1] max-w-[360px] overflow-hidden rounded-lg shadow-sm border border-gray-100 ring-4 ring-green-50">
              <Image 
                src="/uploaded_cap.png" 
                alt="올바른 모델 뚜껑 캡 이미지 (4가지 종류)"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </article>

        <div className="flex items-center justify-center -my-2 relative z-10">
          <span className="bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 pl-4 tracking-widest rounded-full uppercase">vs</span>
        </div>

        {/* Wrong Case (New Model) */}
        <article className="bg-white rounded-2xl border border-red-200 overflow-hidden shadow-sm opacity-95">
          <div className="px-5 py-4 bg-red-50/80 border-b border-red-100 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <h3 className="font-bold text-red-800 text-lg">제품을 잘못 주문하신 경우</h3>
            </div>
            <p className="text-red-700 text-sm break-keep">
              고객님의 뚜껑 캡이 아래 모양과 같은 <strong>모델</strong>이라면,<br />
              이번에 주문하신 고무패킹은 사용이 되지 않습니다.(구형모델로 주문해주세요)
            </p>
          </div>
          <div className="p-5 flex justify-center bg-white">
            <div className="relative w-full aspect-[3/1] max-w-[360px] overflow-hidden rounded-lg border border-red-100 mix-blend-multiply">
              <Image 
                src="/wrong_cap2.png" 
                alt="잘못된 모델 뚜껑 캡 예시"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="p-5 bg-red-50/50 border-t border-red-100 flex flex-col gap-3 items-center text-center">
            <p className="text-sm font-medium text-red-800 break-keep">
              구형 고무패킹이 필요하신 고객님은<br />
              쿠팡에서 취소 후 아래 전용 상품으로 다시 주문해 주세요.<br />
              <span className="text-xs text-red-600/90 font-normal mt-1 block">(오후 3시까지 취소 처리 요망, 3시 이후에는 취소처리 불가함)</span>
            </p>
            <a 
              href="https://www.coupang.com/vp/products/7208650431" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors text-white font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              구형 고무패킹 구매하러 가기
            </a>
            <p className="text-xs text-red-600/70 block mt-1">쿠팡 상품번호: 7208650431 - 18237062161</p>
          </div>
        </article>

        {/* Manager Tool: SMS Share Section (Wrapped in Suspense for useSearchParams) */}
        <Suspense fallback={<div className="h-20 bg-gray-50 animate-pulse rounded-2xl" />}>
          <AdminSection 
            smsText={smsText} 
            handleCopy={handleCopy} 
            handleShare={handleShare} 
            copied={copied} 
          />
        </Suspense>

      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 px-6 mt-auto">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">무엇을 도와드릴까요?</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-bold text-gray-700 text-lg">이에스리빙 고객센터</span>
          </div>
          <a href="tel:18776945" className="text-2xl font-black text-blue-600 hover:underline">1877-6945</a>
          <p className="text-xs text-gray-500 mt-2">평일 10:00 ~ 17:00 (주말·공휴일 휴무)</p>
        </div>
      </footer>

      {/* Simple Toast for Desktop */}
      {copied && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium z-50 animate-bounce shadow-lg">
          문자 문구가 복사되었습니다!
        </div>
      )}
    </main>
  );
}

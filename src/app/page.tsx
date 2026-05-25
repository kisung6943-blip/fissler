"use client";

import Image from "next/image";

export default function Home() {
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
            <p className="text-red-950 text-sm sm:text-base font-extrabold leading-relaxed break-keep">
              휘슬러 고무패킹은 두가지 모델이고 서로 호환이 되지 않아<br />
              제품발송전 알맞게 주문하셨는지 확인차 안내해드리오니<br />
              <span className="text-red-600 block mt-1.5 font-black text-base sm:text-lg underline underline-offset-4 decoration-red-300">
                아래 내용을 통해 알맞은 고무패킹을 주문하셨는지 확인해 주세요!
              </span>
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
              <h3 className="font-bold text-green-800 text-lg">맞는 제품으로 잘 주문하신 경우</h3>
            </div>
            <p className="text-green-700 text-sm break-keep">
              고객님의 뚜껑 캡이 아래 사진의 <strong>모델</strong>과 똑같다면<br />
              알맞은 고무패킹(신형모델)을 주문하신겁니다.
            </p>
          </div>
          <div className="p-5 flex flex-col gap-4 items-center justify-center bg-white relative">
            <div className="relative w-full aspect-[3/1] max-w-[360px] overflow-hidden rounded-lg shadow-sm border border-gray-100 ring-4 ring-green-50">
              <Image 
                src="/uploaded_cap.png" 
                alt="올바른 모델 뚜껑 캡 이미지 (4가지 종류)"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-full aspect-[4/3] max-w-[360px] overflow-hidden rounded-lg shadow-sm border border-gray-100 ring-4 ring-green-50">
              <Image 
                src="/pressure_cooker_guide.png" 
                alt="올바른 모델 압력솥 이미지"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-full aspect-[4/3] max-w-[360px] overflow-hidden rounded-lg shadow-sm border border-gray-100 ring-4 ring-green-50 bg-gray-50/50">
              <Image 
                src="/new_gasket.png" 
                alt="신형 고무패킹 이미지"
                fill
                className="object-contain p-2"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                신형 고무패킹 (본 상품)
              </span>
            </div>
          </div>
          <div className="px-5 pb-6 pt-3 bg-green-50/50 text-center border-t border-green-100">
            <p className="text-green-800 text-sm font-bold break-keep leading-relaxed">
              알맞은 모델로 주문하신 경우<br />
              <span className="text-green-600 text-[15px] sm:text-base mt-2 block font-black underline underline-offset-4 decoration-green-300">
                제품은 당일발송되오니<br />
                따로 문자 답신 안주셔도 됩니다.
              </span>
            </p>
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
              이번에 주문하신 고무패킹은 사용이 되지 않습니다.<br />
              (쿠팡에서 취소하시고 구형모델로 새로주문해주세요)
            </p>
            <p className="text-red-600 text-xs font-bold mt-2.5 break-keep leading-relaxed">
              ⚠️ 오후 3시까지 취소하셔야 취소처리되오며<br />
              3시 이후에는 물건이 발송한 이후라 취소처리가 안됩니다.
            </p>
          </div>
          <div className="p-5 flex flex-col gap-4 items-center justify-center bg-white">
            <div className="relative w-full aspect-[3/1] max-w-[360px] overflow-hidden rounded-lg border border-red-100 mix-blend-multiply">
              <Image 
                src="/wrong_cap2.png" 
                alt="잘못된 모델 뚜껑 캡 예시"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-full aspect-[4/3] max-w-[360px] overflow-hidden rounded-lg shadow-sm border border-gray-100 ring-4 ring-red-50">
              <Image 
                src="/wrong_cooker_guide.png" 
                alt="잘못된 모델 압력솥 이미지"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-full aspect-[4/3] max-w-[360px] overflow-hidden rounded-lg shadow-sm border border-gray-100 ring-4 ring-red-50 bg-gray-50/50">
              <Image 
                src="/old_gasket.png" 
                alt="구형 고무패킹 이미지"
                fill
                className="object-contain p-2"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                구형 고무패킹 (이 제품으로 변경 주문)
              </span>
            </div>
          </div>
          
          <div className="p-5 bg-red-50/50 border-t border-red-100 flex flex-col gap-3 items-center text-center">
            <p className="text-sm font-medium text-red-800 break-keep">
              구형 고무패킹이 필요하신 고객님은<br />
              아래 구매하기 버튼 클릭하셔서<br />
              구형으로 주문해주시기 바랍니다.
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
          </div>
        </article>

      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 px-6 mt-auto">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2 break-keep">
            이해가 안되거나 궁금한점이 있는경우<br />
            아래 연락처로 문자 부탁드립니다
          </p>
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
    </main>
  );
}

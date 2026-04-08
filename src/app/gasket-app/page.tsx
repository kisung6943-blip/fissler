"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";

// --- 브랜드/모델 데이터 ---
const BRANDS = [
  { id: "fissler", name: "휘슬러", sub: "Fissler", color: "blue" },
  { id: "wmf", name: "WMF · 타파웨어", sub: "단일 모델", color: "gray" },
  { id: "silit", name: "실리트", sub: "Silit · 단일 모델", color: "green" },
  { id: "others", name: "타브랜드 압력솥", sub: "브랜드 모름 · 구매 불가", color: "red", ghost: true },
];

const FISSLER_MODELS = [
  { id: "old", name: "구형 (A모델)", sub: "주황 계열", color: "orange" },
  { id: "new", name: "신형 (B모델)", sub: "초록 계열", color: "green" },
];

const FISSLER_CAPS = [
  { id: "small", name: "소형캡", sub: "18cm용" },
  { id: "medium", name: "중형캡", sub: "22cm용" },
  { id: "large", name: "대형캡", sub: "26cm용" },
];

const SIZES: Record<string, any[]> = {
  fissler: [
    { cap: "2.5L", size: "18cm (180mm)" },
    { cap: "4.5L", size: "22cm (220mm)" },
    { cap: "6.0L", size: "26cm (260mm)" },
  ],
  wmf: [
    { cap: "2.5L", size: "18cm (180mm)", info: "전 모델" },
    { cap: "3L (익스프레스)", size: "20cm (200mm)", warning: "퍼펙트/플러스와 다름 주의" },
    { cap: "3L (퍼펙트/플러스)", size: "22cm (220mm)", warning: "익스프레스와 다름 주의" },
  ],
  silit: [
    { cap: "2.5L", size: "18cm (180mm)" },
    { cap: "3.0L", size: "22cm (220mm)" },
  ],
};

const PURCHASE_LINKS: Record<string, string> = {
  fissler_old: "https://www.coupang.com/vp/products/7208650431",
  fissler_new: "https://www.coupang.com/vp/products/example-new", // 실제 링크로 교체 필요
  wmf: "https://www.coupang.com/vp/products/example-wmf",
  silit: "https://www.coupang.com/vp/products/example-silit",
};

// --- 컴포넌트 시작 ---

function GasketAppContent() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [cap, setCap] = useState("");
  const [size, setSize] = useState<any>(null);

  // 선택 초기화 함수
  const resetAfterBrand = () => { setModel(""); setCap(""); setSize(null); };
  const resetAfterModel = () => { setCap(""); setSize(null); };

  const handleBrandSelect = (id: string) => {
    setBrand(id);
    resetAfterBrand();
    if (id === "others") {
      setStep(4);
    } else if (id === "fissler") {
      setStep(2);
    } else {
      setStep(3); // WMF, 실리트는 바로 용량 선택
    }
  };

  const handleModelSelect = (id: string) => {
    setModel(id);
    resetAfterModel();
    // 휘슬러는 캡 선택 단계를 보여줄 수 있음 (PRD 4.3)
    // 여기서는 단순화를 위해 모델 선택 후 바로 용량으로 이동
    setStep(3);
  };

  const handleSizeSelect = (item: any) => {
    setSize(item);
    setStep(4);
    // 선택 즉시 결과로 스크롤 (UX 5.1)
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-20">
      {/* Header (4.1) */}
      <header className="bg-white border-b border-gray-200 px-6 py-8 text-center sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl md:text-2xl font-black tracking-tight mb-2 break-keep">
          압력밥솥 고무패킹 실수하지 않고 주문하는 방법
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-4 break-keep">
          브랜드 → 모델 → 사이즈 순서로 선택하면 정확한 패킹을 찾아드려요
        </p>
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 font-bold text-sm md:text-base inline-block">
          ⚠️ 지름만 재시고 아무 패킹이나 주문하시면 절대 안됩니다!
        </div>
      </header>

      <div className="p-4 md:p-6 flex flex-col gap-8">
        
        {/* STEP 1: 브랜드 선택 (4.2) */}
        <section className={`transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-30 blur-sm pointer-events-none"}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded">STEP 1</span>
            <h2 className="text-lg font-bold">브랜드를 선택해 주세요</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BRANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBrandSelect(b.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-1 h-32 ${
                  brand === b.id 
                    ? "border-blue-600 bg-blue-50 ring-4 ring-blue-50" 
                    : "border-white bg-white shadow-sm hover:border-gray-200"
                } ${b.ghost ? "border-dashed border-gray-300 opacity-80" : ""}`}
              >
                <span className="text-lg font-black">{b.name}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{b.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* STEP 2: 모델 선택 (휘슬러 전용) (4.3) */}
        {brand === "fissler" && (
          <section className={`transition-all duration-500 ${step >= 2 ? "opacity-100" : "opacity-0 invisible h-0"}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded">STEP 2</span>
              <h2 className="text-lg font-bold">휘슬러 모델을 선택해 주세요</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {FISSLER_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModelSelect(m.id)}
                  className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-1 h-28 ${
                    model === m.id 
                      ? "border-blue-600 bg-blue-50 ring-4 ring-blue-50" 
                      : "border-white bg-white shadow-sm hover:border-gray-200"
                  }`}
                >
                  <span className={`text-sm font-bold px-2 py-0.5 rounded-full mb-1 ${m.id === 'old' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                    {m.sub}
                  </span>
                  <span className="text-base font-black">{m.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* STEP 3: 용량 선택 (4.4) */}
        {brand && brand !== "others" && (
          <section className={`transition-all duration-500 ${step >= 3 ? "opacity-100" : "opacity-0 invisible h-0"}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded">STEP 3</span>
              <h2 className="text-lg font-bold">밥솥 용량(규격)을 선택해 주세요</h2>
            </div>
            
            {/* 측정 가이드 박스 */}
            <div className="bg-white p-4 rounded-2xl border border-blue-100 mb-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                올바른 측정 방법 가이드
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 bg-green-50 p-3 rounded-xl">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">O 올바른 측정</span>
                  <span className="text-xs font-black text-gray-800">내경 (안쪽만)</span>
                  <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center text-[10px] text-green-600 font-black">내경</div>
                </div>
                <div className="flex flex-col items-center gap-2 bg-red-50 p-3 rounded-xl">
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">X 잘못된 측정</span>
                  <span className="text-xs font-black text-gray-800">외경 (고무포함)</span>
                  <div className="w-16 h-16 rounded-full border-4 border-red-400 flex items-center justify-center text-[10px] text-red-500 font-black">외경</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 text-center break-keep">
                고무 두께를 제외하고 철판 안쪽의 지름(내경)을 재야 정확합니다.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {(SIZES[brand] || []).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSizeSelect(item)}
                  className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                    size?.cap === item.cap 
                      ? "border-blue-600 bg-blue-50 ring-4 ring-blue-50" 
                      : "border-white bg-white shadow-sm hover:border-gray-200"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-black">{item.cap}</span>
                    <span className="text-xs text-gray-500 font-medium">안쪽 내경: {item.size}</span>
                  </div>
                  {item.warning && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                      {item.warning}
                    </span>
                  )}
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* STEP 4/RESULT: 결과 화면 (4.5) */}
        {step === 4 && (
          <section className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {brand === "others" ? (
              <div className="bg-gray-100 border border-gray-200 p-8 rounded-3xl text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">🚫</div>
                <h3 className="text-xl font-bold text-gray-800">죄송합니다</h3>
                <p className="text-gray-600 break-keep text-sm leading-relaxed">
                  휘슬러 · WMF · 타파웨어 · 실리트 이외의 브랜드는<br />현재 저희가 취급하고 있지 않습니다.
                </p>
                <button onClick={() => { setStep(1); setBrand(""); }} className="text-blue-600 font-bold text-sm underline mt-2">다른 브랜드 찾아보기</button>
              </div>
            ) : size && (
              <div className="bg-white border-2 border-blue-600 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs">확인 완료</div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-blue-600 bg-blue-50 self-start px-2 py-0.5 rounded uppercase tracking-tighter">
                    {BRANDS.find(b => b.id === brand)?.name}
                  </span>
                  <h3 className="text-2xl font-black break-keep">
                    {brand === 'fissler' ? `${FISSLER_MODELS.find(m => m.id === model)?.name} ` : ''}
                    {size.cap} 전용 패킹
                  </h3>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl flex flex-col gap-3">
                  <p className="text-sm font-medium text-gray-700">이 규격을 구매하시면 정확히 맞습니다.</p>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="py-2 text-gray-500">브랜드</td><td className="py-2 font-bold text-right">{BRANDS.find(b => b.id === brand)?.name}</td></tr>
                      <tr><td className="py-2 text-gray-500">규격(내경)</td><td className="py-2 font-bold text-right text-blue-600">{size.size}</td></tr>
                      <tr><td className="py-2 text-gray-500">용량</td><td className="py-2 font-bold text-right">{size.cap}</td></tr>
                      {brand === 'fissler' && (
                        <tr><td className="py-2 text-gray-500">모델</td><td className="py-2 font-bold text-right">{FISSLER_MODELS.find(m => m.id === model)?.name}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {brand === 'fissler' && model === 'old' && (
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-orange-800 text-xs leading-relaxed font-medium break-keep">
                    📣 <strong>주의:</strong> 구형(A모델) 패킹은 신형(B모델)과 서로 호환되지 않습니다. 고객님의 뚜껑 캡 모양을 꼭 다시 한번 확인해 주세요.
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2">
                  <a 
                    href={PURCHASE_LINKS[`${brand}${model ? '_'+model : ''}`] || PURCHASE_LINKS[brand] || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-black py-5 px-6 rounded-2xl shadow-lg shadow-blue-200 text-center text-lg flex items-center justify-center gap-2"
                  >
                    이 패킹 주문하러 가기
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <button 
                    onClick={() => { setStep(1); setBrand(""); resetAfterBrand(); }}
                    className="text-gray-400 font-bold text-sm py-2 hover:text-gray-600 transition-colors"
                  >
                    다시 선택하기
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <footer className="mt-auto px-6 py-10 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">이에스리빙 고객센터 1877-6945</p>
          <p className="text-[10px] text-gray-300">© 2026 ESLiving. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function GasketApp() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩 중...</div>}>
      <GasketAppContent />
    </Suspense>
  );
}

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    PartnersCoupang?: {
      G: new (config: {
        id: number;
        template: string;
        trackingCode: string;
        width: string;
        height: string;
        tsource: string;
        subId?: string;
        container?: HTMLElement;
      }) => void;
    };
  }
}

export function CoupangAd() {
  const adRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current || !adRef.current) return;
    initRef.current = true;

    const loadCoupangAd = () => {
      if (window.PartnersCoupang && adRef.current) {
        try {
          // 기존 광고 내용 제거
          adRef.current.innerHTML = '';

          // 광고 컨테이너에 고유 ID 설정
          const containerId = 'coupang-ad-container-' + Date.now();
          adRef.current.id = containerId;

          // 모바일에서 안정적인 광고 크기 설정
          const isMobile = window.innerWidth <= 768;
          const adWidth = isMobile ? 320 : 680;  // 모바일은 고정 320px, 데스크톱은 680px
          
          new window.PartnersCoupang.G({
            id: 880260,
            template: "carousel",
            trackingCode: "AF9769213",
            width: adWidth.toString(),
            height: "140",
            tsource: "",
            container: adRef.current
          });

          // 광고 로드 후 컨테이너 크기 고정
          setTimeout(() => {
            if (adRef.current) {
              adRef.current.style.width = `${adWidth}px`;
              adRef.current.style.maxWidth = `${adWidth}px`;
              adRef.current.style.minWidth = `${adWidth}px`;
              adRef.current.style.overflow = 'hidden';
              
              // 광고 내부 요소들도 크기 고정
              const adElements = adRef.current.querySelectorAll('*');
              adElements.forEach((el: Element) => {
                const htmlEl = el as HTMLElement;
                if (htmlEl.style) {
                  htmlEl.style.maxWidth = `${adWidth}px`;
                  htmlEl.style.boxSizing = 'border-box';
                }
              });
            }
          }, 500);
        } catch (error) {
          console.error('Coupang ad error:', error);
          if (adRef.current) {
            adRef.current.innerHTML = '<p class="text-gray-400 text-center text-sm">광고를 불러올 수 없습니다</p>';
          }
        }
      }
    };

    // 약간의 지연을 두어 DOM이 완전히 준비된 후 실행
    const timer = setTimeout(() => {
      // 스크립트가 이미 로드되어 있는지 확인
      if (window.PartnersCoupang) {
        loadCoupangAd();
      } else {
        // 스크립트 로드
        const script = document.createElement('script');
        script.src = 'https://ads-partners.coupang.com/g.js';
        script.async = true;
        script.onload = loadCoupangAd;
        script.onerror = () => {
          if (adRef.current) {
            adRef.current.innerHTML = '<p class="text-gray-400 text-center text-sm">광고 스크립트를 불러올 수 없습니다</p>';
          }
        };
        document.head.appendChild(script);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={adRef}
      className="w-full min-h-[140px] flex items-center justify-center bg-transparent mx-auto overflow-hidden"
      style={{ 
        maxWidth: '680px',
        width: '100%',
        minWidth: window.innerWidth <= 768 ? '320px' : '680px',
        boxSizing: 'border-box'
      }}
    >
      <div className="text-gray-400 text-sm animate-pulse">
        광고 로딩 중...
      </div>
    </div>
  );
}
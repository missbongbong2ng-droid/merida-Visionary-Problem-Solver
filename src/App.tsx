import { useEffect, useState, useRef } from 'react';

const profileImg = new URL('./\uAE40\uD654\uC601_\uD504\uB85C\uD5441.png', import.meta.url).href;

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use refs to store critical animation state and prevent stale closures
  const stateRef = useRef({
    currentIdx: 0,
    isScrolling: false,
    animationCompleted: false,
    timer: null as any
  });

  const goToSection = (nextIdx: number) => {
    // Avoid re-triggering if scrolling or targeting the same section
    if (nextIdx === stateRef.current.currentIdx || stateRef.current.isScrolling) return;

    const sections = document.querySelectorAll('.section');
    const indicators = document.querySelectorAll('.indicator');

    if (nextIdx < 0 || nextIdx >= sections.length) return;

    stateRef.current.isScrolling = true;
    stateRef.current.animationCompleted = false; // Start scroll block lock

    // Clear animations on old active section classes
    sections[stateRef.current.currentIdx]?.classList.remove('active');
    indicators[stateRef.current.currentIdx]?.classList.remove('active');

    const prevElements = sections[stateRef.current.currentIdx]?.querySelectorAll('.anim-element');
    prevElements?.forEach(el => el.classList.remove('reveal'));

    // Align new active indexes
    stateRef.current.currentIdx = nextIdx;
    setCurrentIdx(nextIdx);

    sections[nextIdx]?.classList.add('active');
    indicators[nextIdx]?.classList.add('active');

    if (stateRef.current.timer) {
      clearTimeout(stateRef.current.timer);
    }

    stateRef.current.timer = setTimeout(() => {
      triggerSequentialAnimation(nextIdx);
    }, 400);
  };

  // Bounce/Popup sequential animation logic
  const triggerSequentialAnimation = (idx: number) => {
    const sections = document.querySelectorAll('.section');
    const elements = sections[idx]?.querySelectorAll('.anim-element');

    if (!elements || elements.length === 0) {
      stateRef.current.animationCompleted = true;
      stateRef.current.isScrolling = false;
      return;
    }

    let delay = 0;
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('reveal');

        // Once the final element has fully animated, release the scroll block lock
        if (index === elements.length - 1) {
          setTimeout(() => {
            stateRef.current.animationCompleted = true;
            stateRef.current.isScrolling = false;
          }, 500);
        }
      }, delay);
      delay += 200; // Bounce rhythm time difference
    });
  };

  useEffect(() => {
    // Initial paint load animation
    triggerSequentialAnimation(0);

    // Capture wheel scroll events
    const handleWheel = (e: WheelEvent) => {
      // If anim is active or scroll is locked, ignore wheel scroll
      if (stateRef.current.isScrolling || !stateRef.current.animationCompleted) return;

      const sections = document.querySelectorAll('.section');
      if (e.deltaY > 0) {
        if (stateRef.current.currentIdx < sections.length - 1) {
          goToSection(stateRef.current.currentIdx + 1);
        }
      } else {
        if (stateRef.current.currentIdx > 0) {
          goToSection(stateRef.current.currentIdx - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (stateRef.current.timer) {
        clearTimeout(stateRef.current.timer);
      }
    };
  }, []);

  return (
    <>
      {/* 상단 고정 헤더 배지 */}
      <div className="wero-header-logo">
        <div className="logo-box">CX</div>
        <span>Meriah Portfolio</span>
      </div>

      {/* 우측 페이지 도트 인디케이터 */}
      <div className="indicator-container pointer-events-auto">
        <div
          className={`indicator ${currentIdx === 0 ? 'active' : ''}`}
          onClick={() => goToSection(0)}
        ></div>
        <div
          className={`indicator ${currentIdx === 1 ? 'active' : ''}`}
          onClick={() => goToSection(1)}
        ></div>
        <div
          className={`indicator ${currentIdx === 2 ? 'active' : ''}`}
          onClick={() => goToSection(2)}
        ></div>
        <div
          className={`indicator ${currentIdx === 3 ? 'active' : ''}`}
          onClick={() => goToSection(3)}
        ></div>
        <div
          className={`indicator ${currentIdx === 4 ? 'active' : ''}`}
          onClick={() => goToSection(4)}
        ></div>
      </div>

      <div className="container">
        
        {/* SECTION 1: HERO */}
        <div className={`section ${currentIdx === 0 ? 'active' : ''}`} id="sec0">
          <div className="hero-flex-layout anim-element">
            <div className="profile-img-container">
              <img 
                src={profileImg} 
                className="profile-img" 
                alt="김화영 CX 전문가" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hero-text-container">
              <h1>고객의 목소리에서 경험을 기획하는, CX 전문가 <span>김화영</span> 입니다.</h1>
              
              <div className="subtitle-callout">
                <p className="callout-line1">가장 먼저 고객을 만나는 사람이,<br />서비스를 바꾸는 전사적 Problem Solver가 됩니다.</p>
                <p className="callout-line2">단순한 민원 해결에 그치지 않고, 수집된 VOC를 데이터화하여<br />내부 부서와 협업을 통해 서비스 및 정책 개선을 이끌어냅니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CORE STATS */}
        <div className={`section ${currentIdx === 1 ? 'active' : ''}`} id="sec1">
          <div className="content-width-wrapper">
            <h2 className="anim-element">Operation Competencies</h2>
            <div className="grid-container anim-element">
              <div className="card">
                <div className="card-num">10<span>년+</span></div>
                <div className="card-title">CX 및 서비스 운영 총괄</div>
                <div className="card-desc">스타트업 및 교육 플랫폼 환경에서 CS 조직을 CX(고객경험) 관점으로 리빌딩하고 옴니채널 관리 체계를 최적화했습니다.</div>
              </div>
              <div className="card">
                <div className="card-num">100<span>%</span></div>
                <div className="card-title">자동화 인프라 최적화</div>
                <div className="card-desc">온·오프라인 통합 고객 대응 체계를 확립하고, 고객 편의성을 위한 ARS 안내 및 챗봇 시나리오를 직접 설계·제작했습니다.</div>
              </div>
              <div className="card">
                <div className="card-num">40<span>%</span></div>
                <div className="card-title">탁월한 마진율 관리 이력</div>
                <div className="card-desc">공공기관 및 지자체 주최 교육 용역 사업의 총괄 PM으로서 철저한 리소스 관리로 평균 40%의 높은 마진율을 달성했습니다.</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROJECT 1 */}
        <div className={`section ${currentIdx === 2 ? 'active' : ''}`} id="sec2">
          <div className="content-width-wrapper">
            <h2 className="anim-element">phase 1 | VOC데이터 자산화 및 인프라 구축</h2>
            <div className="project-list anim-element">
              <ul>
                <li><span className="highlight-text">전사 VOC 데이터화 기반의 서비스 개선 (Planning Loop)</span><br />상담 지수 집계 및 분석을 통해 정기적인 VOC 리포트를 발행하고, 기획·개발 부서와의 긴밀한 협의를 주도하여 앱/웹 서비스의 실질적인 UI/UX 개선 방안을 도출했습니다.</li>
                <li><span className="highlight-text">옴니채널 인프라 및 자동화 대응 체계 확립</span><br />채팅 및 SNS 상담 창구를 신설하여 B2B/B2C 통합 대응 체계를 구축하고, ARS 시나리오 최적화로 단순 반복 문의를 무인화 처리하여 상담 오퍼레이션 효율성을 극대화했습니다.</li>
                <li><span className="highlight-text">상담 품질 표준화 및 리스크 안전망 구축</span><br />전사 전용 업무 매뉴얼 및 부서 운영 지침을 정립하여 신규 입사자 온보딩 기간을 3주에서 1주로 단축시켰으며, 감정노동자 보호조치법에 따른 프로세스를 기획하여 중대 민원 방어 체계를 확립했습니다.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 4: PROJECT 2 */}
        <div className={`section ${currentIdx === 3 ? 'active' : ''}`} id="sec3">
          <div className="content-width-wrapper">
            <h2 className="anim-element">phase 2 | AI skill-up을 통한 업무 효율화 구축</h2>
            <div className="project-list anim-element">
              <ul>
                <li><span className="highlight-text">AI 사업 기획 TF 참여 및 바이브코딩 실무 활용</span><br />생성형 AI 툴과 로우코드/노코드 솔루션을 CX 오퍼레이션 영역에 선제적으로 도입하여, 내부 업무 프로세스를 자동화하고 사내 리포트 작성 등 정보 취합 생산성을 혁신했습니다.</li>
                <li><span className="highlight-text">AI 솔루션 서비스 프로토타이핑 및 서비스 런칭</span><br />비개발자 관점에서 AI 가이드를 다루는 바이브코딩 역량을 바탕으로 TF를 주도하여 테크 기반의 신규 사업 아이템(AI 기능 솔루션 서비스)을 성공적으로 발굴 및 런칭했습니다.</li>
                <li><span className="highlight-text">트렌디한 AI 역량 검증 및 시니어 인프라 확장</span><br />KT AICE Basic 이수 및 AI Short 부문 수상(Best First Time Filmmaker) 이력을 보유하여 테크 변화에 유연하게 대응하며, 능숙한 디지털 리터러시를 바탕으로 플랫폼 가입자 확장을 도모합니다.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 5: CONTACT */}
        <div className={`section ${currentIdx === 4 ? 'active' : ''}`} id="sec4">
          <div className="content-width-wrapper">
            <h2 className="anim-element">Ready to Build, Ready to Guard</h2>
            <p className="subtitle anim-element text-center max-w-4xl font-semibold leading-relaxed">
              따뜻하고 명확한 고객 커뮤니케이션감각과 논리적이고 체계적인 내부 정책을 가지고 당신의 플랫폼 &apos;빼기&apos;의 든든한 CX Operation 인재,<br />Think tank로 최선을 다하겠습니다.<br />
              <span className="block mt-4 text-base opacity-95 italic">
                &quot;I will serve as a reliable think tank to elevate your platform&apos;s customer experience. from kim Hwa Young&quot;
              </span>
            </p>
            <div className="btn-container anim-element justify-center">
              <button className="btn-contact cursor-pointer" onClick={() => setIsModalOpen(true)}>Contact</button>
            </div>
          </div>
        </div>

      </div>

      {/* 연락처 상세 정보 팝업 모달 */}
      {isModalOpen && (
        <div className="modal-backdrop pointer-events-auto" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Contact Info</h3>
            <div className="modal-body-content">
              <div className="contact-item">
                <span className="contact-label">📞 Phone</span>
                <a href="tel:010-8224-1902" className="contact-value">010-8224-1902</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">✉️ Email</span>
                <a href="mailto:missbongbong2ng@gmail.com" className="contact-value">missbongbong2ng@gmail.com</a>
              </div>
            </div>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState, useRef } from 'react';

const profileImg = new URL('./김화영_프로필1.png', import.meta.url).href;
const act1Img = new URL('./교육 강사_1.jpg', import.meta.url).href;
const act2Img = new URL('./교육 강사_2.jpg', import.meta.url).href;
const act3Img = new URL('./교육 강사_3.jpg', import.meta.url).href;
const act4Img = new URL('./교육 강사_4.jpg', import.meta.url).href;
const rep1Img = new URL('./예약성공율 증가.png', import.meta.url).href;
const rep2Img = new URL('./전년대비 매출증가율.png', import.meta.url).href;
const rep3Img = new URL('./b2g교육위탁사업 결산보고.png', import.meta.url).href;

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imgUrl: string;
  shortDesc: string;
  longDesc: string;
}

const activityData: GalleryItem[] = [
  {
    id: 'act1',
    title: '성북구 교육 용역 총괄 운영 및 메인강사',
    category: '활동 자료',
    imgUrl: act1Img,
    shortDesc: '반려동물 관리전문가 위탁 교육과정',
    longDesc: '성북구 반려동물 관리전문가 위탁 교육과정의 총괄 PM 및 메인 교육 운영을 담당했습니다. 풍부한 실무 데이터를 반영한 완성도 높은 맞춤형 교육 커뮤니케이션으로 수료생들의 높은 만족도 평점 사후 지표를 달성했습니다.'
  },
  {
    id: 'act2',
    title: '은평구 교육 용역 강사',
    category: '활동 자료',
    imgUrl: act2Img,
    shortDesc: '경력단절여성 대상 반려묘 위탁관리 교육과정',
    longDesc: '은평구 경력단절여성의 직업 기회 창출을 돕기 위해 시행한 반려묘 위탁관리 교육을 성황리에 진행했습니다. 실제 돌봄 매뉴얼과 비즈니스 에티켓을 결합해 수강생 친화적 교육 과정으로 확실한 자립 역량을 지원했습니다.'
  },
  {
    id: 'act3',
    title: '동대문구 교육 용역 강사',
    category: '활동 자료',
    imgUrl: act3Img,
    shortDesc: '청년지원 반려견 전문인력 양성과정 강의',
    longDesc: '동대문구 청년 세대를 대상으로 진행된 반려견 전문인력 양성과정에서 직무 소양 및 실전 대처가이드를 출강했습니다. 청년들이 현업에 빠르게 안착할 수 있도록 맞춤형 실전 대비 롤플레잉 세션 교육을 담당했습니다.'
  },
  {
    id: 'act4',
    title: '강북구 교육 용역 총괄 운영 및 메인강사',
    category: '활동 자료',
    imgUrl: act4Img,
    shortDesc: '중장년취업사관학교 반려동물 관리전문가 양성과정',
    longDesc: '강북구 중장년취업사관학교에서 제2의 멋진 커리어 디자인을 그리는 장년층 교육생 분들을 위해 양성과정을 직접 조율하고 메인 교육을 강연했습니다. 눈높이 맞춤형 안내 매뉴얼과 정교한 기획으로 감사와 우수 수강 후기를 얻었습니다.'
  }
];

const reportData: GalleryItem[] = [
  {
    id: 'rep1',
    title: '플랫폼 예약 성공율',
    category: '운영 DATA',
    imgUrl: rep1Img,
    shortDesc: '25년도 결산 보고',
    longDesc: '고객 예약 프로세스 전면 진단 및 간소화 인터페이스 개설을 추진하여 플랫폼 전반의 매칭/예약 성공율을 획기적으로 향상시킨 25년 연간 결산 지표입니다. 사용성 분석 기반의 민첩한 운영개선이 가져온 결과라고 자부합니다.'
  },
  {
    id: 'rep2',
    title: '플랫폼 매출증가율',
    category: '운영 DATA',
    imgUrl: rep2Img,
    shortDesc: '25년도 결산 보고',
    longDesc: '고객 맞춤형 웰링턴 기법과 AI 챗봇 시나리오 및 최적화 오퍼레이션(고객맞춤형 매칭서비스)을 연계해 매출액 성장율을 높일 수 있도록 최선을 다했습니다. 단순 상담 대응을 뛰어넘어, 비즈니스의 확실한 외형 성장에 직접적으로 기여하고 있음을 사내 보여줄 수 있었던 운영 데이터라고 생각합니다.'
  },
  {
    id: 'rep3',
    title: '지자체 교육 용역사업 결과',
    category: '운영 DATA',
    imgUrl: rep3Img,
    shortDesc: '25년도 결산 보고',
    longDesc: '24년 시범운영 이후 25년 처음으로 사업을 시작한 서울시 주요 자치구(성북, 은평, 동대문구 등)에서 수탁 운영한 인재양성 용역 사업들의 종합성과 보고 지표입니다. 리소스 소통, 교육 강의 완수, 운영간 프로세스 체계 효율적으로 개선하기 등 내실을 다지기 위해 힘써 평균 40%가 넘는 고 마진율과 무사고 전원 수료의 성과를 기록하였습니다.'
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);

  useEffect(() => {
    if (currentIdx === 1) {
      setActiveCardIdx(0);
      const interval = setInterval(() => {
        setActiveCardIdx((prev) => (prev !== null ? (prev + 1) % 3 : 0));
      }, 8000);
      return () => {
        clearInterval(interval);
      };
    } else {
      setActiveCardIdx(null);
    }
  }, [currentIdx]);

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
      // 900px 이하 모바일 환경에서는 풀페이지 스크롤 작용 차단 (네이티브 스크롤)
      if (window.innerWidth <= 900) return;

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

    // 터치 스와이프 최적화 (태블릿 및 터치 디바이스)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth <= 900) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth <= 900) return;
      if (stateRef.current.isScrolling || !stateRef.current.animationCompleted) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // 최소 50px 이상 쓸어넘겼을 때만 작동
      if (Math.abs(deltaY) < 50) return;

      const sections = document.querySelectorAll('.section');
      if (deltaY > 0) {
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
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (stateRef.current.timer) {
        clearTimeout(stateRef.current.timer);
      }
    };
  }, []);

  return (
    <>
      {/* 상단 고정 헤더 배지 */}
      <div className="wero-header-logo">
        <span>Merida&apos;s Portfolio</span>
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
        <div
          className={`indicator ${currentIdx === 5 ? 'active' : ''}`}
          onClick={() => goToSection(5)}
        ></div>
        <div
          className={`indicator ${currentIdx === 6 ? 'active' : ''}`}
          onClick={() => goToSection(6)}
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
              <div className={`card ${activeCardIdx === 0 ? 'hovered' : ''}`}>
                <div className="card-num">10<span>년+</span></div>
                <div className="card-title">CX 및 서비스 운영 총괄</div>
                <div className="card-desc">스타트업 및 교육 플랫폼 환경에서 CS 조직을 CX(고객경험) 관점으로 리빌딩하고 옴니채널 관리 체계를 최적화했습니다.</div>
              </div>
              <div className={`card ${activeCardIdx === 1 ? 'hovered' : ''}`}>
                <div className="card-num">100<span>%</span></div>
                <div className="card-title">자동화 인프라 최적화</div>
                <div className="card-desc">온·오프라인 통합 고객 대응 체계를 확립하고, 고객 편의성을 위한 ARS 안내 및 챗봇 시나리오를 직접 설계·제작했습니다.</div>
              </div>
              <div className={`card ${activeCardIdx === 2 ? 'hovered' : ''}`}>
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
                <li><span className="highlight-text">전사 VOC 데이터화 기반의 서비스 개선</span><br />상담 지수 집계 및 분석을 통해 정기적인 VOC 리포트를 발행하고, 기획·개발 부서와의 긴밀한 협의를 주도하여 앱/웹 서비스의 실질적인 UI/UX 개선 방안을 도출했습니다.</li>
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
                <li><span className="highlight-text">AI 사업 기획 TF 참여 및 바이브코딩 실무 활용</span><br />생성형 AI툴과 노코드 솔루션을 CX 오퍼레이션 영역에 도입하여 내부 업무 프로세스를 자동화하고 사내 리포트작성 등 정보 관리 생산성을 높이기 위해 노력하였습니다.</li>
                <li><span className="highlight-text">AI솔루션 서비스 TF 및 런칭</span><br />비개발자 관점에서 바이브코딩 역량을 바탕으로 TF팀으로써 신규 아이템(AI기능솔루션 서비스)을 발굴, 서비스 런칭을 하였습니다. (현재 경기도 일자리 재단 주관 박람회 파트너 기업 계약 성사)</li>
                <li><span className="highlight-text">트렌디한 AI역량 검증 및 시니어 인프라 확장</span><br />KT AICE Basic 이수 및 AI Short 부문 수상(Best First Time Filmmaker) 이력을 보유하여 산업 트렌드 변화에 유연하게 대응하며 능숙한 AI리터리시 를 바탕으로 관련 주제의 교육이나 서비스 기능 기획 등을 통해 가입자 확장을 이루기 위해 노력하였습니다.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 5: PHASE 3 GALLERY */}
        <div className={`section ${currentIdx === 4 ? 'active' : ''}`} id="sec_phase3">
          <div className="content-width-wrapper">
            <h2 className="anim-element">phase 3 | 활동 자료</h2>
            
            <div className="phase3-single-layout anim-element">
              {/* 활동 자료 (4개) */}
              <div className="grid-category-block">
                <div className="phase3-grid grid-4-cols">
                  {activityData.map((item) => (
                    <div 
                      key={item.id} 
                      className="phase3-card"
                      onClick={() => setSelectedGalleryItem(item)}
                    >
                      <div className="phase3-card-img-wrapper">
                        <img 
                          src={item.imgUrl} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="phase3-card-info">
                        <div className="phase3-card-title">{item.title}</div>
                        <div className="phase3-card-desc">{item.shortDesc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 6: PHASE 4 GALLERY */}
        <div className={`section ${currentIdx === 5 ? 'active' : ''}`} id="sec_phase4">
          <div className="content-width-wrapper">
            <h2 className="anim-element">phase 4 | 운영 DATA</h2>
            
            <div className="phase3-single-layout anim-element">
              {/* 운영 DATA (3개) */}
              <div className="grid-category-block">
                <div className="phase3-grid grid-3-cols">
                  {reportData.map((item) => (
                    <div 
                      key={item.id} 
                      className="phase3-card"
                      onClick={() => setSelectedGalleryItem(item)}
                    >
                      <div className="phase3-card-img-wrapper">
                        <img 
                          src={item.imgUrl} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="phase3-card-info">
                        <div className="phase3-card-title">{item.title}</div>
                        <div className="phase3-card-desc">{item.shortDesc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 7: CONTACT */}
        <div className={`section ${currentIdx === 6 ? 'active' : ''}`} id="sec4">
          <div className="content-width-wrapper">
            <h2 className="anim-element">Ready to Build, Ready to Guard</h2>
            <div className="subtitle anim-element text-center max-w-4xl font-semibold leading-relaxed">
              <span className="quote-decorated block">
                따뜻하고 명확한 고객 커뮤니케이션 감각과<br />
                논리적이고 체계적인 내부 정책을 가지고<br />
                당신의 플랫폼 &apos;빼기&apos;의 든든한<br />
                CX Operation 인재, Think tank로 최선을 다하겠습니다 !
              </span>
            </div>
            <div className="btn-container anim-element justify-center">
              <button className="btn-contact cursor-pointer" onClick={() => setIsModalOpen(true)}>Contact</button>
            </div>
          </div>
        </div>

      </div>

      {/* 활동 자료 및 결산 데이터 라이트박스 팝업 */}
      {selectedGalleryItem && (
        <div className="modal-backdrop pointer-events-auto" onClick={() => setSelectedGalleryItem(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="image-modal-img-container">
              <img 
                src={selectedGalleryItem.imgUrl} 
                className="image-modal-img" 
                alt={selectedGalleryItem.title} 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="image-modal-info">
              <span className="image-modal-tag">{selectedGalleryItem.category}</span>
              <h3 className="image-modal-title">{selectedGalleryItem.title}</h3>
              <div className="image-modal-desc-box">
                {selectedGalleryItem.longDesc}
              </div>
            </div>
            <button className="modal-close-btn self-end mt-2" onClick={() => setSelectedGalleryItem(null)}>
              Close
            </button>
          </div>
        </div>
      )}

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

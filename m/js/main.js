document.addEventListener("DOMContentLoaded", () => {
    // 페이지 로드 시 실행되는 함수

    const liveOnContainer = document.querySelector(".live_on");

    const onAirHtml = `
        <div class="live_img">
            <img src="images/live_img_01.jpg" alt="이 시각 대선 현장 가상 이미지"> <!-- 영상 임베드 시 수정 작업 필요 -->
        </div>
    `;
    liveOnContainer.insertAdjacentHTML("beforeend", onAirHtml);

    liveOnContainer.addEventListener("click", function () {
        const liveImg = this.querySelector('.live_img');
        liveImg.style.display = liveImg.style.display === "none" ? "block" : "none";
    });
});

// 이벤트
document.addEventListener("DOMContentLoaded", () => {
    // 페이지 로드 시 실행되는 함수

    // 슬라이드 쇼 설정
    const promoWrap = document.querySelector('.promo_wrap ul');
    const slickDots = document.querySelector('.slick-dots');
    const slickDotsItems = document.querySelectorAll('.slick-dots li');
    const slickDotsWidth = slickDotsItems[0].offsetWidth;
    const slickDotsLength = slickDotsItems.length;
    const slickDotsBox = slickDotsWidth * slickDotsLength;

    promoWrap.classList.add('slick');
    new Slick(promoWrap, {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    slickDots.style.width = `${slickDotsBox}px`;

    // 윈도우 크기 조절 시 실행되는 함수
    window.addEventListener("resize", () => {
        // 슬라이드 도트 크기 조절
        const slickResizeWidth = slickDotsItems[0].offsetWidth;
        if (window.innerWidth > 700 && slickResizeWidth === 80) {
            slickDots.style.width = `${slickDotsBox}px`;
        }
    });

    // 프로모션 슬라이드 개수 확인
    const promoList = document.querySelectorAll('.promo_wrap .slick-slide').length;
    const slickDotsItemsArray = Array.from(slickDotsItems);

    // 프로모션 슬라이드가 하나인 경우 도트 숨김
    slickDotsItemsArray.forEach(item => {
        if (promoList === 1) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });
});

class Slick {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    init() {
        // 슬라이드 쇼 초기화 및 설정
        this.element.classList.add('slick-initialized');
        this.element.innerHTML = this.element.innerHTML + this.element.innerHTML;
        this.element.style.transform = `translateX(0)`;
        this.slideIndex = 0;
        this.start();
    }

    start() {
        // 슬라이드 쇼 시작
        this.interval = setInterval(() => this.slide(), this.options.autoplaySpeed);
    }

    slide() {
        // 슬라이드 인덱스 증가
        this.slideIndex++;

        // 슬라이드 이동을 위한 변환값 계산
        const translateValue = -(this.slideIndex * this.element.offsetWidth);

        // 요소의 위치를 변경하여 슬라이드 효과 적용
        this.element.style.transform = `translateX(${translateValue}px)`;

        // 슬라이드 인덱스가 슬라이드 아이템 개수의 반을 넘어가면 처음으로 돌아감
        if (this.slideIndex >= this.element.childElementCount / 2) {
            this.slideIndex = 0;
            this.element.style.transform = `translateX(0)`;
        }
    }
}

// 영상으로 보는 대선 이슈
document.addEventListener("DOMContentLoaded", () => {
    // 페이지 로드 시 실행되는 함수

    // 해시태그 선택
    // 키워드 탭 아이템들을 선택해서 각각에 이벤트 리스너를 추가하는 부분
    const keywordTabItems = document.querySelectorAll('.keyword_tab ul li');
    keywordTabItems.forEach(item => {
        item.addEventListener('click', function () {
            // 현재 클릭된 아이템에 'keyword_active' 클래스 추가
            this.classList.add('keyword_active');

            // 다른 아이템들에 대해서는 'keyword_active' 클래스 제거
            keywordTabItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('keyword_active');
                }
            });
        });
    });


    // 반응형 height resize
    const keywordNews = document.querySelector('.keyword_news ul');
    const keywordNewsItems = document.querySelectorAll('.keyword_news ul li');
    const keywordHeight = keywordNewsItems[0].offsetHeight;

    // 키워드 뉴스의 높이를 조정하는 함수 정의
    const adjustKeywordNewsHeight = () => {
        const newHeight = keywordHeight; // 키워드 뉴스의 높이 값을 변수에 저장

        // 현재 창의 너비가 700px보다 큰 경우
        if (window.innerWidth > 700) {
            keywordNews.style.height = '231px'; // 높이를 231px로 조정
        } else {
            keywordNews.style.height = `${newHeight}px`; // 그 외의 경우 변수에 저장된 높이 값으로 조정
        }
    };

    adjustKeywordNewsHeight();

    window.addEventListener("resize", adjustKeywordNewsHeight);
});


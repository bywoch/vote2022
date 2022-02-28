// D-day
document.addEventListener('DOMContentLoaded', () => {
    const electionDate = new Date(2022, 2, 9); // 선거일 3월 9일 (월은 0부터 시작)
    const today = new Date();
    const timeGap = electionDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeGap / (1000 * 60 * 60 * 24)); // 남은 날짜 계산

    // D-day 출력
    const ddayElement = document.getElementById('dday');
    ddayElement.innerHTML = `D- ${daysLeft}`;
});

// Menu slide
document.addEventListener('DOMContentLoaded', () => {
    // 메뉴 슬라이드 관련
    const menuWrap = document.querySelector('.menu_wrap');
    const btnGnb = document.querySelector('.btn_gnb');
    const btnClose = document.querySelector('.btn_close');
    const btnGnbEvent = document.querySelector('.btnGnbEvent');

    // 메뉴 열기 버튼 클릭 이벤트
    btnGnb.addEventListener('click', () => {
        menuWrap.style.right = '0';
        menuWrap.classList.add('active');
        btnClose.style.display = 'block';
        btnGnb.style.display = 'none';
        btnGnbEvent.style.display = 'block';
        document.documentElement.classList.add('sortable-handler');
    });

    // 메뉴 닫기 버튼 및 메뉴 배경 클릭 이벤트
    function closeMenu() {
        menuWrap.style.right = '-90%';
        menuWrap.classList.remove('active');
        btnClose.style.display = 'none';
        btnGnb.style.display = 'block';
        btnGnbEvent.style.display = 'none';
        document.documentElement.classList.remove('sortable-handler');
    }

    btnClose.addEventListener('click', closeMenu);
    btnGnbEvent.addEventListener('click', closeMenu);
});

// Menu scroll event
document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 이벤트 처리
    window.addEventListener('scroll', () => {
        function scrollFix() {
            const scroll_top = window.scrollY;
            const header_h = 60;
            const navi = document.querySelector('.navi');
            const btnGnb = document.querySelector('.btn_gnb');
            const container = document.querySelector('.container');

            if (scroll_top > header_h) {
                navi.classList.add('fixed');
                btnGnb.style.top = '13px';
                container.style.marginTop = '45px';
            } else {
                navi.classList.remove('fixed');
                btnGnb.style.top = '73px';
                container.style.marginTop = '0';
            }
        }
        scrollFix();
    });
});

// 뉴스 리스트 반응형 height resize
document.addEventListener('DOMContentLoaded', () => {
    // 뉴스 리스트 높이 조정
    const newsListResize = () => {
        const newsLinks = document.querySelectorAll('.mbc-research .news_bx ul li a');
        const newsListItems = document.querySelectorAll('.mbc-research .news_bx ul li');

        newsLinks.forEach(link => {
            const linkHeight = link.offsetHeight;
            newsListItems.forEach(item => {
                item.style.height = linkHeight + 'px';
            });
        });
    };

    const keywordMoreButtons = document.querySelectorAll('.mbc-research .keyword_more');
    keywordMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            newsListResize();

            window.addEventListener('resize', () => {
                newsListResize();
            });
        });
    });
});

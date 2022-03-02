// 대선 알고보니
const algoboni = () => {
    const srt = document.querySelector('#algoboni_area li').offsetWidth;
    const dfg = document.querySelectorAll('#algoboni_area li').length;
    const zxc = srt * dfg;
    document.querySelector('#algoboni_area').style.width = zxc + 'px';
};

// 공약 탭
const huboTabs = () => {
    document.querySelectorAll('.candidate_section').forEach(section => {
        const huboWraps = section.querySelectorAll('.hubo_wrap');
        const huboTabs = section.querySelectorAll('.hubo_tabs li');

        huboWraps[0].style.display = 'block';
        huboTabs[0].classList.add('on');

        huboTabs.forEach((tab, index) => {
            tab.addEventListener('click', function () {
                huboTabs.forEach(tab => tab.classList.remove('on'));
                this.classList.add('on');
                const tabIndex = Array.from(this.parentElement.children).indexOf(this);
                huboWraps.forEach(wrap => wrap.style.display = 'none');
                huboWraps[tabIndex].style.display = 'block';
            });
        });
    });
};
// 지역별예측순위 가로 막대 그래프
const animateHorizontalGraphs = () => {
    document.querySelectorAll('.gr_bx .bar').forEach(bar => {
        const skills = bar.getAttribute('data-width');
        bar.style.width = skills + '%';
    });
};

// 페이지 로드 시 그래프 애니메이션 실행
document.addEventListener('DOMContentLoaded', () => {
    animateHorizontalGraphs();
});

// 스크롤 시 그래프 애니메이션 실행 (appear 라이브러리 없이)
document.addEventListener('scroll', () => {
    document.querySelectorAll('.gr_bx .bar').forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateHorizontalGraphs();
        }
    });
});

// 탭 클릭 시 해당 탭 및 내용 활성화
document.querySelectorAll('.deep_tab li').forEach(tab => {
    tab.addEventListener('click', function () {
        const tab_id = this.getAttribute('data-tab');
        document.querySelectorAll('.deep_tab li').forEach(tab => tab.classList.remove('on'));
        document.querySelectorAll('.deep_wrap').forEach(deepWrap => deepWrap.classList.remove('on'));
        this.classList.add('on');
        document.getElementById(tab_id).classList.add('on');
    });
});

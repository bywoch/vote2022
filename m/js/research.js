var Fn = Fn || {};

// bar-vertical 클래스의 각 li 요소에 애니메이션을 적용하는 함수
Fn.makeBarVertical = function () {
    const dur = 600; // 애니메이션 지속 시간
    let del = 0; // 애니메이션 딜레이

    // bar-vertical 클래스의 각 요소에 대해 반복
    document.querySelectorAll(".bar-vertical").forEach(barVertical => {
        // 각 li 요소에 대해 반복
        barVertical.querySelectorAll('li').forEach((item, index) => {
            const grp_w = item.offsetHeight; // li 요소의 높이
            const $bar = item.querySelector('.bar'); // .bar 요소
            const $move = item.querySelector('.move'); // .move 요소
            const num = (Number($bar.getAttribute("data-height")) / 100) * grp_w; // 애니메이션 높이 계산

            // .bar 요소의 애니메이션 적용
            $bar.style.bottom = -num + "px";
            $bar.style.height = num + "px";
            $bar.style.transition = "none";
            setTimeout(() => {
                $bar.style.transition = `bottom ${dur}ms ease-out`;
                $bar.style.bottom = "0";
            }, del);

            // .move 요소의 애니메이션 적용
            $move.style.bottom = "0";
            $move.style.transition = "none";
            setTimeout(() => {
                $move.style.transition = `bottom ${dur}ms ease-out`;
                $move.style.bottom = num + 10 + "px";
            }, del);

            // 다음 요소의 애니메이션 딜레이 증가
            del += 50; // 예시로 50ms 딜레이 추가
        });
    });
};

// bar-horizontal 클래스의 각 li 요소에 애니메이션을 적용하는 함수
Fn.makeBarH1 = function () {
    const dur = 600; // 애니메이션 지속 시간
    let del = 0; // 애니메이션 딜레이

    // bar-horizontal 클래스의 각 요소에 대해 반복
    document.querySelectorAll(".bar-horizontal").forEach(barHorizontal => {
        // 각 li 요소에 대해 반복
        barHorizontal.querySelectorAll('li').forEach((item, index) => {
            const grp_w = item.offsetWidth; // li 요소의 너비
            const $bar = item.querySelector('.bar'); // .bar 요소
            const $move = item.querySelector('.move'); // .move 요소
            const num = (Number($bar.getAttribute("data-width")) / 100) * grp_w; // 애니메이션 너비 계산

            // .bar 요소의 애니메이션 적용
            $bar.style.width = "0";
            $bar.style.transition = "none";
            setTimeout(() => {
                $bar.style.transition = `width ${dur}ms ease-out`;
                $bar.style.width = num + "px";
            }, del);

            // .move 요소의 애니메이션 적용
            $move.style.left = "0";
            $move.style.transition = "none";
            setTimeout(() => {
                $move.style.transition = `left ${dur}ms ease-out`;
                $move.style.left = num + "px";
            }, del);

            // 다음 요소의 애니메이션 딜레이 증가
            del += 50; // 예시로 50ms 딜레이 추가
        });
    });
};

// bar 그래프 가로
Fn.makeBarH2 = function () {
    document.querySelectorAll(".graph-group").forEach(graphGroup => {
        const grp_data = [];
        let sum = 0;
        const grp_w = graphGroup.offsetWidth;

        // .gbar 요소들의 데이터 추출 및 스타일 변경
        graphGroup.querySelectorAll('.graph > .gbar').forEach((gbar, index) => {
            const $per = gbar.querySelector('.per');
            grp_data.push(Number($per.textContent));
            const wv = (grp_data[index] * 0.01) * grp_w;
            const w = Math.floor(wv);
            gbar.style.width = w + "px";

            const ft_rbt = gbar.querySelector('.ft_rbt');
            if (gbar.offsetWidth < 65) {
                ft_rbt.style.display = "none";
            } else {
                ft_rbt.style.display = "block";
            }
            sum += w;
        });

        // 그래프의 너비 조정
        const graph = graphGroup.querySelector('.graph');
        if (sum > graph.offsetWidth) {
            graph.style.width = sum + "px";
        }

        // .grp-txt > li 요소들의 데이터 변경
        graphGroup.querySelectorAll('.grp-txt > li').forEach((item, index) => {
            const $color = item.querySelector('.color');
            const $num = item.querySelector('.ft_rbt');
            const $txt = item.querySelector('.txt');
            $num.textContent = grp_data[index] + '%';
        });
    });
};

// bar 그래프 막대 가로
Fn.makeBarH3 = function () {
    const dur = 600; // 애니메이션 지속 시간 (밀리초)
    const del = 0; // 애니메이션 시작 지연 시간 (밀리초)

    // 각 .graph-horizontal 요소에 대해 반복
    document.querySelectorAll(".graph-horizontal").forEach(graphHorizontal => {
        // 각 li 요소에 대해 반복
        graphHorizontal.querySelectorAll('li').forEach((item, index) => {
            const grp_w = item.offsetWidth; // li 요소의 너비
            const $bar = item.querySelector('.bar'); // 막대 요소
            const $move = item.querySelector('.move'); // 이동 요소
            const num = ((Number($bar.getAttribute("data-width")) / 100) * grp_w) / 2; // 막대의 너비 계산

            $bar.style.width = "0"; // 초기 너비 설정 후 애니메이션
            animateWidth($bar, num, dur);

            $move.style.left = "0"; // 초기 위치 설정 후 애니메이션
            animateLeft($move, num, dur);
        });
    });

    // 너비 변경 애니메이션 함수
    function animateWidth(element, targetWidth, duration) {
        const startTime = performance.now();
        const startWidth = parseFloat(getComputedStyle(element).width);

        // 너비 변경 애니메이션 함수
        function updateWidth(timestamp) {
            const elapsedTime = timestamp - startTime; // 경과 시간 계산
            if (elapsedTime >= duration) {
                element.style.width = targetWidth + "px"; // 지정된 너비로 설정하고 애니메이션 종료
                return;
            }

            const progress = elapsedTime / duration; // 경과 시간의 진행 상태 비율
            const currentWidth = startWidth + (progress * (targetWidth - startWidth)); // 현재 너비 계산
            element.style.width = currentWidth + "px"; // 현재 너비로 업데이트
            requestAnimationFrame(updateWidth); // 다음 프레임 요청
        }

        requestAnimationFrame(updateWidth);
    }

    // 위치 변경 애니메이션 함수
    function animateLeft(element, targetLeft, duration) {
        const startTime = performance.now(); // 애니메이션 시작 시간 기록
        const startLeft = parseFloat(getComputedStyle(element).left); // 시작 왼쪽 위치 계산

        function updateLeft(timestamp) {
            const elapsedTime = timestamp - startTime; // 경과 시간 계산
            if (elapsedTime >= duration) {
                element.style.left = targetLeft + "px"; // 목표 왼쪽 위치로 설정하고 애니메이션 종료
                return;
            }

            const progress = elapsedTime / duration; // 경과 시간의 진행 상태 비율
            const currentLeft = startLeft + (progress * (targetLeft - startLeft)); // 현재 왼쪽 위치 계산
            element.style.left = currentLeft + "px"; // 현재 왼쪽 위치로 업데이트
            requestAnimationFrame(updateLeft); // 다음 프레임 요청
        }

        requestAnimationFrame(updateLeft); // 애니메이션 시작
    }
};

// 바 그래프 가로 Window Resize 이벤트 처리
window.addEventListener('resize', () => {
    Fn.makeBarH1();
    Fn.makeBarH2();
    Fn.makeBarH3();
});

document.addEventListener('DOMContentLoaded', () => {
    // 바 그래프 생성 함수 호출
    if (document.querySelector('.bar-vertical')) {
        Fn.makeBarVertical();
    }
    if (document.querySelector('.bar-horizontal')) {
        Fn.makeBarH1();
    }
    if (document.querySelector('.graph-horizontal')) {
        Fn.makeBarH3();
    }
    Fn.makeBarH2();

    // Mobile-tab 초기화
    const resultCont = document.querySelectorAll('.wrap-result');
    resultCont.forEach((cont, index) => {
        // 첫 번째 탭 이외의 내용 숨김
        if (index !== 0) {
            cont.style.display = 'none';
        }
    });

    const pollDateItems = document.querySelectorAll('.poll-date ul li');
    pollDateItems.forEach(item => {
        // 탭 클릭 이벤트 핸들러 등록
        item.addEventListener('click', function () {
            this.classList.add('on'); // 클릭된 탭에 활성화 클래스 'on' 추가하여 시각적 효과 적용
        
            // 다른 탭 비활성화 처리
            const siblings = Array.from(this.parentElement.children).filter(sibling => sibling !== this);
            siblings.forEach(sibling => {
                sibling.classList.remove('on'); // 다른 탭의 활성화 클래스 'on' 제거하여 비활성화 상태 표시
            });
        
            // 현재 클릭한 탭의 인덱스 추출
            const index = Array.from(this.parentElement.parentElement.children).indexOf(this.parentElement.parentElement);
        
            // 해당 탭의 내용 보여주기
            resultCont.forEach((cont, contIndex) => {
                // contIndex와 index 비교하여 현재 탭과 일치하면 내용 표시, 그렇지 않으면 숨김
                cont.style.display = contIndex === index ? 'block' : 'none';
            });
        });
        
    });
});

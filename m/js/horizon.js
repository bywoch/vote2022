// Fn 객체를 선언하거나 기존 객체를 활용
const Fn = Fn || {};

// 문서가 로드되었을 때 실행되는 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // .bar-horizontal 요소가 존재하는지 확인하고 메서드 호출
    if (document.querySelectorAll('.bar-horizontal').length) {
        Fn.makeBarHorizontal();
    }

    // .graph-tab 내의 각 li 요소에 대해 반복문 실행
    document.querySelectorAll('.wrap-horizontal .graph-tab li').forEach((tab, index) => {
        // li 요소에 클릭 이벤트 리스너 추가
        tab.addEventListener('click', (e) => {
            // 모든 li 요소의 'on' 클래스 제거
            document.querySelectorAll('.wrap-horizontal .graph-tab li').forEach(tab => tab.classList.remove('on'));
            // 현재 클릭한 li 요소에 'on' 클래스 추가
            tab.classList.add('on');

            // 모든 .wrap-pre-vote > div 요소 숨기기
            document.querySelectorAll('.wrap-pre-vote > div').forEach(div => div.style.display = 'none');
            // 현재 클릭한 li 요소에 해당하는 .pre-vote 요소 표시
            document.querySelector(`.pre-vote${index + 1}`).style.display = 'block';

            // .bar-horizontal 요소가 존재하는지 확인하고 메서드 호출
            if (document.querySelectorAll('.bar-horizontal').length) {
                Fn.makeBarHorizontal();
            }
        });
    });
});

Fn.makeBarHorizontal = function () {
    const dur = 700;
    const del = 0;

    document.querySelectorAll('.bar-horizontal').forEach(bar => {
        if (bar.classList.contains('opp')) {
            const num1 = Number(bar.querySelector('.win1 .num').textContent);
            const num2 = Number(bar.querySelector('.win2 .num').textContent);
            const bar1 = bar.querySelector('.win1 .bar');
            const bar2 = bar.querySelector('.win2 .bar');
            const sum = num1 + num2;
            const per1 = (100 * num1) / sum;
            const per2 = (100 * num2) / sum;
            bar1.style.width = '0';
            bar2.style.width = '0';
            bar1.style.transition = `width ${dur}ms`;
            bar2.style.transition = `width ${dur}ms`;
            setTimeout(() => {
                bar1.style.width = `${per1}%`;
                bar2.style.width = `${per2}%`;
            }, 0);

            // 특정 ID를 가진 요소를 가져옵니다.
            const voteContainer = document.getElementById('vote_container');

            // 만약 특정 요소가 존재하고 해당 요소에 'spacialM' 클래스가 있는 경우
            if (voteContainer && voteContainer.classList.contains('spacialM')) {
                // 만약 해당 막대 그래프가 'top-rank' 클래스를 가진 부모 요소 안에 있는 경우
                if (bar.parentElement.classList.contains('top-rank')) {
                    // 수치 계산을 통해 임시 변수 값을 설정합니다.
                    const temp = Math.floor(Number(bar.querySelector('.win1').clientWidth) * (per1 * 0.01));

                    // 랭크 상태 요소를 선택합니다.
                    const rankState = document.querySelector('.rank-state');

                    // 랭크 상태의 위치 애니메이션을 설정하고 적용합니다.
                    rankState.style.transition = `left ${dur}ms`;
                    rankState.style.left = `${temp}px`;
                }
            }
            //bar 요소의 클래스 리스트에 'vs' 클래스가 포함되어 있는지를 확인
        } else if (bar.classList.contains('vs')) {
            const txt1 = bar.querySelector('.win1 .ft_rbt');
            const txt2 = bar.querySelector('.win2 .ft_rbt');
            const num1 = Number(bar.querySelector('.win1 .num').textContent);
            const num2 = Number(bar.querySelector('.win2 .num').textContent);
            const bar1 = bar.querySelector('.win1 .bar');
            const bar2 = bar.querySelector('.win2 .bar');
            bar1.style.width = '0';
            bar2.style.width = '0';
            bar1.style.transition = `width ${dur}ms`;
            bar2.style.transition = `width ${dur}ms`;
            setTimeout(() => {
                bar1.style.width = `${num1}%`;
                bar2.style.width = `${num2}%`;
            }, 0);

            txt1.classList.add('txt-out');
            txt2.classList.add('txt-out');
            txt1.style.right = '7px';
            txt2.style.left = '7px';
            txt1.style.transition = `right ${dur}ms`;
            txt2.style.transition = `left ${dur}ms`;
            setTimeout(() => {
                txt1.style.right = `${num1}%`;
                txt2.style.left = `${num2}%`;
            }, 0);
        } else {
            // bar 클래스 아래에 있는 li 요소들을 선택하여 각 li 요소에 대해 순회
            bar.querySelectorAll('li').forEach((li, index) => {
                // 현재 li 요소 안에 있는 .bar 클래스를 가진 요소를 선택
                const barElement = li.querySelector('.bar');
                // li 요소 안에 있는 숫자 데이터를 가져와서 숫자로 변환
                const num = Number(li.querySelector('.num').textContent);

                // 초기에는 막대의 너비를 0으로 설정
                barElement.style.width = '0';
                // 막대가 변화하는 애니메이션의 지속 시간과 딜레이를 설정
                barElement.style.transition = `width ${dur}ms ${index * del}ms`;

                // setTimeout을 이용하여 다음 프레임에서 막대의 너비를 변경
                setTimeout(() => {
                    barElement.style.width = `${num}%`;
                }, 0);
            });

        }
    });
};

// 숫자 카운터
$(function (pollCounter) {
    $('.counter').counterUp({
        delay: 5,
        time: 500
    });
});
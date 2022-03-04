// 지도 설정 및 데이터 처리 객체
const mapSet = {
    init: function () {
        // SVG 지도 컨테이너와 지역 텍스트 컨테이너에 대한 참조
        const $map = document.getElementById('svg-wrap');
        const $txt = document.getElementById('area-txt');
        let party_num;

        // 고급 모드가 활성화되었는지 확인하고, 파티 정보를 파싱
        if (adv_bol) {
            party_num = party.split("_");
        }

        // SVG, 지도, 그리고 파티 데이터의 카운트
        const svg_cnt = svg.length;
        const map_cnt = info.length;
        const party_cnt = party_color.length;

        // 지도를 그리고, 텍스트를 설정하고, 데이터를 매칭하는 작업
        this.mapdrow($map, party_cnt);
        this.txtset($txt, map_cnt);
        this.dataMaching();
    },

    mapdrow: function ($map, party_cnt) {
        let code = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="324px" height="546px" viewBox="-10 0 324 546" enable-background="new 0 0 399 660" xml:space="preserve">` +
            `<defs>`;

        for (let i = 1; i < party_cnt; i++) {
            code += `<pattern id="party_${i}" patternUnits="userSpaceOnUse" width="100" height="100">` +
                `<image xlink:href="${party_color[i].bgImg}" x="0" y="0" width="200" height="200" />` +
                `</pattern>`;
        }

        code += `</defs>` +
            `<g id="map_svg">`;

        for (let j = 1; j <= map_cnt; j++) {
            const code_num = info[j - 1].code;
            code += `<polygon class="area_${info[j - 1].code}" name="${info[j - 1].name}" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="${info[j - 1].point}"/>`;
        }

        code += `<polygon class="area_15" name="울릉도" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="308.6,141.8 310.4,140.9 312.2,141.8 312.2,145.4 309.5,148.2 307.7,146.3 307.7,141.8   "/>` +
            `<polygon class="area_15" name="독도" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="293.1,132.7 300.4,132.7 302.2,140.9 299.5,148.2 294.9,148.2 292.2,142.7 291.2,137.2   "/>` +
            `</g>` +
            `</svg>`;

        $map.innerHTML = code;
    },

    txtset: function ($txt, map_cnt) {
        let code = "";

        for (let j = 1; j <= map_cnt; j++) {
            code += `<span class="area_${info[j - 1].code}"><em>${info[j - 1].name}</em><strong>0%</strong></span>`;
        }

        $txt.innerHTML = code;
    },

    dataMaching: function () {
        // 지역 텍스트 컨테이너의 클래스 제거 및 모든 지역 텍스트 요소에 "empty" 클래스 추가
        $txt.removeAttribute('class');
        document.querySelectorAll('#area-txt > span').forEach(span => span.classList.add("empty"));

        // SVG 데이터 배열을 순회하며 처리
        for (let i = 0; i < svg_cnt; i++) {
            const cls = svg[i].cls; // 현재 SVG 데이터의 클래스 이름
            const area_num = cls.split("_"); // 지역 번호 정보
            let data = svg[i].percent; // 현재 SVG 데이터의 백분율 정보
            const party_no = svg[i].party.split("_"); // 현재 SVG 데이터의 파티 정보
            let fill = `url(#${svg[i].party})`; // 기본 채우기 스타일

            // 특정 조건에 따라 채우기 스타일 조정
            if (Number(party_no[1]) > 5) {
                fill = "url(#party_6)";
                if (Number(party_no[1]) === 15) {
                    fill = "url(#party_7)";
                }
            }

            // 백분율이 100.0인 경우 100으로 변경
            if (data === "100.0") {
                data = "100";
            }

            // 고급 모드가 활성화되었을 때 처리
            if (adv_bol) {
                // 채우기 스타일과 투명도 설정
                const per = ((Math.round(Math.floor(parseInt(data)) / 10) + 10) * 5) * 0.01;
                fill = party_color[party_num[1]].bg;
                // 현재 클래스를 가진 모든 요소의 채우기 스타일과 투명도 조정
                document.querySelectorAll(`.${cls}`).forEach(el => {
                    el.setAttribute('fill', fill);
                    el.style.opacity = per;
                });
                // 지역 텍스트 컨테이너에 해당 파티 클래스 추가
                $txt.classList.add(party);
            } else {
                // 고급 모드가 비활성화되었을 때 채우기 스타일 설정
                document.querySelectorAll(`.${cls}`).forEach(el => el.setAttribute('fill', fill));
            }

            // 해당 지역 텍스트 요소의 "empty" 클래스 제거
            document.querySelectorAll(`#${area - txt} .${cls}`).forEach(span => span.classList.remove("empty"));
            // 해당 지역 텍스트 요소의 강조 표시된 백분율 업데이트
            document.querySelectorAll(`#${area - txt} .${cls} strong`).forEach(strong => strong.textContent = `${data}%`);
        }
    }

};

// 페이지 로드 시 초기화 함수 호출
document.addEventListener('DOMContentLoaded', () => {
    mapSet.init
});

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('html').classList.contains('low-browser')) {
        const mapBtnLinks = document.querySelectorAll('.map-btn a');
        const candyMapLinks = document.querySelectorAll('.candy-map a');

        // 각 맵 버튼(전체, 파티, 기타)에 대한 클릭 이벤트 리스너 추가
        mapBtnLinks.forEach((link, index) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // 캔디 맵과 캔디 맵 링크 요소 선택
                const candyMap = document.querySelector('.candy-map');
                const candyMapLinks = document.querySelectorAll('.candy-map a');

                // 모든 캔디 맵 요소를 보이도록 설정
                candyMap.style.display = 'block';
                candyMapLinks.forEach(link => link.style.display = 'block');

                if (index === 0) { // 전체 맵 보기 선택 시
                    adv_bol = false;
                    candyMapLinks.forEach(link => link.classList.remove('on'));
                    candyMap.classList.remove('sup');
                    mapSet.init();
                } else if (index === 1) { // 파티 맵 보기 선택 시
                    adv_bol = true;
                    if (!this.classList.contains('on')) {
                        candyMapLinks[0].click();
                    }
                } else { // 기타 맵 보기 선택 시
                    adv_bol = true;
                    party = "party_0";
                    candyMapLinks.forEach(link => link.classList.remove('on'));
                    candyMap.style.display = 'none';
                    candyMapLinks.forEach(link => link.style.display = 'none');
                    mapSet.init();
                }

                // 다른 맵 버튼들의 활성화 상태 제거하고 선택한 버튼 활성화
                mapBtnLinks.forEach(link => link.classList.remove('on'));
                this.classList.add('on');
            });
        });


        // 각 캔디 맵 링크에 대한 클릭 이벤트 리스너 추가
        candyMapLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // 이미 활성화되어 있지 않은 경우에만 실행
                if (!this.classList.contains('on')) {
                    adv_bol = true;
                    party = this.getAttribute('class');

                    // 다른 캔디 맵 링크의 활성화 상태 제거하고 선택한 링크 활성화
                    candyMapLinks.forEach(link => link.classList.remove('on'));
                    this.classList.add('on');

                    // 보충 캔디 맵 보기 활성화
                    const candyMap = document.querySelector('.candy-map');
                    candyMap.classList.add('sup');

                    // 파티 관련 맵 네비게이션 활성화
                    // 두 번째 맵 네비게이션 요소 선택
                    const mapNavi2 = document.querySelector('.map-navi-2');

                    // 두 번째 맵 네비게이션 요소가 활성화되어 있지 않은 경우 실행
                    if (!mapNavi2.classList.contains('on')) {
                        // 모든 맵 버튼의 활성화 클래스 제거
                        mapBtnLinks.forEach(link => link.classList.remove('on'));

                        // 두 번째 맵 네비게이션 요소에 활성화 클래스 추가
                        mapNavi2.classList.add('on');
                    }


                    // 새로운 설정을 기반으로 지도 다시 초기화
                    mapSet.init();
                }
            });
        });

        mapSet.init();
    }
});


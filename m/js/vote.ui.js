$(function () {
    counterup('.fig_1');
    $('.dropdown').Dropdown();
});

//dropdown
class Dropdown {
    constructor(element, options) {
        if (!element) {
            // 요소가 존재하지 않으면 반환
            return false;
        }

        this.element = element; // Dropdown 요소
        this.$this = $(element); // jQuery 객체로 변환
        this.$options = options || {}; // 옵션 객체
        this.$buttonChoose = this.$this.find('.button-choose'); // 선택 버튼 요소
        this.$list = this.$this.find('.list'); // 목록 요소
        this.$listItems = this.$list.find('button'); // 목록의 각 항목 버튼 요소
        this.$textChoose = this.$options.text || ''; // 초기 선택 텍스트
        this.$index = this.$options.index || 1; // 초기 선택 인덱스

        this.init(); // 초기화 메서드 호출
    }

    init() {
        if (this.$textChoose !== '') {
            // 초기 선택 텍스트가 있는 경우 선택 버튼에 텍스트 설정
            this.setSelectedText(this.$buttonChoose, this.$textChoose);
        }
        this.bindHandlers(); // 이벤트 핸들러 등록
    }

    bindHandlers() {
        // 클릭 이벤트 핸들러 등록
        this.$this.on('click', (e) => {
            const $target = $(e.target);
            if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-choose')) {
                // 선택 버튼을 클릭한 경우 목록 확장/축소 처리
                this.toggleListExpanded();
            } else if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-item')) {
                // 목록의 항목 버튼을 클릭한 경우 선택된 텍스트 변경 및 목록 축소 처리
                this.$buttonChoose.text($target.text());
                this.unExpanded();
            }
        });
    }

    setSelectedText(element, text) {
        // 요소의 텍스트 변경
        element.text(text);
    }

    toggleListExpanded() {
        if (this.$listItems.length < 1) {
            return;
        }
        if (this.$list.hasClass('attached')) {
            this.unExpanded(); // 목록이 확장된 상태면 축소
        } else {
            this.expanded(); // 그렇지 않으면 확장
        }
    }

    expanded() {
        if (!this.$list.hasClass('attached')) {
            // 목록이 확장되지 않았을 경우 확장 처리
            this.$buttonChoose.addClass('expanded');
            this.$list.addClass('attached');
            this.$list.attr('aria-hidden', 'false');
        }
    }

    unExpanded() {
        if (this.$list.hasClass('attached')) {
            // 목록이 확장된 상태면 축소 처리
            this.$buttonChoose.removeClass('expanded');
            this.$list.removeClass('attached');
            this.$list.attr('aria-hidden', 'true');
        }
    }
}

// 사용 예시
const dropdownElement = document.querySelector('.dropdown');
const dropdownInstance = new Dropdown(dropdownElement, {
    text: 'Selected Option',
    index: 2
});

class Dropdown {
    constructor(element, options) {
        if (!element) {
            return false;
        }

        // 저장된 요소와 옵션 설정
        this.element = element;
        this.$this = $(element);
        this.$options = options || {};
        this.$buttonChoose = this.$this.find('.button-choose');
        this.$list = this.$this.find('.list');
        this.$listItems = this.$list.find('button');
        this.$textChoose = this.$options.text || '';
        this.$index = this.$options.index || 1;

        // 초기화 함수 호출
        this.init();
    }

    init() {
        // 선택된 텍스트 설정
        if (this.$textChoose !== '') {
            this.setSelectedText(this.$buttonChoose, this.$textChoose);
        }
        // 이벤트 핸들러 바인딩
        this.bindHandlers();
    }

    bindHandlers() {
        // 클릭 이벤트 핸들러
        this.$this.on('click', (e) => {
            const $target = $(e.target);
            if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-choose')) {
                this.toggleListExpanded();
            } else if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-item')) {
                this.$buttonChoose.text($target.text());
                this.unExpanded();
            }
        });
    }

    setSelectedText(element, text) {
        // 요소에 텍스트 설정
        element.text(text);
    }

    toggleListExpanded() {
        if (this.$listItems.length < 1) {
            return;
        }
        // 리스트 확장/축소 토글
        if (this.$list.hasClass('attached')) {
            this.unExpanded();
        } else {
            this.expanded();
        }
    }

    expanded() {
        if (!this.$list.hasClass('attached')) {
            // 리스트 확장 시 요소 클래스 및 속성 변경
            this.$buttonChoose.addClass('expanded');
            this.$list.addClass('attached');
            this.$list.attr('aria-hidden', 'false');
        }
    }

    unExpanded() {
        if (this.$list.hasClass('attached')) {
            // 리스트 축소 시 요소 클래스 및 속성 변경
            this.$buttonChoose.removeClass('expanded');
            this.$list.removeClass('attached');
            this.$list.attr('aria-hidden', 'true');
        }
    }
}

// jQuery 플러그인으로 등록
$.fn.Dropdown = function (options) {
    return this.each(function () {
        if (undefined == $(this).data('Dropdown')) {
            const plugin = new Dropdown(this, options);
            $(this).data('Dropdown', plugin);
        }
    });
};

// 숫자에 콤마 추가하는 함수
function counterup(x) {
    const value = $(x).text();
    $({ val: 0 }).animate({ val: value }, {
        duration: 1000,
        step: function () {
            const num = numberWithCommas(this.val.toFixed(1));
            $(x).text(num);
        },
        complete: function () {
            const num = numberWithCommas(this.val.toFixed(1));
            $(x).text(num);
        }
    });

    function numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


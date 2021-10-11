$(function () {

    $.Dropdown = function (element, options) {
        if (!element) {
            return false;
        }

        var dropdown = this,
            $this = $(element),
            $options = options || {},
            $buttonChoose = $this.find('.button-choose'),
            $list = $this.find('.list'),
            $listItems = $list.find('button');

        var $type = $options.type || 0; //sg_type
        var $value = $options.value || ''; //["sido", "gu", "action", "none"]
        var $text = $options.text || ''; //select text
        var $call = $options.call || ''; //call page
        var $index = $options.index || 0; //value index

        dropdown.init = function () {
            if ($text != '') {
                //this.setSelectedText($buttonChoose, $text);

                var selectChk = false;

                $listItems.each(function () {
                    if ($(this).text() == $text) {
                        selectChk = true;

                        $buttonChoose.text($text);
                        $buttonChoose.attr('data-set', $(this).attr('data-set'));

                        dropdown.nextStep();
                    }
                });

                if (!selectChk && $value[$index] != "none" && ($call == "vote" || $call == "candidate")) {
                    //dropdown.nextStep();  
                    nextStepMove("action", "");
                }
            }
            this.bindHandlers();
        }
        dropdown.bindHandlers = function () {

            var self = this;
            $this.on('click', function (e) {
                var $target = $(e.target);
                if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-choose')) {
                    self.toggleListExpanded();
                } else if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-item')) {
                    $buttonChoose.text($target.text());
                    $buttonChoose.attr('data-set', $target.attr('data-set'));

                    dropdown.nextStep();

                    self.unExpanded();
                }
            });
        }
        dropdown.setSelectedText = function (element, text) {
            element.text(text);
        }
        dropdown.toggleListExpanded = function () {
            ($list.hasClass('attached')) ? this.unExpanded(): this.expanded();
        }
        dropdown.expanded = function () {
            if (!$list.hasClass('attached')) {
                $buttonChoose.addClass('expanded');
                $list.addClass('attached');
                $list.attr('aria-hidden', 'false');
            }
        }
        dropdown.unExpanded = function () {
            if ($list.hasClass('attached')) {
                $buttonChoose.removeClass('expanded');
                $list.removeClass('attached');
                $list.attr('aria-hidden', 'true');
            }
        }
        dropdown.nextStep = function () {
            if ($call == "interest") {
                if ($this.hasClass('interest_sido')) {
                    setInterestGuList($buttonChoose.attr('data-set'));
                } else if ($this.hasClass('interest_gu')) {
                    setInterestDongList($buttonChoose.attr('data-set'));
                }
            } else if ($call == "candidate") {
                //if ($this.hasClass('sido')) {
                //    setGuList($type, $buttonChoose.attr('data-set'));
                //} else if ($this.hasClass('gu')) {
                //    setDongList($buttonChoose.attr('data-set'));
                //}
                nextStepMove($value[$index], $buttonChoose.attr('data-set'));
            } else if ($call == "vote") {
                /* if ($this.hasClass('sido')) {
                     nextStepMove('gu', $buttonChoose.attr('data-set'));
                 } else if ($this.hasClass('gu')) {
                     nextStepMove('action', $buttonChoose.attr('data-set'));
                 }  */

                nextStepMove($value[$index], $buttonChoose.attr('data-set'));
            }
        }
        dropdown.init();
    }

    $.fn.Dropdown = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('Dropdown')) { //해당 플러그인이 없으면 플러그 인을 달아준다.
                var plugin = new $.Dropdown(this, options);
                $(this).data('Dropdown', plugin);
            }
        });
    }

}());

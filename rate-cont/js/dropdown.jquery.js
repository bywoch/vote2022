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
            $listItems = $list.find('button'),
            $textChoose = $options.text || '',
            $index = $options.index || 1;

        dropdown.init = function () {
            if ($textChoose != '') {
                this.setSelectedText($buttonChoose, $textChoose);
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
                    self.unExpanded();
                }
            });
        }
        dropdown.setSelectedText = function (element, text) {
            element.text(text);
        }
        dropdown.toggleListExpanded = function () {
            if ($listItems.length < 1) {
                return;
            }
            if ($list.hasClass('attached')) {
                this.unExpanded()
            } else {
                this.expanded();
            }
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
        dropdown.init();
    }

    $.fn.Dropdown = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('Dropdown')) {
                var plugin = new $.Dropdown(this, options);
                $(this).data('Dropdown', plugin);
            }
        });
    }
    
}());

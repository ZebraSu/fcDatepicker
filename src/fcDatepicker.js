;(function ($) {
    var fcDate = {}
    fcDate.extendsOption = function (parms) {//合并参数
        var $this = $(this);
        var setting = $(this).data('faDatepicker');
        if (typeof (setting) == 'undefined') {
            var defaults = {

            }
            setting = $.extend({}, defaults, parms);
            $(this).data('cusmodal', setting);
        } else {
            setting = $.extend({}, setting, parms);
        }
        return setting;
    },
    fcDate.init = function (parms) {//初始化
        return this.each(function () {
            var setting = fcDate.extendsOption(parms);
        });
    }

    

})(jQuery);
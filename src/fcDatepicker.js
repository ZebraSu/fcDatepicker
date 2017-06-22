;(function ($) {
    var _methods = {
        _extendsOption: function (parms) {//合并参数
            var $this = $(this);
            var setting = $(this).data('cusmodal');
            if (typeof (setting) == 'undefined') {
                var defaults = {
                    ele:$('body')
                }
                setting = $.extend({}, defaults, parms);
            } else {
                setting = $.extend({}, setting, parms);
            }
            return setting;
        },
        _Event: function (parms) {
            var count_next = 0;
            var yy = 0;
            $('body').on('click','.date-wrap .date-month',function (e) {
                // 日历头部点击事件
               var target = e.target;
                if(!$(target).hasClass('active')){
                    $(target).addClass('active');
                    $(target).siblings().removeClass('active');
                }
                parms.monthClick();
            });
            $('body').on('click','.date-wrap .date-btn-prev',function (e) {
                // 日历上一月按钮点击事件
                var target = e.target;
                 var dd = new Date();
                var activeMonth = $('.date-wrap .date-month.active');
                if(activeMonth.data('mm') ===  dd.getMonth()+1){
                    return;
                }
                activeMonth.removeClass('active');
                activeMonth.prev().addClass('active');
                parms.prevEvent();
            });
            $('body').on('click','.date-wrap .date-btn-next',function (e) {
                // 日历下一月按钮点击事件
                var target = e.target;
                var activeMonth = $('.date-wrap .date-month.active');
                 if(activeMonth.index() === 3){
                 } else {
                     // activeMonth.removeClass('active');
                    // activeMonth.next().addClass('active');
                }
                if(count_next == 12){
                    count_next = 0;
                }else{
                    count_next++;
                }

                $.each($('.date-wrap .date-month'),function (i,item) {
                    var m = $(item).data('mm')+count_next;
                    var mm;
                   // var mm = m > 12 ? m-12:m;
                    if(m > 12){
                        mm = m-12;
                        yy++;
                    }else{
                        mm = m;
                    }
                    $(item).attr('data-mm',mm); 
                });


                parms.nextEvent();
            });
            $('body').on('click','.date-wrap .date-body td',function (e) {
                //当前日期点击事件
                var target = e.target;
                parms.daysClick();
            });
        },
        UIDraw: function(yearMonth,dateDays) {
             // 日历固定元素搭建
            if(!yearMonth ||  !dateDays){
                yearMonth,dateDays = '';
            }
            var element = '<div class="date-wrap active">'+
                                        '<div class="date-header">'+
                                            '<a href="javascript:;" class="date-btn date-btn-prev">&lt;</a>'+
                                            '<span class="date-month-tag-warp">'+
                                            yearMonth+
                                            '</span>'+
                                            '<a href="javascript:;" class="date-btn date-btn-next">&gt;</a>'+
                                        '</div>'+
                                        '<div class="date-body">'+
                                            '<table>'+
                                                '<thead>'+
                                                    '<tr>'+
                                                        '<th>一</th>'+
                                                        '<th>二</th>'+
                                                        '<th>三</th>'+
                                                        '<th>四</th>'+
                                                        '<th>五</th>'+
                                                        '<th>六</th>'+
                                                        '<th>日</th>' +
                                                    '</tr>'+
                                                '</thead>'+
                                                '<tbody>'+
                                                dateDays+
                                                '</tbody>'+
                                            '</table>'+
                                        '</div>'+
                                    '</div>';
            return element;
        },
        GetDateStr:function (dayCount) {
            var dd = new Date();
            var y = dd.getFullYear();
            var m = dd.getMonth()+dayCount+1;
            if(m < 10) {
                m = '0'+m;
            }

            if(m>12) {
                y++;
                m-=12;
                if(m < 10) {
                    m = '0'+m;
                }
            }

            return {
                formatDate: y+"-"+m,
                showDate: y+"年"+m+'月',
                month: dd.getMonth()+dayCount+1
            }
        },
        UIDrawHeaderMonth: function () {
            var eles = [];
            for(var i=0;i<4;i++){
                if(i == 0){
                    eles.push('<span class="date-cur-month date-month active" data-mm="'+_methods.GetDateStr(i).month+'" data-month="'+_methods.GetDateStr(i).formatDate+'">'+_methods.GetDateStr(i).showDate+'</span>');
                }else{
                    eles.push('<span class="date-month" data-mm="'+_methods.GetDateStr(i).month+'" data-month="'+_methods.GetDateStr(i).formatDate+'">'+_methods.GetDateStr(i).showDate+'</span>');
                }
            }
            return eles.join('');
        },
        init: function (parms) {//初始化方法
            return this.each(function () {
                var setting = _methods._extendsOption(parms);
                //执行具体方法
            });
        },
    }
    $.fn.fcDate = function() {
        var method = arguments[0];
        if (_methods[method]) {
            method = _methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pluginName');
            return this;
        }
        return method.apply(this, arguments);
    }
    $.extend({
        initFcDate: function (parms) {
            var setting = _methods._extendsOption(parms);
            var drawMonth = _methods.UIDrawHeaderMonth();
            var drawMap =  _methods.UIDraw(drawMonth);
           setting.ele.append(drawMap);
           _methods._Event(setting);
        }
    });
})(jQuery)
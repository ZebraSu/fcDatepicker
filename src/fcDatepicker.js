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
            $('body').on('click','.date-wrap .date-month',function (e) {
                // 日历头部点击事件
               var target = e.target;
                if(!$(target).hasClass('active')){
                    $(target).addClass('active');
                    $(target).siblings().removeClass('active');
                }
                var activeDate =  _methods.GetActiveDate();
                _methods.UIDrawBodyDate(activeDate);
                parms.monthClick();
            });
            $('body').on('click','.date-wrap .date-btn-prev',function (e) {
                // 日历上一月按钮点击事件
                var target = e.target;
                var date = new Date();
                var pageMonth = $('.date-wrap .date-month');
                var initMonth = pageMonth.last().attr('data-mm');
                var initYear = pageMonth.last().attr('data-yy');
                var activeMonth = $('.date-wrap .date-month.active');
                if(pageMonth.first().attr('data-mm') == date.getMonth()+1 && pageMonth.first().attr('data-yy') == date.getFullYear()){
                    if(activeMonth.index() != 0){
                        activeMonth.prev().addClass('active');
                        activeMonth.removeClass('active');
                        var date =   _methods.GetActiveDate();
                        _methods.UIDrawBodyDate(date);
                    }else{
                        return;
                    }
                    return;
                }

                _methods.LoopMonthReduce(initYear,initMonth);
                var date =  _methods.GetActiveDate();
                _methods.UIDrawBodyDate(date);
                parms.prevEvent();
            });
            $('body').on('click','.date-wrap .date-btn-next',function (e) {
                // 日历下一月按钮点击事件
                var target = e.target;
                var activeMonth = $('.date-wrap .date-month.active');
                var initMonth = $('.date-wrap .date-month').eq(0).attr('data-mm');
                var initYear = $('.date-wrap .date-month').eq(0).attr('data-yy');
                _methods.LoopMonthPlus(initYear,initMonth);
                var dateActive =   _methods.GetActiveDate();
                _methods.UIDrawBodyDate(dateActive);
                parms.nextEvent();
            });
            $('body').on('click','.date-wrap .date-body td',function (e) {
                //当前日期点击事件
                var $this = $(this);
                var thisDay = $this.find('.data-day');
                alert(thisDay.data('date'));
                parms.daysClick();
            });
        },
        UIDraw: function() {
            var element = '<div class="date-wrap active">'+
                                        '<div class="date-header">'+
                                            '<a href="javascript:;" class="date-btn date-btn-prev">&lt;</a>'+
                                            '<span class="date-month-tag-warp">'+
                                                '<span class="date-month active" data-mm="" data-yy="" data-month=""></span>'+
                                                '<span class="date-month " data-mm="" data-yy="" data-month=""></span>'+
                                                '<span class="date-month " data-mm="" data-yy="" data-month=""></span>'+
                                                '<span class="date-month " data-mm="" data-yy="" data-month=""></span>'+
                                            '</span>'+
                                            '<a href="javascript:;" class="date-btn date-btn-next">&gt;</a>'+
                                        '</div>'+
                                        '<div class="date-body">'+
                                            '<div class="sloading"></div>'+
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
                                                '</tbody>'+
                                            '</table>'+
                                        '</div>'+
                                    '</div>';
            return element;
        },
        GetActiveDate: function () {
            var active = $('.date-month.active');
            return {
                date:active.attr('data-month'),
                mm:active.attr('data-mm'),
                yy:active.attr('data-yy'),
            }
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
        Loading: function (isShow) {
            if(isShow){
                $('.date-wrap sloading').show();
            }else{
                $('.date-wrap sloading').hide();
            }
        },
        LoopMonthPlus: function (year,month) {
            for(var i=0;i<4;i++){
                month++;
                if(month>12){
                    year++;
                    month = 1;
                }
            var head = $('.date-wrap .date-month');
                   head.eq(i).text(year+'年'+month+'月')
                  .attr('data-mm',month)
                  .attr('data-yy',year)
                  .attr('data-month',year+'-'+month);
            }
            month = month-3;
            if(month<=0){
                month = month+12;
                year--;
            }
        },
        LoopMonthReduce: function (year,month) {
            var date = new Date();
            var nowMonth = date.getMonth()+1;
            for(var i=4;i>0;i--){
                month--;
                if(month < 1){
                    year--;
                    month = 12;
                }
                var head = $('.date-wrap .date-month');
                head.eq(i-1).text(year+'年'+month+'月')
                    .attr('data-mm',month)
                    .attr('data-yy',year)
                    .attr('data-month',year+'-'+month);
            }
            month = month+3;
            if(month<=0){
                month = month-12;
                year++;
            }
        },
        UIDrawBodyDate:function (date) {
            var html = '';
            $.getJSON('data.josn',function (result) {
                _methods.Loading(true);
                if(result.code == 1){
                    for(var i=0; i<result.data.length;i++){
                        var data =  result.data[i];
                        var price = data.data.price ? "￥"+data.data.price : '';
                        if(i%7===0){
                            html+='<tr>';
                        }
                        html+= '<td><span class="data-day" data-date="'+data.ddate+'">'+data.day+'</span><span class="data-remate">'+price+' </span></td>';
                        if(i%7===6){
                            html+='</tr>';
                        }
                    }
                    $('.date-wrap tbody').html(html);
                }
                _methods.Loading(false);
            });
        },
        UIDrawHeaderMonth: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            _methods.LoopMonthPlus(year,month);
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
            var drawMap =  _methods.UIDraw();
            var date = new Date();
            var nowMonth = date.getMonth();
            var nowYear = date.getFullYear();
           setting.ele.append(drawMap);
           _methods.UIDrawHeaderMonth();
            _methods.UIDrawBodyDate();
           _methods._Event(setting);
        }
    });
})(jQuery)

$(function(){
    /*选项卡切换*/
    $("#tabTitle li").click(function(e){
        e = e || window.event || arguments.callee.caller.arguments[0];
        e.stopPropagation();
        var o = $(this);
        $('#tabTitle li').removeClass('active');
        o.addClass('active');
        _pageType = o.attr('prototype');
        $('.positionTableBox').addClass('hide');
        positionTableBox = $("#"+_pageType+"TableBox");
        positionTableBox.removeClass('hide');
    });

    /*日历插件*/
    $("#date").mobiscroll().date({
        theme: "android-ics light",
        lang: "zh",
        cancelText: null,
        dateFormat: 'yy/mm', //返回结果格式化为年月格式
        display: 'bottom' ,    //显示方式
        // wheels:[], 设置此属性可以只显示年月，此处演示，就用下面的onBeforeShow方法,另外也可以用treelist去实现
        onBeforeShow: function (inst) { inst.settings.wheels[0].length>2?inst.settings.wheels[0].pop():null; },             //弹掉“日”滚轮
        headerText: function (valueText) { //自定义弹出框头部格式
            array = valueText.split('/');
            return array[0] + "年" + array[1] + "月";
        }
    });


    (function(){
        var pathname = location.pathname;
        var lis = $('.unitLeft button');
        for(var i = 0; i < lis.length; i++){
            var li = $(lis[i]);
            var link = li.attr('link');
            /*if(pathname == "manage/homePage.html" || link == "manage/homePage"){
                $('.firstPage-ul li').addClass('current-son');
                break;
            }
            if(pathname == link || pathname.indexOf(link) >= 0 || link.indexOf(pathname) >= 0){
                var parent = li.parent();
                parent.css('display', 'block');
                li.addClass('current-son');
                $('#'+li.attr('person')).addClass('current');
                break;
            }*/
        }
    })();


    $(".unitLeft").on('click','button',function(){
        var o = $(this);
        /*if(o.hasClass('current-son')){
            return false;
        }*/
        var url = o.attr('link').indexOf('homePage')>-1?"/manage/homePage.html":o.attr('link');
        if(o.attr('target') == '_blank'){
            window.open(url);
            return;
        }
        window.location.href = url;
    })

});

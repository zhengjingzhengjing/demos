define(function(a, b, c) {
    var $ =window.jQuery || a("jquery"),
        h = {
            QUIT_PLAN_DISABLED: !1,
            MOBILE:"5811FAAE5C52BDC0",
            COMPUTER:"E68FDE7DB07CC4D7",
            IM_APP_KEY:"b6b51c3be55a47b0907206e3cf6c7bb5", // b6b51c3be55a47b0907206e3cf6c7bb5  测试// 1d5745fce5067f3295baa9d465178e6b, 生产
            TO_TURN_TO:"84B8323F058ECB15",
            LOCAL_SESSION:"BBB856CC159E778B",
            JUDGE_EQUIPMENT:"A2CAE218AC3553A1",
            IMG_ALLOW_SUFFIX : ".jpg,.jpeg.bmp,.gif,.png,.pcx,.tiff",
            INTERCEPT_PARAM_SN:"A2CAE218AC3553A1",
            SpecialAccountValue:"13210000000"
        },
        e = {
            SUCCESS:"SUCCESS",
            INVALID:"INVALID",
            EXCEPTION:"EXCEPTION",
            ERROR:"ERROR"
        };
    var i = function() {
            $.extend(this, {
                equipment: h.COMPUTER,
                constant: $.extend(h,e)
            })
        };
    $.extend(i.prototype, {

        examineSelected : function(){},

        browserRedirect : function(){},

        browserVersions : function(){
            var u = navigator.userAgent, app = navigator.appVersion,version = {};
            version = {
                trident: u.indexOf('Trident') > -1, //IE内核
                isIE6: u.indexOf("msie 6")==-1, // 是否为ie6
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1 && u.indexOf('Firefox') > -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
            return version;
        }

    });
    $(function(){
        $('input[type="password"]').bind("contextmenu",function(e){return false;});
        var version = (new i()).browserVersions();
        if(version.trident) console.log("电丁丁 Copyright © 2016 上海华宿电气股份有限公司");
        else console.log("%c 电丁丁 %c Copyright \xa9 2016 上海华宿电气股份有限公司",'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:64px;color:#7ce0f7;-webkit-text-fill-color:#7ce0f7;-webkit-text-stroke: 1px #7ce0f7;',"font-size:12px;color:#999999;");
    });
    var j = new i;
    $.extend(j),
    c.exports = j;
});

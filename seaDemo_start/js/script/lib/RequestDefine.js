/*配置ajax接口 ，使用的时候就  r.Request_Url_get_units  */

define(function(require, exports, module){
    //var PR = "/manage/";
    var RequestDefine = {/*
        Request_Url_get_units : PR + "get_units",
        Request_Url_get_monitors : PR + "get-monitors",*/
        postman : "https://echo.getpostman.com/get"
    };
    module.exports = RequestDefine;
});

define(function(require, exports, module){
    /*common/basic.js  common/common.js   lib/config.js   lib/RequestDefine.js
     *  big_map.html use
     *  依赖 jQuery echarts.all
     *  引入 common basic
     */
    /*先引入config*/
    //有window的原因  是默认引入(如在index.html中直接script引入)的时候就是有全局对象 ，都是window
     /*引入js 和lib的config配合*/
    var $ = window.jQuery || require('jquery'),
        i = require('basic'),
        j = require('common'),
        r = require("request");


	$(function(){
        
    })
});
/**
 * Created by Administrator on 2016/9/6.
 */
define(function(require, exports, module){
    /*
     *  big_map.html use
     *  依赖 jQuery echarts.all
     *  引入 common basic
     */
    /*先引入config*/
    //有window的原因  是默认引入(如在index.html中直接script引入)的时候就是有全局对象 ，都是window
     /*引入js 和lib的config配合*/
    var $ = window.jQuery || require('jquery'),
        i = require('basic-min'),
        j = require('common'),
        r = require("request"),
        unslider = require("unslider");

    //文档运行到这里会立即执行，不会等到所有dom加载完成
   /* (function(){
        alert(1);
    })();*/

    //等到所有dom元素加载完成才执行
    /*$(function(){
        alert(2)
    })*/

    (function(){
       /* function get_time(){
            function relate1(obj) {
                if (obj < 10) {
                    return "0" + obj
                }
                return obj;
            }
            var myDate = new Date();
            var week = ['日', '一', '二', '三', '四', '五', '六'];
            var getFullYear1 = myDate.getFullYear();
            var getMonth1 = myDate.getMonth() + 1;
            var getDate1 = myDate.getDate();
            var getDay1 = week[myDate.getDay()];
            var hours = myDate.getHours();       
            var minutes = myDate.getMinutes();     
            var seconds = myDate.getSeconds();     

            $("#currentTime").html(getFullYear1 + "年" + relate1(getMonth1) + "月" + relate1(getDate1) + "日&nbsp;周" + getDay1+"&nbsp;"+relate1(hours)+":"+relate1(minutes)+":"+relate1(seconds));
        }
        get_time();
*/
    
           /* $.ajax({
                url:'js/test.json',
                type: 'post',
                dataType: 'json',
                success:function(data){
                    console.log(1)
                },
                error:function(){
                    alert(3);
                }

            })*/
        
       
        


    })()

	
	$(function(){
		$('.banner').unslider({
		    speed: 500,               //  滚动速度
		    delay: 3000,              //  动画延迟
		    complete: function() {},  //  动画完成的回调函数
		    keys: true,               //  启动键盘导航
		    dots: true,               //  显示点导航
		    fluid: false              //  支持响应式设计
		});
	})


});
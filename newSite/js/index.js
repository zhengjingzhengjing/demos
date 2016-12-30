/**
 * Created by Laban on 2016/12/27.
 */

$(function(){
    /*
    * 随机切换背景图片
    * */
    var num = Math.floor(Math.random()*10)+1;
    $('body').css("background","url(img/bg"+num+".jpg)");

    /*调整图片透明度*/
    $('.imgShow img').fadeTo("slow", 0.6);
    $('.imgShow img').hover(function(){
        $(this).fadeTo("slow", 1.0); 
    },function(){
        $(this).fadeTo("slow", 0.6); 
    })
    
    /*
    * 返回顶部
    * */
    function gotoTop(min_height){
        var gotoHtml = "<div class='gotoTop'>返回顶部</div>";
        $("#wrap").append(gotoHtml);
        $(".gotoTop").on('click',function(){
           $('html,body').animate({'scrollTop':'0'},500);
        });
       $(window).scroll(function(){
           min_height ? min_height = min_height : min_height = 200;
            var t = $(window).scrollTop();
            if(t > min_height){
                $(".gotoTop").fadeIn(100);
            }else {
                $(".gotoTop").fadeOut(200);
            }
       })
    }
    gotoTop();
    
    
    var util = {
        loginBoxShow:function(){
            $(".cover").css('display','block');
            $("#loginPop").removeClass('hide');
        },
        loginBoxHide:function(){
            $(".cover").css('display','none');
            $("#loginPop").addClass('hide');
        },
    }
    /*
    *点击登录所做的事情
    */
    $("#login").on('click',function(){
        util.loginBoxShow();
    })
    
    /*在input输入的时候不能使用空格*/
    $(".email").on('keydown',function(e){
        var e = e || window.event || arguments.callee.caller.arguments[0];
        e.stopPropagation();
        if(e.keyCode == 32){
                return !1;  //return false      
            }
    })
    /**/
    $(".cansel").on('click',function(){
        util.loginBoxHide();
    })
    
    /*$('#login').on('click', function(){
      layer.open({
      type: 1,
      area: ['600px', '360px'],
      shadeClose: true, //点击遮罩关闭
      content: '\<input type="text" placeholder="请不要使用空格" class="email" \/>'
      });
    });*/
    
    /*切换图片和文章*/
    $(".changeTab input").on('click',function(){
        var o = $(this).index();
        $(".changeContent aside").eq(o).show().siblings().hide();
    })
    

    /*遇到外部链接自动添加target=”blank”的属性*/
    var root = location.protocol+"//"+location.host;  //http   127.0.0.1:49670
    //alert((location.pathname).substr(1,location.pathname.length));
    //:contains(root)选取包含指定字符串的元素
    $('a').not(':contains(root)').click(function(){
       this.target = '_blank'; 
    })
    
});
 /*
* canvas绘制luhan
* */
reanderLuhan('luhan','luhanDress',100,3,'#ecd21d');
reanderLuhan('luhan2','luhanDress2',100,2,'red');
function reanderLuhan(id,className,widthNum,lineWidth,color){
    var canvas = document.getElementById(id);
    canvas.className = className;
    if(canvas.getContext){
        canvas.width = widthNum;
        canvas.height = widthNum;
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = lineWidth;//设置画笔宽度和颜色
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(40,10);
        ctx.lineTo(13,68);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(13,68);
        ctx.lineTo(45,77);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(50,20);
        ctx.lineTo(30,65);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(40,40);
        ctx.lineTo(63,45);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(70,30);
        ctx.lineTo(50,70);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(55,15);
        ctx.lineTo(88,22);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(88,22);
        ctx.lineTo(60,80);
        ctx.stroke();
        ctx.closePath();
    }
}

/*
* 点击停止或播放
* */
var audio = document.getElementById("audioMusic");
var duration = audio.duration;//播放时间
var currentTime = audio.currentTime;//播放进度

var opMusic = document.getElementById('opMusic');

opMusic.onclick = function(){
    if(audio.paused){
        readSet();
        opMusic.className = 'opMusic opMusicPlayAndPause';
        opMusic.setAttribute('title','enen');
        
    }else {
        writeSave();
        audio.pause();
        opMusic.className = 'opMusic';
        opMusic.setAttribute('title','huhu');
    }
};

/*
* 音乐刷新或者切换页面是继续播放
* */
    $(window).on({
       'beforeunload':function(e){ //返回值是用来阻止或允许事件本身的操作的
            writeSave();
        },
        'load':function(e){ //网页加载时
            readSet();
        }
    });
    var key = "current-time";
    function writeSave(){
        var audio = document.getElementById("audioMusic");
        var duration = audio.duration;//播放时间
        var currentTime = audio.currentTime;//播放进度
        window.localStorage.setItem(key,currentTime);
    }
    function readSet(){
        var audio = document.getElementById("audioMusic");
        var duration = audio.duration;//播放时间
        var currentTime = audio.currentTime;//播放进度
        var current_time = window.localStorage.getItem(key);
        /*
        * 这是一个判断 如果有current_time 且大于0  就执行audio.currentTime = current_time
        * */
        current_time && current_time > 0 && (audio.currentTime = current_time);
        audio.play();
    }

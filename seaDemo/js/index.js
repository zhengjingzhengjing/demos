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
        
        var LangShen = { "Name":"Langshen1", 
            "MyWife":[ "LuLu","26" ], 
            "MySon":[
                     {"Name":"Son1"},
                     {"Name":"Son2"},
                     {"Name":"Son3"}
                    ] 
        } 
        console.log(LangShen.MySon[0].Name);
        
        /*var a = !0;
        typeof(a)
            alert("我是true");
        }*/
        
        /*var fun = {
            bigImg:function(bigImg){
                var bImgArea = $(".bImgArea");
                bigImg.on('mouseover',function(){
                     bImgArea.html('<img src="img\/aa.png" class="bigImg1">');
                }).on('mouseout',function(){
                     bImgArea.html('');
                })
            }
        }
        
        fun.bigImg($('#bigImg'));*/
        
         /*显示隐藏*/
            /*function hide(){
                document.getElementById('alternativeList').style.display='none'?'':'none';
            }; hide();*/
        
        /*js 循环出一段html代码*/
        var freedom = document.getElementById('freedom').innerHTML;
        var flag = "";
        for(var i =0; i<5;i++){
            flag+=freedom;
        }
        document.getElementById('zj_table').innerHTML = flag;
					
        
        var fun = {
            //鼠标移到小图上显示大图
            bigImg:function(){
                var bImgArea = $(".bImgArea");
                var bigSmallImg = $("#bigSmallImg img");
                
                bigSmallImg.each(function(index,this1){
                    $(this1).on('mouseover',function(){
                        var indexImg = $(this1).attr('src');
                        bImgArea.html('<img src="'+indexImg+'" class="bigImg1">');
                    }).on('mouseout',function(){
                        bImgArea.html('');
                    })
                })
            },
           /*得到下拉框的值*/
            inputValue:function(){
                var marginTop = $(".marginTop");
                var inputValue = $("#inputValue");
                var alternativeList = $(".alternativeList");
                var alternativeList_li = $(".alternativeList li");
                marginTop.click(function(event){
                    event.stopPropagation();
                    $(this).find('.alternativeList').toggle();
                })
                $(document).click(function(event){
                    var eo = event.target;
                    /*if(marginTop.is(':visible') && eo.attr('class') !='alternativeList' && !eo.parent('alternativeList').length){ alternativeList.hide();}*/
                })
                alternativeList_li.click(function(){
                    var o = $(this).text();
//                    $(this).parent().siblings('#inputValue').text(o);
                    inputValue.val(o);
                })
            },
            /*得到下拉框的值2*/
            inputValue2:function(){
                var marginTop1 = $(".marginTop1");
                var inputValue1 = $("#inputValue1");
                var alternativeList1 = $(".alternativeList1");
                var alternativeList1_li = $(".alternativeList1 li");
                marginTop1.click(function(event){
                    event.stopPropagation();
                    $(this).find('.alternativeList1').toggle();
                })
                alternativeList1_li.click(function(){
                    var o = $(this).text();
                    inputValue1.val(o);
                    
                })
            }
        }
        fun.bigImg();
        fun.inputValue();
        fun.inputValue2();
    })
});
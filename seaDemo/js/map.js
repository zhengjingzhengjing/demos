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
        /*柱状图*/
        function columnarRender(){
            var data = new Array("衬衫2","羊毛衫","雪纺衫","裤子","高跟鞋","袜子");
            var dataV=[];
            //获取六个随机的数
            for(var i=0;i<6;i++){
                dataV+=Math.floor(Math.random()*100)+',';
            }
            dataV = dataV.substring(0,dataV.length-1);  //去除最后一个逗号

            var myChart = echarts.init(document.getElementById('main'));
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: data
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: dataV
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
        
    })
});
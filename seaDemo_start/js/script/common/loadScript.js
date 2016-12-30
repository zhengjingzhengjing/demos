define(function(require, exports, module){
    var introduceScript = function (obj,asyn){
        var doc = document, isNil = function(s){
            if(
                s == null ||
                s == 'undefined' ||
                s.toString().replace(/(^s*)|(s*$)/g, "").length <= 0
            ) return true;
            return false;
        };
        if(toString.call(obj) === '[object Array]' && obj.length > 0){
            if(!asyn){
                var script = doc.createElement('script'), s = obj[0];
                if(isNil(s)) return false;
                script.setAttribute('src',s.indexOf(".js") < 0 ? s + ".js" : s);
                doc.body.appendChild(script);
                script.onload = script.onreadystatechange = function(){
                    if(!this.readyState || this.readyState == 'loaded' || this.readyState=='complete'){
                        script = null, obj.shift();
                        introduceScript(obj,asyn);
                    }
                }
            }
            else{
                var frag = doc.createDocumentFragment();
                for(var i = 0; i < obj.length; i++){
                    var s = obj[i];
                    if(s){
                        var temp = null;
                        temp = doc.createElement('script');
                        temp.setAttribute('src',s.indexOf(".js") < 0 ? s + ".js" : s);
                        frag.appendChild(temp);
                        temp = null;
                    }
                }
                doc.body.appendChild(frag);
                temp = null;
                return frag;
            }
        }
        else if(typeof obj === 'string' && !isNil(obj)){
            obj = obj.indexOf(".js") < 0 ? obj + ".js" : obj;
            var script = doc.createElement('script');
            script.setAttribute('src',obj);
            doc.body.appendChild(script);
            return script;
        }
    }
    module.exports = introduceScript;
});

// window.introduceScript = introduceScript;
/*
var scripting = ["../../media/js/pinyin.js","http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"];
(!window.$ && !window.jQuery) &&
(scripting.push("../../media/js/jquery.min.js"),scripting.push("../../media/js/radialIndicator.min.js"));
(!window.echarts) && (
scripting.push("../../media/js/echarts-all-3.js"),
scripting.push("../../media/js/dataTool.min.js"),
scripting.push("../../media/js/echarts/chart/province/China.js"),
scripting.push("../../media/js/echarts/echarts.js"),
scripting.push("../../media/js/line.js"),
scripting.push("../../media/js/bmap.min.js")
);*/

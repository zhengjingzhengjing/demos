/*
* 1真,0假
*/
!function(g,d,$){
    var util = {
        /*是否为空*/
        isNil:function(obj){
            if(typeof obj =='function') return !1;
            if(
                obj == null||
                typeof(obj) == 'undefined' ||
                obj == 'undefined' ||
                obj.toString().replace(/\s/g,"").length == 0
            )return !0;
            return !1;
        },
        /**/
        verifyIsDate : function(date){
            if(!this.isNil(date)){
                date = date.valueOf();
                if(!isNaN(date)){
                    return !0;
                }
                var subFix = '\-';
                var bar = date.indexOf(subFix) > 1, slash = date.indexOf('\/') > 1, colon = date.indexOf('\:') > 12;
                if(bar && slash){
                    return !1;
                }
                if(slash){
                    subFix = '\/';
                }
                return colon?(new Date(date).getDate() == date.valueOf().split(subFix)[2].split(':')[0].split(' ')[0]):(new Date(date).getDate() == date.valueOf().split(subFix)[2]);
            }
            return !1;
        },
        unixDate : function (date,isFull,split) {
                if(this.verifyIsDate(date)){
                    if($.isNumeric(date)){//isNumeric 检测变量是否为数字或数字字符串
                        date = new Date(Number(date));
                    }else{
                        date = new Date(date);
                    }
                    split = split || "-";
                    var _date = date.getFullYear() + split + ((date.getMonth()+1).toString().length<2?('0'+(date.getMonth()+1)):(date.getMonth()+1)).toString() + split + (date.getDate().toString().length<2?('0'+date.getDate()):date.getDate());
                    isFull && (_date = _date + ' ' + (date.getHours().toString().length<2?('0'+date.getHours().toString()):date.getHours()) + ':' + (date.getMinutes().toString().length<2?('0'+date.getMinutes().toString()):date.getMinutes()) + ':' + (date.getSeconds().toString().length<2?('0'+date.getSeconds().toString()):date.getSeconds()));
                    /* yyyy-MM-dd HH:mm:ss */
                    return _date;
                }
                Common.unixDate(new Date(),isFull);
            }
    }
    var geter = {
        toke:'',
        prefix:'',
        moduleDom:function(){
            return $.trim($("#noticeCheck").html())
        },
        params:function(){
            return{}
        },
        data:function(options){
            $.ajax({
                url:geter.prefix+"",
                type:'GET',
                dataType:'json',
                contentType:'application/json',
                data:geter.params(),
                beforeSend:function(xhr){
                    xhr.setRequestHeader("token",geter.token);
                },
                success:function(result){
                    result && result.message && (function(msg){
                        alert(msg);
                        return false;
                    })(result.message);
                    geter.render(result['data']);
                },
               error:function(response){
                   geter.fill();
               }   
            })
            
        },
        render:function(data){
                var content = "",module = geter.moduleDom();
                data = data && 'string' == typeof data?JSON.parse(data):[];
                while(data.length>0){
                    var record = data.shift();//把数组的第一个元素从其中删除,并返回第一个元素的值
                    record && !function(o){
                        content = content.concat(module
                           .replace(/\{title}/g,o['title'])
                           .replace(/\{sendr}/g,o['sendr'])
                           .replace(/\{content}/g,o['content'])
                           .replace(/\{id}/g, o['id'])
                           .replace(/\{sendTime}/g, o['sendTime'])                      
                        )
                    }(record);
                    continue;
                }
                 get.fill(content);   
            },
        fill:function(content){
               document.body.innerHTML = content ? content : '<div class="nil-box"><label>没有公告展示<\/label><\/div>'
           } 
    };
    (function(){
        geter.data();
    })();
}(window || this,document,$ || window['JQuery']);   
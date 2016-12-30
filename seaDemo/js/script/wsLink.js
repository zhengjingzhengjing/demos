var ws = null;
function getSingle(uri,options) {
    try{
        if(uri){
            if('WebSocket' in window && WebSocket){
                ws = new WebSocket(uri);
                ws.onopen = function(){
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    // ws.send(" ");
                    typeof options.open == "function" && options.open();
                };

                ws.onmessage = function (evt){
                    var received_msg = evt.data;
                    console.log("数据已接收..." + received_msg);
                    typeof options.message == "function" && options.message();
                };

                ws.onclose = function(){
                    // 关闭 websocket
                    console.log("连接已关闭...");
                    typeof options.closed == "function" && options.closed();
                };
            }
        }
    }catch (e){
        console.error(e);
        return void 0;
    }finally {
        return ws;
    }
}

window.addEventListener("load", getSingle, false);

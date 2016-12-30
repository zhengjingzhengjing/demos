/*
 *  @param action:url
 *  @param params:data{}
 *  @param options:{[validate], [completeCallBack], [successCallBack], [errorCallBack], [beforeSubmitCallBack], [redirectCallBack]}
 *  Used to send a Ajax request
 */
define(function(require, exports, module){
    var $ = window.jQuery || require("jquery");
    var HttpService = {};
    HttpService.call = function(action, params,options){
        options = $.extend({
            validate : function(){
                return true;
            },
            beforeSubmit : function(){
                //console.log('BeforeSubmit >>>> do you need me show animation ?');
            },
            success : function(response){
                // alert("SUCCESS LONG");
                // console.log('SUCCESS >>>>'+response);
            },
            error : function(response){
                //  console.log('ERROR >>>>'+response);
            },
            redirect : function(response){
                return null;
            },
            complete : function(){
                // console.log('Complete >>>> do you need me close animation ?');
            }
        },options);

        if(!options.validate()){
            return false;
        }

        //before submit data handling
        options.beforeSubmit.call(this);

        $.ajax(action, {
            'type': options.type ? HttpService.validate.validType(options.type):'POST',
            'dataType': options.dataType ? HttpService.validate.validDataType(options.dataType):'json',
            'traditional': true,	// Server only supports traditional style params
            'data': params,
            'contentType': "application/x-www-form-urlencoded; charset=utf-8",
            'success': function(response, status, xhr){
                options.success(response);
            },
            'error': function(xhr, status, error){
                var response = {};
                // Parse json response
                try{
                    response = $.parseJSON(xhr.responseText);
                }catch(e){
                    error = 'parse_error';
                    response = 'parse json error!';
                }
                options.error(response);
            },
            'complete':function(res){

                options.complete();

            }
        });
    };
    HttpService.enum = function(){
        return {
            type: ['GET','POST','PUT','DELETE'],
            dataType: ['xml','html','script','json','jsonp','text']
        }
    };
    HttpService.validate = {
        validType: function(type){
            if(type && HttpService.enum().type.indexOf(type) >= 0){
                return type;
            }
            return 'POST';
        },
        validDataType: function(dataType){
            if(dataType && HttpService.enum().dataType.indexOf(dataType) >= 0){
                return dataType;
            }
            return 'json'
        }
    };
    module.exports = HttpService;
});


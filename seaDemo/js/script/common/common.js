/*共同的方法*/
define(function(a, b, c) {
	var $ = window.jQuery || a('jquery');
	var Common = {
		verifyCommon: !0,
		mtTimer : null
	};

	Common.isNil = function(obj){
		if(typeof obj == "function") return !1;
		if(
			obj == null ||
			typeof(obj) == "undefined" ||
			obj == "undefined" ||
			this.clearSpace(obj).length == 0
		) return !0;
		return !1;
	};
	Common.isNegative = function (number,include0) {
		if($.isNumeric(number) && number < Infinity && number > -Infinity){
			if(include0){
				if(Number(number)<=0 || this.isNil(number)){
					return true;
				}
			}else{
				if(Number(number)<0){
					return true;
				}
			}
		}
		return false;
	};
	Common.clearSpace = function(obj){
		return obj.toString().replace(/\s/g,"");
	};
	Common.verifyIsDate = function(date){
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
	};
	Common.showCover = function (message,title,callBack) {
		if(this.isNil(message)){
			return;
		}
		var o = $('.alert-title-text');
		this.isNil(title)?(title="提示信息："):(title.indexOf("：")?title:title+="：");
		message = message.replace('用户','您');
		$('#alert_hint_message').html(message),
		$('.cover').removeClass('hide'),
		$('.cover-alert').removeClass('hide');
		$('#nav').on('click','.Xmark',function(){
			$.hideCover(false,callBack);
		});
		$('#nav').on('click','#alert_btn',function(){
			$.hideCover(false,callBack);
		});
		this.formatAlertCoverMargin(message);
	};
	Common.hideCover = function (refresh,callBack) {
		if(refresh){
			window.location.href = window.location.href;
		}
		$('.cover').addClass('hide');
		$('.cover-alert').addClass('hide');
		!Common.isNil(callBack) && callBack();
	};
	Common.formatAlertCoverMargin = function (msg) {
		var o = $('.cover-alert'),cs,left;
		if(msg.toString().length>15){
			cs = Number(300+(msg.toString().length-14)*26);
			o.css('min-width',(cs>830?830:cs)+'px');
		}else{
			o.css('min-width','300px');
		}
		left = $(window).width()- o.width();
		o.css('left',left/2);
	};
	Common.clearNoNum = function (obj) {
		obj && (function(){
			obj = $(obj);
			obj.val(obj.val().toString().replace(/[^\d]/g,"")); //清除"数字"和"."以外的字符
			return obj.val();
		})()
	};
	Common.clearNoNumOrDot = function (obj) {
		obj && (function(){
			obj = $(obj);
			obj.val(obj.val().toString().replace(/[^\d.]/g,"")); //清除"数字"和"."以外的字符
			obj.val(obj.val().toString().replace(/^\./g,"")); //验证第一个字符是数字而不是
			obj.val(obj.val().toString().replace(/\.{2,}/g,".")); //只保留第一个. 清除多余的
			obj.val(obj.val().toString().replace(".","$#$").replace(/\./g,"").replace("$#$","."));
			obj.val(obj.val().toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')); //只能输入两个小数
		})()
	};
	Common.isPhoneNumber = function(phoneNumber){
		var reg = /^(((1[0-9]{1}))+\d{9})$/;
		return reg.test($.trim(phoneNumber));
	};
	Common.unixDate = function (date,isFull,split) {
		if(this.verifyIsDate(date)){
			if($.isNumeric(date)){
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
	};
	Common.showGoTop = function(){
		var top = $(window).scrollTop();
		if(top>=500){
			$('.go-top').removeClass('hide');
		}else{
			$('.go-top').addClass('hide');
		}
	};
	Common.goTop = function(callBack){
		callBack = callBack || $.noop();
		$('html,body').animate({'scrollTop':'0px'},500,callBack);
		var event = event || window.event;
		event.stopPropagation();
	};
	Common.getUrlParams = function(parameter) {
		var url = location.href;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&"),paraObj = {};
		var j = null;
		for (var i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
		}
		if(this.isNil(parameter)){
			return paraObj;
		}
		return decodeURI(decodeURI(paraObj[parameter.toLowerCase()]));
	};
	Common.hideSuccessHint = function(callBack,speed){
		callBack = callBack || $.noop() || function(){};
		speed = $.isNumeric(speed) && speed ? speed : 500;
		var o = $('#successBox');
		if(o){
			o.animate({
				"filter":"alpha(opacity=0)",
				"-moz-opacity":"0",
				"opacity":"0"
			},speed,callBack);
			var mtTimer = setTimeout(function(){
				o.remove();
				clearTimeout(mtTimer);
			},speed);
		}
	};
	Common.showSuccessHint = function(message,error,stay,callBack){
		if(this.mtTimer){
			clearTimeout(Common.mtTimer);
			$('#successBox').remove();
			callBack && callBack();
		}
		var newClass = "";
		if(!!error){
			message = message || "操作失败";
			newClass = "fail";
		}else{
			message = message || "操作成功";
		}
		var initWidth = 150, len = message.length;
		initWidth += (len - 5) * 10;
		$('body').append('<div id="successBox"><div class="success-box-body"><div class="outer" style="width:'+ (initWidth >= 350 ? 250 : initWidth) +'px;"><span class="success-icon '+ newClass +'"><\/span><label class="success-hint" id="successMessage">'+ message +' <\/label><\/div><\/div><\/div>');
		var o = $('#successBox');
		o.animate({
			"filter":"alpha(opacity=1)",
			"-moz-opacity":"1",
			"opacity":"1"
		},200);
		this.mtTimer = setTimeout(function(){
			Common.hideSuccessHint(callBack);
			clearTimeout(this.mtTimer);
		},(stay && $.isNumeric(stay) && stay <= 5000) ? stay : 800);
	};
	Common.UUID = function(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [], i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	};
	Common.getRandom = function(lenght,luck){
		if(luck){
			return (Math.random()*1e11).toString().substr(2,Number((this.isNil(lenght)|| !$.isNumeric(lenght))?4:parseInt(lenght))).toString().replace(new RegExp("[4,7]","g"),'8');
		}
		return (Math.random()*1e11).toString().substr(2,Number((this.isNil(lenght)|| !$.isNumeric(lenght))?4:parseInt(lenght)));
	};
	Common.loading = function(message){
		$('.cover').css('display','block');
		$('.cover').css('cursor','wait');
		$('.loading-box').css('display','block');
		this.isNil(message) && (message = "数据加载中，请稍后");
		$('.loading-box .loading-hint-label').html(message);
	};
	Common.loadingDone = function(stay,callBack){
		!stay && $('.cover').css('display','none');
		$('.cover').css('cursor','default');
		$('.loading-box').css('display','none');
		callBack && callBack();
	};
	Common.loadingProgress = function(progress){
		$('.loading-progress').text(progress);
	};
	Common.isCurrentScript = function(script){
		var currentScript = document['currentScript'];
		if(!currentScript){
			var s = document.getElementsByTagName("script"), i = 0, e;
			while(e = s[i++]){
				console.info(e.readyState);
				if(e.readyState == "interactive"){
					currentScript = e;
					break;
				}
			}
		}
		if(script){
			var cs = currentScript.outerHTML;
			var csrc = currentScript.src;
			if( typeof script == 'string'){
				var ns = document.createElement("script");
				ns.setAttribute('src',(script.indexOf('.js') > -1) ? script : (script + '.js'));
				return (cs == ns.outerHTML || cs == ns.src || csrc == ns.src || csrc == ns.outerHTML);
			}
			else if(script['nodeName'] && script['nodeName'].toUpperCase() == "SCRIPT"){
				return (cs == script.outerHTML || cs == script.src || csrc == script.src || csrc == script.outerHTML);
			}
		}
		return !1;
	};
	Common.introduceScript = function (obj,asyn,callBack){
		if(obj){
			var doc = document,
				isFn = typeof asyn == 'function';
			if(Object.prototype.toString.call(obj) === '[object Array]' && obj.length > 0){
				if(!asyn || isFn){
					var script = doc.createElement('script'), s = obj[0];
					if(this.isNil(s)) return false;
					script.setAttribute('src',s.indexOf(".js") < 0 ? s + ".js" : s);
					doc.body.appendChild(script);
					script.onload = script.onreadystatechange = function(){
						if(!this.readyState || this.readyState == 'loaded' || this.readyState=='complete'){
							script = null, obj.shift();
							if(obj.length < 1){
								callBack && typeof callBack == 'function' && callBack();
								return this;
							}
							if(isFn){
								Common.introduceScript(obj,!1,asyn);
							}else{
								Common.introduceScript(obj,asyn,callBack);
							}
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
					callBack && typeof callBack == 'function' && callBack();
					return frag;
				}
			}
			else if(typeof obj === 'string' && !this.isNil(obj)){
				obj = obj.indexOf(".js") < 0 ? obj + ".js" : obj;
				var script = doc.createElement('script');
				script.setAttribute('src',obj);
				doc.body.appendChild(script);
				script.onload = function () {
					if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
						isFn && asyn();
						callBack && typeof callBack == 'function' && callBack();
					}
				}
				return script;
			}
		}
	};
	Common.jsonStringify = function (object) {
		if (!$.browserVersions().trident) return JSON.stringify(object);
		var type = $.type(object);
		if ('object' == type) {
			if (Array == object.constructor) type = 'array';
			else if (RegExp == object.constructor) type = 'regexp';
			else type = 'object';
		}
		switch (type) {
			case 'undefined':
			case 'unknown':
				return;
				break;
			case 'function':
			case 'boolean':
			case 'regexp':
				return object.toString();
				break;
			case 'number':
				return isFinite(object) ? object.toString() : 'null';
				break;
			case 'string':
				return '"' + object.replace(/(\\|\")/g, "\\$1").replace(
						/\n|\r|\t/g,
						function () {
							var a = arguments[0];
							return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
						}
					) + '"';
				break;
			case 'object':
				if (object === null) return 'null';
				var results = [];
				for (var property in object) {
					var value = jQuery.jsonToString(object[property]);
					if (value !== undefined) results.push(jQuery.jsonToString(property) + ':' + value);
				}
				return '{' + results.join(',') + '}';
				break;
			case 'array':
				var results = [];
				for (var i = 0; i < object.length; i++) {
					var value = jQuery.jsonToString(object[i]);
					if (value !== undefined) results.push(value);
				}
				return '[' + results.join(',') + ']';
				break;
		}
	};

	$.extend(Common);
	c.exports = Common;

});

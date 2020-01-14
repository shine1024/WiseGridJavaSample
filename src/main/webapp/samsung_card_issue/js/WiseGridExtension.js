/**
 * WiseGrid Extension JS
 * @author highread@unipost.co.kr
 * @lastUpdate : 2013.12.12
 * @fix
 *    1.2 : param.syncForm 에서 fiilter사용방법(2번째 인자) 변경
 *    1.3 : W$.ready 내부에서 WiseGridEx 사용 하도록 변경
 *    1.32 : ajax.sendRequest callback에서 status 버그 수정
 *    1.5 : IE11지원 추가
 */

window.undefined = window.undefined;
var WiseCore = {
    version : 1.5
};
WiseCore.apply = function(o, c, defaults){
    if(defaults){
        WiseCore.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};
(function(){
    var ua = navigator.userAgent, t = true, ie = /(msie|trident)/i.test(ua), o;
    function detect() {
        if (ie) return { name: 'Internet Explorer', msie: t, version: ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]};
        return {};
    }
    var browser = detect();
    if (browser.msie && browser.version < 8) browser.c = t;
    else browser.x = t;

    var isIE = (browser.msie),
        isIE6 = isIE && browser.version == 6,
        isIE7 = isIE && browser.version == 7,
        isIE8 = isIE && browser.version == 8,
        isIE9 = isIE && browser.version == 9,
        isIE10 = isIE && browser.version == 10,
        isIE11 = isIE && browser.version == 11;

    var eventBindApiName = (isIE11 ? 'addEventListener' : 'attachEvent');

    if(isIE6){
        try{
            document.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }
    WiseCore.apply(WiseCore,{
        extend : function(){
            var io = function(o){
                for(var m in o){
                    this[m] = o[m];
                }
            };
            var oc = Object.prototype.constructor;

            return function(sb, sp, overrides){
                if(WiseCore.isObject(sp)){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
                var F = function(){},
                    sbp,
                    spp = sp.prototype;

                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    WiseCore.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                });
                sbp.override = io;
                WiseCore.override(sb, overrides);
                sb.extend = function(o){return WiseCore.extend(sb, o);};
                return sb;
            };
        }(), /* end of extend */
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                WiseCore.apply(p, overrides);
                if(WiseCore.isIE && overrides.toString != origclass.toString){
                    p.toString = overrides.toString;
                }
            }
        },
        isNumeric: function(v){
            return /^[0-9]+$/.test(v);
        },
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || ((WiseCore.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },
        isObject : function(o){
            return o && typeof o == 'object';
        },
        isNumber: function(v){
            return typeof v === 'number' && isFinite(v);
        },
        isArray : function(o) {
            return o !== null && typeof o == "object" && 'splice' in o && 'join' in o;
        },
        isString: function(v){
            return typeof v === 'string';
        },
        isBoolean: function(v){
            return typeof v === 'boolean';
        },
        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isPrimitive : function(v){
            return WiseCore.isString(v) || WiseCore.isNumber(v) || WiseCore.isBoolean(v);
        },
        isDefined: function(v){
            return typeof v !== 'undefined';
        },
        isElement: function(o) {
            return !!(o && o.nodeType == 1);
        },
        isFunction: function(v){
            return typeof v == 'function';
        },
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },
        isIE : isIE,
        isIE6 : isIE6,
        isIE7 : isIE7,
        isIE8 : isIE8,
        isIE9 : isIE9,
        isIE10 : isIE10,
        isIE11 : isIE11,
        /**
         *
         * @param {Object} o
         * @return {Boolean}
         */
        isWiseGrid : function(o){
            try{
                return o !== null && typeof o == "object" && o.GetVersion().indexOf('WiseGrid')>-1;
            }catch(ee){
                return false;
            }
        },
        /**
         * WiseGrid가 초기화(Initialize) 되었는지를 반환한다.
         * @param {Object} id
         * @return {Boolean}
         */
        isInitialize : function(id){
            try{
                if(WiseCore.isWiseGrid(W$.findEl(id).el())){
                    return document[id].IsInitialize();
                }
            }catch(ee){
                return false;
            }
        },
        /**
         * WiseGrid가 설치되었는지 여부를 반환한다.
         * @return {boolean}
         */
        isInstalled : function(){
            try{
                var wiseGridActiveXObj = new ActiveXObject("WiseGrid.WiseGridCtrl.1");
                if(wiseGridActiveXObj){
                    installed = true;
                }else{
                    installed = false;
                }
            }catch(ex){
                installed = false;
            }
            return installed;
        },
        /**
         * JSON인지 여부를 반환한다.
         * @param {String} v
         * @return {Boolean}
         */
        isJSON: function(v) {
            var str = v.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
            return new RegExp(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
        },
        /**
         *
         * 경과된 시간을 반환한다.
         * @param {Object} curDate
         * @return {Number}
         */
        getElapsed : function(curDate){
            return Math.abs((new Date()).getTime()-curDate.getTime());
        },
        /**
         * document에서 Element를 검색한다.
         * String, String[] 모두 검색가능하다.
         * ex) $('id'), $('id','id2','id3'), $(['id','id2','id3'])
         * @param {Object} _el
         * @return {Object}
         * 			el : Element를 반환한다.
         * 			show : Element를 보이게 한다.(css visible)
         * 			hide : Element를 숨긴다.(css visible)
         * 			css : Element의 style(css)을 지정한다. (ex {color:'red',font-size:'12px'})
         * 			size : Element의 Width와 Height를 지정한다.
         * 			offset : Element의 Offset을 set,get 한다.
         * 			clsNm : Element의 class를 set, get 한다.
         * 			html : Element의 innerHTML에 값을 set,get한다.
         * 			event : Element에 event를 Attach한다.
         */
        findEl : function(_el){
            var args = [];
            if(WiseCore.isArray(arguments[0])){
                args = arguments[0];
            }else{
                for (var i=0; i<arguments.length; i++ ) {
                    args.push(arguments[i]);
                }
            }
            var rtnEl=[];
            for(var a=0,len=args.length; a<len; a++){
                if(WiseCore.isString(args[a]) && document.getElementById(args[a])){
                    rtnEl[a] = document.getElementById(args[a]);
                }
            }
            var showDelayTime = 0;/*timer저장객체*/
            var hideDelayTime = 0;/*timer저장객체*/
            var opacity = 1; /* opacity 저장객체*/
            return {
                el : function(){
                    return (rtnEl.length>1)? rtnEl : rtnEl[0];
                },
                /**
                 * _showTime 후 보인다
                 * @param {Object} _showTime
                 */
                show : function(_showTime){
                    if(_showTime){
                        clearTimeout(showDelayTime);
                        showDelayTime = (function(){
                            return setTimeout(function(){
                                for (var i = 0; i < rtnEl.length; i++) {
                                    rtnEl[i].style.visibility = 'visible';
                                }
                            },_showTime);
                        })();
                    }else{
                        for (var i = 0; i < rtnEl.length; i++) {
                            rtnEl[i].style.visibility = 'visible';
                        }
                    }
                    return W$.findEl(args);
                },
                hide : function(_dulation){
                    if(_dulation){
                        clearTimeout(hideDelayTime);
                        hideDelayTime = (function(){
                            return setTimeout(function(){
                                for (var i = 0; i < rtnEl.length; i++) {
                                    rtnEl[i].style.visibility = 'hidden';
                                }
                            },_dulation);
                        })();
                    }else{
                        for (var i = 0; i < rtnEl.length; i++) {
                            rtnEl[i].style.visibility = 'hidden';
                        }
                    }
                    return W$.findEl(args);
                },
                css : function(_css){
                    for (var i = 0; i < rtnEl.length; i++) {
                        for (var c in _css) {
                            rtnEl[i].style[c] = _css[c];
                        }
                    }
                    return W$.findEl(args);
                },
                size : function(w,h){
                    for (var i = 0; i < rtnEl.length; i++) {
                        rtnEl[i].style.width = w;
                        rtnEl[i].style.height = h;
                    }
                    return W$.findEl(args);
                },
                offset : function(_offsets){
                    try{
                        var r=new Array();
                        for (var i = 0; i < rtnEl.length; i++) {
                            for(var o in _offsets){
                                rtnEl[i].style[o] = _offsets[o];
                            }
                            r[i] = {
                                left: rtnEl[i].offsetLeft,
                                top: rtnEl[i].offsetTop,
                                width: rtnEl[i].offsetWidth,
                                height: rtnEl[i].offsetHeight
                            };
                        }
                        return (rtnEl.length>1)? r : r[0];
                    }catch(e){
                        throw new Error(e.message);
                    }

                },
                clsNm : function(v){
                    var r = [];
                    for (var i = 0; i < rtnEl.length; i++) {
                        if (v)rtnEl[i].className = v;
                        r[i] = rtnEl[i].className;
                    }
                    return (rtnEl.length>1)? r : r[0];
                },
                html : function(v){
                    var r = [];
                    for (var i = 0; i < rtnEl.length; i++) {
                        if (v)rtnEl[i].innerHTML = v;
                        r[i] = rtnEl[i].innerHTML;
                    }
                    return (rtnEl.length>1)? r : r[0];
                },
                val : function(v){
                    var r = [];
                    for (var i = 0; i < rtnEl.length; i++) {
                        if (v != null)rtnEl[i].value = v;
                        r[i] = rtnEl[i].value;
                    }
                    return (rtnEl.length>1)? r : r[0];
                },
                appendChild : function(_o){
                    for (var i = 0; i < rtnEl.length; i++) {
                        for(var y=0,yLen=_o.length; y<yLen; y++){
                            rtnEl[i].appendChild(_o[y]);
                        }
                    }
                    return W$.findEl(args);
                },
                event : function(_events,fn){
                    var eventObj = _events.split(',');
                    for (var i = 0; i < rtnEl.length; i++) {
                        for(var j=0,len=eventObj.length; j<len; j++){
                            rtnEl[i][eventBindApiName](eventObj[j],fn);
                        }
                    }
                    return W$.findEl(args);
                },
                /**
                 * selectBox에 option을 추가한다.
                 * jsonArr에서 키값으로 value와 text를 추가한다.
                 * @param {Object} _jsonArr
                 * @param {Object} _t : jsonArr의 text 키값
                 * @param {Object} _v : jsonArr의 value 키값
                 */
                addOptions : function(_json,_t,_v){
                    for (var i = 0; i < rtnEl.length; i++) {
                        if(rtnEl[i].options){
                            rtnEl[i].options.length = 0;
                            if(WiseCore.isArray(_json)){
                                for(var y=0,tLen=_json.length; y<tLen; y++){
                                    var opt = document.createElement('option');
                                    opt.value = _json[y][(_v)? _v:'value'];
                                    opt.text = _json[y][(_t)? _t:'text'];
                                    rtnEl[i].add(opt,y);
                                }
                            }else{
                                var idx=0;
                                for(var k in _json){
                                    var opt = document.createElement('option');
                                    opt.value = _json[k][(_v)? _v:'value'];
                                    opt.text = _json[k][(_t)? _t:'text'];
                                    rtnEl[i].add(opt,idx);
                                    idx++;
                                }
                            }

                        }
                    }
                    return W$.findEl(args);
                }
            };

        },
        createEl : function(_tag, _props,_childEl){
            try{
                var el = document.createElement(_tag);
                for (var p in _props){
                    if (p == 'css') {
                        for (var s in _props[p]) {
                            el.style[s] = _props[p][s];
                        }
                    }
                    else if (p == 'clsName'){ el.className =_props[p]}
                    else if (p == 'html'){el.innerHTML = _props.html;}
                    else{el[p] = _props[p];}
                }
                if(_childEl){
                    for (var e in _childEl) {
                        if(WiseCore.isElement(_childEl[e]))
                            el.appendChild(_childEl[e]);
                    }
                }
                return el;
            }catch(e){
                throw new Error(e.message);
            }
        },
        /**
         * private
         * json 구조를 HTMLElement로 렌더링한다.
         * @param {Object} _jsonObj
         * @return HTMLElement
         */
        JsonElRender : function(){
            var elArr = [];
            var args = [];
            if(WiseCore.isArray(arguments[0])){
                args = arguments[0];
            }else{
                for (var a=0; a<arguments.length; a++ ) {
                    args[a] = arguments[a];
                }
            }

            for(var i=0,len=args.length;i<len; i++){
                if(args[i] && args[i].el){elArr[i] = document.createElement(args[i].el);}
                else{elArr[i] = document.createElement('div')}
                for (var p in args[i]) {
                    if (p == 'clsNm') elArr[i].className = args[i].clsNm;
                    else if (p =='css') {
                        for (var s in args[i].css) {
                            elArr[i].style[s] = args[i].css[s];
                        }
                    }
                    else if (p =='html') {
                        elArr[i].innerHTML = args[i].html;
                    }
                    else if (p =='childEl') {
                        if (WiseCore.isArray(args[i].childEl)) {
                            for (var x=0,elLen=args[i].childEl.length; x < elLen; x++) {
                                elArr[i].appendChild(WiseCore.JsonElRender(args[i].childEl[x]));
                            }
                        }
                        else if (WiseCore.isObject(args[i].childEl)) {
                            elArr[i].appendChild(WiseCore.JsonElRender(args[i].childEl));
                        }
                    }
                    else{
                        if(p != 'el')elArr[i][p] = args[i][p];
                    }
                }
            }

            return (len>1) ? elArr : elArr[0];
        },
        /**
         * private
         * @param {Object} id
         */
        replaceEl : function(jsonEls,id){

        },
        /**
         * unique한 ID를 생성한다.
         * 파라미터로 받은 인자(들) 에 랜덤 문자를 합한 형태로 반환한다.
         * @param {Object} _args
         * @return {String}
         */
        gId : function(_pid,_eid){
            var id='';
            for (var i = 1; i <= 5; i++)id += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * 28);
            return 'WISEGRID_'+_pid+(WiseCore.isEmpty(_eid)?'':_eid)+id;
        },

        toArray : function(){
            return isIE ?
                function(a, i, j, res){
                    res = [];
                    for(var x = 0, len = a.length; x < len; x++) {
                        res.push(a[x]);
                    }
                    return res.slice(i || 0, j || res.length);
                } :
                function(a, i, j){
                    return Array.prototype.slice.call(a, i || 0, j || a.length);
                }
        }(),

        isIterable : function(v){
            if(WiseCore.isArray(v) || v.callee){
                return true;
            }
            if(/NodeList|HTMLCollection/.test(toString.call(v))){
                return true;
            }
            return ((v.nextNode || v.item) && WiseCore.isNumber(v.length));
        },
        each : function(array, fn, scope){
            if(WiseCore.isEmpty(array, true)){
                return;
            }
            if(!WiseCore.isIterable(array) || WiseCore.isPrimitive(array)){
                array = [array];
            }
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){
                    return i;
                };
            }
        },
        iterate : function(obj, fn, scope){
            if(WiseCore.isEmpty(obj)){
                return;
            }
            if(WiseCore.isIterable(obj)){
                WiseCore.each(obj, fn, scope);
                return;
            }else if(WiseCore.isObject(obj)){
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                            return;
                        };
                    }
                }
            }
        },
        addEvent : function(){},
        /**
         * DOM이 loading이 완료되면 _fn을 실행한다.
         * @param {Function} _fn
         */
        domState : function(_fn){
            var isDOMReady = function(){
                if(WiseCore.domState.done) return false;
                if(document && document.getElementsByTagName && document.getElementById && document.body){
                    clearInterval(WiseCore.domState.timer);
                    WiseCore.domState.timer = null;
                    for(var i=0; i<WiseCore.domState.ready.length; i++){
                        WiseCore.domState.ready[i]();
                    }
                    WiseCore.domState.ready = null;
                    WiseCore.domState.done = true;
                }
            };
            if(WiseCore.domState.done){
                return _fn();
            }
            if(WiseCore.domState.timer){
                WiseCore.domState.ready.push(_fn);
            }else{
                window[eventBindApiName]('onload',isDOMReady);
                WiseCore.domState.ready = [_fn];
                WiseCore.domState.timer = setInterval(isDOMReady,15);
            }
        },
        attachIE11Event: function(obj, _strEventId, _functionCallback) {
            var nameFromToStringRegex = /^function\s?([^\s(]*)/;
            var paramsFromToStringRegex = /\(\)|\(.+\)/;
            var params = _functionCallback.toString().match(paramsFromToStringRegex)[0];
            var functionName = _functionCallback.name || _functionCallback.toString().match(nameFromToStringRegex)[1];
            var handler;
            try {
                handler = document.createElement("script");
                handler.setAttribute("for", obj.id);
            }
            catch(ex) {
                handler = document.createElement('<script for="' + obj.id + '">');
            }
            handler.event = _strEventId + params;

            if(functionName != '') handler.text = functionName + params + ";";
            else handler.text = '('+_functionCallback+').apply(this, arguments);';
            document.body.appendChild(handler);
        }
    });
})(); /* end of Anonymous Function*/
W$ = WiseCore;
W$.ready = WiseCore.domState;
/**
 * WiseGrid 확장 JS
 * @param {Object|String} _id
 */
WiseCore.Extension = function(_id){
    var _WiseGrid = (WiseCore.isWiseGrid(_id) ? _id : document.getElementById(_id));
    var eventBindApiName = (WiseCore.isIE11 ? 'addEventListener' : 'attachEvent');
    _WiseGrid.extend = function(_extObj){
        for(var ext in _extObj){
            if(_extObj.hasOwnProperty(ext)){
                _WiseGrid[ext] = _extObj[ext];
            }
        }
    }


    var callbackFnc = function(){
        if(this.GetStatus){
            var status = this.GetStatus();
            var message = this.GetMessage();
            status = (status != -1?('true false'.indexOf(status.toLowerCase())>-1?eval(status):status):null);
            var callback = this.EndQueryCallback;
            if(callback){
                callback(status,message);
            }

        }


    }

    if(WiseCore.isIE11){
        WiseCore.attachIE11Event(_WiseGrid, 'EndQuery', callbackFnc);
    }else{
        _WiseGrid[eventBindApiName]('EndQuery', callbackFnc);
    }

    return (function(){
        _WiseGrid.extend({
            extension : {
                version: WiseCore.version
            },
            /**
             * Offset
             * WiseGrid의 document offset을 반환한다.
             * @return {JSON}
             * 			left	: offsetLeft
             * 			top		: offsetTop
             * 			width	: offsetWidth
             * 			height	: offsetHeight
             */
            offset : function(){
                var wOffset = {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                };
                try {
                    var pNode = _WiseGrid.offsetParent;
                    if (pNode.tagName == 'BODY') {
                        wOffset.top = _WiseGrid.offsetTop;
                        wOffset.left = _WiseGrid.offsetLeft;
                    }
                    else {
                        while (pNode) {
                            wOffset.top += pNode.offsetTop;
                            wOffset.left += pNode.offsetLeft;
                            if (pNode.offsetParent == document.body)
                                break;
                            pNode = pNode.offsetParent;
                        }
                    }
                    wOffset.width = _WiseGrid.offsetWidth;
                    wOffset.height = _WiseGrid.offsetHeight;
                }
                catch (ee) {
                    throw new Error('WiseGrid가 정상적으로 초기화되지 않았습니다.');
                }
                return {
                    top: wOffset.top,
                    left: wOffset.left,
                    width: wOffset.width,
                    height: wOffset.height
                };
            },
            /**
             * WiseGrid Header 관련 Namespace
             */
            header : {
                /**
                 * ex)
                 * {
		         *	key:{
		         * 		text:'',
		         *		width:'',
		         *		maxLength:'',
		         *		type:'',
		         *		activation:''
		         * }
		         * or)
		         * [
		         *		key:'',
		         * 		text:'',
		         *		width:'',
		         *		maxLength:'',
		         *		type:'',
		         *		activation:''
		         * ]
		         */
                /**
                 * json 데이터를 헤더로 생성한다.
                 * @param {Json} _json
                 */
                add: function(_json){
                    try{
                        var json = (WiseCore.isObject(_json)?_json:(WiseCore.isJSON(_json)? eval('('+_json+')'):null));
                        if (WiseCore.isArray(json)) {
                            WiseCore.each(json, function(header, index){
                                _WiseGrid.AddHeader(header['key'], (header['text'] ? header['text'] : ''), (header['type'] ? header['type'] : 't_text'), (header['maxLength'] ? header['maxLength'] : -1), (header['width'] ? header['width'] : 0), ('edit activatenoedit true'.indexOf(header['edit']) > -1 ? true : false));
                            });
                        }
                        else
                        if (WiseCore.isObject(json)) {
                            for(var colKey in json){
                                _WiseGrid.AddHeader(colKey, (json[colKey]['text'] ? json[colKey]['text'] : ''), (json[colKey]['type'] ? json[colKey]['type'] : 't_text'), (json[colKey]['maxLength'] ? json[colKey]['maxLength'] : -1), (json[colKey]['width'] ? json[colKey]['width'] : 0), ('edit activatenoedit true'.indexOf(json[colKey]['edit']) > -1 ? true : false));
                            }
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.header.add : ' + e.message);
                    }
                },
                /**
                 * 헤더를 jsonArray 타입으로 반환한다.
                 */
                getJsonArr: function(){
                    try{
                        var nAr = new Array();
                        for (var i = 0, len = _WiseGrid.GetColCount(); i < len; i++) {
                            var key = _WiseGrid.GetColHDKey(i);
                            nAr.push({
                                key: key,
                                text: _WiseGrid.GetColHDText(key),
                                width: _WiseGrid.GetColWidth(key),
                                maxLength: _WiseGrid.GetColMaxLength(key),
                                type: _WiseGrid.GetColType(key),
                                edit: _WiseGrid.GetColCellActivation(key)
                            });
                        }
                        return nAr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.header.getJsonArr : ' + e.message);
                    }
                },
                /**
                 * 헤더를 jsonObject형태로 반환한다.
                 */
                getJsonObj: function(){
                    try{
                        var obj = {};
                        for (var i = 0, len = _WiseGrid.GetColCount(); i < len; i++) {
                            var key = _WiseGrid.GetColHDKey(i);
                            obj[key] = {
                                key: key,
                                text: _WiseGrid.GetColHDText(key),
                                width: _WiseGrid.GetColWidth(key),
                                maxLength: _WiseGrid.GetColMaxLength(key),
                                type: _WiseGrid.GetColType(key),
                                edit: _WiseGrid.GetColCellActivation(key)
                            }
                        }
                        return obj;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.header.getJsonObj : ' + e.message);
                    }
                },
                /**
                 * WiseGrid Header의 height값을 가져온다.
                 */
                getHeight: function(){
                    return (_WiseGrid.bHDVisible) ? _WiseGrid.nHDLines * ((_WiseGrid.nHDLineSize > -1) ? _WiseGrid.nHDLineSize : 25) : 0;
                }
            },
            /**
             * Row Data 관련 Namespace
             */
            row : {
                lastIndex : function(){
                    return _WiseGrid.GetRowCount()-1;
                },
                count: function(){
                    return _WiseGrid.GetRowCount();
                },
                add : function(_row){
                    if(W$.isEmpty(_row)){
                        _WiseGrid.AddRow();
                    }else{
                        _WiseGrid.AddRow();
                        _WiseGrid.row.setJson(_WiseGrid.row.lastIndex(),_row);
                    }
                },
                /**
                 * Row Data를 JSON으로 반환한다.
                 * @param {Number} _row
                 * @return {Json} 컬럼키 : {
		         * 				value	:'cell value',
		         * 				hidden	: 'cell hidden value',
		         * 				selectedIndex(콤보박스인경우)	: '선택된 index',
		         * 				imageIndex(이미지컬럼 일경우)	: '설정된 index'
		         * 			}
                 */
                toJsonObj: function(_row){
                    try{
                        var rtnObj = {};
                        for (var i = 0, len = _WiseGrid.GetColCount(); i < len; i++) {
                            var key = _WiseGrid.GetColHDKey(i);
                            rtnObj[key] = {
                                type: _WiseGrid.GetColType(key)
                            };
                            /**
                             * t_combo type
                             */
                            if (_WiseGrid.GetColType(key) == 't_combo') {
                                var selectedIndex = _WiseGrid.GetComboSelectedIndex(key, _row);
                                rtnObj[key].value = (selectedIndex == -1 ? '' : _WiseGrid.GetComboText(key, selectedIndex, _WiseGrid.GetComboSelectedListKey(key, _row)));
                                rtnObj[key].hidden = (selectedIndex == -1 ? '' : _WiseGrid.GetComboHiddenValue(key, selectedIndex, _WiseGrid.GetComboSelectedListKey(key, _row)));
                                rtnObj[key].selectedIndex = selectedIndex;
                            }
                            /**
                             * t_imagetext type
                             */
                            else
                            if (_WiseGrid.GetColType(key) == 't_imagetext') {
                                rtnObj[key].value = _WiseGrid.GetCellValue(key, _row);
                                rtnObj[key].hidden = _WiseGrid.GetCellHiddenValue(key, _row);
                                rtnObj[key].imageIndex = _WiseGrid.GetCellImage(key, _row);
                            }
                            else {
                                rtnObj[key].value = _WiseGrid.GetCellValue(key, _row);
                                rtnObj[key].hidden = _WiseGrid.GetCellHiddenValue(key, _row);
                            }
                        }
                        return rtnObj;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.row.toJsonObj : ' + e.message);
                    }
                },
                /**
                 * Row Data를 JSON Array로 반환한다.
                 * @param {Number} _row
                 * @return {Json} [
                 * 			{
		         * 				key : 'ColumnKey'
		         * 				value	:'cell value',
		         * 				hidden	: 'cell hidden value',
		         * 				selectedIndex(콤보박스인경우)	: '선택된 index',
		         * 				imageIndex(이미지컬럼 일경우)	: '설정된 index'
		         * 			}
                 */
                toJsonArr: function(_row){
                    try{
                        var rtnArr = new Array();
                        for (var i = 0, len = _WiseGrid.GetColCount(); i < len; i++) {
                            var key = _WiseGrid.GetColHDKey(i);
                            rtnArr[i] = {
                                key: key,
                                type: _WiseGrid.GetColType(key)
                            };
                            /**
                             * t_combo
                             */
                            if (_WiseGrid.GetColType(key) == 't_combo') {
                                var selectedIndex = _WiseGrid.GetComboSelectedIndex(key, _row);
                                rtnArr[i].value = (selectedIndex == -1 ? '' : _WiseGrid.GetComboText(key, selectedIndex, _WiseGrid.GetComboSelectedListKey(key, _row)));
                                rtnArr[i].hidden = (selectedIndex == -1 ? '' : _WiseGrid.GetComboHiddenValue(key, selectedIndex, _WiseGrid.GetComboSelectedListKey(key, _row)));
                                rtnArr[i].selectedIndex = selectedIndex;
                            }
                            /**
                             * t_imagetext
                             */
                            else
                            if (_WiseGrid.GetColType(key) == 't_imagetext') {
                                rtnArr[i].value = _WiseGrid.GetCellValue(key, _row);
                                rtnArr[i].hidden = _WiseGrid.GetCellHiddenValue(key, _row);
                                rtnArr[i].imageIndex = _WiseGrid.GetCellImage(key, _row);
                            }
                            else {
                                rtnArr[i].value = _WiseGrid.GetCellValue(key, _row);
                                rtnArr[i].hidden = _WiseGrid.GetCellHiddenValue(key, _row);
                            }

                        }
                        return rtnArr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.row.toJsonArr : ' + e.message);
                    }
                },
                /**
                 * Row의 value만 배열로 반환한다.
                 * @param {Number} _row
                 */
                toArray: function(_row){
                    try{
                        var rtnArr = new Array();
                        for (var i = 0, len = _WiseGrid.GetColCount(); i < len; i++) {
                            var key = _WiseGrid.GetColHDKey(i);
                            if (_WiseGrid.GetColType(key) == 't_combo') {
                                var selectedIndex = _WiseGrid.GetComboSelectedIndex(key, _row);
                                rtnArr[i] = (selectedIndex == -1 ? '' : _WiseGrid.GetComboText(key, selectedIndex, _WiseGrid.GetComboSelectedListKey(key, _row)));
                            }
                            else {
                                rtnArr[i] = _WiseGrid.GetCellValue(key, _row);
                            }
                        }
                        return rtnArr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.row.toArray : ' + e.message);
                    }
                },
                /**
                 * json 데이터를 row Data로 변경한다.
                 * @param {Number} _row
                 * @param {Object} _json
                 */
                setJson: function(_row, _json){
                    try{
                        if(WiseCore.isArray(_json)){
                            WiseCore.each(_json,function(_header,index){
                                var key = _header.key;
                                switch (_WiseGrid.GetColType(key)) {
                                    case 't_combo':
                                        _WiseGrid.SetComboSelectedIndex(key, _row, (_header.selectedIndex?_header.selectedIndex:0));
                                        break;
                                    case 't_imagetext':
                                        _WiseGrid.SetCellValue(key, _row, (_header.value?_header.value:''));
                                        _WiseGrid.SetCellHiddenValue(key, _row, (_header.hidden?_header.hidden:''));
                                        _WiseGrid.SetCellImage(key, _row, (_header.imageIndex?_header.imageIndex:0));
                                        break;
                                    default:
                                        _WiseGrid.SetCellValue(key, _row, (_header.value?_header.value:''));
                                        _WiseGrid.SetCellHiddenValue(key, _row, (_header.hidden?_header.hidden:''));
                                        break;
                                }
                            });
                        }else if(WiseCore.isObject(_json)){
                            for (var key in _json) {
                                switch (_WiseGrid.GetColType(key)) {
                                    case 't_combo':
                                        _WiseGrid.SetComboSelectedIndex(key, _row, (_json[key].selectedIndex?_json[key].selectedIndex:0));
                                        break;
                                    case 't_imagetext':
                                        _WiseGrid.SetCellValue(key, _row, (_json[key].value?_json[key].value:''));
                                        _WiseGrid.SetCellHiddenValue(key, _row, (_json[key].hidden?_json[key].hidden:''));
                                        _WiseGrid.SetCellImage(key, _row, (_json[key].imageIndex?_json[key].imageIndex:0));
                                        break;
                                    default:
                                        _WiseGrid.SetCellValue(key, _row, _json[key].value);
                                        _WiseGrid.SetCellHiddenValue(key, _row, _json[key].hidden);
                                        break;
                                }
                            }
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.row.setJson : ' + e.message);
                    }
                },
                /**
                 *
                 * @param {Object} _arg
                 */
                del : function(_arg){
                    try{
                        /**
                         * 숫자타입일 경우 해당 로우만 삭제
                         */
                        if(WiseCore.isNumeric(_arg)){
                            _WiseGrid.DeleteRow(_arg);
                            /**
                             * CHECKBOX 타입의 컬럼일경우 체크된 Row 삭제
                             */
                        }else if(WiseCore.isString(_arg) && _WiseGrid.HasColKey(_arg)){
                            if(_WiseGrid.GetColType(_arg) == 't_checkbox'){
                                var checkedRow = _WiseGrid.$F('1',_arg);
                                checkedRow = checkedRow.sort(function(prev,curr){
                                    return curr.row - prev.row;
                                });
                                WiseCore.each(checkedRow,function(delItem,index){
                                    if (WiseCore.isNumeric(delItem.row)) {
                                        _WiseGrid.DeleteRow(delItem.row);
                                    }
                                });
                            }
                            /**
                             *  배열일경우큰 숫자부터 앞으로 오게 소팅
                             */
                        }else if(WiseCore.isArray(_arg)){
                            _arg = _arg.sort(function(a,b){
                                return b - a;
                            });
                            WiseCore.each(_arg, function(delIdx, index){
                                if (WiseCore.isNumeric(delIdx)) {
                                    _WiseGrid.DeleteRow(delIdx);
                                }
                            });
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.row.del : ' + e.message);
                    }
                }
            },
            /**
             * WiseGrid Combo기능 관련 Namespace
             */
            combo : {
                /**
                 * 		single combo ex)
                 * 		[
                 * 			{
		         * 				text: "value",
		         * 				hidden:"value"
		         * 			},
                 * 			{
		         * 				text: "value2",
		         * 				hidden:"value2"
		         * 			}
                 * 		]
                 *
                 * 		multi combo ex)
                 * 		[
                 * 			{
		         * 				key:'key1',
		         * 				items : [
		         * 					{
		         * 						text:"val1",
		         * 						hidden:"hiddenValue1"
		         * 					},
		         * 					{
		         * 						text:"val2",
		         * 						hidden:"hiddenValue2"
		         * 					}
		         * 				]
		         * 			}
                 * 		]
                 *
                 */
                /**
                 * Json 데이터로 combo를 생성한다.
                 * @param {String} _column
                 * @param {Json} _jsonData
                 */
                add: function(_column, _jsonData){
                    try{
                        var jsonCombo = (WiseCore.isObject(_jsonData) || WiseCore.isArray(_jsonData)? _jsonData : (WiseCore.isJSON(_jsonData) ? eval('('+_jsonData+')') : []));
                        WiseCore.each(jsonCombo, function(combo, index){
                            /**
                             * Multi Combo
                             */
                            if (combo.hasOwnProperty('key')) {
                                _WiseGrid.AddComboList(_column, combo.key);
                                WiseCore.each(combo.items, function(data, index){
                                    _WiseGrid.AddComboListValue(_column, data.text, data.hidden, combo.key);
                                });
                                /**
                                 * Single Combo
                                 */
                            }
                            else {
                                _WiseGrid.AddComboListValue(_column, combo.text, combo.hidden);
                            }
                        });
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.combo.add : ' + e.message);
                    }
                },
                /**
                 * 멀티콤보일 경우는 Combo의 갯수, 기본콤보는 item의 갯수를 반환한다.
                 * @param {Object} _columnKey
                 */
                count : function(_columnKey){
                    try{
                        return (_WiseGrid.HasComboList(_columnKey)? _WiseGrid.GetComboListCount(_columnKey, 'COMBOLIST_COUNT') : _WiseGrid.GetComboListCount(_columnKey));
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.combo.count : ' + e.message);
                    }
                },
                /**
                 * Combo 데이터를 Json으로 반환한다.
                 * @param {String} _columnKey
                 * @param {String} _comboKey
                 */
                getJson: function(_columnKey, _comboKey){
                    try{
                        var jsonArr = new Array();
                        /**
                         * Multi Combo
                         */
                        var comboCount = _WiseGrid.combo.count(_columnKey);
                        if (_WiseGrid.HasComboList(_columnKey) && comboCount>0) {

                            for (var i = 0; i < comboCount; i++) {

                                jsonArr.push({
                                    key: _WiseGrid.GetComboListKey(_columnKey, i),
                                    items: new Array()
                                });
                                for (var j = 0; j < _WiseGrid.GetComboListCount(_columnKey, jsonArr[i].key); j++) {
                                    jsonArr[i].items[j] = {
                                        text: _WiseGrid.GetComboText(_columnKey, j,jsonArr[i].key),
                                        hidden: _WiseGrid.GetComboHiddenValue(_columnKey, j,jsonArr[i].key)
                                    }
                                }
                            }
                            /**
                             * Single Combo
                             */
                        }
                        else {
                            for (var i = 0; i < comboCount; i++) {
                                jsonArr.push({
                                    text: _WiseGrid.GetComboText(_columnKey, i),
                                    hidden: _WiseGrid.GetComboHiddenValue(_columnKey, i)
                                });
                            }
                        }
                        return jsonArr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.combo.getJson : ' + e.message);
                    }
                }
            },
            /**
             * t_imagetext 컬럼에서 이미지 리스트, 이미지 인덱스를 가져온다.
             * @param {String} _column
             */
            imagelist : {
                add: function(_col, _array){
                    try{
                        if (!WiseCore.isEmpty(_col) && WiseCore.isArray(_array)) {
                            WiseCore.each(_array, function(_imgUrl, index){
                                _WiseGrid.AddImageList(_col, _imgUrl);
                            });
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.imagelist.add : ' + e.message);
                    }

                },
                getArray: function(_col){
                    try{
                        var arr = new Array();
                        for(var i=0; i<_WiseGrid.GetImageListCount(_col);i++){
                            arr.push(WiseGrid.GetImageListURL(_col,i));
                        }
                        return arr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.imagelist.getArray : ' + e.message);
                    }
                }
            },

            ajax : {
                /**
                 * sendRequest
                 * 그리드 통신(DoQuery에 callback 기능 추가)
                 * @param {String} _url
                 * @param {Object|String} _connTypeArg 체크박스 컬럼 또는 Row 배열 (생략가능)
                 * @param {Boolean|Function} _async 비동기 여부(생략가능)
                 * @param {Boolean} _validate 전송전 체크(생략가능)
                 * @param {Function} callback (생략가능)
                 */
                sendRequest : function(_url, _connTypeArg, _async, _validate){
                    try{
                        var callback = null;
                        if (WiseCore.isFunction(arguments[arguments.length - 1])) {
                            callback = arguments[arguments.length - 1];
                            arguments[arguments.length - 1] = true;
                            arguments.length--;
                        }

                        if(callback != null){
//                            var callbackFnc = function(){
//                                _WiseGrid.detachEvent('EndQuery', callbackFnc);
//                                var status = _WiseGrid.GetStatus();
//                                var message = _WiseGrid.GetMessage();
//                                /* -1 => null, emtpy => null*/
//                                console.log('End Query')
//                                status = (status != -1?('true false'.indexOf(status.toLowerCase())>-1?eval(status):status):null);
//                                callback(status,message);
//                            }

                            _WiseGrid.EndQueryCallback = callback;
//
//                            if(WiseCore.isIE11){
//                                WiseCore.attachIE11Event(_WiseGrid, 'EndQuery', callbackFnc);
//                            }else{
//                                _WiseGrid[eventBindApiName]('EndQuery', callbackFnc);
//                            }
                        }
                        if (arguments.length > 1) {
                            _WiseGrid.DoQuery(_url, _connTypeArg, (WiseCore.isEmpty(_async) ? true : _async), (WiseCore.isEmpty(_validate) ? true : _validate));
                        }
                        else {
                            _WiseGrid.DoQuery(_url);
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.ajax.sendRequest : ' + e.message);
                    }
                }
            },


            /**
             * WiseGrid Param 관련 Namespace
             */
            param : {
                /**
                 *
                 * 복수 선택된 값은 separator 로 구분하여 세팅한다.
                 */
                separator: ',',
                /**
                 * WiseGrid에 파라미터를 추가한다.
                 * @param {Object} key
                 * @param {Object} value
                 */
                add: function(key, value){
                    _WiseGrid.SetParam(key, value);
                },
                /**
                 * form에 있는 파라미터를 모두 WiseGrid 파라미터로 만든다.
                 * @param {String} _formId
                 * @param {Function} _validateFunc
                 * @param {Function} _callBack
                 */
                syncForm: function(_formId, _validateFunc, _callBack){
                    var element = {};
                    var vFnc = false;
                    if (_validateFunc != null && WiseCore.isFunction(_validateFunc)) {
                        vFnc = true;
                    }
                    else {
                        _validateFunc = function(){}
                    }
                    if(WiseCore.isEmpty(document.getElementById(_formId))){
                        throw new Error('존재하지 않는  Form Id 입니다. :: param.syncForm("'+_formId+'");');
                    }
                    try{
                        var form = document.getElementById(_formId);

                        var failEl = new Array();
                        var formEls = new Array();
                        for (var q = 0; q < form.elements.length; q++) {
                            if ('input'.indexOf((form.elements[q].tagName).toLowerCase()) > -1 &&
                                'text hidden password radio checkbox file'.indexOf((form.elements[q].type).toLowerCase()) > -1) {
                                formEls.push(form.elements[q]);
                            }
                            else
                            if ('select textarea'.indexOf((form.elements[q].tagName).toLowerCase()) > -1) {
                                formEls.push(form.elements[q]);
                            }
                        }
                        var cnt = WiseCore.each(formEls, function(fEl, index){
                            /**
                             * radio type, checkbox type 은 구분자로 복수 값을 저장한다.
                             */
                            var vVal = _validateFunc(fEl);

                            if(vFnc && WiseCore.isEmpty(vVal)){
                                return false;
                            }

                            if (!vVal) {
                                failEl.push(fEl)
                            }

                            /**
                             * HTMLInputElement
                             */
                            if ((fEl.tagName).toLowerCase() == 'input') {
                                if ('text hidden file password'.indexOf((fEl.type).toLowerCase()) > -1) {
                                    if (vFnc) {
                                        element[fEl.name] = vVal;
                                    }
                                    else
                                    if (!vFnc) {
                                        element[fEl.name] = fEl.value;
                                    }
                                }
                                else
                                if ((fEl.type).toLowerCase() == 'radio' || (fEl.type).toLowerCase() == 'checkbox') {
                                    if (fEl.checked && element[fEl.name] != null && (element[fEl.name]).length > 0) {
                                        if (vFnc) {
                                            element[fEl.name] = element[fEl.name] + _WiseGrid.param.separator + vVal;
                                        }
                                        else
                                        if (!vFnc) {
                                            element[fEl.name] = element[fEl.name] + _WiseGrid.param.separator + fEl.value;
                                        }
                                    }
                                    else
                                    if (fEl.checked) {
                                        if (vFnc) {
                                            element[fEl.name] = vVal;
                                        }
                                        else
                                        if (!vFnc) {
                                            element[fEl.name] = fEl.value;
                                        }
                                    }
                                }
                            }
                            /**
                             * HTMLTextAreaElement
                             */
                            else
                            if ((fEl.tagName).toLowerCase() == 'textarea') {
                                if (vFnc) {
                                    element[fEl.name] = vVal;
                                }
                                else
                                if (!vFnc) {
                                    element[fEl.name] = fEl.value;
                                }
                            }
                            /**
                             * HTMLSelectElement
                             */
                            else
                            if ((fEl.tagName).toLowerCase() == 'select') {
                                if (fEl.multiple) {
                                    for (var s = 0; s < fEl.options.length; s++) {
                                        if (fEl.options[s].selected && !WiseCore.isDefined(element[fEl.name])) {
                                            if (vFnc) {
                                                element[fEl.name] = vVal;
                                            }
                                            else
                                            if (!vFnc) {
                                                element[fEl.name] = fEl.options[s].value;
                                            }
                                        }
                                        else
                                        if (fEl.options[s].selected && element[fEl.name]) {
                                            if (vFnc) {
                                                element[fEl.name] = element[fEl.name] + _WiseGrid.param.separator + vVal;
                                            }
                                            else
                                            if (!vFnc) {
                                                element[fEl.name] = element[fEl.name] + _WiseGrid.param.separator + fEl.options[s].value;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (vFnc) {
                                        element[fEl.name] = vVal;
                                    }
                                    else
                                    if (!vFnc) {
                                        element[fEl.name] = fEl.value;
                                    }
                                }
                            }
                        });
                        for (var e in element) {
                            _WiseGrid.SetParam(e, element[e]);
                        }
                        formEls = element = null;
                        if (_callBack)
                            _callBack(failEl);
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.param.syncForm : ' + e.message);
                    }
                },
                /**
                 * 그리드 파라미터중 form name과 같은 파라미터를 form에 전송한다.
                 * @param {String} _formId
                 * @param {Function} _callBack
                 */
                bindForm: function(_formId, _callBack){
                    try{
                        /**
                         * json[id]
                         */
                        var setCheck = function(sEl, v){
                            if (sEl.value == v)
                                sEl.checked = true;
                        };
                        var json = _WiseGrid.param.getJson();
                        for (var id in json) {
                            var el = document.getElementById(_formId)[id];

                            if (!WiseCore.isEmpty(el)) {
                                var tag = (el.tagName ? el.tagName : '');

                                if ((tag).toLowerCase() == 'select') {
                                    /**
                                     * Multi
                                     */
                                    if (el.multiple && WiseCore.isArray(json[id])) {
                                        for (var s = 0; s < el.options.length; s++) {
                                            el.options[s].selected = false;
                                            for (var m = 0; m < json[id].length; m++) {
                                                if (el.options[s].value == json[id][m]) {
                                                    el.options[s].selected = true;
                                                }
                                            }
                                        }
                                    }
                                    /**
                                     * Single
                                     */
                                    else {
                                        for (var s = 0; s < el.options.length; s++) {
                                            el.options[s].selected = false;
                                            if (el.options[s].value == json[id]) {
                                                el.options[s].selected = true;
                                            }
                                        }
                                    }
                                }
                                else
                                if ((tag).toLowerCase() == 'input') {
                                    if ('text password hidden'.indexOf((el.type).toLowerCase()) > -1) {
                                        el.value = json[id];
                                    }
                                    else {
                                        if (el.length > 1) {
                                            if ((el[0].type).toLowerCase() == 'radio' || (el[0].type).toLowerCase() == 'checkbox') {
                                                /**
                                                 * Multi check
                                                 */
                                                if (WiseCore.isArray(json[id])) {
                                                    for (var y = 0; y < el.length; y++) {
                                                        el[y].checked = false;
                                                        for (var z = 0; z < json[id].length; z++) {
                                                            setCheck(el[y], json[id][z]);
                                                        }
                                                    }
                                                }
                                                /**
                                                 * Single check
                                                 */
                                                else {
                                                    for (var r = 0; r < el.length; r++) {
                                                        el[r].checked = false;
                                                        setCheck(el[r], json[id]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else
                                if ((tag).toLowerCase() == 'textarea') {
                                    el.value = json[id];
                                }
                            }

                            if (_callBack)
                                _callBack();
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.param.bindForm : ' + e.message);
                    }

                },
                /**
                 * WiseGrid의 Param을 json 형식으로 리턴한다.
                 */
                getJson: function(_id){
                    try{
                        var jsonParam = {};
                        if(WiseCore.isEmpty(_id)){
                            for (var i = 0, len = _WiseGrid.GetParamCount(); i < len; i++) {
                                if (_WiseGrid.GetParam(_WiseGrid.GetParamKey(i)).indexOf(_WiseGrid.param.separator) > -1) {
                                    jsonParam[_WiseGrid.GetParamKey(i)] = _WiseGrid.GetParam(_WiseGrid.GetParamKey(i)).split(_WiseGrid.param.separator);
                                }
                                else {
                                    jsonParam[_WiseGrid.GetParamKey(i)] = _WiseGrid.GetParam(_WiseGrid.GetParamKey(i));
                                }
                            }
                            return jsonParam;
                        }else{
                            try{
                                return _WiseGrid.GetParam(_id);
                            }catch(e){
                                return null;
                            }
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.param.getJson : ' + e.message);
                    }
                },
                setSeparator : function(_v){
                    _WiseGrid.param.separator = _v;
                }
            },
            /**
             * Private
             * find결과를 jsonArr로 반환
             * @param {String} v 검색할 값
             * @param {String} sCol 검색 시작 컬럼
             * @param {Number} sRowIdx 검색 시작 row index
             * @param {String} eCol 검색 종료 컬럼
             * @param {Number} eRowIdx 마지막 검색 row index
             * @param {String} rule 검색값 비교방법
             * @param {String} matchCase 대소문자 구분
             */
            finds : {
                valueToJson :function(v, sCol, sRowIdx, eCol, eRowIdx, rule, matchCase){
                    var findArr = new Array();
                    try{
                        var f = _WiseGrid.FindArea(v, sCol, sRowIdx, eCol, eRowIdx, 'addheader', 'displaytext', rule, matchCase, false);
                        if (f.length > 0) {
                            var aArr = f.split(',');

                            var index = 0;
                            for (var i = 0; i < aArr.length; i += 2) {
                                findArr[index] = {
                                    key: aArr[i],
                                    row: aArr[i + 1]
                                };
                                index++;
                            }
                        }
                        return findArr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.finds.valueToJson : ' + e.message);
                    }
                }
            },
            event : {
                /**
                 * 그리드에 이벤트(그리드 이벤트)를 등록한다.
                 * @param {String} _eventName
                 * @param {Function} _fn
                 */
                attach:function(_eventName, _fn){
                    if(!_WiseGrid.attachedEvent) _WiseGrid.attachedEvent = {};
                    _WiseGrid.attachedEvent[_eventName] = _fn;
                    //try {
                    if(!WiseCore.isEmpty(_eventName)){
                        if('mouseover mouseout'.indexOf(_eventName.toLowerCase())>-1){
                            _WiseGrid[eventBindApiName](_eventName+'2', _fn);
                        }else{
                            WiseCore.attachIE11Event(_WiseGrid,_eventName, _fn);
                        }
                    }
                    //} catch (e) {
                    //   throw new Error(_WiseGrid.name+'.event.attach : ' + e.message);
                    //}
                },
                /**
                 * 그리드에 등록된 이벤트(그리드 이벤트)를 해제한다.
                 * @param {String} _eventName
                 * @param {Function} _fn
                 */
                detach : function(_eventName, _fn){
                    try{
                        if(!WiseCore.isEmpty(_eventName)){
                            WiseCore.each(_eventName.split(','),function(event,index){
                                _WiseGrid.detachEvent(event, _fn);
                            });
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.event.detach : ' + e.message);
                    }
                }
            },
            /**
             * WiseGrid Helper
             */
            helper:{
                /**
                 * WiseGrid Find Helper
                 * @param {String} _value 값
                 * @param {String} _colKey 컬럼키(생략가능)
                 */
                F : function(_value, _colKey){
                    try{
                        var findArr = new Array();
                        if(_WiseGrid.GetRowCount()<=0){
                            return findArr;
                        }
                        var startColumnKey = _colKey ? _colKey : _WiseGrid.GetColHDKey(0);
                        var endColumnKey = _colKey ? _colKey : _WiseGrid.GetColHDKey(_WiseGrid.GetColCount() - 1);
                        var endRowIndex = _WiseGrid.GetRowCount() - 1;
                        var f;

                        if(_WiseGrid.GetColType(_colKey) === 't_combo') f= _WiseGrid.FindArea(_value, startColumnKey, 0, endColumnKey, endRowIndex, 'addheader', 'hiddenvalue', 'equal', true, false);
                        else f = _WiseGrid.FindArea(_value, startColumnKey, 0, endColumnKey, endRowIndex, 'addheader', 'value', 'equal', true, false);

                        if (f.length > 0) {
                            var aArr = f.split(',');
                            for (var i = 0; i < aArr.length; i += 2) {
                                findArr.push({
                                    key: aArr[i],
                                    row: aArr[i + 1]
                                });
                            }
                        }
                        return findArr;
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.helper.find : ' + e.message);
                    }
                },
                /**
                 * WiseGrid Cell Value Helper
                 * 컬럼키와 row만 입력할경우 GetCellValue, 컬럼키와 row, value 모두 입력할 경우 SetCellValue로 동작한다.
                 * @param {String} 컬럼키
                 * @param {Number} row
                 * @param {String} value(생략가능)
                 */
                value : function(_colKey, _row, _value, _comboKey){
                    try{
                        if (_WiseGrid.GetColType(_colKey) == 't_combo') {
                            var comboCount = _WiseGrid.GetComboListCount(_colKey, 'COMBOLIST_COUNT');
                            if(comboCount > 0){
                                if (arguments.length == 4) {
                                    _WiseGrid.SetComboSelectedHiddenValue(_colKey,_row,_value,_comboKey);
                                }else{
                                    return _WiseGrid.GetCellHiddenValue(_colKey, _row);
                                }
                            }else{
                                if(arguments.length == 3){
                                    _WiseGrid.SetComboSelectedHiddenValue(_colKey,_row,_value);
                                }else {
                                    return (_WiseGrid.GetComboSelectedIndex(_colKey,_row)>-1 ?_WiseGrid.GetComboHiddenValue(_colKey,_WiseGrid.GetComboSelectedIndex(_colKey,_row)) : '');
                                }
                            }
                        }else{
                            if (arguments.length == 3) {
                                _WiseGrid.SetCellValue(_colKey, _row, _value);
                            }
                            else {
                                return _WiseGrid.GetCellValue(_colKey, _row);
                            }
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.helper.value : ' + e.message);
                    }

                },
                hidden : function(_colKey, _row, _value){
                    try{
                        if (_WiseGrid.GetColType(_colKey) != 't_combo') {
                            if (arguments.length == 3) {
                                _WiseGrid.SetCellHiddenValue(_colKey, _row, _value);
                            }
                            else {
                                return _WiseGrid.GetCellHiddenValue(_colKey, _row);
                            }
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.helper.hidden : ' + e.message);
                    }
                },
                param : function(){
                    try{
                        if(arguments.length == 2){
                            _WiseGrid.SetParam(new String(arguments[0]),new String(arguments[1]));
                        }else if(arguments.length == 1){
                            if(WiseCore.isObject(arguments[0])){
                                for(var key in arguments[0]){
                                    _WiseGrid.SetParam(key,new String(arguments[0][key]));
                                }
                            }else{
                                return _WiseGrid.GetParam(new String(arguments[0]));
                            }
                        }
                    }catch(e){
                        throw new Error(_WiseGrid.name+'.helper.param : ' + e.message);
                    }
                }
            }
        });
        _WiseGrid.$F = _WiseGrid.helper.F;
        _WiseGrid.$V = _WiseGrid.helper.value;
        _WiseGrid.$H = _WiseGrid.helper.hidden;
        _WiseGrid.$P = _WiseGrid.helper.param;
        window[_WiseGrid.id] = _WiseGrid;
        return _WiseGrid;
    })();
};


/**
 *
 */
WiseCore.WiseGridExtension = function(){};
WiseCore.WiseGridExtension.prototype={
    initializeExtension : function(gridObj){
        try{
            new WiseCore.Extension(gridObj);
            WiseGridEx.property(gridObj);
            WiseGridEx.initialize(gridObj);
        }catch(e){
            throw new Error(e.message);
        }finally{
            gridObj.onactivate = null;
        }
    },
    initialize : function(){},
    property: function(_gridObj){
        for(var key in defaultProperty){
            try{
                _gridObj[key] = defaultProperty[key]
            }catch(e){}
        }
    },
    render : function(_opts){
        try{
            this.options=new Array();
            for (var o in _opts) this.options[o] = _opts[o];
            var id = (this.options.id? this.options.id:'WiseGrid');
            this.options.width = (this.options.width != null? this.options.width:'100%');
            this.options.height = (this.options.height != null? this.options.height:'100%');
            this.initialize = this.options.initialize;
            var initTag = "";
            var target = this.options.target;
            if(WiseGridConfig != null){
                initTag += "<OBJECT ID='" + id + "' codebase='"+WiseGridConfig.path+"#version="+WiseGridConfig.version+"'";
                initTag += " NAME='" + id + "' WIDTH=" + this.options.width + " HEIGHT=" + this.options.height + " onactivate='WiseGridEx.initializeExtension(this)' border=0";
                initTag += " CLASSID='CLSID:"+WiseGridConfig.classid+"' >";
                if(WiseGridConfig.failMessage != null){
                    initTag += "<div style='color:red'>"+WiseGridConfig.failMessage+"</div>";
                }
                initTag += " <PARAM NAME = 'strLicenseKeyList' VALUE='"+WiseGridConfig.licenseKey+"'>";
                initTag += "</OBJECT>";
            }

            document.getElementById(target).innerHTML=initTag;
        }catch(e){
            throw new Error(e.message);
        }
    }
};

WiseGridEx = new WiseCore.WiseGridExtension();
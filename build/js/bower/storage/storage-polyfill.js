window.localStorage&&window.sessionStorage||function(){var n=function(n){function e(n,e,o){var t,i;o?(t=new Date,t.setTime(t.getTime()+24*o*60*60*1e3),i="; expires="+t.toGMTString()):i="",document.cookie=n+"="+e+i+"; path=/"}function o(n){var e,o,t=n+"=",i=document.cookie.split(";");for(e=0;e<i.length;e++){for(o=i[e];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}function t(o){o=JSON.stringify(o),"session"==n?window.name=o:e("localStorage",o,365)}function i(){"session"==n?window.name="":e("localStorage","",365)}function r(){var e="session"==n?window.name:o("localStorage");return e?JSON.parse(e):{}}function s(){var n=0;for(var e in a)a.hasOwnProperty(e)&&(n+=1);return n}var a=r();return{clear:function(){a={},i(),this.length=s()},getItem:function(n){return n=encodeURIComponent(n),void 0===a[n]?null:a[n]},key:function(n){var e=0;for(var o in a){if(e==n)return decodeURIComponent(o);e++}return null},removeItem:function(n){n=encodeURIComponent(n),delete a[n],t(a),this.length=s()},setItem:function(n,e){n=encodeURIComponent(n),a[n]=String(e),t(a),this.length=s()},length:0}};window.localStorage||(window.localStorage=new n("local")),window.sessionStorage||(window.sessionStorage=new n("session"))}();
//# sourceMappingURL=storage-polyfill.js.map
define(["underscore"],function(r){"use strict";var n,e,t=[];return n=function(r,n){return void("__ns"===r&&t.push("entity/"+n))},e=function(n,e){if(r.isObject(e)&&!r.isUndefined(e.__ns)){var t=require("entity/"+e.__ns);return delete e.__ns,new t(e)}return e},function(u,i){i=r.last(arguments),u=r.first(arguments);try{JSON.parse(u,n)}catch(s){return i(s)}return require(t,function(){var r;try{r=JSON.parse(u,e)}catch(n){return i(n)}return i(null,r)})}});
//# sourceMappingURL=from-json.js.map
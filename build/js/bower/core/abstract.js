define(["underscore"],function(){"use strict";function t(t){return[t.charAt(0).toLowerCase(),t.substr(1)].join("")}function e(t,e,n,i){return Object.defineProperty(t,e,{enumerable:i||!1,configurable:!1,writable:!1,value:n})}function n(t,n){return r.each(n,function(n,i){return e(t,i,n)})}function i(i,a,u){function o(t){if(!r.isObject(t)||r.isArray(t)||r.isFunction(t))throw new Error("Values must be an object");r.each(t,function(e,n){return d(n,e,t)})}function s(){var t={};return r.each(b._data,function(e,n){var i=l(n);r.isArray(i)?(t[n]=[],r.each(i,function(e){t[n].push(r.isObject(e)&&!r.isEmpty(e._gleam)?e.get():e)})):t[n]=r.isObject(i)&&!r.isEmpty(i._gleam)?i.get():i}),t}function c(t,e,n){return r.isUndefined(n)&&(n={},n[t]=e),r.has(a,t)?r.has(y,t)?y[t](e,n,b):!0:!1}function f(t,e,n){return b._data[t].value=r.has(p,t)?p[t](e,n,b):e,b._data[t].modified=!0,b}function d(t,e,n){if(c(t,e,n))return f(t,e,n);if(r.has(a,t))throw new Error("Value ["+e+"] is not valid for ["+i+"."+t+"]");return b}function l(t){if(!r.has(b._data,t))throw new Error("Accessing undefined property ["+i+"."+t+"]");return r.has(g,t)?g[t](b):b._data[t].value}function v(){var t={};return r.each(b._data,function(e,n){r.isArray(e.value)?(t[n]=[],r.each(e.value,function(e){(!r.isObject(e)||r.isEmpty(e._gleam))&&t[n].push(e)})):(!r.isObject(e.value)||r.isEmpty(e.value._gleam))&&(t[n]=e.value)}),t}function h(){var t={};return r.each(b._data,function(e,n){r.isArray(e.value)?(t[n]=[],r.each(e.value,function(e){t[n].push(r.isObject(e)&&!r.isEmpty(e._gleam)?e.toJSON():e)})):t[n]=r.isObject(e.value)&&!r.isEmpty(e.value._gleam)?e.value.toJSON():e.value}),t.__ns=i,t}function m(){var t={};return r.each(b._data,function(e,n){e.initial&&(t[n]=e.initial)}),t}function _(){var t=r.reduce(b._data,function(t,e,n){return e.modified&&t.push(n),t},[]);return r.pick(s(),t)}var b={},p={},g={},y={};return e(b,"_data",{}),e(b,"_gleam",i),r.each(a,function(n,a){if(!r.isFunction(n))throw new Error("Entity schema must not have any properties ["+i+"."+a+"]");return"_set"===a.substr(0,4)?void(p[t(a.substr(4))]=n):"_get"===a.substr(0,4)?void(g[t(a.substr(4))]=n):"_validate"===a.substr(0,9)?void(y[t(a.substr(9))]=n):(b._data[a]={initial:n(),modified:!1,value:n()},void e(b,a,function(t){return r.isUndefined(t)?l(a):(d(a,t),b)},!0))}),n(b,{set:o,get:s,getProperty:l,getFlat:v,getInitial:m,getModified:_,is:function(t){return t===i},isValid:c,toJSON:h,toString:function(){return["[","object"," ","Gleam:",i,"]"].join("")}}),u&&(o(u),r.each(b._data,function(t){t.modified=!1,t.initial=t.value})),b}var r=require("underscore");return"undefined"!=typeof module&&module.exports&&(module.exports=i),i});
//# sourceMappingURL=abstract.js.map
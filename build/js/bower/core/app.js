define(["module","dom","underscore"],function(t,r,n){"use strict";function e(t,e,o){return function(i){var a=r(i),u=a.attr([t,"-",e].join(""));return u?u.split(",").forEach(function(t){"value"===t&&a.is("[type=radio]")?a.prop("checked",a.val()===o):"value"===t&&n.isFunction(a.val)?a.val(o).trigger("change"):"html"===t?a.html(o):a.attr(t,o)}):a.html(o),a}}function o(t,r,o){return n.each(o,function(o,i){var a=["[",r,"-",i,"]"].join("");return n.each(t.find(a).add(t.filter(a)),e(r,i,o))})}function i(t,r){if(!d.log)return null;try{throw new Error("debug")}catch(e){return console.log(t,r,"\n",n.rest(e.stack.split("\n"),2).join("\n"))}}function a(){var t=n.toArray(arguments);return i("on",n.initial(t)),v.on.apply(v,t),y}function u(){var t=n.toArray(arguments);return i("off",n.initial(t)),v.off.apply(v,t),y}function l(){var t=n.toArray(arguments);return i("one",n.initial(t)),v.one.apply(v,t),y}function f(){var t=n.toArray(arguments),e=n.first(t);return e instanceof r?(i("trigger",n.flatten(n.union([e.get(0)],n.rest(t)))),e.trigger.apply(e,n.rest(t))):n.isElement(e)?(i("trigger",n.flatten(t)),e=r(e),e.trigger.apply(e,n.rest(t))):(i("trigger",n.flatten(n.union([v.get(0)],t))),v.trigger.apply(v,t)),y}function c(t){return r(t)}function g(t){return c(function(){var r=n.toArray(arguments);return r.unshift(null),t.apply(null,r)})}function s(t,n){return r(t.target).closest(n)}function p(t,n){var e=r(t.target);return e.is(n)&&e||!1}var y,d=n.defaults(t.config(),{log:!1}),v=r(document.body);return y={$root:v,fill:o,on:a,off:u,one:l,trigger:f,ready:c,asyncReady:g,getElement:s,getRoot:p,log:i}});
//# sourceMappingURL=app.js.map
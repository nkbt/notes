define(["module","dom","underscore","lib/storage","vendor/geo","lib/app","vendor/require/async!https://maps.googleapis.com/maps/api/js?sensor=true!callback"],function(e,n,o,t,a,l){"use strict";function r(e){p=!1,o.each(d,function(n){return n.call(null,null,e)}),d=[]}function g(e){return o.debounce(function(){var n={lat:e.getCenter().lat(),lng:e.getCenter().lng(),zoom:e.getZoom()};return t.set("lib_map",n)},300)}function u(e,n){var o={zoom:parseInt(n.zoom,10),center:new google.maps.LatLng(parseFloat(n.lat),parseFloat(n.lng)),mapTypeId:google.maps.MapTypeId.ROADMAP},t=new google.maps.Map(e.get(0),o);return google.maps.event.addListener(t,"center_changed",g(t)),google.maps.event.addListener(t,"zoom_changed",g(t)),e.data("lib_map",t),r(t)}function s(e){var l=n(e);return t.get("lib_map",function(e,n){return n=o.extend({},c,n||{}),n.lat&&n.lng||!a.init()?u(l,n):a.getCurrentPosition(function(e){return n.lat=e&&e.coords&&e.coords.latitude||0,n.lng=e&&e.coords&&e.coords.longitude||0,u(l,n)},function(){return u(l,n)})})}function i(e,n){return e.data("lib_map")instanceof google.maps.Map?n&&n.call(null,null,e.data("lib_map")):(n&&d.push(n),p?p:(p=!0,s(e)))}l.log("Loaded");var c=o.defaults(e.config(),{lat:-33.866116,lng:151.20541,zoom:14}),p=!1,d=[];return i.googleMaps=google.maps,i});
//# sourceMappingURL=init.js.map
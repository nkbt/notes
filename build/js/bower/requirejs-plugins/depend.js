define([],function(){var n=/^(.*)\[([^\]]*)\]$/;return{load:function(i,t,c){var e=n.exec(i);t(e[2].split(","),function(){t([e[1]],function(n){c(n)})})}}});
//# sourceMappingURL=depend.js.map
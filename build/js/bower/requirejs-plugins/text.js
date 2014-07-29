define(["module"],function(e){"use strict";var n,r,t=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,o=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,a="undefined"!=typeof location&&location.href,s=a&&location.protocol&&location.protocol.replace(/\:/,""),u=a&&location.hostname,f=a&&(location.port||void 0),c=[],d=e.config&&e.config()||{};return n={version:"2.0.5",strip:function(e){if(e){e=e.replace(i,"");var n=e.match(o);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:d.createXhr||function(){var e,n,r;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;3>n;n+=1){r=t[n];try{e=new ActiveXObject(r)}catch(i){}if(e){t=[r];break}}return e},parseName:function(e){var n,r,t,i=!1,o=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==o&&(!a||o>1)?(n=e.substring(0,o),r=e.substring(o+1,e.length)):n=e,t=r||n,o=t.indexOf("!"),-1!==o&&(i="strip"===t.substring(o+1),t=t.substring(0,o),r?r=t:n=t),{moduleName:n,ext:r,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,r,t,i){var o,a,s,u=n.xdRegExp.exec(e);return u?(o=u[2],a=u[3],a=a.split(":"),s=a[1],a=a[0],!(o&&o!==r||a&&a.toLowerCase()!==t.toLowerCase()||(s||a)&&s!==i)):!0},finishLoad:function(e,r,t,i){t=r?n.strip(t):t,d.isBuild&&(c[e]=t),i(t)},load:function(e,r,t,i){if(i.isBuild&&!i.inlineText)return void t();d.isBuild=i.isBuild;var o=n.parseName(e),c=o.moduleName+(o.ext?"."+o.ext:""),l=r.toUrl(c),p=d.useXhr||n.useXhr;!a||p(l,s,u,f)?n.get(l,function(r){n.finishLoad(e,o.strip,r,t)},function(e){t.error&&t.error(e)}):r([c],function(e){n.finishLoad(o.moduleName+"."+o.ext,o.strip,e,t)})},write:function(e,r,t){if(c.hasOwnProperty(r)){var i=n.jsEscape(c[r]);t.asModule(e+"!"+r,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,r,t,i,o){var a=n.parseName(r),s=a.ext?"."+a.ext:"",u=a.moduleName+s,f=t.toUrl(a.moduleName+s)+".js";n.load(u,t,function(){var r=function(e){return i(f,e)};r.asModule=function(e,n){return i.asModule(e,f,n)},n.write(e,u,r,o)},o)}},"node"===d.env||!d.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(r=require.nodeRequire("fs"),n.get=function(e,n){var t=r.readFileSync(e,"utf8");0===t.indexOf("﻿")&&(t=t.substring(1)),n(t)}):"xhr"===d.env||!d.env&&n.createXhr()?n.get=function(e,r,t,i){var o,a=n.createXhr();if(a.open("GET",e,!0),i)for(o in i)i.hasOwnProperty(o)&&a.setRequestHeader(o.toLowerCase(),i[o]);d.onXhr&&d.onXhr(a,e),a.onreadystatechange=function(){var n,i;4===a.readyState&&(n=a.status,n>399&&600>n?(i=new Error(e+" HTTP status: "+n),i.xhr=a,t(i)):r(a.responseText))},a.send(null)}:("rhino"===d.env||!d.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java)&&(n.get=function(e,n){var r,t,i="utf-8",o=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),i)),u="";try{for(r=new java.lang.StringBuffer,t=s.readLine(),t&&t.length()&&65279===t.charAt(0)&&(t=t.substring(1)),r.append(t);null!==(t=s.readLine());)r.append(a),r.append(t);u=String(r.toString())}finally{s.close()}n(u)}),n});
//# sourceMappingURL=text.js.map
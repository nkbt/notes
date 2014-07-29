"use strict";
var nodeStatic = require('node-static');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');


var environment = process.argv[2] || 'dev';
var port = process.env.PORT || 3000;
var assetsDir = (environment === 'dev') ? './src' : './build';


var file = new nodeStatic.Server(assetsDir);
var indexContent = _.template(fs.readFileSync(path.join(__dirname, assetsDir, 'index.html'), 'utf-8'))({env: environment});
require('http').createServer(function (request, response) {
	request.addListener('end', function () {
		console.log(['Serving: ', request.url].join(''));
		if (request.url === '/' || request.url === '/index.html') {
			return response.end(indexContent);
		}
		return file.serve(request, response);
	}).resume();
}).listen(port);

console.info(['Running on http://localhost:', port, ', environment: ', environment, ', assets: ', assetsDir].join(''));

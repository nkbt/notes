define([
	'lib/app', 'lib/layout'
], function (app, layout) {
	"use strict";
	app.log('Loaded');


	var actions = {};


	function destroy() {
	}


	function onRun(event, route) {
		if (route.controller() === 'index') {
			return actions[route.action()](route);
		}
		return destroy();
	}


	function indexReady(error, element) {
	}


	actions.index = function () {
		return require([
			'txt!views/index/index.html', 'css!styles/app/index/index'
		], layout.contentRenderer(indexReady));
	};


	app
		.on('lib/dispatcher:run', null, onRun)
	;

	return actions;
});

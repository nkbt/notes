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


	function indexReady(error, $element) {
		app.trigger($element, 'map:markerAdd', ['test1', -33.866116, 151.205410, 'Yado']);
		app.trigger($element, 'map:markerAdd', ['test2', -33.876116, 151.215410, 'Yado']);
		app.trigger($element, 'map:markerAdd', ['test3', -33.886116, 151.225410, 'Yado']);
		app.trigger($element, 'map:markerAdd', ['test4', -33.866116, 151.205410, 'Yado']);
		app.trigger($element, 'map:markerAdd', ['test5', -33.876116, 151.195410, 'Yado']);
		app.trigger($element, 'map:markerAdd', ['test6', -33.886116, 151.185410, 'Yado']);
	}


	actions.index = function () {
		return require([
			'txt!views/index/index.html', 'css!styles/app/index/index',
			'map'
		], layout.contentRenderer(indexReady));
	};


	app
		.on('lib/dispatcher:run', null, onRun)
	;

	return actions;
});

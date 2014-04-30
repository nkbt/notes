(function () {
	"use strict";

	require.config({
		baseUrl: '../js',
		paths: {
			// core libs
			underscore: 'bower/underscore/underscore',
			dom: 'bower/jquery/jquery',
			async: 'bower/async/async',
			history: 'bower/history/native.history',
			'lib/app': 'bower/core/app',
			'lib/dispatcher': 'bower/core/dispatcher',
			'lib/layout': 'bower/core/layout',
			'lib/router': 'bower/core/router',

			css: '../css',
			views: '../views',
			templates: '../templates',

			sinon: 'vendor/sinon',
			json: '../test/fixtures',
			test: '../test',
			mocha: '../../node_modules/mocha/mocha',
			chai: '../../node_modules/chai/chai'
		},
		waitSeconds: 60, // Wait 60s for scripts to be loaded
		shim: {
			async: {
				exports: 'async'
			},
			underscore: {
				exports: '_'
			},
			dom: {
				exports: 'jQuery'
			},
			sinon: {
				exports: 'sinon'
			},

			history: {
				exports: 'History',
				deps: ['dom']
			},
			mocha: {
				exports: 'mocha'
			},
			chai: {
				exports: 'chai'
			}
		},
		map: {
			'*': {
				'css': 'vendor/require/css',
				'txt': 'vendor/require/text'
			}
		},
		config: {
			'lib/app': {
				log: false
			}
		},
		deps: [
		]
	});

// load tests
	require([
		'mocha', 'chai'
	], function (mocha, chai) {
		// start the test runner
		mocha.ui('bdd');

		window.expect = chai.expect;

		// load up the tests
		require([
			'test/lib/app'

			// add more here...
		], function () {
			if (window.mochaPhantomJS) {
				mochaPhantomJS.run();
			} else {
				mocha.run();
			}
		});
	});

})();

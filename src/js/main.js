(function () {
	"use strict";

	require.config({
		baseUrl: '/js',
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
			'lib/navigation': 'bower/core/navigation',
			'lib/messenger': 'bower/messenger/messenger',
			'messenger/html': '../templates/bower/messenger',
			'lib/storage': 'bower/storage/storage',
			'vendor/storage-polyfill': 'bower/storage/storage-polyfill',

			'vendor/geo': 'bower/map/geo',
			'lib/map': 'bower/map/init',
			'map': 'bower/map/map',

			styles: '../css',
			views: '../views',
			templates: '../templates'
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
			history: {
				exports: 'History',
				deps: ['dom']
			}
		},
		map: {
			'*': {
				'css': 'bower/require-css/css',
				'txt': 'bower/requirejs-text/requirejs-text',
				'vendor/require/async': 'bower/requirejs-plugins/async'
			}
		},
		config: {
			'lib/app': {
				log: true
			}
		},
		deps: [
		]
	});

// Load CSS
	require([
		'css!styles/bootstrap',
		'css!styles/bootstrap-theme',
		'css!styles/font-awesome',
		'css!styles/main'
	], function () {
	});

// Start the main app logic.
	require([
		'dom',
		'underscore',
		'lib/app',

		'lib/layout',
		'lib/router',
		'lib/dispatcher',
		'lib/navigation'
	], function ($) {

		require('lib/app').one('lib/layout:finished', function () {
			$('#loading').remove();
			$('#main').addClass('loaded');
		});

		require('lib/app').ready(function () {
			require('lib/layout').render(require('lib/app').$root, function () {
				require('lib/dispatcher').restoreState();
			});
		});

	});
})();

/* globals google:true */

define([
	'module', 'dom', 'underscore', 'lib/storage', 'vendor/geo', 'lib/app',
	'vendor/require/async!https://maps.googleapis.com/maps/api/js?sensor=true!callback'
], function (module, $, _, storage, geo, app) {
	"use strict";
	app.log('Loaded');

	var config = _.defaults(module.config(), {
			lat: -33.866116,
			lng: 151.205410,
			zoom: 14
		}),
		loading = false,
		delegates = [];


	function done(googleMap) {
		loading = false;
		_.each(delegates, function (delegate) {
			return delegate.call(null, null, googleMap);
		});
		delegates = [];
	}

	/**
	 * @param {google.maps.Map} googleMap
	 */
	function storeMapState(googleMap) {
		return _.debounce(function () {
			var mapConfig = {
				lat: googleMap.getCenter().lat(),
				lng: googleMap.getCenter().lng(),
				zoom: googleMap.getZoom()
			};
			return storage.set('lib_map', mapConfig);
		}, 300);
	}


	function initMap($element, mapConfig) {
		var mapOptions = {
				zoom: parseInt(mapConfig.zoom, 10),
				center: new google.maps.LatLng(parseFloat(mapConfig.lat), parseFloat(mapConfig.lng)),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			googleMap = new google.maps.Map($element.get(0), mapOptions);

		google.maps.event.addListener(googleMap, 'center_changed', storeMapState(googleMap));
		google.maps.event.addListener(googleMap, 'zoom_changed', storeMapState(googleMap));

		$element.data('lib_map', googleMap);
		return done(googleMap);
	}


	/*
	If config is set to some point - then we want to show that point anyway.
	Like "always" overwrite.
	Then if user set some position previously moving the map, then we store it and restore on the next init.
	If user wants to show his new location - he has to press some button (similar to native google map).
	So we don't need need to track user's location all the time. Only on first load.

	Besides that. We consider that even if we have multiple map instances on a site,
	default initial position should be the same for the user. So if on one page user moved his map,
	then after going to another page he will see map with same

	* */
	function init(element) {
		var $element = $(element);

		return storage.get('lib_map', function (error, mapConfig) {
			mapConfig = _.extend({}, config, mapConfig || {});

			if (mapConfig.lat && mapConfig.lng || !geo.init()) {
				return initMap($element, mapConfig);
			}

			return geo.getCurrentPosition(function (position) {
				mapConfig.lat = position && position.coords && position.coords.latitude || 0;
				mapConfig.lng = position && position.coords && position.coords.longitude || 0;
				return initMap($element, mapConfig);
			}, function () {
				return initMap($element, mapConfig);
			});

		});

	}


	function instance($element, callback) {
		if ($element.data('lib_map') instanceof google.maps.Map) {
			return callback && callback.call(null, null, $element.data('lib_map'));
		}
		if (callback) {
			delegates.push(callback);
		}
		if (!loading) {
			loading = true;
			return init($element);
		}
		return loading;
	}

	instance.googleMaps = google.maps;

	return instance;
});


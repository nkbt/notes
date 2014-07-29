define([
	'dom', 'underscore', 'lib/app', 'lib/map'
], function ($, _, app, map) {
	"use strict";

	app.log('Loaded');


	function fitBounds(googleMap, markers) {
		var bounds = new map.googleMaps.LatLngBounds();
		_.forEach(markers, function (marker) {
			bounds.extend(marker.marker.position);
		});
		googleMap.fitBounds(bounds);
	}


	function markerAdd($map, id, lat, lng, text) {
		var latLng = new map.googleMaps.LatLng(lat, lng);

		return map($map, function (error, googleMap) {
			var googleMarkers = $map.data('map-googleMarkers') || {};

			googleMarkers[id] = {
				marker: new map.googleMaps.Marker({map: googleMap, position: latLng, draggable: false}),
				info: new map.googleMaps.InfoWindow({content: text})
			};
			fitBounds(googleMap, googleMarkers);

			map.googleMaps.event.addListener(googleMarkers[id].marker, 'click', function () {
				googleMarkers[id].info.open(googleMap, googleMarkers[id].marker);
				app.trigger($map, 'map:marker:click', [id]);
			});

			map.googleMaps.event.addListener(googleMap, 'click', function () {
				app.trigger($map, 'map:click');
			});

			$map.data('map-googleMarkers', googleMarkers);
			return app.trigger($map, 'map:markerAdd:done');
		});
	}


	function markerUpdate($map, id, lat, lng, text) {
		var latLng = new map.googleMaps.LatLng(lat, lng),
			googleMarkers = $map.data('map-googleMarkers') || {};

		if (!googleMarkers[id]) {
			return app.trigger($map, 'map:markerUpdate:done');
		}
		googleMarkers[id].marker.setPosition(latLng);
		googleMarkers[id].info.setContent(text);

		$map.data('map-googleMarkers', googleMarkers);
		return app.trigger($map, 'map:markerUpdate:done');
	}


	function markerRemove($map, id) {
		var googleMarkers = $map.data('map-googleMarkers') || {};

		if (googleMarkers[id]) {
			map.googleMaps.event.clearInstanceListeners(googleMarkers[id].marker);
			map.googleMaps.event.clearInstanceListeners(googleMarkers[id].info);
			googleMarkers[id].marker.setMap(null);
			googleMarkers[id].info.setMap(null);
			googleMarkers[id] = null;
			delete googleMarkers[id];
			$map.data('map-googleMarkers', googleMarkers);
		}

		return app.trigger($map, 'map:markerRemove:done');
	}


	function onMarkerAdd(event, id, lat, lng, text) {
		var $element = app.getElement(event, '.map');
		return markerAdd($element.find('.map-map'), id, lat, lng, text);
	}


	function onMarkerUpdate(event, id, lat, lng, text) {
		var $element = app.getElement(event, '.map');
		return markerUpdate($element.find('.map-map'), id, lat, lng, text);
	}


	function onMarkerRemove(event, id) {
		var $element = app.getElement(event, '.map');
		return markerRemove($element.find('.map-map'), id);
	}


	function onInit(event) {
		var $element = app.getRoot(event, '.map'),
			$map;
		if (!$element) {
			return event;
		}
		$map = $element.find('.map-map');
		return map($map);
	}


	return app
		.on('lib/layout:changed', '.map', onInit)
		.on('map:markerAdd', '.map', onMarkerAdd)
		.on('map:markerUpdate', '.map', onMarkerUpdate)
		.on('map:markerRemove', '.map', onMarkerRemove)
		;
});

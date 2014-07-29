define([
	'underscore', 'entity/from-json', 'vendor/storage-polyfill'
], function (_, fromJson) {
	"use strict";


	var localStorage = window.localStorage,
		sessionStorage = window.sessionStorage;


	function clear(callback) {
		localStorage.clear();
		return _.isFunction(callback) ? callback(null) : null;
	}


	function setItem(name, data, callback) {
		localStorage.setItem(name, _.isString(data) ? data : JSON.stringify(data));
		return _.isFunction(callback) ? callback(null, data) : null;
	}


	function getItem(name, callback) {
		return fromJson(localStorage.getItem(name), callback);
	}


	function deleteItem(name, callback) {
		localStorage.removeItem(name);
		return _.isFunction(callback) ? callback(null) : null;
	}


	return {
		set: setItem,
		get: getItem,
		delete: deleteItem,
		clear: clear
	};
});

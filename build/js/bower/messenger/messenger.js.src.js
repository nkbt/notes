define([
	'module', 'dom', 'underscore', 'lib/app',
	'txt!messenger/html/template.html',
	'txt!messenger/html/error.html',
	'txt!messenger/html/message.html',
	'txt!messenger/html/progress.html'
], function (module, $, _, app) {
	"use strict";
	app.log('Loaded');

	var config = _.defaults(module.config(), {
			hideTimeout: 2000,
			types: {
				TYPE_ERROR: 'error',
				TYPE_MESSAGE: 'message',
				TYPE_PROGRESS: 'progress'
			}
		}),
		templates = {
			container: require('txt!messenger/html/template.html'),
			error: require('txt!messenger/html/error.html'),
			message: require('txt!messenger/html/message.html'),
			progress: require('txt!messenger/html/progress.html')
		};

	function show(type, text) {
		if (!_.findWhere(config.types, type)) {
			return null;
		}

		var $element = app.$root.find('.messenger'),
			$message = [];

		if (!$element.length) {
			$element = $(templates.container);
			$element.appendTo(app.$root);
		}

		if (type === config.types.TYPE_PROGRESS) {
			$message = $element.find('.messenger-progress');
			if ($message.length) {
				$message.find('.messenger-text').html(text);
				return app.trigger($message, 'messenger:show:done', [type, text])
					.trigger($message, 'messenger:hideDelayed');
			}
		}
		if ($message.length) {
			$message.find('.messenger-text').html(text);
		} else {
			$message = $(templates[type]);
			$message.prependTo($element);
		}

		$message.find('.messenger-text').html(text);
		return app.trigger($message, 'messenger:show:done', [type, text])
			.trigger($message, 'messenger:hideDelayed');
	}


	function onShow(event, type, text) {
		return show(type, text);
	}


	function onProgress(event, text) {
		return show(config.types.TYPE_PROGRESS, text);
	}


	function onProgressStop() {
		return _.each(app.$root.find('.messenger-progress'), hide);
	}


	function clearTimer(message) {
		var $message = $(message),
			timer = $message.data('messenger-hideTimer');
		if (timer) {
			window.clearTimeout(timer);
			timer = null;
		}
		$message.data('messenger-hideTimer', timer);
	}


	function hide(message) {
		if (_.isEmpty(message)) {
			return _.each(app.$root.find('.messenger-message'), hide);
		}

		var $message = $(message).closest('.messenger-message');
		clearTimer($message);
		return $message.remove();
	}

	function hider(message) {
		return function () {
			hide(message);
		};
	}

	function onHideDelayed(event) {
		var $message = app.getElement(event, '.messenger-message'),
			hideTimeout = parseInt(parseInt($message.data('messenger-autohide'), 10) || config.hideTimeout, 10);
		clearTimer($message);
		return $message.data('messenger-hideTimeout', window.setTimeout(hider($message), hideTimeout));
	}

	function onClick(event) {
		var $message = app.getElement(event, '.messenger-message');
		clearTimer($message);
		return hide($message);
	}

	function onMouseover(event) {
		var $message = app.getElement(event, '.messenger-message');
		return clearTimer($message);
	}

	app
		.on('messenger:show', null, onShow)
		.on('messenger:progressStop', null, onProgressStop)
		.on('click', '.messenger .messenger-message', onClick)
		.on('mouseover', '.messenger .messenger-message[data-messenger-autohide]', onMouseover)
		.on('mouseout', '.messenger .messenger-message[data-messenger-autohide]', onHideDelayed)
		.on('messenger:hideDelayed', '.messenger .messenger-message[data-messenger-autohide]', onHideDelayed);


	return config.types;
});

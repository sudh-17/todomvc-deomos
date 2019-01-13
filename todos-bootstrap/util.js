/**
 * 工具
 */
(function(window){

    window.qs = function(selector ,parent){
        return (parent || document).querySelector(selector);
    }

    window.qsa = function(selector ,parent){
        return (parent || document).querySelectorAll(selector);
    }

    window.$on = function(target,type,callback,useCapture){
        target.addEventListener(type, callback, !!useCapture);
    }

    window.$delegated = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

}(window))
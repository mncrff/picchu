(function( window, undefined ) {

    function Picchu(selector) {

        if (selector) {
        	var nodes;

	        if (typeof selector === 'string') {
		        nodes = document.querySelectorAll(selector);
		    } else if (selector.length) {
		    	nodes = selector;
		    } else {
		    	nodes = [selector];
		    }

			for (var i = 0; i < nodes.length; i++) {
				this[i] = nodes[i];
			}
			this._length = nodes.length;
		}

		return this;
    };

	window.Picchu = window.ms = Picchu;

    // ========= Utilities

    Picchu.prototype.forEach = function (callback) {
        this.map(callback);
        return this; 
    };

    Picchu.prototype.map = function (callback) {
        var results = [];
        for (var i = 0; i < this._length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results;
    };

    Picchu.prototype.hasClass = function (kls) {
		return (' ' + this[0].className + ' ').indexOf(' ' + kls + ' ') > -1;
	};

	Picchu.prototype.removeClass = function(kls) {
		return this.forEach(function(el) {
			el.className = el.className.replace(new RegExp("\\b\\s\?"+kls+"\\b"),'');
		});
	};
	Picchu.prototype.addClass = function(kls) {
		return this.forEach(function(el) {
			if (!el.className.match(new RegExp("\\b\\s\?"+kls+"\\b"),'')) {
				return el.className = el.className+" "+kls;
			}
		});
	};

	// ========== Browser compatibility

	Picchu.prototype.addEvent = (function () {
	    if (document.addEventListener) {
	        return function (evt, fn) {
	            return this.forEach(function (el) {
	                el.addEventListener(evt, fn, false);
	            });
	        };
	    } else if (document.attachEvent)  {
	        return function (evt, fn) {
	            return this.forEach(function (el) {
	                el.attachEvent("on" + evt, fn);
	            });
	        };
	    } else {
	        return function (evt, fn) {
	            return this.forEach(function (el) {
	                el["on" + evt] = fn;
	            });
	        };
	    }
	}());

	Picchu.prototype.removeEvent = (function () {
	    if (document.removeEventListener) {
	        return function (evt, fn) {
	            return this.forEach(function (el) {
	                el.removeEventListener(evt, fn, false);
	            });
	        };
	    } else if (document.detachEvent)  {
	        return function (evt, fn) {
	            return this.forEach(function (el) {
	                el.detachEvent("on" + evt, fn);
	            });
	        };
	    } else {
	        return function (evt, fn) {
	            return this.forEach(function (el) {
	                el["on" + evt] = null;
	            });
	        };
	    }
	}());

	// ========== Static methods

	Picchu.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	Picchu.test = function() {
		return 'test';
	}

})(window);
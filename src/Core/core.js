(function( window, undefined ) {

	// expose static methods
	Picchu = _Picchu;

	function _Picchu() {

        return this;
    };

    _Picchu.prototype = {

        select: function(q) {
            if (typeof q === 'string') { 
                return new this.nodeList(document.querySelector(q));
            }
        },

        selectAll: function(q) {
            if (typeof q === 'string') { 
                return new this.nodeList(document.querySelectorAll(q));
            }
        },

        nodeList: function(n) {
            if (n.length) {
                for (var i = 0; i < n.length; i++) {
                    this[i] = n[i];
                    this.size = n.length;
                }
            } else {
                this[0] = n;
                this.size = 1;
            }
        }
    };

    _Picchu.prototype.nodeList.prototype = {

        forEach: function (callback) {
            this.map(callback);
            return this; 
        },

        map: function (callback) {
            var results = [];
            for (var i = 0; i < this.size; i++) {
                results.push(callback.call(this, this[i], i));
            }
            return results;
        },

        hasClass: function (kls) {
            return (' ' + this[0].className + ' ').indexOf(' ' + kls + ' ') > -1;
        },

        removeClass: function(kls) {
            return this.forEach(function(el) {
                el.className = el.className.replace(new RegExp("\\b\\s\?"+kls+"\\b"),'');
            });
        },

        addClass: function(kls) {
            return this.forEach(function(el) {
                if (!el.className.match(new RegExp("\\b\\s\?"+kls+"\\b"),'')) {
                    return el.className = el.className+" "+kls;
                }
            });
        }

    };

	// ========== Browser compatibility

	_Picchu.prototype.addEvent = (function () {
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

	_Picchu.prototype.removeEvent = (function () {
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

	_Picchu.debounce = function(func, wait, immediate) {
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

	_Picchu.test = function() {
		return 'test';
	}

})(window);
(function() {

	ms = function(selector) {
		return new Picchu(selector);
	}

	AccordionGroup = function(arr) {

		this.accordions = [].map.call(arr, function(item) {
			return new Accordion(item, {onClickToggle: null});
		});

		initEvents(this);

		function initEvents(self) {
			self.accordions.map(function(accordion) {

				var clickToggleEvent = function() {
					self.expand(accordion);
					return false;
				}
				ms(accordion.toggle).addEvent('click', clickToggleEvent);

			});
		}
	}

	AccordionGroup.prototype.expandAll = function() {
		this.accordions.map(function(accordion) {
			accordion.expand();
		});
	}

	AccordionGroup.prototype.expand = function(accordion) {
		this.accordions.map(function(i) {
			if (i !== accordion) {
				i.collapse();
			}
		});
		accordion.trigger();
	}

	AccordionGroup.prototype.collapseAll = function() {
		this.accordions.map(function(accordion) {
			accordion.collapse();
		});
	}

	Accordion = function(el, options) {

	    this.toggle = el;
		this.panel = el.nextElementSibling;
		this.maxHeight = calcMaxHeight(this);
		this.collapsed = false;

		var self = this;
		var defaults = {
			collapsedClass: 'is-collapsed',
			toggleClass: 'accordion-header',
			panelClass: 'accordion-panel',
			currentNavClass: 'active'
	    }

		this.options = extendDefaults(defaults, options);

		if (!ms(this.toggle).hasClass(this.options.currentNavClass) || ms(this.toggle).hasClass(this.options.collapsedClass)) { 
			this.collapse();
		}

		ms(this.toggle).addClass(this.options.toggleClass);
		ms(this.panel).addClass(this.options.panelClass);
		
		setMaxHeight(this);
		initEvents(this);

		function initEvents(self) {

			var clickToggleEvent = function() {
				self.trigger();
				return false;
			}

			if (typeof(self.options.onClickToggle) === 'undefined') {
				ms(self.toggle).addEvent('click', clickToggleEvent);
			} else {
				ms(self.toggle).addEvent('click', self.options.onClickToggle);
			}

			// window events

			var onResizeFn = Picchu.debounce(function() {
				self.maxHeight = calcMaxHeight(self);
				setMaxHeight(self);
			}, 250);

			ms(window).addEvent('resize', onResizeFn);
		}

		function calcMaxHeight(self) {
			return self.panel.scrollHeight+'px';
		}

		function setMaxHeight(self) {
			if (!self.collapsed) {
				self.panel.style.maxHeight = self.maxHeight;
			}
		}

		function extendDefaults(source, properties) {
			var property;
				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						source[property] = properties[property];
					}
				}
			return source;
		}
	}

	Accordion.prototype.expand = function() {
		this.collapsed = false;
		this.panel.style.maxHeight = this.maxHeight;
		ms(this.toggle).addClass(this.options.currentNavClass);
		ms(this.toggle).removeClass(this.options.collapsedClass);
		ms(this.panel).removeClass(this.options.collapsedClass);
	}

	Accordion.prototype.collapse = function() {
		this.collapsed = true;
		this.panel.style.maxHeight = '0px';
		ms(this.toggle).removeClass(this.options.currentNavClass);
		ms(this.toggle).addClass(this.options.collapsedClass);
		ms(this.panel).addClass(this.options.collapsedClass);
	}

	Accordion.prototype.trigger = function() {
		if (ms(this.toggle).hasClass(this.options.collapsedClass)) {
			this.expand();
		} else {
			this.collapse();
		}
	}

}());
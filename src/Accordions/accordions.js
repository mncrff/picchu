(function() {

	AccordionGroup = function(query) {

		var nodes = ms.selectAll(query);

		this.accordions = nodes.map(function(i) {
			return new Accordion(i, {onClickToggle: null});
		});

		initEvents(this);

		function initEvents(self) {

			Picchu.map(self.accordions, function(accordion) {

				var clickToggleEvent = function() {
					self.expand(accordion);
					return false;
				}
				accordion.toggle.addEvent('click', clickToggleEvent);

			});
		}
	}

	AccordionGroup.prototype.expandAll = function() {
		Picchu.map(this.accordions, function(accordion) {
			accordion.expand();
		});
	}

	AccordionGroup.prototype.expand = function(accordion) {
		Picchu.map(this.accordions, function(i) {
			if (i !== accordion) {
				i.collapse();
			}
		});
		accordion.trigger();
	}

	AccordionGroup.prototype.collapseAll = function() {
		Picchu.map(this.accordions, function(accordion) {
			accordion.collapse();
		});
	}

	Accordion = function(el, options) {
		
		this.selector = el;
	    this.toggle = ms.select(el);
		this.panel = this.toggle.next();
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

		if (!this.toggle.hasClass(this.options.currentNavClass) || this.toggle.hasClass(this.options.collapsedClass)) { 
			this.collapse();
		}

		this.toggle.addClass(this.options.toggleClass);
		this.panel.addClass(this.options.panelClass);
		
		setMaxHeight(this);
		initEvents(this);

		function initEvents(self) {

			var clickToggleEvent = function() {
				self.trigger();
				return false;
			}

			if (typeof(self.options.onClickToggle) === 'undefined') {
				self.toggle.addEvent('click', clickToggleEvent);
			} else {
				self.toggle.addEvent('click', self.options.onClickToggle);
			}

			// window events

			var onResizeFn = Picchu.debounce(function() {
				self.maxHeight = calcMaxHeight(self);
				setMaxHeight(self);
			}, 250);

			ms.select(window).addEvent('resize', onResizeFn);
		}

		function calcMaxHeight(self) {
			return self.panel.static().scrollHeight+'px';
		}

		function setMaxHeight(self) {
			if (!self.collapsed) {
				self.panel.static().style.maxHeight = self.maxHeight;
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
		this.panel.static().style.maxHeight = this.maxHeight;
		this.toggle.addClass(this.options.currentNavClass);
		this.toggle.removeClass(this.options.collapsedClass);
		this.panel.removeClass(this.options.collapsedClass);
	}

	Accordion.prototype.collapse = function() {
		this.collapsed = true;
		this.panel.static().style.maxHeight = '0px';
		this.toggle.removeClass(this.options.currentNavClass);
		this.toggle.addClass(this.options.collapsedClass);
		this.panel.addClass(this.options.collapsedClass);
	}

	Accordion.prototype.trigger = function() {
		if (this.toggle.hasClass(this.options.collapsedClass)) {
			this.expand();
		} else {
			this.collapse();
		}
	}

}());
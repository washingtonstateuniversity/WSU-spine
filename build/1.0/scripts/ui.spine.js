/** intended usage is 
 *	$.spine({
 *		"option":"value"
 *	});
**/
;(function ( $, window, document, undefined ) {
	/**
     * Sets up the plugins prototype
	 * @param name:string
	 * @param prototype:object
	 */
	$.s = function(name, prototype) {
		var namespace = name.split('.')[0];
        name = name.split('.')[1];
		$[namespace] = $[namespace] || {};
		$[namespace][name] = function(options, element) {
			if ( arguments.length ) {
				this._setup(options, element);
			}
		};
		$[namespace][name].prototype = $.extend({
			'namespace': namespace,
			'pluginName': name
        }, prototype);
		$.fn[name] = function(options) {
        
            this.elem = elem;
            this.$elem = $(elem);
            this.options = options;
            this.metadata = this.$elem.data('plugin-options');
            
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

			var isMethodCall = typeof options === "string",
				args = Array.prototype.slice.call(arguments, 1),
				returnValue = this;
			
			if ( isMethodCall && options.substring(0, 1) === '_' ) { 
				return returnValue; 
			}

			this.each(function() {
				var instance = $.data(this, name);
				if (!instance) {
					instance = $.data(this, name, new $[namespace][name](options, this));
				}
				if (isMethodCall) {
					returnValue = instance[options].apply(instance, args);
				}
			});
			return returnValue; 
		};
	};
    
    $.s('ui.spine', {

        defaults: {
			message: 'Hello world!'
		},
        
		/**
		 * Setup plugin basics, 
		 * @param options:object
		 * @param element:node
		 */
		_setup: function(options, element) {
			this.el = element;
			options = options || {};
			$.extend(this.options, options, {  });
			this._create();
			if ( this._init ) { this._init(); }
		},
        /**
		 * Instanciate the object
		 */
		_create: function() {
			var self = this;
			this.instance = { 'spine': self.options,'search': [], 'framework': [], 'social': [], 'analytics': []  };
			self._call(self.options.callback, self.instance.spine);
		},
        

		/**
		 * Clears by type
		 * @param ctx:string	e.g. 'search', 'social', 'framework'
		 */
		clear: function(TAX) {
			this._c(this.get(TAX));
			this.set(TAX, []);
			return this;
		},
        
        /**
         * Sets up an object that can be worked
         */
		_c: function(obj) {
			for ( var property in obj ) {
				if ( obj.hasOwnProperty(property) ) {
					obj[property] = null;
				}
			}
		},

		/**
		 * Returns the objects with a specific property and value, e.g. 'category', 'tags'
		 * @param ctx:string	in what context, e.g. 'search' 
		 * @param options:object	property:string	the property to search within, value:string, operator:string (optional) (AND/OR)
		 * @param callback:function(search:jObj, isFound:boolean)
		 */
		find: function(ctx, options, callback) {
			var obj = this.get(TAX);
			options.value = $.isArray(options.value) ? options.value : [options.value];
			for ( var property in obj ) {
				if ( obj.hasOwnProperty(property) ) {
					var isFound = false;
					for ( var value in options.value ) {
						if ( $.inArray(options.value[value], obj[property][options.property]) > -1 ) {
							isFound = true;
						} else {
							if ( options.operator && options.operator === 'AND' ) {
								isFound = false;
								break;
							}
						}
					}
					callback(obj[property], isFound);
				}
			}
			return this;
		},

		/**
		 * Returns an instance property by key. Has the ability to set an object if the property does not exist
		 * @param key:string
		 * @param value:object(optional)
		 */
		get: function(key, value) {
			var instance = this.instance;
			if ( !instance[key] ) {
				if ( key.indexOf('>') > -1 ) {
					var e = key.replace(/ /g, '').split('>');
					for ( var i = 0; i < e.length; i++ ) {
						if ( !instance[e[i]] ) {
							if (value) {
								instance[e[i]] = ( (i + 1) < e.length ) ? [] : value;
							} else {
								return null;
							}
						}
						instance = instance[e[i]];
					}
					return instance;
				} else if ( value && !instance[key] ) {
					this.set(key, value);
				}
			}
			return instance[key];
		},
				
		/**
		 * Sets an instance property
		 * @param key:string
		 * @param value:object
		 */
		set: function(key, value) {
			this.instance[key] = value;
			return this;
		},
		/**
		 * Helper method for unwrapping jQuery/DOM/string elements
		 * @param obj:string/node/jQuery
		 */
		_unwrap: function(obj) {
			return (!obj) ? null : ( (obj instanceof jQuery) ? obj[0] : ((obj instanceof Object) ? obj : $('#'+obj)[0]) )
		},
		/**
		 * Helper method for calling a function
		 * @param callback
		 */
		_call: function(callback) {
			if ( callback && $.isFunction(callback) ) {
				callback.apply(this, Array.prototype.slice.call(arguments, 1));
			}
		},
		/**
		 * Destroys map elements.
		 */
		clear_map: function() {
			this.clear('search').clear('framework').clear('social').clear('analytics');
		},
		/**
		 * Destroys the plugin.
		 */
		destroy: function(callback) {
			this.clear('search').clear('framework').clear('social').clear('analytics')._c(this.instance);
			$.removeData(this.el, this.name);
			this._call(callback, this);
		},
    });
    
    
	$.spine = function(options) {
        //we are going to prep for the day we move to correction to the dom
        var targ = this.jquery===undefined ? $(window) : this;
		return $.each(targ,function() {
            $.spine(this, options);
			//new SPINE(this, options).init();
		});
	};

})( jQuery, window, document );
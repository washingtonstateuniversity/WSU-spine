/** intended usage is 
*	$.spine({
*		"option":"value"
*	});
**/
/*jshint -W054 */
;(function ( $, window, document, undefined ) {
	
	//var cache = {};
	$.fn.stripClass = function (partialMatch, endOrBegin) {
		/// <summary>
		/// The way removeClass should have been implemented -- accepts a partialMatch (like "btn-") to search on and remove
		/// </summary>
		/// <param name="partialMatch">the class partial to match against, like "btn-" to match "btn-danger btn-active" but not "btn"</param>
		/// <param name="endOrBegin">omit for beginning match; provide a 'truthy' value to only find classes ending with match</param>
		/// <returns type=""></returns>
		var x;
		x = new RegExp((!endOrBegin ? "\\b" : "\\S+") + partialMatch + "\\S*", "g");
	
		// http://stackoverflow.com/a/2644364/1037948
		this.attr("class", function (i, c) {
			if (!c){
				return; // protect against no class
			}
			return c.replace(x, "");
		});
		return this;
	};
	$.fn.refresh = function() {
		var elems = $(this.selector);
		this.splice(0, this.length);
		this.push.apply( this, elems );
		return this;
	};
	$.runTemplate = function(html, options) {
		var re,add,match,cursor,code,reExp,result;
		re = /<%(.+?)%>/g, reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, code = "var r=[];\n", cursor = 0, result;
		add = function(line, js) {
					if(js){
						code += line.match(reExp) ? line + "\n" : "r.push(" + line + ");\n";
					}else{
						code += line !== "" ? "r.push('" + line.replace(/'/g, "\"") + "');\n" : "";
					}
					return add;
				};
		while(match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code = (code + "return r.join('');").replace(/[\r\t\n]/g, "");
		result = new Function(code).apply(options);
		//try { result = new Function(code).apply(options); }
		//catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
		return result;
	};
	$.whenAll = function() {
		return $.when.apply($, arguments);
	};
	/**
	 * Sets up the plugins prototype
	 * @param name:string
	 * @param prototype:object
	 */
	$.s = function(name, prototype) {
		var namespace;
		
		//alert("starting name ==>"+dump(name));
		namespace = name.split(".")[0];
		name = name.split(".")[1];
		$[namespace] = $[namespace] || {};
		$[namespace][name] = function(options, element) {
			//alert("$[namespace][name] options==>"+dump(options));
			if ( arguments.length ) {
				this._setup(options, element);
			}
		};
		$[namespace][name].prototype = $.extend({
			namespace: namespace,
			pluginName: name
		}, prototype);
		$.fn[name] = function(context) {
			var isMethodCall, context_options, args, returnValue;
			//alert("$.fn[name] ==>"+dump(name));
			//alert("w/ context ==>"+dump(context));
			context_options={};
			if(arguments[1]){
				context_options=arguments[1];
			}
			//alert("w/ arguments ==>"+dump(context_options));
			
			context = context || {};
			this.options = $.extend({}, context);
			
			//this is will used to provide data changes as things are read if they exist
			//this.elem = elem;
			//this.$elem = $(elem);
			//this.options = options;
			//this.metadata = this.$elem.data('plugin-options');
			
			//this.config = $.extend({}, this.defaults, this.options, this.metadata);

			isMethodCall = typeof context === "string";
			args = Array.prototype.slice.call(arguments, 1);
			returnValue = this;

			if ( isMethodCall && context.substring(0, 1) === "_" ) {
				return returnValue;
			}

			this.each(function() {
				var instance;
				//alert("==>"+dump(name));
				instance = $.data(this, name);
				
				if (!instance) {
					instance = $.data(this, name, new $[namespace][name](context, this));
				}

				//alert("LOOKING TO INIT context==>"+dump(context));
				if(instance[context+"_init"]!== undefined){
					//alert("INIT @ instance[context+\"_init\"]context_options==>"+dump(context_options));
					if ( instance[context+"_init"] ) { instance[context+"_init"](context_options); }
				}
				if (isMethodCall && instance[context] !== undefined ) {
					//alert("has context==>"+dump(context));
					returnValue = instance[context].apply(instance, args);
				}
			});
			return returnValue;
		};
	};
	
	$.s("ui.spine", {
		
		globals: {
			version: "0.1.0",
			current_url:window.location.href
		},
		options: {
		},
		/**
		 * Setup plugin basics, 
		 * @param options:object
		 * @param element:node
		 */
		_setup: function(options, element) {
			//alert('spine _setup');
			this.el = element;
			options = options || {};
			//alert("options==>"+dump(options));
			//alert("this.options==>"+dump(options));
			$.extend(this.options, options, {  });
			this._create();
		},
		/**
		 * Instanciate the object
		 */
		_create: function() {
			var self;
			//alert('spine _create');
			self = this;
			this.instance = { spine: self.options, framework: [], search: [], social: [], analytics: []  };
			//alert('self.instance.spine==>'+dump(self.instance.spine));
			self._call(self.options.callback, self.instance.spine);
		},
		
		/**
		 * Sets up values to the global spine obj
		 * @param obj:object		e.g. {'foo':'bar'}
		 * @param context:string	e.g. 'search', 'social', 'framework'
		 */
		_set_globals: function(obj,context) {
			//context will be done later
			context = context || "";
			if(typeof(obj) !== "object"){
				return;
			}
			$.extend(this.globals,obj);
		},

		_get_globals: function(context) {
			return this.globals[context];
		},
		
		/**
		 * Clears by type
		 * @param TAX:string	e.g. 'search', 'social', 'framework'
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
		find: function(TAX, options, callback) {
			var obj, isFound, property, value;
			obj = this.get(TAX);
			options.value = $.isArray(options.value) ? options.value : [options.value];
			for ( property in obj ) {
				if ( obj.hasOwnProperty(property) ) {
					isFound = false;
					for ( value in options.value ) {
						if ( $.inArray(options.value[value], obj[property][options.property]) > -1 ) {
							isFound = true;
						} else {
							if ( options.operator && options.operator === "AND" ) {
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
			var instance, e, i;
			instance = this.instance;
			if ( !instance[key] ) {
				if ( key.indexOf(">") > -1 ) {
					e = key.replace(/ /g, "").split(">");
					for ( i = 0; i < e.length; i++ ) {
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
			return (!obj) ? null : ( (obj instanceof jQuery) ? obj[0] : ((obj instanceof Object) ? obj : $("#"+obj)[0]) );
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
		 * Destroys spine elements and options.
		 */
		clear_spine: function() {
			this.clear("search").clear("framework").clear("social").clear("analytics");
		},
		/**
		 * Destroys the plugin.
		 */
		destroy: function(callback) {
			this.clear("search").clear("framework").clear("social").clear("analytics")._c(this.instance);
			$.removeData(this.el, this.name);
			this._call(callback, this);
		},
	});
	$.spine = function(options) {
		var targ;
		//we are going to prep for the day we move to correction to the dom
		targ = this.jquery===undefined ? $("body") : this;
		return $.each(targ,function() {
			var targ;
			targ=$(this);
			//init the plugin
			targ.spine({});
			options=$.extend( {"framework":{},"search":{},"social":{},"analytics":{}}, options );
			$.each(options,function(i,v) {
				//calling out to set up the other extensions
				targ.spine(i,v);
				//new SPINE(this, options).init();
			});
		});
	};

	
})( jQuery, window, document );

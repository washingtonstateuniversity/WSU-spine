/** Intended usage is
*	$.spine({
*		"option":"value"
*	});
**/
/*jshint -W054 */
;( function( $, window, document, undefined ) {
	/**
	 * Strip one or more classes from a class attribute matching a given prefix.
	 *
	 * @param {string} partialMatch The class partial to match against, like `btn-` to match `btn-danger btn-active`, but not `btn`.
	 * @param {string} endOrBegin   Omit to match the beginning. Provide a truthy value to only find classes ending with a match.
	 * @returns {jQuery}
	 */
	$.fn.stripClass = function( partialMatch, endOrBegin ) {
		var x;
		x = new RegExp( ( !endOrBegin ? "\\b" : "\\S+" ) + partialMatch + "\\S*", "g" );

		// http://stackoverflow.com/a/2644364/1037948
		this.attr( "class", function( i, c ) {
			if ( !c ) {
				return; // Protect against no class
			}
			return c.replace( x, "" );
		} );
		return this;
	};

	/**
	 * Refresh a snapshot of stored jQuery selector data.
	 *
	 * Not all stored object properties would normally be reflected when
	 * the original selector is modified. This ensures we capture the
	 * latest version.
	 *
	 * @returns {*}
	 */
	$.fn.refresh = function() {
		var elems;
		elems = $( this.selector );
		this.splice( 0, this.length );

		try {
			this.push.apply( this, elems );
		}
		catch ( err ) {
			if ( $( this.selector ).html() !== "" ) {
				return $( this.selector );
			}else {
				return $( "<div>" );
			}
		}
		return this;
	};

	/**
	 * A small templating engine for processing HTML with given data.
	 *
	 * @see TemplateEngine via MIT Licensed https://github.com/krasimir/absurd/
	 *
	 * @param {string} html
	 * @param {Object} options
	 * @returns {*}
	 */
	$.runTemplate = function( html, options ) {
		var re, add, match, cursor, code, reExp, result;

		re = /<%(.+?)%>/g;
		reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
		code = "var r=[];\n";
		cursor = 0;

		add = function( line, js ) {
			if ( js ) {
				code += line.match( reExp ) ? line + "\n" : "r.push(" + line + ");\n";
			}else {
				code += line !== "" ? "r.push('" + line.replace( /'/g, "\"" ) + "');\n" : "";
			}
			return add;
		};

		while ( ( match = re.exec( html ) ) ) {
			add( html.slice( cursor, match.index ) )( match[ 1 ], true );
			cursor = match.index + match[ 0 ].length;
		}

		add( html.substr( cursor, html.length - cursor ) );
		code = ( code + "return r.join('');" ).replace( /[\r\t\n]/g, "" );
		result = new Function( code ).apply( options );

		return result;
	};

	/**
	 * Unused in Spine.
	 *
	 * @todo Consider deprecating.
	 *
	 * @returns {*}
	 */
	$.whenAll = function() {
		return $.when.apply( $, arguments );
	};

	/**
	 * Determine if the current view is an iOS device.
	 *
	 * @returns {boolean}
	 */
	$.is_iOS = function() {
		return ( window.navigator.userAgent.match( /(iPad|iPhone|iPod)/ig ) ? true : false );
	};

	/**
	 * Determine if the current view is an Android device.
	 *
	 * @returns {boolean}
	 */
	$.is_Android = function() {
		return ( window.navigator.userAgent.match( /(Android)/ig ) ? true : false );
	};

	/**
	 * Detect browser support for SVG images.
	 *
	 * @returns {boolean}
	 */
	$.svg_enabled = function() {
		return document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );
	};

	/**
	 * Use MutationObserver to watch for any changes to a specific DOM element and trigger
	 * the passed callback when a change is made.
	 *
	 * This is currently only used within the Spine to watch `#glue` for changes such as
	 * menu expansion, etc...
	 *
	 * @param obj
	 * @param callback
	 */
	$.observeDOM = function( obj, callback ) {
		var config, mutationObserver;

		if ( window.MutationObserver ) {
			config = {
				childList: true,
				attributes: true,
				subtree: true,
				attributeOldValue: true,
				attributeFilter: [ "class", "style" ]
			};

			mutationObserver = new MutationObserver( function( mutationRecords ) {
				var fire_callback = false; // Assume no callback is needed.

				$.each( mutationRecords, function( index, mutationRecord ) {
					if ( mutationRecord.type === "childList" ) {
						if ( mutationRecord.addedNodes.length > 0 ) {
							fire_callback = true;
						} else if ( mutationRecord.removedNodes.length > 0 ) {
							fire_callback = true;
						}
					} else if ( mutationRecord.type === "attributes" ) {
						if ( mutationRecord.attributeName === "class" ) {
							fire_callback = true;
						}
					}
				} );

				// If one of our matched mutations has been observed, fire the callback.
				if ( fire_callback ) {
					callback();
				}
			} );
			mutationObserver.observe( obj[ 0 ], config );
		} else {

			// Set a fallback function to fire every 200ms and watch for DOM changes.
			window.setTimeout( function() {
				var current_obj = obj.refresh();

				if ( typeof window.obj_watch === "undefined" ) {
					window.obj_watch = current_obj[ 0 ];
				}

				/**
				 * If the current object does not match the object we're watching, assume
				 * a DOM mutation has occurred and fire the callback.
				 */
				if ( window.obj_watch !== current_obj[ 0 ] ) {
					callback();
				}

				window.obj_watch = current_obj[ 0 ];

				// Reset observation on the current object.
				$.observeDOM( current_obj, callback );
			}, 200 );
		}
	};

	/**
	 * Setup the plugin's prototype.
	 *
	 * @param {string} name
	 * @param {object} prototype
	 */
	$.s = function( name, prototype ) {
		var namespace;

		namespace = name.split( "." )[ 0 ];
		name = name.split( "." )[ 1 ];

		$[ namespace ] = $[ namespace ] || {};

		$[ namespace ][ name ] = function( options, element ) {
			if ( arguments.length ) {
				this._setup( options, element );
			}
		};

		$[ namespace ][ name ].prototype = $.extend( {
			namespace: namespace,
			pluginName: name
		}, prototype );

		$.fn[ name ] = function( context ) {
			var isMethodCall, context_options, args, returnValue;

			context_options = {};

			if ( arguments[ 1 ] ) {
				context_options = arguments[ 1 ];
			}

			context = context || {};

			this.options = $.extend( {}, context );

			isMethodCall = ( typeof context === "string" );
			args = Array.prototype.slice.call( arguments, 1 );
			returnValue = this;

			if ( isMethodCall && context.substring( 0, 1 ) === "_" ) {
				return returnValue;
			}

			this.each( function() {
				var instance;

				instance = $.data( this, name );

				if ( !instance ) {
					instance = $.data( this, name, new $[ namespace ][ name ]( context, this ) );
				}

				if ( instance[ context + "_init" ] !== undefined ) {
					if ( instance[ context + "_init" ] ) {
						instance[ context + "_init" ]( context_options );
					}
				}

				if ( isMethodCall && instance[ context ] !== undefined ) {
					returnValue = instance[ context ].apply( instance, args );
				}
			} );
			return returnValue;
		};
	};

	/**
	 * Configure and create the jQuery.ui.spine plugin.
	 *
	 * Based on a fork of MIT Licensed jquery-ui-map
	 * See: https://code.google.com/p/jquery-ui-map/source/browse/trunk/ui/jquery.ui.map.js
	 */
	$.s( "ui.spine", {

		globals: {
			version: "0.1.0",
			current_url:window.location.href
		},

		options: {},

		/**
		 * Setup plugin basics.
		 *
		 * @param {object}      options
		 * @param {HTMLElement} element
		 */
		_setup: function( options, element ) {
			this.el = element;
			options = options || {};
			$.extend( this.options, options, {} );
			this._create();
		},

		/**
		 * Instantiate the object
		 */
		_create: function() {
			var self;

			self = this;
			this.instance = {
				spine: self.options,
				framework: [],
				search: [],
				social: []
			};

			self._call( self.options.callback, self.instance.spine );
		},

		/**
		 * Add objects to the global spine object.
		 *
		 * Note: Context is not yet implemented.
		 *
		 * @param {object} obj     e.g. {'foo':'bar'}
		 * @param {string} context e.g. 'search', 'social', 'framework'
		 */
		_set_globals: function( obj, context ) {
			context = null; // Avoiding jshint error temporarily.

			if ( typeof( obj ) !== "object" ) {
				return;
			}
			$.extend( this.globals, obj );
		},

		/**
		 * Retrieve a context's objects from the global spine object.
		 *
		 * @param {string} context e.g. 'search', 'social', 'framework'
		 * @returns {*}
		 * @private
		 */
		_get_globals: function( context ) {
			return this.globals[ context ];
		},

		/**
		 * Clears an object of a context.
		 *
		 * @param {string} context e.g. 'search', 'social', 'framework'
		 */
		clear: function( context ) {
			this._c( this.get( context ) );
			this.set( context, [] );

			return this;
		},

		/**
		 * Clears an object of its properties.
		 *
		 * @param {object} obj
		 */
		_c: function( obj ) {
			for ( var property in obj ) {
				if ( obj.hasOwnProperty( property ) ) {
					obj[ property ] = null;
				}
			}
		},

		/**
		 * Returns objects with a specific context.
		 *
		 * @param {string} context In what context, e.g. 'search', 'social', 'framework'
		 * @param {object} options Contains string property, string value, string operator (AND/OR).
		 * @param callback:function(search:jObj, isFound:boolean)
		 */
		find: function( context, options, callback ) {
			var obj, isFound, property, value;
			obj = this.get( context );
			options.value = $.isArray( options.value ) ? options.value : [ options.value ];
			for ( property in obj ) {
				if ( obj.hasOwnProperty( property ) ) {
					isFound = false;
					for ( value in options.value ) {
						if ( $.inArray( options.value[ value ], obj[ property ][ options.property ] ) > -1 ) {
							isFound = true;
						} else {
							if ( options.operator && options.operator === "AND" ) {
								isFound = false;
								break;
							}
						}
					}
					callback( obj[ property ], isFound );
				}
			}
			return this;
		},

		/**
		 * Returns an instance property by key. Has the ability to set an object if the property does not exist
		 * @param key:string
		 * @param value:object(optional)
		 */
		get: function( key, value ) {
			var instance, e, i;
			instance = this.instance;
			if ( !instance[ key ] ) {
				if ( key.indexOf( ">" ) > -1 ) {
					e = key.replace( / /g, "" ).split( ">" );
					for ( i = 0; i < e.length; i++ ) {
						if ( !instance[ e[ i ] ] ) {
							if ( value ) {
								instance[ e[ i ] ] = ( ( i + 1 ) < e.length ) ? [] : value;
							} else {
								return null;
							}
						}
						instance = instance[ e[ i ] ];
					}
					return instance;
				} else if ( value && !instance[ key ] ) {
					this.set( key, value );
				}
			}
			return instance[ key ];
		},

		/**
		 * Sets an instance property
		 * @param key:string
		 * @param value:object
		 */
		set: function( key, value ) {
			this.instance[ key ] = value;
			return this;
		},

		/**
		 * Helper method for unwrapping jQuery/DOM/string elements
		 * @param obj:string/node/jQuery
		 */
		_unwrap: function( obj ) {
			return ( !obj ) ? null : ( ( obj instanceof jQuery ) ? obj[ 0 ] : ( ( obj instanceof Object ) ? obj : $( "#" + obj )[ 0 ] ) );
		},

		/**
		 * Helper method for calling a function
		 * @param callback
		 */
		_call: function( callback ) {
			if ( callback && $.isFunction( callback ) ) {
				callback.apply( this, Array.prototype.slice.call( arguments, 1 ) );
			}
		},

		/**
		 * Destroys spine elements and options.
		 */
		clear_spine: function() {
			this.clear( "search" ).clear( "framework" ).clear( "social" );
		},

		/**
		 * Destroys the plugin.
		 */
		destroy: function( callback ) {
			this.clear( "search" ).clear( "framework" ).clear( "social" )._c( this.instance );
			$.removeData( this.el, this.name );
			this._call( callback, this );
		}
	} );

	/**
	 * The primary Spine method used to start things up.
	 *
	 * @param {object} options
	 * @returns {*}
	 */
	$.spine = function( options ) {
		var targ;

		targ = this.jquery === undefined ? $( "body" ) : this;

		return $.each( targ, function() {
			var targ;
			targ = $( this );

			// Initialize the Spine plugin.
			targ.spine( {} );

			options = $.extend( { "framework":{}, "search":{}, "social":{} }, options );

			// Setup each of the extensions.
			$.each( options, function( i, v ) {
				targ.spine( i, v );
			} );
		} );
	};

} )( jQuery, window, document );

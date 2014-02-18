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
			jQuery.extend(this.options, options, {  });
			this._create();
			if ( this._init ) { this._init(); }
		},
        
        
        setup_search: function (){
            /* Search autocomplete */
            var cur_search = "";
            var termTemplate = "<strong>%s</strong>";
            var term = "";
            $( "#wsu-search input[type=text]" ).autosearch({
                source: function( request, response ) {
                    term = request.term;
                    $.ajax({
                        url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                        dataType: "jsonp",
                        data: {
                            featureClass: "P",
                            style: "full",
                            maxRows: 12,
                            name_startsWith: request.term
                        },
                        success: function( data, status, xhr  ) {
                            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                            response( $.map( data, function( item ) {
                                var text = item.label;
                                if ( (item.value && ( !request.term || matcher.test(text)) || item.related == "true" ) ){
                                    return {
                                        label: item.label,
                                        value: item.value,
                                        searchKeywords: item.searchKeywords,
                                        related: item.related
                                    };
                                }
                            }));
                        }
                    });
                },
                search: function(event, ui) {
                    /**/
                },
                appendTo: "#spine-shortcuts",
                showRelated:true,
                relatedHeader:"<hr/>",
                minLength: 2,
                select: function( e, ui ) {
                    var id = ui.item.searchKeywords;
                    var term = ui.item.label;
                    $("#indices").empty();
                    // to come back later to
                    /*
                    var url=siteroot+"public/get_place.castle";
                    if ( e.which != 13 ){
                        if(typeof($.jtrack)!=="undefined")$.jtrack.trackPageview(pageTracker,url+(id!=""?'?id='+id:'')+(term!=""?'&term='+term:''));
                        getSignlePlace(jObj,id);
                    }
                    */
                    $( "#wsu-search input#searchterm[type=text]" ).autocomplete("close");
                },
                focus: function( event, ui ) {
                    // to come back later to
                    //$( "#wsu-search input#searchterm[type=text]" ).val( ui.item.label );
                    //return false;
                },
                open: function(e,ui) {
                    // to come back later to
                    //$('.ui-autocomplete.ui-menu').removeClass( "ui-corner-all" );
                }
            }).data( "autocomplete" );
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
		 * Destroys the plugin.
		 */
		destroy: function(callback) {
			this.clear('markers').clear('services').clear('overlays')._c(this.instance);
			jQuery.removeData(this.el, this.name);
			this._call(callback, this);
		},
    });
    
    
	$.spine = function(options) {
        //we are going to prep for the day we move to correction to the dom
        var targ = this.jquery===undefined ? $(window) : this;
		return $.each(targ,function() {
			new SPINE(this, options).init();
		});
	};
	
	window.SPINE = SPINE;
})( jQuery, window, document );
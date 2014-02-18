/* for debug only. remove when done */

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

(function($){
	"use strict";
    $.widget( "ui.autosearch", $.ui.autocomplete, {
        _renderMenu: function( ul, items ) {
            var that	= this;
            var matched	= items.filter(function(obj, item) { if(obj.related=="false"){return item;} });//note this should be a single loop?
            var related	= items.filter(function(obj, item) { if(obj.related!="false"){return item;} });

            $.each(matched, function(i, item) { that._renderItemData( ul, item ); });
            
            if(this.options.showRelated && related.length){
                if(this.options.relatedHeader){
                    that._renderHeader( ul, this.options.relatedHeader );
                }
                $.each( related, function(i, item) { that._renderItemData( ul, item ); });
            }
        },
        _renderItemData: function( ul, item ) {
            return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
        },
        _renderItem: function( ul, item ) {
            var text	= item.label;
            var value	= item.value;
            var regex	= "(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)";
                text	= "<a href='"+value+"'>" + text.replace( new RegExp( regex , "gi" ), "<strong>$1</strong>" )+"</a>";

            return $( "<li></li>" ).data( "item.autocomplete", item ).append( text ).appendTo( ul );
        },
        _renderHeader: function( ul, text ) {
            return $( "<li></li>" ).append( "<a href=''>"+text+"</a>" ).appendTo( ul );
        }
    });
})(jQuery);
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
        
            this.options = options;
            
            //this is will used to provide data changes as things are read if they exist
            //this.elem = elem;
            //this.$elem = $(elem);
            //this.options = options;
            //this.metadata = this.$elem.data('plugin-options');
            
            //this.config = $.extend({}, this.defaults, this.options, this.metadata);

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
        options: {
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
			return (!obj) ? null : ( (obj instanceof jQuery) ? obj[0] : ((obj instanceof Object) ? obj : $('#'+obj)[0]) );
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
            $(this).spine(options);
			//new SPINE(this, options).init();
		});
	};

    
	
})( jQuery, window, document );
 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        _init: function(jObj, options) {
            // Cache the wsu-actions selector
            
            var $current_url = window.location.href;
            var $wsu_actions = $('#wsu-actions');
    
            // Cache the spine selector.
            var $spine = $('#spine');
    
            // Cache Spine sections selectors.
            var $wsu_search = $('#wsu-search');
            var $wsu_contact = $('#wsu-contact');
            var $wsu_share = $('#wsu-share');
    
            // Section -> Share
            // Just getting started on rolling our own... more to come.
            if (!$wsu_share.length) {
                var share_text = "";
            if ($('meta.share-text').length) /* Need a better name */ { share_text = $('meta.share-text'); } else { share_text = "You should know ..."; }
            var share  = '<section id="wsu-share" class="spine-share tools closed">';
                share += '	<ul>';
                share += '		<li class="by-facebook"><a href="http://www.facebook.com/sharer/sharer.php?u='+$current_url+'">Facebook</a></li>';
                share += '		<li class="by-twitter"><a href="https://twitter.com/intent/tweet?text='+share_text+'&url='+$current_url+'&via=wsupullman" target="_blank">Twitter</a></li>';
                share += '		<li class="by-email"><a href="mailto:?subject='+share_text+'&body='+$current_url+'">Email</a></li>';
                share += '		<!--<li class="by-gmail"><a href="https://plusone.google.com/_/+1/confirm?hl=en&url='+$current_url+'">Google+</a></li>-->';
                share += '		<!--<li class="by-linkedin"><a href="http://www.linkedin.com/shareArticle?mini=true&url='+$current_url+'&title=articleTitle&summary=articleSummary&source=articleSource">LinkedIn</a></li>-->';
                share += '		<!--<li class="by-pinterest"><a href="http://pinterest.com/pin/create/button/?url=""title="Pinterest">Pinterest</a></li>-->';
                share += '	</ul>';
                share += '</section>';
    
                $wsu_actions.append(share);
            } // End Share Generation
    
            // Section -> Contact
            if (!$("#wsu-contact").length) {
    
                // Can we loop through instead and set these on the fly?
                var name = $('meta[itemprop="name"]').attr('content');
                var department = $('meta[itemprop="department"]').attr('content');
                var url = $('meta[itemprop="url"]').attr('content');
                var streetAddress = $('meta[itemprop="streetAddress"]').attr('content');
                var addressLocality = $('meta[itemprop="addressLocality"]').attr('content');
                var postalCode = $('meta[itemprop="postalCode"]').attr('content');
                var telephone = $('meta[itemprop="telephone"]').attr('content');
                var email = $('meta[itemprop="email"]').attr('content');
                var ContactPointTitle = $('meta[itemprop="ContactPoint"]').attr('title');
                var ContactPoint = $('meta[itemprop="ContactPoint"]').attr('content');
    
                // We'll get to building these from declarations in the template
                var contact  = '<section id="wsu-contact" class="spine-contact tools closed">';
                    // contact += '<button id="shut-contact" class="shut">Close</button>';
                    contact += '<address itemscope itemtype="http://schema.org/Organization" class="hcard">';
                    contact += '	<div class="organization-unit fn org"><a href="'+url+'" class="url">'+department+'</a></div>';
                    contact += '	<div class="organization-name">'+name+'</div>';
                    contact += '	<div class="address">';
                    contact += '		<div class="street-address">'+streetAddress+'</div>';
                    contact += '		<div class="locality">'+addressLocality+' <span class="postalcode">'+postalCode+'</span></div>';
                    contact += '	</div>';
                    contact += '	<div class="tel"><i class="wsu-icon"></i>'+telephone+'</div>';
                    contact += '	<div class="email" rel="email"><a href="mailto:'+email+'"><i class="wsu-icon"></i>Email us</a></div>';
    
                if (typeof ContactPoint != 'undefined') {
                    contact += '	<div class="more"><a href="'+ContactPoint+'"><i class="wsu-icon"></i>'+ContactPointTitle+'</a></div>';
                    }
    
                    contact += '</address>';
                    contact += '</section>';
    
                $wsu_actions.append(contact);
            } // End Contact Generation
    

    




            $(window).on('resize', function(){
                this.setup_spine();
                this.setup_nav();
                this.setup_tabs();
                this.sizing();
                this.equalizing();
                this.mainheight();
                var $main = $('main');
                // Only run function if an unbound element exists
                if( $('.unbound').length ) {
                    var verso = $main.offset().left;
                    var recto = $main.offset().right;
                    // var recto = $(window).width() - ($('main').offset().left + $('main').width());
                    var spread = $(window).width();
                    var page = $main.width();
                        recto = spread - $main.offset().left;
                    var recto_margin = "";
                    if (recto >= page ) { recto_margin = recto - page; } else { recto_margin = 0; }
    
                    var verso_width = verso + $main.width();
                    $('.unbound.recto').css('width',recto).css('margin-right',-(recto_margin));
                    $('.unbound.verso').css('width',verso_width).css('margin-left',-(verso));
                    $('.unbound.verso.recto').css('width',spread);
                }
            }).trigger();

        },
        
        // Label #jacket with current window size
        sizing: function (jacket) {
                jacket=jacket||$('#jacket');
                var current_width = $(window).width();
                if(current_width >= 1188) {
                    jacket.removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-xlarge size-gt-small size-gt-smallish size-gt-medium size-gt-large');
                } else if(current_width >= 990) {
                    jacket.removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-large size-lt-xlarge size-gt-small size-gt-smallish size-gt-medium');
                } else if(current_width < 990 && current_width >= 792) {
                    jacket.removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-medium size-lt-xlarge size-lt-large size-gt-smallish size-gt-small');
                } else if((current_width >= 694 && current_width < 792) && ($('#binder').hasClass('fixed'))) {
                    jacket.removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-smallish size-lt-medium size-lt-large size-lt-xlarge size-gt-small');
                } else if(current_width < 792) {
                    jacket.removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
                } else if(current_width < 396) {
                    jacket.removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-small size-lt-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
                }
         },
        // Equalize Columns
        equalizing: function () {
            if( $('.equalize').length ) {
                var obj=$('.row.equalize');
                obj.find('.column').css('min-height','');
                $.each(obj,function(){
                    var tallestBox = 0;
                    $.each($('.column', this),function(){
                        if($(this).height() > tallestBox) {
                           tallestBox = $(this).outerHeight();
                        }
                    });
                    $('.column',this).not('.unequaled').css('min-height',tallestBox);
                    $('section.equalize .column',this).css('min-height','auto');
                });
            }
        },
        mainheight: function () {
            var main_top = $('main').offset().top;
            var window_height = $(window).height();
            var main_height = window_height;
            if ($('#binder').hasClass('size-lt-large')) {
                main_height -= 50;
            }
            $('main.fill-window-height').css('min-height',main_height);
        },

        /**
         * Sets up framework html and other DOM attributes
         */
        setup_jacket: function(){
            
            
        },
        
        /**
         * Sets up framework html and other DOM attributes
         */
        setup_binder: function(){
            
            
        },
        
         /**
         * Sets up framework html and other DOM attributes
         */
        setup_content: function(){
            
            
        },       
        
        /**
         * Sets up the spine area
         */
        setup_spine: function(){
            // Fixed/Sticky Horizontal Header
            $(document).scroll(function() {
                var top = $(document).scrollTop();
                if (top > 49) {
                    $spine.not('.unshelved').addClass('scanned');
                } else { 
                    $spine.removeClass('scanned');
                } 
            });
    

    
            // Clicking Outside Spine Closes It
            /* $(document).on('mouseup touchstart', function (e) {
                var container = $("#spine.unshelved");
                if (container.has(e.target).length === 0)
                { container.toggleClass('shelved unshelved'); }
            }); */
            $('main').on('click swipeleft', function() {
                if ( $spine.hasClass('unshelved') ) {
                    $spine.toggleClass('shelved unshelved');
                }
            });
    
            // Cracking the Spine for Short Windows
            $(window).on('load resize scroll mouseup touchend',function() {
                var footerHeight = $("#spine footer").height();
                var windowHeight = window.innerHeight - footerHeight - 50;
                var spineHeight = $("#glue").height();
                //$('main').prepend(footerHeight);
                if ( windowHeight < spineHeight ) {
                    $spine.removeClass("uncracked").addClass("cracked");
                } else { 
                    $spine.removeClass("cracked").addClass("uncracked");
                }
            });
    
            // Moving the Spine for Short Windows
            /* $(document).scroll(function() {
                var windowHeight = window.innerHeight;
                var top = $(document).scrollTop();
                var spineHeight = $("#glue").height();
                var crack = spineHeight - windowHeight;
                if ( top > crack ) { $('#spine.cracked').addClass('pinned'); }
                else { $('#spine.cracked').removeClass('pinned'); }
            }); */
    
            // Moving the Spine for Short Windows
            $(document).scroll(function() {
                var windowHeight = window.innerHeight;
                var top = $(document).scrollTop();
                var spineHeight = $("#glue").height();
                var crack = spineHeight - windowHeight;
                if ( top > crack ) {
                    $('#spine.cracked').addClass('scrolled');
                } else {
                    $('#spine.cracked').removeClass('scrolled');
                }
            }); 
    
            // Moving the Spine for Short Windows
            /*$(document).scroll(function() {
                var windowHeight = window.innerHeight;
                var top = $(document).scrollTop();
                var spineHeight = $("#glue").height();
                var crack = spineHeight - windowHeight;
                if ( top > crack ) {
                    var top_pos = -(top);
                    $('#spine.cracked').addClass('pinned');
                    $('#spine.cracked #glue').css('top',top_pos);
                } else {
                    $('#spine.cracked').removeClass('pinned');
                }
            });*/
        },
        
        
        /**
         * Sets up the tabs that will be able to be used by other extensions
         */
        setup_tabs: function(){
            // Tools tabs		
            $("#wsu-share-tab button").on("click",function(e) {
                e.preventDefault();
                $('#wsu-actions *.opened,#wsu-share,#wsu-share-tab').toggleClass('opened closed');
                });
            $("#wsu-search-tab button").on("click",function(e) {
                e.preventDefault();
                $('#wsu-actions *.opened,#wsu-search,#wsu-search-tab').toggleClass('opened closed');
                $('#spine section#wsu-search input').focus();
                });
            $("#wsu-contact-tab button").on("click",function(e) {
                e.preventDefault();
                $('#wsu-actions *.opened,#wsu-contact,#wsu-contact-tab').toggleClass('opened closed');
                });
            this.setup_printing();
        },
        
        /**
         * Sets up navagation system
         */
        setup_nav: function(){
            // NAVIGATION
            // Tag location and hierarchy
            $("#spine nav ul,#spine ul").parents("li").addClass("parent");
            $("#spine nav li[class*=current], nav li[class*=active]").addClass("active").parents("li").addClass("active");
            $("#spine nav li a[class*=current], nav li a[class*=active]").parents("li").addClass("active");
            $("#spine .active").not(":has(.active)").addClass("dogeared");
    
            // Disclosure
            $("#spine nav li.parent > a").on("click",function(e) { 
                e.preventDefault();
                $(this).parent("li").siblings().removeClass("opened");
                $(this).parent("li").toggleClass("opened");
            });
    
            // Couplets
            $("#spine nav li.parent > a").each( function() {
                var title = 'Overview';
                if ($(this).attr('title')) {
                    var alt = $(this).attr('title').length;
                    if ( alt > 0 ) { title = $(this).attr('title'); }
                }
                var classes = "overview";
                if ($(this).closest('.parent').hasClass('dogeared')) {
                    classes += " dogeared";
                }
                var url = $(this).attr("href");
                if ( url != '#' ) {
                    $(this).parent("li").children("ul").prepend('<li class="' + classes + '"><a href="'  + url +  '">' + title + '</a></li>');
                }
            });
            // External Links in nav
            // this shouldn't be done this way
            $('nav#spine-sitenav a').filter(function() {
               return this.hostname && this.hostname !== location.hostname;
            }).addClass("external");
        },
        
        setup_printing: function(){
            // Print & Print View
            var print_controls = '<span class="print-controls"><button id="print-invoke">Print</button><button id="print-cancel">Cancel</button></span>';
    
            function printPage(){
                window.print();
            }
    
            function print_cancel() {
                $('html').toggleClass('print');
                $('.print-controls').remove();
            }
    
            /* var print_timeout = setTimeout(function() { window.print(); }, 400); Cancel timeout? */
            function print(e) {
                if ( undefined !== e ) {
                    e.preventDefault();
                }
                $wsu_actions.find('.opened').toggleClass('opened closed');
                $('html').toggleClass('print');
                $spine.find('header').prepend(print_controls);
                $spine.find('.unshelved').removeClass('unshelved').addClass('shelved');
                $("#print-invoke").on("click",function() { window.print(); });
                $("#print-cancel").on("click",print_cancel);
                setTimeout(function() { printPage(); }, 400);
            }
            $("#wsu-print-tab button").click(print);
    
            // Shut a tool section
            $("button.shut").on("click",function(e) {
                e.preventDefault();
                $wsu_actions.find('.opened').toggleClass('opened closed');
            });
        }
        
	});
} (jQuery) );
 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        foo: function(jObj, options) {
                //do stuff
                return jObj;
            },
        
        _init: function(jObj, options) {
            // Cache the wsu-actions selector
            
            var $current_url = window.location.href;
            var $wsu_actions = $('#wsu-actions');
    
            // Cache the spine selector.
            var $spine = $('#spine');
    
            // Cache Spine sections selectors.
            var $wsu_search = $('#wsu-search');
            var $wsu_contact = $('#wsu-contact');
            var $wsu_share = $('#wsu-share');
    
            $("#glue > header").append('<button id="shelve"></button>');
            $("#shelve").click(function() {
                $spine.toggleClass('unshelved shelved');
            });
    
            // ADD TOOLS
    
            // Section -> Search
            if (!$wsu_search.length) {
            var search  = '<section id="wsu-search" class="spine-search tools closed" data-default="site-search">';
                search += '		<form id="default-search">';
                search += '			<input name="term" type="text" value="" placeholder="search">';
                search += '			<button>Submit</button>';
                search += '		</form>';
                search += '		<div id="spine-shortcuts"></div>';
                search += '</section>';
            $wsu_actions.append(search);
            
            // Submit search
            /* This broke it 
            $wsu_search.find('form').submit( function() {
                var scope = $wsu_search.attr('data-default');
                if ( scope == 'site-search' ) {
                    var site = ' site:'+location.hostname;
                    // var site = ' site:admission.wsu.edu' // temporary for testing
                } else {
                    var site = '';
                }
                var cx = 'cx=004677039204386950923:xvo7gapmrrg';
                var cof = 'cof=FORID%3A11';
                var search_term = $wsu_search.find('input').val();
                var search_url = 'http://search.wsu.edu/default.aspx?'+cx+'&'+cof+'&q=hello'+search_term+site;
                window.location.href = search_url;
                return false;
            }); */
            $("#wsu-search form").submit( function() {
                var scope = $("#wsu-search").attr('data-default');
                var site = '';
                if ( scope == 'site-search' ) {
                    site = ' site:'+location.hostname;
                }
                var cx = 'cx=004677039204386950923:xvo7gapmrrg';
                var cof = 'cof=FORID%3A11';
                var search_term = $("#wsu-search input").val();
                var search_url = 'http://search.wsu.edu/default.aspx?'+cx+'&'+cof+'&q='+search_term+site;
                window.location.href = search_url;
                return false;
            });
            }
        },
        
        start_tab:function(){
        
        },
        
        setup_search: function (jObj, options){
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
        
	});
} (jQuery) );
(function($){
	"use strict";
	$(document).ready(function(){
        /*$.spine("search",{
                "providers":{
                    "local":{
                        url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                        dataType: "jsonp",
                        featureClass: "P",
                        style: "full",
                        maxRows: 12
                    } 
                },
                "result":{
                    appendTo: "#spine-shortcuts",
                    showRelated:true,
                    relatedHeader:"<hr/>",
                    minLength: 2,   
                }
            });
            */
        var siteoptions={};
        var options = $.extend({
                "search":{
                    "providers":{
                        "local":{
                            url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                            dataType: "jsonp",
                            featureClass: "P",
                            style: "full",
                            maxRows: 12
                        } 
                    },
                    "result":{
                        appendTo: "#spine-shortcuts",
                        showRelated:true,
                        relatedHeader:"<hr/>",
                        minLength: 2,   
                    }
                },
                "framework":{ },
                "social":{ },
                "analytics":{ }
            },
            siteoptions
        );
        $.spine(options);
	});
})(jQuery);
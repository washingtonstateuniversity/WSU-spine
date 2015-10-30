 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
/*jshint multistr: true */
( function($) {
	$.extend($.ui.spine.prototype, {
		/**
		 * Initialize the Spine framework. Fired automatically in `$.s`, found
		 * in ui.spine.js.
		 *
		 * @param {object} options
		 */
		framework_init: function(options) {
			$.extend(this.framework_options,options);
			this._set_globals(this.framework_globals);
			this.framework_create();
		},

		/**
		 * Global framework options for the Spine framework.
		 */
		framework_options: {
			equalizer_filter:".skip*",
			contact_template:"<address itemscope itemtype='http://schema.org/Organization' class='hcard'> \
									<% if (typeof(this.department) != 'undefined') { %><div class='organization-unit fn org'>\
										<% if (typeof(this.url) != 'undefined') { %><a href='<%this.url%>' class='url'><% } %> \
											<%this.department%> \
										<% if (typeof(this.url) != 'undefined') { %></a><% } %> \
									</div><% } %> \
									<% if (typeof(this.name) != 'undefined') { %><div class='organization-name'><%this.name%></div><% } %> \
									<div class='address'> \
										<% if (typeof(this.streetAddress) != 'undefined') { %><div class='street-address'><%this.streetAddress%></div><% } %> \
										<% if (typeof(this.addressLocality) != 'undefined' || typeof(this.postalCode) != 'undefined') { %><div class='locality'> \
											<% if (typeof(this.addressLocality) != 'undefined' ) { %><%this.addressLocality%><% } %> <% if (typeof(this.addressRegion) != 'undefined' ) { %>, <%this.addressRegion%><% } %> \
											<% if (typeof(this.postalCode) != 'undefined' ) { %><span class='postalcode'><%this.postalCode%></span><% } %> \
										</div><% } %> \
									</div> \
									<% if (typeof(this.telephone) != 'undefined' ) { %><div class='tel'><%this.telephone%></div><% } %> \
									<% if (typeof(this.email) != 'undefined' ) { %><div class='email' rel='email'><a href='mailto:<%this.email%>'>Email us</a></div><% } %> \
										 \
									<% if (typeof(this.ContactPoint) != 'undefined' && typeof(this.ContactPointTitle) != 'undefined') { %> \
										<div class='more'><a href='<%this.ContactPoint%>'><%this.ContactPointTitle%></a></div> \
									<% } %> \
								</address>"
		},

		/**
		 * Global objects that are part of the Spine framework.
		 */
		framework_globals: {
			spine: $("#spine"),
			glue: $("#glue"),
			main: $("main"),
			wsu_actions: $("#wsu-actions")
		},

		/**
		 * Data on the current state of navigation for use when calculating
		 * sizes and placement of other elements.
		 */
		nav_state:{
			viewport_ht: 0,
			scroll_dif: 0,
			positionLock: 0,
			scroll_top: 0,
			spine_ht: 0,
			glue_ht: 0,
			height_dif: 0
		},

		/**
		 * Create the Spine framework and setup basic events based on information present in the DOM.
		 */
		framework_create: function() {
			var self, contactHtml, propmap = {}, spread, verso, page, para, recto, recto_margin, verso_width,
				svg_imgs, viewport_ht, spine, glue, main;

			self = this; // preserve scope.

			// Refresh data for global elements.
			spine = self._get_globals("spine").refresh();
			glue = self._get_globals("glue").refresh();
			main = self._get_globals("main").refresh();

			// Generate the contact section.
			if (!$("#wsu-contact").length) {
				contactHtml = "<section id='wsu-contact' class='spine-contact spine-action closed'>";
				propmap = {};

				$.each($("[itemtype='http://schema.org/Organization']"),function(){
					var tar = this;
					$.each($(tar).find("[itemprop]"),function(i,v){
						var tmp = {};
						tmp[$(v).attr("itemprop")] = $(v).attr("content");
						$.extend(propmap,tmp);
					});
					contactHtml += $.runTemplate(self.framework_options.contact_template,propmap);
				});
				contactHtml += "</section>";
				self.setup_tabs("contact",contactHtml);
			}

			self.setup_nav();

			if ( $.is_iOS() || $.is_Android() ) {
				$( "html" ).addClass( "ios" );
				self.setup_nav_scroll();
			}

			// If SVG is not supported, add a class and replace Spine SVG files with PNG equivalents.
			if ( ! $.svg_enabled() ) {
				$( "html" ).addClass( "nosvg" );
				svg_imgs = $( "img[src$='.svg']" );

				if ( svg_imgs.length ) {
					$.each( svg_imgs, function() {
						$( this ).attr( "src", $( this ).attr( "src" ).replace( ".svg", ".png" ) );
					} );
				}
			}

			self.setup_spine();
			self.setup_printing();

			$(window).on("resize", function() {
				self.sizing();
				self.equalizing();
				self.mainheight();

				// Only run function if an unbound element exists
				if( $(".unbound,#binder.broken").length ) {
					spread = $(window).width();
					verso = self._get_globals("main").offset().left;
					page = self._get_globals("main").width();
					recto = spread - self._get_globals("main").offset().left;
					recto_margin = "";

					if (recto >= page ) {
						recto_margin = recto - page;
					} else {
						recto_margin = 0;
					}

					/* Broken Binding */
					if ($("#binder").is(".broken")) {
						self._get_globals("main").css("width",recto);
					}

					verso_width = verso + self._get_globals("main").width();

					$(".unbound:not(.element).recto").css("width",recto).css("margin-right",-(recto_margin));
					$(".unbound.element.recto").each( function() {
						para = $(this).width();
						$(this).css("width",para+recto_margin).css("margin-right",-(recto_margin));
					});
					$(".unbound.verso").css("width",verso_width).css("margin-left",-(verso));
					$(".unbound.verso.recto").css("width",spread);
				}

				viewport_ht = $(window).height();
				glue.css("min-height",viewport_ht);
				spine.css("min-height",viewport_ht);

				if ($(".spine-header").height()>50) {
					spine.removeClass("unshelved");
					spine.removeClass("shelved");
				} else {
					glue.css("min-height",viewport_ht-50);
					spine.addClass("shelved");
				}

				$(document).trigger("scroll");

			}).trigger("resize");
			$(document).trigger("scroll");
		},

		// Label #jacket with current window size
		/**
		 * Label `#jacket` with the current window size.
		 *
		 * @param {HTMLelement} jacket
		 */
		sizing: function (jacket) {
			var current_width, ele_class, px_width, size_small, size_intermediate, size_medium, size_large, size_xlarge;

            jacket = jacket || $("#jacket");

            current_width = $(window).width();
			size_small = "size-small size-lt-intermediate size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge";
			size_intermediate = "size-intermediate size-smallish size-lt-medium size-lt-large size-lt-xlarge size-gt-small";
			size_medium = "size-medium size-lt-xlarge size-lt-large size-gt-intermediate size-gt-smallish size-gt-small";
			size_large = "size-large size-lt-xlarge size-gt-small size-gt-intermediate size-gt-smallish size-gt-medium";
			size_xlarge = "size-xlarge size-gt-small size-gt-intermediate size-gt-smallish size-gt-medium size-gt-large";

			ele_class = "";
			px_width = "";

			if (current_width >= 1188) {
				ele_class = size_xlarge;
			} else if (current_width >= 990) {
				ele_class = size_large;
			} else if ((current_width < 990) && current_width >= 792 ) {
				px_width = "size-lt-990";
				ele_class = $("#binder").is(".fluid") ? size_large : size_medium;
			} else if (current_width < 792 && current_width >= 694) {
				px_width = "size-lt-792";
				ele_class = $("#binder").is(".fixed") ? size_intermediate : size_medium;
			} else if (current_width < 694 && current_width >= 396) {
				ele_class = size_small;
			} else if (current_width < 396) {
				ele_class = "size-small size-lt-small size-lt-intermediate size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge";
			}

			jacket.stripClass("size-").addClass(ele_class+" "+px_width);
		},

		/**
		 * Equalize columns in a layout.
		 */
		equalizing: function () {
			var obj;

			if( $(".equalize").length ) {
				obj = $(".equalize");
				obj.find(".column").css("min-height","");

				$.each(obj,function() {
					var tallestBox = 0;
					$.each($(".column", this), function() {
						tallestBox = ($(this).outerHeight() > tallestBox) ? $(this).outerHeight() : tallestBox;
					});

					if ( ( $(window).width() <= 792 && !obj.is(".equalize-medium") ) || ( $(window).width() <= 694 && !obj.is(".equalize-small") ) ) {
						$(".column",this).not(".unequaled").css("min-height","1");
					} else {
						$(".column",this).not(".unequaled").css("min-height",tallestBox);
					}
					$("section.equalize .column",this).css("min-height","auto");
				});
			}
		},

		/**
		 * Apply a minimum height to the `main` element.
		 */
		mainheight: function () {
			var main, window_height, main_height;

			main = this._get_globals( "main" ).refresh();

			if ( main.offset() ) {
				window_height = $( window ).height();
				main_height = window_height;
				if ( $( "#binder" ).is( ".size-lt-large" ) ) {
					main_height -= 50;
				}
				$( "main:not(.height-auto)" ).css( "min-height", main_height );
			}
		},

		/**
		 * Sets up framework html and other DOM attributes
		 */
		setup_jacket: function() {},

		/**
		 * Sets up framework html and other DOM attributes
		 */
		setup_binder: function() {},

		 /**
		 * Sets up framework html and other DOM attributes
		 */
		setup_content: function() {},

		/**
		 * Sets up the spine area
		 */
		setup_spine: function(){
			var self, spine, glue, main, viewport_ht, spine_ht, height_dif, positionLock;

			$("#glue > header").prepend("<button id='shelve' />");

			self = this;

			spine = self._get_globals("spine").refresh();
			glue = self._get_globals("glue").refresh();
			main = self._get_globals("main").refresh();

			self.nav_state.scroll_top = 0;
			self.nav_state.scroll_dif = 0;
			self.nav_state.positionLock = 0;

			$("header button").on("click",function(e) {
				e.preventDefault();
				spine.toggleClass("unshelved shelved");
				$( "html" ).toggleClass( "spine-mobile-nav" );
			});

			// Close the mobile Spine navigation when a click occurs outside of the Spine.
			main.on( "click swipeleft", function() {
				if ( spine.hasClass( "unshelved" ) ) {
					spine.toggleClass( "shelved unshelved" );
					$( "html" ).removeClass( "spine-mobile-nav" );
				}
			} );

			// Fixed/Sticky Horizontal Header
			$( document ).on( "scroll touchmove", function() {
				self.apply_nav_func( self );
			} );

			// Watch for DOM changes and resize the Spine to match.
			$.observeDOM( glue , function() {
				self.apply_nav_func( self );
			} );

			$( document ).keydown( function( e ) {
				if( e.which === 35 || e.which === 36 ) {
					viewport_ht	= $( window ).height();
					spine_ht	= spine[0].scrollHeight;
					height_dif	= viewport_ht - spine_ht;

					if ( e.which === 35 ) {
						positionLock = height_dif;
					} else if ( e.which === 36 ) {
						positionLock = 0;
					}

					spine.css( { "position" : "fixed", "top" : positionLock + "px" } );
					self.nav_state.positionLock = positionLock;
				}
			} );

			// Apply the `.skimmed` class to the Spine on non mobile views after 148px.
			if ( ! $.is_iOS() && ! $.is_Android() ) {
				$( document ).scroll( function() {
					var top;
					top = $( document ).scrollTop();
					if ( top > 148 ) {
						$( "#spine" ).addClass( "skimmed" );
					} else {
						$( "#spine" ).removeClass( "skimmed" );
					}
				} );
			}
		},

		/**
		 * Ensure Spine navigation is properly positioned and sized to snap to the top
		 * and bottom of the document.
		 *
		 * @param self
		 */
		apply_nav_func: function(self) {
			var spine, glue, main, top, bottom, scroll_top, positionLock, scroll_dif, spine_ht, viewport_ht, glue_ht, height_dif;

			// Disable extended nav positioning for mobile devices.
			if ( $.is_Android() || $.is_iOS() ) {
				return;
			}

			spine = self._get_globals("spine").refresh();
			glue = self._get_globals("glue").refresh();
			main = self._get_globals("main").refresh();

			scroll_top   = self.nav_state.scroll_top;
			positionLock = self.nav_state.positionLock;

			top          = $(document).scrollTop();
			bottom       = $(document).height() - $(window).height() - $(window).scrollTop();
			scroll_dif   = scroll_top - top;
			scroll_top   = top;
			viewport_ht	 = $(window).height();
			spine_ht	 = spine[0].scrollHeight;
			glue_ht		 = glue.height();
			height_dif	 = viewport_ht - spine_ht;

			self.nav_state.scroll_top = scroll_top;

			if (scroll_dif === 0 && (glue_ht > main.outerHeight(true))) {
				main.css({"min-height":glue_ht+scroll_top});
			} else {
				if (scroll_dif === 0) {
					main.stop().animate({"min-height":glue_ht},50);
				} else {
					main.css({"min-height":glue_ht});
				}
			}

			if ( main.outerHeight(true) > glue_ht ) {
				if( (scroll_dif <= 0) ) { // scrolling down
					positionLock = ( positionLock===0 || positionLock <= height_dif ) ? height_dif : positionLock + scroll_dif;
					if (bottom <= 0 && positionLock >= height_dif) {
						positionLock = height_dif;
					}
				} else { // scrolling up
					positionLock = ( positionLock >= 0 ) ? 0 : positionLock + scroll_dif;

					if (top > 0 && positionLock > 0) {
						positionLock = 0;
					}
				}

				if (top <= 0) {
					positionLock = 0;
				}

				if (bottom <= 0) {
					positionLock = height_dif;
				}

				spine.css({"position":"fixed","top":positionLock+"px"});
				self.nav_state.positionLock = positionLock;
			} else {
				// scroll_top from here should be positionLock above
				if ( spine.is("#spine[style]") ) {
					spine.removeAttr("style");
				}
			}
		},

		/**
		 * Process a WSU action tab (mail, sharing, etc...) and setup the
		 * structure accordingly.
		 */
		setup_tabs: function(tab,html) {
			var self, wsu_actions, action_ht;

			html = html || "";
			self = this;

			wsu_actions = self._get_globals("wsu_actions").refresh();
			wsu_actions.append(html);

			$("#wsu-" + tab + "-tab button").on("click",function(e) {
				e.preventDefault();
				wsu_actions.find("*.opened,#wsu-" + tab + ",#wsu-" + tab + "-tab").toggleClass("opened closed");

				action_ht = $("main").outerHeight() - ( $(".spine-header").outerHeight() + $(".wsu-actions-tabs").outerHeight() );

				$(".spine-action.opened").css( "min-height", action_ht );
			});
		},

		/**
		 * Setup a scroll container for use with iOS.
		 */
		setup_nav_scroll: function() {
			$("#glue").wrapInner( "<div id='scroll'>" );
			$("#spine header").insertBefore($("#scroll"));
		},

		/**
		 * Sets up navigation system
		 */
		setup_nav: function() {
			// Tag location and hierarchy
			$("#spine nav ul,#spine ul").parents("li").addClass("parent");

			// Use "current" or "active" on active li elements. Parents of these elements will automatically
			// receive the "active" class. We check wildcards to accommodate inflexible platforms.
			$("#spine nav li[class*=current], #spine nav li[class*=active]").addClass("active").parents("li").addClass("active");
			$("#spine nav li a[class*=current], #spine nav li a[class*=active]").parents("li").addClass("active");

			$("#spine .active:not(:has(.active))").addClass("dogeared");

			// Couplets
			$("#spine nav li.parent > a").each( function() {
				var tar, title, classes, url;
				tar = $(this);

				title = ( tar.is("[title]")  ) ? tar.attr("title") : "Overview";
				title = ( tar.is("[data-overview]") ) ?tar.data("overview") : title;
				title = title.length > 0 ? title : "Overview"; // this is just triple checking that a value made it here.

				classes = "overview";
				if (tar.closest(".parent").is(".dogeared")) {
					classes += " dogeared";
				}

				url = tar.attr("href");

				if ( url !== "#" ) {
					tar.parent("li").children("ul").prepend("<li class='" + classes + "'></li>");
					tar.clone(true,true).appendTo( tar.parent("li").find("ul .overview:first") );
					tar.parent("li").find("ul .overview:first a").html(title);
				}

				// Disclosure
				tar.on("click",function(e) {
					e.preventDefault();
					tar.parent("li").siblings().removeClass("opened");
					tar.parent("li").toggleClass("opened");
				});

			});

			// Trigger a scroll action when an anchor link is used.
			$("main a[href*='#']:not([href*='://'])").on("mouseup",function() {
				$(document).trigger("scroll");
			});

			// Mark external URLs in the nav menu.
			$(".spine-navigation a[href^='http']:not([href*='://" + window.location.hostname + "'])").addClass("external");
		},

		/**
		 * Handle printing action when selected in the Spine.
		 */
		setup_printing: function(){
			var self, spine, wsu_actions, print_controls;

			self = this;
			spine = self._get_globals("spine").refresh();
			wsu_actions = self._get_globals("wsu_actions").refresh();

			// Print & Print View
			print_controls = "<span class='print-controls'><button id='print-invoke'>Print</button><button id='print-cancel'>Cancel</button></span>";

			function printPage() {
				window.print();
			}

			function print_cancel() {
				$("html").toggleClass("print");
				$(".print-controls").remove();
			}

			function print(e) {
				if ( undefined !== e ) {
					e.preventDefault();
				}
				wsu_actions.find(".opened").toggleClass("opened closed");
				$("html").toggleClass("print");
				spine.find("header").prepend(print_controls);
				$(".unshelved").removeClass("unshelved").addClass("shelved");
				$("#print-invoke").on("click",function() { window.print(); });
				$("#print-cancel").on("click",print_cancel);
				window.setTimeout(function() { printPage(); }, 400);
			}
			$("#wsu-print-tab button").click(print);

			// Shut a tool section
			$("button.shut").on("click",function(e) {
				e.preventDefault();
				wsu_actions.find(".opened").toggleClass("opened closed");
			});
		}
	});
} (jQuery) );

// @if DEBUG
/* for debug only. remove when done */
function dump(n,t){var i="",f,e,r,u;for(t||(t=0),f="",e=0;e<t+1;e++)f+=" ";if(typeof n=="object")for(r in n)u=n[r],typeof u=="object"?(i+=f+"'"+r+"' ...\n",i+=dump(u,t+1)):i+=f+"'"+r+"' => \""+u+'"\n';else i="===>"+n+"<===("+typeof n+")";return i}
// @endif

(function($){
	"use strict";
	function setup_search(){
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

	}	

	$(document).ready(function(){
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
			search += '			<input name="term" type="text" value="" placeholder="search">'
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
			if ( scope == 'site-search' ) {
				var site = ' site:'+location.hostname;
				// var site = ' site:admission.wsu.edu' // temporary for testing
			} else {
				var site = '';
			}
			var cx = 'cx=004677039204386950923:xvo7gapmrrg';
			var cof = 'cof=FORID%3A11';
			var search_term = $("#wsu-search input").val();
			var search_url = 'http://search.wsu.edu/default.aspx?'+cx+'&'+cof+'&q='+search_term+site;
			window.location.href = search_url;
			return false;
		});
		}
		
		// End Search Generation

		// Section -> Share
		// Just getting started on rolling our own... more to come.
		if (!$wsu_share.length) {
		if ($('meta.share-text').length) /* Need a better name */ { var share_text = $('meta.share-text'); } else { share_text = "You should know ..."; }
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
				contact += '		<div class="locality">'+addressLocality+' <span class="postalcode">'+postalCode+'</span></div>'
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

		// Submit search
		/* $("button#submit-search").on("click",function(e) {
			e.preventDefault();
			$('#results').show();
			//return false;
		}); */

		

		// Fixed/Sticky Horizontal Header
		$(document).scroll(function() {
			var top = $(document).scrollTop();
			if (top > 49) {
				$spine.not('.unshelved').addClass('scanned');
			} else { 
				$spine.removeClass('scanned');
			} 
		});

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
			if ($(this).closest('.parent').hasClass('dogeared')) {
				var classes = "overview dogeared";
			} else {
				var classes = "overview";
			}
			var url = $(this).attr("href");
			if ( url != '#' ) {
				$(this).parent("li").children("ul").prepend('<li class="' + classes + '"><a href="'  + url +  '">' + title + '</a></li>');
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

		// External Links in nav
		// this shouldn't be done this way
		$('nav#spine-sitenav a').filter(function() {
		   return this.hostname && this.hostname !== location.hostname;
		}).addClass("external");

		// Label #jacket with current window size
		function sizing() {
			var current_width = $(window).width();
			if(current_width >= 1188) {
				$('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-xlarge size-gt-small size-gt-smallish size-gt-medium size-gt-large');
			} else if(current_width >= 990) {
				$('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-large size-lt-xlarge size-gt-small size-gt-smallish size-gt-medium');
			} else if(current_width < 990 && current_width >= 792) {
				$('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-medium size-lt-xlarge size-lt-large size-gt-smallish size-gt-small');
			} else if((current_width >= 694 && current_width < 792) && ($('#binder').hasClass('fixed'))) {
				$('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-smallish size-lt-medium size-lt-large size-lt-xlarge size-gt-small');
			} else if(current_width < 792) {
				$('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
			} else if(current_width < 396) {
				$('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-small size-lt-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
			}
		}
		sizing();

		$(window).resize(function(){ sizing(); });

		// Equalize Columns
		function equalizing() {
			if( $('.equalize').length ) {
				$('.row.equalize .column').css('min-height','');
				$('.row.equalize').each(function(){
					var tallestBox = 0;
					$('.column', this).each(function(){
						if($(this).height() > tallestBox) {
						   tallestBox = $(this).outerHeight();
						}
					});
					$('.column',this).not('.unequaled').css('min-height',tallestBox);
					$('section.equalize .column',this).css('min-height','auto');
				});
			}
		}
		equalizing();

		$(window).resize(function(){ equalizing(); });

		function mainheight() {
			var main_top = $('main').offset().top;
			var window_height = $(window).height();
			if ($('#binder').hasClass('size-lt-large')) {
				var main_height = window_height - 50;
			} else {
				var main_height = window_height;
			}
			$('main.fill-window-height').css('min-height',main_height);
		}
		mainheight();

		$(window).resize(function(){ mainheight(); });

		$(window).on('load resize', function(){
			var $main = $('main');
			// Only run function if an unbound element exists
			if( $('.unbound').length ) {
				var verso = $main.offset().left;
				var recto = $main.offset().right;
				// var recto = $(window).width() - ($('main').offset().left + $('main').width());
				var spread = $(window).width();
				var page = $main.width();
				var recto = spread - $main.offset().left;
				if (recto >= page ) { var recto_margin = recto - page; } else { recto_margin = 0}

				var verso_width = verso + $main.width();
				$('.unbound.recto').css('width',recto).css('margin-right',-(recto_margin));
				$('.unbound.verso').css('width',verso_width).css('margin-left',-(verso));
				$('.unbound.verso.recto').css('width',spread);
			}
		});

		setup_search();

	});
})(jQuery);
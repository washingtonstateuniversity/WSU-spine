/* for debug only. remove when done */
function dump(n,t){var i="",f,e,r,u;for(t||(t=0),f="",e=0;e<t+1;e++)f+=" ";if(typeof n=="object")for(r in n)u=n[r],typeof u=="object"?(i+=f+"'"+r+"' ...\n",i+=dump(u,t+1)):i+=f+"'"+r+"' => \""+u+'"\n';else i="===>"+n+"<===("+typeof n+")";return i;}

(function($){
	"use strict";
	function setup_search(){
		$.widget( "ui.autosearch", $.ui.autocomplete, {
			_renderMenu: function( ul, items ) {
				var that    = this;
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
				var text    = item.label;
				var value   = item.value;
				var regex   = "(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)";
					text    = "<a href='"+value+"'>" + text.replace( new RegExp( regex , "gi" ), "<strong>$1</strong>" )+"</a>";

				return $( "<li></li>" ).data( "item.autocomplete", item ).append( text ).appendTo( ul );
			},
			_renderHeader: function( ul, text ) {
				return $( "<li></li>" ).append( "<a href=''>"+text+"</a>" ).appendTo( ul );
			}
		});

		/* Search autocomplete */
		var cur_search = "";
		var termTemplate = "<strong>%s</strong>";
		var term = "";
		$( "#wsu-search input#searchterm[type=text]" ).autosearch({
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
			appendTo: "#index-search-results",
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

	// to come back later to
	//	$( "#wsu-search input#searchterm[type=text]" ).on('keyup',function(e) {
	//		if ( e.which == 13){
	//			var id   = $( "#wsu-search .ui-autocomplete-input" ).val();
	//			/*
	//			var url=siteroot+"public/get_place.castle";
	//			if(typeof($.jtrack)!=="undefined")$.jtrack.trackPageview(pageTracker,url+(id!=""?'?id='+id:'')+(term!=""?'&term='+term:''));
	//			$( "#wsu-search input#searchterm[type=text]" ).autocomplete("close");
	//			getSignlePlace(jObj,$( "#wsu-search .ui-autocomplete-input" ).val());
	//			*/
	//			
	//		}
	//	});	
	//	$("#wsu-search input#searchterm[type=text]").off().on('click',function(e){
	//		e.stopPropagation();
	//		e.preventDefault();
	//		var btn=$(this);
	//		var id   = $( "#wsu-search .ui-autocomplete-input" ).val();
	//		/*
	//		getSignlePlace(jObj,id);
	//		if(typeof($.jtrack)!=="undefined")$.jtrack.trackPageview(pageTracker,url+(id!=""?'?id='+id:'')+(term!=""?'&term='+term:''));
	//		*/
	//	});
	}	

	$(document).ready(function(){
		$("#spine #glue > header").append('<button id="shelve"></button>');
		$("#shelve").click(function() {
			$('#spine').toggleClass('unshelved shelved');
		});

		// ADD TOOLS

		// Section -> Share
		var share  = '<section id="wsu-share" class="tools closed">';
			share += '<button id="shut-share" class="shut">Close</button>';
			share += '	<ul>';
			share += '		<li class="by-facebook"><a href="#" class="addthis_button_facebook"><i class="wsu-icon"></i>Facebook</a></li>';
			share += '		<li class="by-twitter"><a href="#" class="addthis_button_twitter"><i class="wsu-icon"></i>Twitter</a></li>';
			share += '		<li class="by-email"><a href="#" class="addthis_button_email"><i class="wsu-icon"></i>Email</a></li>';
			share += '		<li class="by-other"><a href="#" class="addthis_button_compact"><i class="wsu-icon"></i>More Options ...</a></li>';
			share += '	</ul>';
			share += '</section>';

		if (!$("#wsu-share").length) { $("#wsu-actions").append(share); }

		// Section -> Contact
		// I'll get to building these from declarations in the template
		var contact  = '<section id="wsu-contact" class="tools closed">';
			contact += '<button id="shut-contact" class="shut">Close</button>';
			contact += '<address class="hcard">';
			contact += '	<div class="organization-unit fn org"><a href="http://example.wsu.edu/" class="url">University College</a></div>';
			contact += '	<div class="organization-name">Washington State University</div>';
			contact += '	<div class="adr">';
			contact += '	<div class="street-address">French Administration</div>';
			contact += '	<div class="area">';
			contact += '		<span class="locality">Pullman</span>,';
			contact += '		<abbr class="region">WA</abbr> <span class="postal-code">99164</span></div>';
			contact += '	</div>';
			contact += '	<div class="tel"><i class="wsu-icon"></i>888-468-6978</div>';
			contact += '	<div class="email" rel="email"><a href="mailto:contact@wsu.edu"><i class="wsu-icon"></i>Email us</a></div>';
			contact += '	<div class="more"><a href="http://about.wsu.edu/contact/"><i class="wsu-icon"></i>More Contacts &#8230;</a></div>';
			contact += '</address>';
			contact += '</section>';

		if (!$("#wsu-contact").length) { $("#wsu-actions").append(contact); }

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
		function print(e) {
			e.preventDefault();
			$('#wsu-actions *.opened').toggleClass('opened closed');
			$('html').toggleClass('print');
			$("#spine header").append(print_controls);
			$("#print-invoke").on("click",function() { window.print(); });
			$("#print-cancel").on("click",print_cancel);
			setTimeout(function(){ printPage(); },400);
			}
		$("#wsu-print-tab button").click(print);

		// Shut (ie close) a tool section
		$("button.shut").on("click",function(e) {
			e.preventDefault();
			$('#wsu-actions').find('.opened').toggleClass('opened closed');
		});

		// Submit search
		$("button#submit-search").on("click",function(e) {
			e.preventDefault();
			$('#results').show();
			//return false;
		});

		// Search tabs
		$('#wsu-search-tabs button').on("click",function(e) {
			e.preventDefault();
			var tab = $(this).closest('li').attr('id');
			var id = tab.replace('-tab','');
			var selector = '#wsu-search *.active,#'+tab+',#'+id+'-results';
			$(selector).toggleClass('active inactive');
		});

		// Search tabs
		/* $(".spine-tabs li button,.spine-tabs li a").click(function() {
			$(this).parent('li').siblings('.active').toggleClass('active inactive');
			$(this).parent('li').addClass('active');
		}); */


		// Fixed/Sticky Horizontal Header
		$(document).scroll(function() {
			var top = $(document).scrollTop();
			if (top > 49) {
				$('#spine').not('.unshelved').addClass('scanned'); 
			} else { 
				$('#spine').removeClass('scanned');
			} 
		});

		// NAVIGATION
		// Tag location and hierarchy
		$("#spine nav ul,#spine ul").parents("li").addClass("parent");
		$("#spine nav li[class*=current], nav li[class*=active]").addClass("active").parents("li").addClass("active");
		$("#spine .active").not(":has(.active)").addClass("dogeared");

		// Disclosure
		$("#spine li.parent > a").on("click",function(e) { 
			e.preventDefault();
			$(this).parent("li").siblings().removeClass("opened");
			$(this).parent("li").toggleClass("opened");
		  });

		// Couplets
		$("#spine li.parent > a").each( function() {
			var title = 'Overview',
				classes;

			if ($(this).attr('title')) {
				var alt = $(this).attr('title').length;
				if ( alt > 0 ) { title = $(this).attr('title'); }
			}
			if ($(this).closest('.parent').hasClass('dogeared')) {
				classes = "overview dogeared";
			} else {
				classes = "overview";
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
			if ( $('#spine').hasClass('unshelved') ) {
				$('#spine').toggleClass('shelved unshelved');
			}
		});

		// Cracking the Spine for Short Windows
		$(window).on('load resize scroll mouseup touchend',function() {
			var footerHeight = $("#spine footer").height();
			var windowHeight = window.innerHeight - footerHeight - 50;
			var spineHeight = $("#glue").height();
			//$('main').prepend(footerHeight);
			if ( windowHeight < spineHeight ) {
				$("#spine").removeClass("uncracked").addClass("cracked");
			} else { 
				$("#spine").removeClass("cracked").addClass("uncracked");
			}
		});

		// Moving the Spine for Short Windows
		$(document).scroll(function() {
			var windowHeight = window.innerHeight;
			var top = $(document).scrollTop();
			var spineHeight = $("#glue").height();
			var crack = spineHeight - windowHeight;
			if ( top > crack ) { $('#spine.cracked').addClass('pinned'); }
			else { $('#spine.cracked').removeClass('pinned'); }
		});

		// Equalize Columns
		$('.row:not(".unequaled")').each(function(){  
			var highestBox = 0;
			$('.column', this).each(function(){
				if($(this).height() > highestBox) {
				   highestBox = $(this).height(); 
				}
			});  
			$('.column',this).not('.unequaled').css('min-height',highestBox);
		});

		// External Links in nav
		//this shouldn't be done this way
		$('nav#site a').filter(function() {
		   return this.hostname && this.hostname !== location.hostname;
		}).addClass("external");


	/*
	this is for now.  
	*/

setup_search();




	});
})(jQuery);
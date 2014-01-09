/* Modernizr 2.7.0 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-rgba-svg-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.7.0",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return x("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.rgba=function(){return B("background-color:rgba(150,255,150,.5)"),E(j.backgroundColor,"rgba")},r.fontface=function(){var a;return x('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect};for(var I in r)A(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);
/* for debug only. remove when done */
function dump(n,t){var i="",f,e,r,u;for(t||(t=0),f="",e=0;e<t+1;e++)f+=" ";if(typeof n=="object")for(r in n)u=n[r],typeof u=="object"?(i+=f+"'"+r+"' ...\n",i+=dump(u,t+1)):i+=f+"'"+r+"' => \""+u+'"\n';else i="===>"+n+"<===("+typeof n+")";return i}

(function($){
	"use strict";
	function setup_search(){
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
		    // share += '<button id="shut-share" class="shut">Close</button>';
		    share += '	<ul>';
		    share += '		<li class="by-facebook"><a href="#" class="addthis_button_facebook"><i class="wsu-icon"></i>Facebook</a></li>';
		    share += '		<li class="by-twitter"><a href="#" class="addthis_button_twitter"><i class="wsu-icon"></i>Twitter</a></li>';
		    share += '		<li class="by-email"><a href="#" class="addthis_button_email"><i class="wsu-icon"></i>Email</a></li>';
		    share += '		<!--<li class="by-gmail"><a href="#" class="addthis_button_gplus"><i class="wsu-icon"></i>Google Plus</a></li>-->';
		    share += '		<!--<li class="by-gmail"><a href="#" class="addthis_button_linkedin"><i class="wsu-icon"></i>LinkedIn</a></li>-->';
		    share += '		<!--<li class="by-other"><a href="#" class="addthis_button_compact"><i class="wsu-icon"></i>More Options ...</a></li>-->';
		    share += '	</ul>';
		    share += '</section>';
				
		if (!$("#wsu-share").length) { $("#wsu-actions").append(share); }
		
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
		var contact  = '<section id="wsu-contact" class="tools closed">';
		    // contact += '<button id="shut-contact" class="shut">Close</button>';
		    contact += '<address class="hcard">';
		    contact += '	<div class="organization-unit fn org"><a href="'+url+'" class="url">'+department+'</a></div>';
		    contact += '	<div class="organization-name">'+name+'</div>';
		    contact += '	<div class="address">';
			contact += '		<div class="street-address">'+streetAddress+'</div>';
			contact += '		<div class="locality">'+addressLocality+'</div>'
			contact += '	</div>';
			contact += '	<div class="tel"><i class="wsu-icon"></i>'+telephone+'</div>';
			contact += '	<div class="email" rel="email"><a href="mailto:'+email+'"><i class="wsu-icon"></i>Email us</a></div>';
			if (typeof ContactPoint != 'undefined') {
				contact += '	<div class="more"><a href="'+ContactPoint+'"><i class="wsu-icon"></i>'+ContactPointTitle+'</a></div>';
				}
			contact += '</address>';
			contact += '</section>';
				
		 $("#wsu-actions").append(contact);
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
		/* $("button#submit-search").on("click",function(e) {
			e.preventDefault();
			$('#results').show();
			//return false;
		}); */
		
		// Submit search
		$("#wsu-search form").submit( function() {
			var scope = $("#wsu-search").attr('data-default');
			if ( scope == 'site-search' ) {
				var site = ' site:'+location.hostname;
				var site = ' site:admission.wsu.edu' // temporary for testing
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
			if ( $('#spine').hasClass('unshelved') ) {
				$('#spine').toggleClass('shelved unshelved');
			};
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
			if ( top > crack ) { $('#spine.cracked').addClass('scrolled'); }
			else { $('#spine.cracked').removeClass('scrolled'); }
		}); 
		
		// Moving the Spine for Short Windows
		/* $(document).scroll(function() {
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
		}); */
	
		
	
		// External Links in nav
		//this shouldn't be done this way
		$('nav#site a').filter(function() {
		   return this.hostname && this.hostname !== location.hostname;
		}).addClass("external");

		// Supplementary Responsive
		    var current_width = $(window).width();
		    if(current_width >= 1188)
		      $('#binder').addClass("xlarge").removeClass("medium small small-medium large");
		    else if(current_width >= 990)
		      $('#binder').addClass("large").removeClass("medium small small-medium xlarge");
		    else if(current_width < 990 && current_width >= 792)
		      $('#binder').addClass("medium").removeClass("xlarge large small small-medium");
		    else if((current_width >= 694 && current_width < 792) && ($('#binder').hasClass('fixed')))
		      $('#binder').addClass("small-medium").removeClass("xlarge large small medium");
		    else if(current_width < 792)
		      $('#binder').addClass("small").removeClass("xlarge large medium small-medium");
		
		// We should be able to combine this with the above	
		  $(window).resize(function(){
		    var current_width = $(window).width();
		    if(current_width >= 1188)
		      $('#binder').addClass("xlarge").removeClass("medium small large small-medium");
		    else if(current_width >= 990)
		      $('#binder').addClass("large").removeClass("medium small xlarge small-medium");
		    else if(current_width < 990 && current_width >= 792)
		      $('#binder').addClass("medium").removeClass("xlarge large small small-medium");
		    else if((current_width >= 694 && current_width < 792) && ($('#binder').hasClass('fixed')))
			      $('#binder').addClass("small-medium").removeClass("xlarge large small medium");
		    else if(current_width < 792)
		     $('#binder').addClass("small").removeClass("xlarge large medium small-medium");
		  });
		
		// Equalize Columns
		$('.large .row:not(".unequaled"), .xlarge .row:not(".unequaled")').each(function(){  
			var highestBox = 0;
			$('.column', this).each(function(){
				if($(this).height() > highestBox) {
				   highestBox = $(this).height(); 
				}
			});  
			$('.column',this).not('.unequaled').css('min-height',highestBox);
		});
		
	
	  
	  

	/*
	this is for now.  
	*/

setup_search();
	
	
	
	
	});
})(jQuery);
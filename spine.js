var addthis_config = {"data_track_addressbar":false};
/* //s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51f6d2a576eaa0ab */

/* (c) 2008-2013 AddThis, Inc */
var addthis_conf={ver:300};if(!((window._atc||{}).ver)){var _atd="www.addthis.com/",_atr=window.addthis_cdn||"//s7.addthis.com/",_euc=encodeURIComponent,_duc=decodeURIComponent,_atc={dbg:0,rrev:126504,dr:0,ver:250,loc:0,enote:"",cwait:500,bamp:0.25,camp:1,csmp:0.0001,damp:1,famp:1,pamp:0.1,sfmp:0.1,tamp:1,plmp:1,vamp:1,cscs:1,ohmp:0,ltj:1,xamp:1,abf:!!window.addthis_do_ab,qs:0,cdn:0,rsrcs:{bookmark:_atr+"static/r07/bookmark041.html",atimg:_atr+"static/r07/atimg041.html",countercss:_atr+"static/r07/counter014.css",counterIE67css:_atr+"static/r07/counterIE67004.css",counter:_atr+"static/r07/counter017.js",core:_atr+"static/r07/core121.js",wombat:_atr+"static/r07/bar026.js",wombatcss:_atr+"static/r07/bar012.css",qbarcss:_atr+"bannerQuirks.css",fltcss:_atr+"static/r07/floating010.css",barcss:_atr+"static/r07/banner006.css",barjs:_atr+"static/r07/banner004.js",contentcss:_atr+"static/r07/content008.css",contentjs:_atr+"static/r07/content022.js",layersjs:_atr+"static/r07/layers036.js",layerscss:_atr+"static/r07/layers032.css",layersiecss:_atr+"static/r07/layersIE6007.css",layersdroidcss:_atr+"static/r07/layersdroid004.css",warning:_atr+"static/r07/warning000.html",ssojs:_atr+"static/r07/ssi005.js",ssocss:_atr+"static/r07/ssi004.css",authjs:_atr+"static/r07/auth016.js",peekaboocss:_atr+"static/r07/peekaboo002.css",overlayjs:_atr+"static/r07/overlay005.js",widget32css:_atr+"static/r07/widgetbig059.css",widget20css:_atr+"static/r07/widgetmed009.css",widgetcss:_atr+"static/r07/widget119.css",widgetIE67css:_atr+"static/r07/widgetIE67006.css",widgetpng:"//s7.addthis.com/static/r07/widget059.gif",embed:_atr+"static/r07/embed010.js",embedcss:_atr+"static/r07/embed004.css",lightbox:_atr+"static/r07/lightbox000.js",lightboxcss:_atr+"static/r07/lightbox000.css",link:_atr+"static/r07/link005.html",pinit:_atr+"static/r07/pinit017.html",linkedin:_atr+"static/r07/linkedin022.html",fbshare:_atr+"static/r07/fbshare004.html",tweet:_atr+"static/r07/tweet027.html",menujs:_atr+"static/r07/menu161.js",sh:_atr+"static/r07/sh148.html"}};}(function(){var i,q=window,C=document;var s=(window.location.protocol=="https:"),F,n,y,A=(navigator.userAgent||"unk").toLowerCase(),v=(/firefox/.test(A)),p=(/msie/.test(A)&&!(/opera/.test(A))),c={0:_atr,1:"//ct1.addthis.com/",6:"//ct6z.addthis.com/"},g={gb:"1",nl:"1",no:"1"},o={gr:"1",it:"1",cz:"1",ie:"1",es:"1",pt:"1",ro:"1",ca:"1",pl:"1",be:"1",fr:"1",dk:"1",hr:"1",de:"1",hu:"1",fi:"1",us:"1",ua:"1",mx:"1",se:"1",at:"1"},E={nz:"1"},h=(h=document.getElementsByTagName("script"))&&h[h.length-1].parentNode;_atc.cdn=0;if(!window.addthis||window.addthis.nodeType!==i){try{F=window.navigator?(navigator.userLanguage||navigator.language):"";n=F.split("-").pop().toLowerCase();y=F.substring(0,2);if(n.length!=2){n="unk";}if(_atr.indexOf("-")>-1){}else{if(window.addthis_cdn!==i){_atc.cdn=window.addthis_cdn;}else{if(E[n]){_atc.cdn=6;}else{if(g[n]){_atc.cdn=(v||p)?0:1;}else{if(o[n]){_atc.cdn=(p)?0:1;}}}}}if(_atc.cdn){for(var z in _atc.rsrcs){if(_atc.rsrcs.hasOwnProperty(z)){_atc.rsrcs[z]=_atc.rsrcs[z].replace(_atr,typeof(window.addthis_cdn)==="string"?window.addthis_cdn:c[_atc.cdn]).replace(/live\/([a-z])07/,"live/$107");}}_atr=c[_atc.cdn];}}catch(B){}function b(k,e,d,a){return function(){if(!this.qs){this.qs=0;}_atc.qs++;if(!((this.qs++>0&&a)||_atc.qs>1000)&&window.addthis){window.addthis.plo.push({call:k,args:arguments,ns:e,ctx:d});}};}function x(e){var d=this,a=this.queue=[];this.name=e;this.call=function(){a.push(arguments);};this.call.queuer=this;this.flush=function(w,r){this.flushed=1;for(var k=0;k<a.length;k++){w.apply(r||d,a[k]);}return w;};}window.addthis={ost:0,cache:{},plo:[],links:[],ems:[],timer:{load:((new Date()).getTime())},_Queuer:x,_queueFor:b,data:{getShareCount:b("getShareCount","data")},bar:{show:b("show","bar"),initialize:b("initialize","bar")},layers:b("layers"),login:{initialize:b("initialize","login"),connect:b("connect","login")},configure:function(e){if(!q.addthis_config){q.addthis_config={};}if(!q.addthis_share){q.addthis_share={};}for(var a in e){if(a=="share"&&typeof(e[a])=="object"){for(var d in e[a]){if(e[a].hasOwnProperty(d)){if(!addthis.ost){q.addthis_share[d]=e[a][d];}else{addthis.update("share",d,e[a][d]);}}}}else{if(e.hasOwnProperty(a)){if(!addthis.ost){q.addthis_config[a]=e[a];}else{addthis.update("config",a,e[a]);}}}}},box:b("box"),button:b("button"),counter:b("counter"),count:b("count"),lightbox:b("lightbox"),toolbox:b("toolbox"),update:b("update"),init:b("init"),ad:{menu:b("menu","ad","ad"),event:b("event","ad"),getPixels:b("getPixels","ad")},util:{getServiceName:b("getServiceName")},ready:b("ready"),addEventListener:b("addEventListener","ed","ed"),removeEventListener:b("removeEventListener","ed","ed"),user:{getID:b("getID","user"),getGeolocation:b("getGeolocation","user",null,true),getPreferredServices:b("getPreferredServices","user",null,true),getServiceShareHistory:b("getServiceShareHistory","user",null,true),ready:b("ready","user"),isReturning:b("isReturning","user"),isOptedOut:b("isOptedOut","user"),isUserOf:b("isUserOf","user"),hasInterest:b("hasInterest","user"),isLocatedIn:b("isLocatedIn","user"),interests:b("getInterests","user"),services:b("getServices","user"),location:b("getLocation","user")},session:{source:b("getSource","session"),isSocial:b("isSocial","session"),isSearch:b("isSearch","session")},_pmh:new x("pmh"),_pml:[]};function f(a){a.style.width=a.style.height="1px";a.style.position="absolute";a.style.zIndex=100000;}if(document.location.href.indexOf(_atr)==-1){var t=document.getElementById("_atssh");if(!t){t=document.createElement("div");t.style.visibility="hidden";t.id="_atssh";f(t);h.appendChild(t);}function j(a){if(a&&!(a.data||{})["addthisxf"]&&window.addthis){if(addthis._pmh.flushed){_ate.pmh(a);}else{addthis._pmh.call(a);}}}if(window.postMessage){if(window.attachEvent){window.attachEvent("onmessage",j);}else{if(window.addEventListener){window.addEventListener("message",j,false);}}addthis._pml.push(j);}if(!t.firstChild){var l,A=navigator.userAgent.toLowerCase(),u=Math.floor(Math.random()*1000);l=document.createElement("iframe");l.id="_atssh"+u;l.title="AddThis utility frame";t.appendChild(l);f(l);l.frameborder=l.style.border=0;l.style.top=l.style.left=0;_atc._atf=l;}}var D=document.createElement("script");D.type="text/javascript";D.src=(s?"https:":"http:")+_atc.rsrcs.core;h.appendChild(D);var m=10000;setTimeout(function(){if(!window.addthis.timer.core){if(Math.random()<_atc.ohmp){(new Image()).src="//m.addthisedge.com/live/t00/oh.gif?"+Math.floor(Math.random()*4294967295).toString(36)+"&cdn="+_atc.cdn+"&sr="+_atc.ohmp+"&rev="+_atc.rrev+"&to="+m;}if(_atc.cdn!==0){var d=document.createElement("script");d.type="text/javascript";d.src=(s?"https:":"http:")+_atr+"static/r07/core121.js";h.appendChild(d);}}},m);}})();
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
		// Cache the wsu-actions selector
		var $wsu_actions = $('#wsu-actions');

		$("#spine #glue > header").append('<button id="shelve"></button>');
		$("#shelve").click(function() {
			// var body_height = $('body').height();
			// $('#spine.unshelved').css('height',body_height);
			$('#spine').toggleClass('unshelved shelved');
		});
		
		// ADD TOOLS
		
		// Section -> Search
		if (!$("#wsu-search").length) {
		var search  = '<section id="wsu-search" class="tools closed" data-default="site-search">';
			search += '		<form id="default-search">';
			search += '			<input name="term" type="text" value="" placeholder="search">'
			search += '			<button>Submit</button>';
			search += '		</form>';
			search += '</section>';
		$wsu_actions.append(search);
		} // End Search Generation
	     
		// Section -> Share
		var share  = '<section id="wsu-share" class="tools closed">';
		    // share += '<button id="shut-share" class="shut">Close</button>';
		    share += '	<ul>';
		    share += '		<li class="by-facebook"><a href="#" class="addthis_button_facebook">Facebook</a></li>';
		    share += '		<li class="by-twitter"><a href="#" class="addthis_button_twitter">Twitter</a></li>';
		    share += '		<li class="by-email"><a href="#" class="addthis_button_email">Email</a></li>';
		    share += '		<!--<li class="by-gmail"><a href="#" class="addthis_button_gplus">Google Plus</a></li>-->';
		    share += '		<li class="by-linkedin"><a href="#" class="addthis_button_linkedin">LinkedIn</a></li>';
		    share += '		<!--<li class="by-other"><a href="#" class="addthis_button_compact">More Options ...</a></li>-->';
		    share += '	</ul>';
		    share += '</section>';
				
		if (!$("#wsu-share").length) {
			$wsu_actions.append(share);
		}
		
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
		$('#wsu-actions-tabs' ).on('click', 'li', function(e) {
			e.preventDefault();

			if ( 'wsu-share-tab' === this.id ) {
				$('#wsu-actions *.opened,#wsu-share,#wsu-share-tab').toggleClass('opened closed');
			} else if ( 'wsu-search-tab' === this.id ) {
				$('#wsu-actions *.opened,#wsu-search,#wsu-search-tab').toggleClass('opened closed');
				$('#spine section#wsu-search input').focus();
			} else if ( 'wsu-contact-tab' === this.id ) {
				$('#wsu-actions *.opened,#wsu-contact,#wsu-contact-tab').toggleClass('opened closed');
			}
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
			e.preventDefault();
			$('#wsu-actions *.opened').toggleClass('opened closed');
			$('html').toggleClass('print');
			$("#spine header").prepend(print_controls);
			$('#spine.unshelved').removeClass('unshelved').addClass('shelved');
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
		
		// Submit search
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
		if(current_width >= 1188)
	      $('#jacket').removeClass().removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-xlarge size-gt-small size-gt-smallish size-gt-medium size-gt-large');
	    else if(current_width >= 990)
	      $('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-large size-lt-xlarge size-gt-small size-gt-smallish size-gt-medium');
	    else if(current_width < 990 && current_width >= 792)
	      $('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-medium size-lt-xlarge size-lt-large size-gt-smallish size-gt-small');
	    else if((current_width >= 694 && current_width < 792) && ($('#binder').hasClass('fixed')))
	      $('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-smallish size-lt-medium size-lt-large size-lt-xlarge size-gt-small');
	    else if(current_width < 792)
	      $('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
	      else if(current_width < 396)
	      $('#jacket').removeClass('size-small size-medium size-large size-xlarge size-lt-xlarge size-lt-large size-lt-medium size-lt-smallish size-gt-large size-gt-medium size-gt-smallish size-gt-small').addClass('size-small size-lt-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
		}
	sizing();
	$(window).resize(function(){ sizing(); });
		
	// Equalize Columns
	function equalizing() {
	if( $('.equalize').length ) {
		$('.row.equalize').each(function(){  
			var highestBox = 0;
			$('.column', this).each(function(){
				if($(this).height() > highestBox) {
				   highestBox = $(this).height(); 
				}
			});  
			$('.column',this).not('.unequaled').css('min-height',highestBox);
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
		};
	mainheight();
	$(window).resize(function(){ mainheight(); });
	
	$(window).on('load resize', function(){
	// Only run function if an unbound element exists
	if( $('.unbound').length ) {
		var verso = $('main').offset().left;
		var recto = $('main').offset().right;
		// var recto = $(window).width() - ($('main').offset().left + $('main').width());
		var spread = $(window).width();
		var page = $('main').width();
		var recto = spread - $('main').offset().left;
		if (recto >= page ) { var recto_margin = recto - page; } else { recto_margin = 0}
		
		var verso_width = verso + $('main').width();
		$('.unbound.recto').css('width',recto).css('margin-right',-(recto_margin));
		$('.unbound.verso').css('width',verso_width).css('margin-left',-(verso));
		$('.unbound.verso.recto').css('width',spread);
	}
	});

	setup_search();
	

	});
})(jQuery);
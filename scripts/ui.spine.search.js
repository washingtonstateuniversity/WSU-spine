 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
/*jshint multistr: true */
( function( $ ) {
	"use strict";
	$.extend( $.ui.spine.prototype, {
		search_init: function( options ) {
			var self;
			self = this;//Hold to preserve scop
			$.extend( options, self.search_options, options );
			this._set_globals( this.search_globals );
			this.create_search();
		},

		search_options:{
			data:[],
			providers:{
				nav:{
					name:"From Navigation",
					nodes: ".spine-navigation",
					dataType: "html",
					maxRows: 12,
					urlSpaces:"%20"
				},
				atoz:{
					name:"WSU A to Z index",
					url: "https://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
					urlSpaces:"+",
					dataType: "jsonp",
					featureClass: "P",
					style: "full",
					maxRows: 12,
					termTemplate:"<strong><%this.term%></strong>",
					resultTemplate:""
				}
			},
			search:{
				minLength: 2,
				maxRows: 12,
				getRelated:true,
				urlSpaces:"+",
				tabTemplate: "<section id='wsu-search' class='spine-search spine-action closed'>" +
								"<form id='default-search'>" +
									"<input name='term' type='text' value='' placeholder='search'>" +
									"<button type='submit'>Submit</button>" +
								"</form>" +
								"<div id='spine-shortcuts' class='spine-shortcuts'></div>" +
							"</section>"
			},
			result:{
				appendTo: "#spine-shortcuts",
				showRelated:true,
				target:"_blank",
				relatedHeader:"<b class='related_sep'>Related</b><hr/>",
				providerHeader:"<b class='provider_header'><%this.provider_name%></b><hr/>",
				termTemplate:"<b><%this.term%></b>",
				template:"<li><%this.searchitem%></li>"
			}
		},
		search_globals: {
			wsu_search: $( "#wsu-search" ),
			search_input:$( "#wsu-search input[type=text]" )
		},
		create_search: function() {
			var self, wsu_search, tabhtml;
			self = this;//Hold to preserve scop
			wsu_search = self._get_globals( "wsu_search" ).refresh();
			if ( !wsu_search.length ) {
				tabhtml = $.runTemplate( self.search_options.search.tabTemplate, {} );
			}else {
				tabhtml = "<section id='wsu-search' class='spine-search spine-action closed'>" + wsu_search.html() + "</section>";
				wsu_search.remove();
			}
			this.setup_tabs( "search", tabhtml );

			if ( $( "#spine-shortcuts" ).length <= 0 ) {
				$( "#wsu-search" ).append( "<div id='spine-shortcuts' class='spine-shortcuts'></div>" );
			}

			$( "#wsu-search-tab button" ).on( "click touchend", function() {
				self._get_globals( "search_input" ).refresh().focus();
			} );
			this.setup_search();
		},

		start_search:function( request, callback ) {
			var self, term, queries = [];
			self = this;//Hold to preserve scop

			term = $.trim( request.term );
			self.search_options.data = [];
			$.each( self.search_options.providers, function( i, provider ) {
				$.ui.autocomplete.prototype.options.termTemplate = ( typeof( provider.termTemplate ) !== undefined && provider.termTemplate !== "" ) ? provider.termTemplate : undefined;
				queries.push( self.run_query( term, provider ) );
			} );

			$.when.apply( $, queries ).done(
			function() {
				$.each( arguments, function( i, v ) {
					var data, proData;
					if ( v !== undefined ) {
						data = v[ 0 ];
						if ( data !== undefined && data.length > 0 ) {
							proData = self.setup_result_obj( term, data );
							$.merge( self.search_options.data, proData );
						}
					}
				} );
				self._call( callback, self.search_options.data );
			} );
		},

		run_query:function( term, provider ) {
			var self, result = [], tmpObj = [], nodes;
			self = this;//Hold to preserve scop
			result = [];

			if ( typeof( provider ) !== undefined && typeof( provider.url ) !== undefined && provider.nodes === undefined ) {
				return $.ajax( {
					url: provider.url,
					dataType: provider.dataType,
					data: {
						featureClass: provider.featureClass,
						style: provider.style,
						maxRows: provider.maxRows,
						name_startsWith: term,
						related:self.search_options.search.getRelated
					}
				} );
			}else if ( typeof( provider ) !== undefined && typeof( provider.nodes ) !== undefined ) {
				nodes = $( provider.nodes ).find( "a" );
				$.each( nodes, function( i, v ) {
					var obj, text, localtmpObj;
					obj = $( v );
					text = obj.text();
					if ( text.toLowerCase().indexOf( term.toLowerCase() ) > -1 && obj.attr( "href" ) !== "#" ) {
						localtmpObj = {
							label:text,
							value:obj.attr( "href" ),
							related:"false",
							searchKeywords:""
						};
						tmpObj.push( localtmpObj );
					}
				} );
				return [ tmpObj ];
			}
		},

		format_result_text:function( term, text, value ) {
			var self, termTemplate, regex;
			self = this;//Hold to preserve scope

			termTemplate = "<strong>$1</strong>"; //Typeof($.ui.autocomplete.prototype.options.termTemplate)!==undefined ? $.ui.autocomplete.prototype.options.termTemplate : "<strong>$1</strong>";

			regex	= "(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex( term ) + ")(?![^<>]*>)(?![^&;]+;)";
			text	= "<a href='" + value + "' target='" + self.search_options.result.target + "'>" + text.replace( new RegExp( regex, "gi" ), termTemplate ) + "</a>";

			return text;
		},

		setup_result_obj:function( term, data ) {
			var self, matcher;
			self = this;//Hold to preserve scop
			matcher = new RegExp( $.ui.autocomplete.escapeRegex( term ), "i" );
			return $.map( data, function( item ) {
				var text, value, resultObj;
				text = item.label;
				value	= item.value;
				if ( ( item.value && ( !term || matcher.test( text ) ) || item.related === "true" ) ) {
					text = self.format_result_text( term, text, value );
					resultObj = {
						label: text,
						value: item.value,
						searchKeywords: item.searchKeywords !== undefined ? item.searchKeywords : "false",
						related: item.related !== undefined ? item.related : "false"
					};
					return resultObj;
				}
			} );
		},

		setup_search: function() {
			var self, wsu_search, search_input, focuseitem = {};

			self = this;//Hold to preserve scop
			wsu_search = self._get_globals( "wsu_search" ).refresh();
			search_input = self._get_globals( "search_input" ).refresh();
			focuseitem = {};

			search_input.autosearch( {

				appendTo:			self.search_options.result.appendTo,
				showRelated:		self.search_options.result.showRelated,
				relatedHeader:		self.search_options.result.relatedHeader,
				minLength:			self.search_options.search.minLength,

				source: function( request, response )  {
					self.start_search( request, function( data ) {
						response( data );
					} );
				},
				search: function( ) {
					focuseitem = {};
				},
				select: function( e, ui ) {
					var id, term;
					id = ui.item.searchKeywords;
					term = $( ui.item.label ).text();
					search_input.val( term );
					search_input.autosearch( "close" );
					return false;
				},
				focus: function( e, ui ) {
					search_input.val( $( ui.item.label ).text() );
					focuseitem = {
						label:ui.item.label
					};
					e.preventDefault();
				},
				open: function( ) {},
				close: function( e ) {
					e.preventDefault();
					return false;
				}
			} ).data( "autosearch" );

			search_input.on( "keydown", function( e ) {
				if ( e.keyCode === $.ui.keyCode.TAB && search_input.is( $( ":focus" ) ) ) {
					e.preventDefault();
				}
				if ( e.which === 13 ) {
					search_input.autosearch( "close" );
				}
			} );

			search_input.off( "click touchend" ).on( "click touchend", function( e ) {
				e.stopPropagation();
				e.preventDefault();
			} );

			$( "#wsu-search form" ).submit( function() {
				var scope, site, cx, cof, search_term, search_url;
				scope = wsu_search.attr( "data-default" );
				site = " site:" + window.location.hostname;
				if ( scope === "wsu.edu" ) {
					site = "";
				}
				cx = "cx=004677039204386950923:xvo7gapmrrg";
				cof = "cof=FORID%3A11";
				search_term = search_input.val();
				search_url = "https://search.wsu.edu/default.aspx?" + cx + "&" + cof + "&q=" + search_term + site;
				window.location.href = search_url;
				return false;
			} );
		}
	} );
}( jQuery ) );

/*
	TermTemplate:"<strong> <%this.term%> </strong>",
	this.options.relatedHeader

	termTemplate
	autoSearchObj.options.provider.termTemplate
*/

/* jshint onevar: false */
( function( $ ) {
	"use strict";
	$.widget( "ui.autosearch", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var that	= this;
			var related	= $.grep( items, function( obj ) {//, item) {
				return obj.related !== "false";
			} );
			var unrelated = $.grep( items, function( obj ) {//, item) {
				return obj.related === "false";
			} );
			$.each( unrelated, function( i, item ) {
				that._renderItemData( ul, item );
			} );

			if ( this.options.showRelated && related.length ) {
				if ( this.options.relatedHeader ) {
					that._renderHeader( ul, this.options.relatedHeader );
				}
				$.each( related, function( i, item ) {
					that._renderItemData( ul, item );
				} );
			}
		},
		_renderItemData: function( ul, item ) {
			return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
		},
		_renderItem: function( ul, item ) {
			var text	= item.label;

			return $( "<li></li>" ).data( "item.autocomplete", item ).append( text ).appendTo( ul );
		},
		_renderHeader: function( ul, text ) {
			return $( "<li></li>" ).append( "<a href=''>" + text + "</a>" ).appendTo( ul );
		}
	} );
} )( jQuery );

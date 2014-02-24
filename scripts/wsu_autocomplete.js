/*
                termTemplate:"<strong><%this.term%></strong>",
                this.options.relatedHeader
                
                termTemplate
                autoSearchObj.options.provider.termTemplate
                
*/
      
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
            var termTemplate = typeof(autoSearchObj.options.provider.termTemplate)!==undefined ? autoSearchObj.options.provider.termTemplate : "<strong>$1</strong>";
            
            
            var regex	= "(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)";
                text	= "<a href='"+value+"'>" + text.replace( new RegExp( regex , "gi" ), termTemplate )+"</a>";

            return $( "<li></li>" ).data( "item.autocomplete", item ).append( text ).appendTo( ul );
        },
        _renderHeader: function( ul, text ) {
            return $( "<li></li>" ).append( "<a href=''>"+text+"</a>" ).appendTo( ul );
        }
    });
})(jQuery);
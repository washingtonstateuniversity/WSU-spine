/** intended usage is 
 *	$.spine({
 *		"option":"value"
 *	});
**/
;(function ( $, window, document, undefined ) {
	var SPINE = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
	};
	
	SPINE.prototype = {
		defaults: {
			message: 'Hello world!'
		},
		init: function() {
            
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			
			this.displayMessage();
			
			return this;
		},
		displayMessage: function() {
			alert(this.config.message);
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
        }	
	}
	
	SPINE.defaults = SPINE.prototype.defaults;
	
	$.spine = function(options) {
        //we are going to prep for the day we move to correction to the dom
        var targ = this.jquery===undefined ? $(window) : this;
		return $.each(targ,function() {
			new SPINE(this, options).init();
		});
	};
	
	window.SPINE = SPINE;
})( jQuery, window, document );
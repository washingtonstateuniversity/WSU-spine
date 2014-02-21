 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {        
        search_init: function(options) {
            //alert('init search');
            //alert("this.search_options==>"+dump(this.search_options));
            $.extend(this.search_options,options);
            //alert("options==>"+dump(this.search_options));
            this._set_globals(this.search_globals);
            this.create_search();
        },
        
        search_options:{
            providers:{
                local:{
                    url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                    dataType: "jsonp",
                    featureClass: "P",
                    style: "full",
                    maxRows: 12
                } 
            },
            result:{
                appendTo: "#spine-shortcuts",
                showRelated:false,
                relatedHeader:"<hr/>",
                minLength: 2, 
                template:"<li>%s</li>"
            }
        },
        search_globals: {
            'wsu_search': $('#wsu-search'),
        },
        create_search: function(){
            var self=this;//hold to preserve scop
            var wsu_search = self._get_globals('wsu_search').refresh();
            if (!wsu_search.length) {
                var tabhtml  = '<section id="wsu-search" class="spine-search tools closed" data-default="site-search">';
                    tabhtml += '		<form id="default-search">';
                    tabhtml += '			<input name="term" type="text" value="" placeholder="search">';
                    tabhtml += '			<button>Submit</button>';
                    tabhtml += '		</form>';
                    tabhtml += '		<div id="spine-shortcuts"></div>';
                    tabhtml += '</section>';
                this.setup_tabs("search",tabhtml);
                this.setup_search();
            }   
        },

        start_tab:function(){
        
        },
        
        setup_search: function (jObj, options){
            var self=this;//hold to preserve scop
            var wsu_search = self._get_globals('wsu_search').refresh();
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
            
            $("#wsu-search form").submit( function() {
                var scope = wsu_search.attr('data-default');
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
            
            
        },
        
	});
} (jQuery) );
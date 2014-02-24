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
                nav:{
                    name:"From Navigation",
                    nodes: $("#spine nav"),
                    dataType: "html",
                    maxRows: 12,
                },
                atoz:{
                    name:"WSU A to Z index",
                    url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                    dataType: "jsonp",
                    featureClass: "P",
                    style: "full",
                    maxRows: 12,
                    minLength: 2,
                    termTemplate:"<strong><%this.term%></strong>",
                    resultTemplate:""
                }
            },
            serach:{
                minLength: 2,
                maxRows: 12,
                appendTo: "#spine-shortcuts",
                showRelated:true,
                tabTemplate: '<section id="wsu-search" class="spine-search tools closed" data-default="site-search">'
                    +'		<form id="default-search">'
                    +'			<input name="term" type="text" value="" placeholder="search">'
                    +'			<button>Submit</button>'
                    +'		</form>'
                    +'		<div id="spine-shortcuts"></div>'
                    +'</section>',
            },
            result:{
                appendTo: "#spine-shortcuts",
                showRelated:false,
                relatedHeader:"<b class='related_sep'>Related</b><hr/>",
                providerHeader:"<b class='provider_header'><%this.provider_name%></b><hr/>",
                termTemplate:"<b><%this.term%></b>",
                template:"<li><%this.searchitem%></li>"
            } 
        },
        search_globals: {
            'wsu_search': $('#wsu-search'),
        },
        create_search: function(){
            var self=this;//hold to preserve scop
            var wsu_search = self._get_globals('wsu_search').refresh();
            if (!wsu_search.length) {
                var tabhtml = $.runTemplate(self.search_options.search.tabTemplate,{});
                this.setup_tabs("search",tabhtml);
                this.setup_search();
            }   
        },

        start_tab:function(){
        
        },

        run_query:function(term,provider){
            var result = [];
            if(typeof(provider.url)!="undefined"){
                $.ajax({
                    url: provider.url,
                    dataType: provider.dataType,
                    data: {
                        featureClass: provider.featureClass,
                        style: provider.style,
                        maxRows: provider.maxRows,
                        name_startsWith: term
                    },
                    success: function( data, status, xhr  ) {
                        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
                        result = $.map( data, function( item ) {
                            var text = item.label;
                            if ( (item.value && ( !term || matcher.test(text)) || item.related == "true" ) ){
                                return {
                                    label: item.label,
                                    value: item.value,
                                    searchKeywords: item.searchKeywords,
                                    related: item.related
                                };
                            }
                        });
                       
                    }
                });
            }else{
                
            }
            return result;
        },
/*
                termTemplate:"<strong><%this.term%></strong>",
                this.options.relatedHeader
*/
        
        setup_search: function (){
            var self=this;//hold to preserve scop
            var wsu_search = self._get_globals('wsu_search').refresh();
            /* Search autocomplete */
            var cur_search = "";
            var termTemplate = "<strong>%s</strong>";
            var term = "";
            $( "#wsu-search input[type=text]" ).autosearch({
                source: function( request, response ) {
                    term = request.term;
                    var responseData=[];
                    $.each(self.search_options.providers, function(i,provider){
                        var proData=self.run_query(term,provider);
                        if(proData!==undefined)responseData=$.merge(responseData,proData);
                    });
                    alert(dump(responseData));
                    return responseData;
                },
                search: function(event, ui) {
                    /**/
                },
                appendTo:self.search_options.serach.appendTo,
                showRelated:self.search_options.serach.showRelated,
                relatedHeader:self.search_options.result.relatedHeader,
                minLength:self.search_options.serach.minLength,
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
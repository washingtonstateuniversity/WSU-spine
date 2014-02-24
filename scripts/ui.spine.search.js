 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
/*jshint multistr: true */
( function($) {
	"use strict";
	$.extend($.ui.spine.prototype, {        
        search_init: function(options) {
            //alert('init search');
            //alert("this.search_options==>"+dump(this.search_options));
            $.extend(options,self.search_options,options);
            //alert("options==>"+dump(this.search_options));
            this._set_globals(this.search_globals);
            this.create_search();
        },
        
        search_options:{
            data:[],
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
                    termTemplate:"<strong><%this.term%></strong>",
                    resultTemplate:""
                }
            },
            search:{
                minLength: 2,
                maxRows: 12,
                getRelated:true,
                tabTemplate: "<section id='wsu-search' class='spine-search tools closed' data-default='site-search'> \
                                <form id='default-search'> \
                                    <input name='term' type='text' value='' placeholder='search'> \
                                    <button>Submit</button> \
                                </form> \
                                <div id='spine-shortcuts'></div> \
                            </section>",
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
            'search_input':$( "#wsu-search input[type=text]" )
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

        start_search:function(){
            var self=this;//hold to preserve scop
            var wsu_search = self._get_globals('wsu_search').refresh();
            var search_input = self._get_globals('search_input').refresh();
            var term = wsu_search.find('input').val();
            var queries = Array();
            self.search_options.data=[];
            $.each(self.search_options.providers, function(i,provider){
                $.ui.autocomplete.prototype.options.termTemplate = (typeof(provider.termTemplate) !== undefined && provider.termTemplate !== "") ? provider.termTemplate : undefined;
                queries.push(self.run_query(term,provider));
            });
            //$.whenAll(queries)
            var defer=$.when.apply($, queries).then(
            function(){
                return self.search_options.data;
            });
            
        },

        run_query:function(term,provider){
            var self=this;//hold to preserve scop
            var search_input = self._get_globals('search_input').refresh();
            var result = [];

            if(typeof(provider)!==undefined && typeof(provider.url)!==undefined && provider.nodes===undefined){
                $.ajax({
                    url: provider.url,
                    dataType: provider.dataType,
                    data: {
                        featureClass: provider.featureClass,
                        style: provider.style,
                        maxRows: provider.maxRows,
                        name_startsWith: term,
                        related:self.search_options.search.getRelated
                    },
                    success:function(data){
                        var proData=self.setup_result_obj(term,data);
                        $.merge(self.search_options.data,proData);
                    }
                });
            }else{
                //self.search_options.data.push(result);
            }
        },

        format_result_text:function(term,text,value){
            var self=this;//hold to preserve scop
            var termTemplate = typeof($.ui.autocomplete.prototype.options.termTemplate)!==undefined ? $.ui.autocomplete.prototype.options.termTemplate : "<strong>$1</strong>";

            var regex	= "(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(term) + ")(?![^<>]*>)(?![^&;]+;)";
                text	= "<a href='"+value+"'>" + text.replace( new RegExp( regex , "gi" ), termTemplate )+"</a>";
            return text;
        },
        
        setup_result_obj:function(term,data){
            var self=this;//hold to preserve scop
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
            return $.map( data, function( item ) {
                var text = item.label;
                var value	= item.value;
                if ( (item.value && ( !term || matcher.test(text)) || item.related == "true" ) ){
                    text = self.format_result_text(term,text,value);
                    var resultObj = {
                        label: text,
                        value: item.value,
                        searchKeywords: item.searchKeywords,
                        related: item.related
                    };
                    return resultObj;
                }
            });
        },        

        setup_search: function (){
            var self=this;//hold to preserve scop
            var wsu_search = self._get_globals('wsu_search').refresh();
            var search_input = self._get_globals('search_input').refresh();

            /* Search autocomplete */
            var cur_search = "";
            var term = "";
            var data=self.search_options.data;
            
            search_input.bind( "keydown", function( event ) {
                if ( event.keyCode === $.ui.keyCode.TAB && $( this ).data( "ui-autocomplete" ).menu.active ) {
                    event.preventDefault();
                }
            }).autosearch({
                
                appendTo :              self.search_options.result.appendTo,
                showRelated :           self.search_options.result.showRelated,
                relatedHeader :         self.search_options.result.relatedHeader,
                minLength :             self.search_options.search.minLength,
                
                source: function( request, response )  { response(self.start_search()) },
                select : function( e, ui ) {
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
                    search_input.autocomplete("close");
                },
                focus : function( event, ui ) {
                    // to come back later to
                    //$( "#wsu-search input#searchterm[type=text]" ).val( ui.item.label );
                    //return false;
                },
                open : function(e,ui) {
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
                var search_term = search_input.val();
                var search_url = 'http://search.wsu.edu/default.aspx?'+cx+'&'+cof+'&q='+search_term+site;
                window.location.href = search_url;
                return false;
            });
            
            
        },
        
	});
} (jQuery) );
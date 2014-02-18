(function($){
	"use strict";
	$(document).ready(function(){
        /*$.spine("search",{
                "providers":{
                    "local":{
                        url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                        dataType: "jsonp",
                        featureClass: "P",
                        style: "full",
                        maxRows: 12
                    } 
                },
                "result":{
                    appendTo: "#spine-shortcuts",
                    showRelated:true,
                    relatedHeader:"<hr/>",
                    minLength: 2,   
                }
            });
            */
        var siteoptions={};
        var options = $.extend({
                "search":{
                    "providers":{
                        "local":{
                            url: "http://search.wsu.edu/2013service/searchservice/search.asmx/AZSearch",
                            dataType: "jsonp",
                            featureClass: "P",
                            style: "full",
                            maxRows: 12
                        } 
                    },
                    "result":{
                        appendTo: "#spine-shortcuts",
                        showRelated:true,
                        relatedHeader:"<hr/>",
                        minLength: 2,   
                    }
                },
                "framework":{ },
                "social":{ },
                "analytics":{ }
            },
            $siteoptions
        );
        $.spine(options);
	});
})(jQuery);
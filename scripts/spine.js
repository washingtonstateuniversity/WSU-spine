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
                search:{
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
                        showRelated:true,
                        relatedHeader:"<hr/>",
                        minLength: 2, 
                        template:"<li>%s</li>"
                    }
                },
                framework:{
                    equalizer_filter:".skip*"
                },
                social:{
                    provider:"WSU_share",
                    script_url:"//repo.wsu.edu/wsu_share/1/",
                    channels:[
                        "facebook",
                        "twitter",
                        "Pintrest"
                    ]
                },
                analytics:{ 
                    "google":{
                        analytics:{
                            "account_id":"UA-XXXXX-XX"
                        },
                        verification:"XXXXXXXXXXXXXXXXXXXXX"
                    },
                    "bing":{
                        verification:"XXXXXXXXXXXXXXXXXXXXX"
                    }
                }
            },
            siteoptions
        );
        $.spine(options);
	});
})(jQuery);
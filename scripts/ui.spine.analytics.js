 /*!
 *
 * Depends:
 *		jquery.ui.spine.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        analytics_init: function(options) {
            //alert('init analytics');
            //alert("options==>"+dump(options));
            $.extend(this.analytics_options,options);
            //alert("options==>"+dump(this.analytics_options));
            this.analytics_create();
        },
        analytics_options:{ 
            "google":{
                analytics:{
                    "account_id":"UA-XXXXX-XX",
                    "url":"wsu.edu",
                    "load":false,
                    "domainName":false,
                    "cookiePath":false,
                    "trackrule":false
                },
                verification:"XXXXXXXXXXXXXXXXXXXXX"
            },
            "bing":{
                verification:"XXXXXXXXXXXXXXXXXXXXX"
            }
        },
        buildpackage:function(){
            var scriptArray = [ 
                {
                    src:"//images.wsu.edu/javascripts/jquery.jTrack.0.2.1.js",
                    exc:function(){
                        var url = document.getElementById('tracker_agent').src;
                        var GAcode = param("gacode", url );
                        var _load  = param("loading", url );
                        var _DN    = param("domainName", url );
                        var _CP    = param("cookiePath", url );

                        var url='//images.wsu.edu/javascripts/tracking/configs/pick.asp';
                        $.getJSON(url+'?callback=?'+(_load!=false?'&loading='+_load:''), function(data){
                            $.jtrack.defaults.debug.run = false;
                            $.jtrack.defaults.debug.v_console = false;
                            $.jtrack.defaults.debug.console = true;
                            $.jtrack({ 
                                load_analytics:{
                                    account:GAcode
                                },
                                options:$.extend({},(_DN!=false?{'domainName':_DN}:{}),(_CP!=false?{'cookiePath':_CP}:{})), trackevents:data });
                        });
                    }
                }
            ];
            $.extend(self.analytics_options,scriptArray);
        },
        analytics_create: function(){
            var self=this;//hold to preserve scope
            var scriptArray = self.analytics_options.scriptArray;
            jQuery.each(scriptArray, function(i,v){
                jQuery.ajax({
                    type:"GET",dataType:"script",cache:true,url:v.src,
                    success: function() {v.exc();}
                });
            });
        }
        
        
        
	});
} (jQuery) );
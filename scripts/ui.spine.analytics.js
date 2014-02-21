 /*!
 *
 * Depends:
 *		jquery.ui.spine.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        analytics_init: function(options) {
            var self=this;//hold to preserve scope
            //alert('init analytics');
            //alert("options==>"+dump(options));
            $.extend(self.analytics_options,options);
            //alert("options==>"+dump(this.analytics_options));
            self.analytics_create();
        },
        analytics_options:{ 
            "google":{
                analytics:{
                    "account_id":"UA-XXXXX-XX",
                    "url":"wsu.edu",
                    "load_reporule":false,
                    "domainName":false,
                    "cookiePath":false,
                    "trackrule":false,
                    "debug":{
                        run: false,
                        v_console: false,
                        console: true,
                    }
                },
                verification:"XXXXXXXXXXXXXXXXXXXXX"
            },
            "bing":{
                verification:"XXXXXXXXXXXXXXXXXXXXX"
            }
        },
        buildpackage:function(){
            var self=this;//hold to preserve scope
            var scriptArray = {
                scriptArray:[ 
                {
                    src:('https:' == document.location.protocol ? 'https://' : 'http://') + "images.wsu.edu/javascripts/jquery.jTrack.0.2.1.js",
                    exc:function(){
                        var _load  = self.analytics_options.google.analytics.load_reporule;
                        var trackingrules = self.analytics_options.google.analytics.trackrule || {} ;
                        var loaded="";
                        if(_load!==false){
                            loaded='loading='+_load;
                        }
                        if(self.analytics_options.google.analytics.trackrule===false||_load!==false){
                            var url='//images.wsu.edu/javascripts/tracking/configs/pick.asp';
                            $.getJSON(url+'?callback=?'+loaded, function(rules){
                               $.extend(trackingrules,rules);
                            });
                        }
                        self.run_tracker(trackingrules);
                    }
                }
            ]};
            $.extend(self.analytics_options,scriptArray);
        },
        analytics_create: function(){
            var self=this;//hold to preserve scope
            self.buildpackage();
            var scriptArray = self.analytics_options.scriptArray;
            $.each(scriptArray, function(i,v){
                $.ajax({
                    type:"GET",dataType:"script",cache:true,url:v.src,
                    success: function() {v.exc();}
                });
            });
        },
        run_tracker:function(rules){
            var self=this;//hold to preserve scope
            var _DN    = self.analytics_options.google.analytics.domainName;
            var _CP    = self.analytics_options.google.analytics.cookiePath;
            $.extend($.jtrack.defaults.debug,self.analytics_options.google.analytics.debug);
            $.jtrack({ 
                load_analytics:{
                    account:self.analytics_options.google.analytics.account_id
                },
                options:$.extend({},(_DN!==false?{'domainName':_DN}:{}),(_CP!==false?{'cookiePath':_CP}:{})),
                trackevents:rules 
            });
        }
        
        
	});
} (jQuery) );
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
                    "account_id":"UA-XXXXX-XX"
                },
                verification:"XXXXXXXXXXXXXXXXXXXXX"
            },
            "bing":{
                verification:"XXXXXXXXXXXXXXXXXXXXX"
            }
        },
        analytics_create: function(){}
	});
} (jQuery) );
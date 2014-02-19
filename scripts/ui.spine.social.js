 /*!
 *
 * Depends:
 *		jquery.ui.spine.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        social_init: function(options) {
            //alert('init social');
            //alert("options==>"+dump(options));
            $.extend(this.social_options,options);
            //alert("options==>"+dump(this.social_options));
            this.social_create();
        },
        social_options:{
            provider:"WSU_share",
            script_url:"//repo.wsu.edu/wsu_share/1/",
            channels:[
                "facebook",
                "twitter",
                "Pintrest"
            ]
        },
        social_create: function(){}
	});
} (jQuery) );
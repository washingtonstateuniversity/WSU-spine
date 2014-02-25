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
            this._set_globals(this.social_globals);
            this.social_create();
        },
        social_options:{
            provider:"WSU_share",
            script_url:"//repo.wsu.edu/wsu_share/1/",
            channels:[
                "facebook",
                "twitter",
                "Pintrest"
            ],
            share_text:"You should know ..."
        },
        social_globals: {
            'share_block': $('#wsu-share')
        },
        social_create: function(){
            var self=this;//hold to preserve scope
            var share_block = self._get_globals('share_block').refresh();
            if (!share_block.length) {
                var share_text = encodeURIComponent(this.social_options.share_text);
                var current_url = self._get_globals('current_url');
                var wsu_actions = self._get_globals('wsu_actions').refresh();
                var sharehtml  = '<section id="wsu-share" class="spine-share tools closed">';
                    sharehtml += '	<ul>';
                    sharehtml += '		<li class="by-facebook"><a href="http://www.facebook.com/sharer/sharer.php?u='+current_url+'">Facebook</a></li>';
                    sharehtml += '		<li class="by-twitter"><a href="https://twitter.com/intent/tweet?text='+share_text+'&url='+current_url+'&via=wsupullman" target="_blank">Twitter</a></li>';
                    sharehtml += '		<li class="by-email"><a href="mailto:?subject='+share_text+'&body='+current_url+'">Email</a></li>';
                    sharehtml += '	</ul>';
                    sharehtml += '</section>';
                self.setup_tabs("share",sharehtml);
            } // End Share Generation
        }
	});
} (jQuery) );
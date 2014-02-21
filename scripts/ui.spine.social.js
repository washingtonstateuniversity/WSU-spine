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
            ]
        },
        social_globals: {
            'share_block': $('#wsu-share')
        },
        social_create: function(){
            var self=this;//hold to preserve scope
            var current_url = self._get_globals('current_url');
            var wsu_actions = self._get_globals('wsu_actions').refresh();
            var $wsu_share = $('#wsu-share');
    
            // Section -> Share
            // Just getting started on rolling our own... more to come.
            if (!$wsu_share.length) {
                var share_text = "";
            if ($('meta.share-text').length) /* Need a better name */ { share_text = $('meta.share-text'); } else { share_text = "You should know ..."; }
            var share  = '<section id="wsu-share" class="spine-share tools closed">';
                share += '	<ul>';
                share += '		<li class="by-facebook"><a href="http://www.facebook.com/sharer/sharer.php?u='+current_url+'">Facebook</a></li>';
                share += '		<li class="by-twitter"><a href="https://twitter.com/intent/tweet?text='+share_text+'&url='+current_url+'&via=wsupullman" target="_blank">Twitter</a></li>';
                share += '		<li class="by-email"><a href="mailto:?subject='+share_text+'&body='+current_url+'">Email</a></li>';
                share += '		<!--<li class="by-gmail"><a href="https://plusone.google.com/_/+1/confirm?hl=en&url='+current_url+'">Google+</a></li>-->';
                share += '		<!--<li class="by-linkedin"><a href="http://www.linkedin.com/shareArticle?mini=true&url='+current_url+'&title=articleTitle&summary=articleSummary&source=articleSource">LinkedIn</a></li>-->';
                share += '		<!--<li class="by-pinterest"><a href="http://pinterest.com/pin/create/button/?url=""title="Pinterest">Pinterest</a></li>-->';
                share += '	</ul>';
                share += '</section>';
    
                wsu_actions.append(share);
            } // End Share Generation
        
            self.setup_tabs("share");
        
        }
	});
} (jQuery) );
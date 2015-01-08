/*!
*
* Depends:
*		jquery.ui.spine.js
*/
/*jshint multistr: true */
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
			share_text:"You should know ...",
			twitter_text:"You should know...",
			twitter_handle:"wsupullman"
		},
		social_globals: {
			share_block: $("#wsu-share")
		},
		social_create: function(){
			var self, share_block, share_text, current_url, wsu_actions, sharehtml, twitter_text, twitter_handle;
			self=this;//hold to preserve scope
			share_block = self._get_globals("share_block").refresh();
			if (!share_block.length) {
				share_text = encodeURIComponent(this.social_options.share_text);
				twitter_text = encodeURIComponent(this.social_options.twitter_text);
				twitter_handle = encodeURIComponent(this.social_options.twitter_handle);
				current_url = self._get_globals("current_url");
				wsu_actions = self._get_globals("wsu_actions").refresh();
				sharehtml  = "<section id='wsu-share' class='spine-share spine-action closed'> \
									<ul> \
										<li class='by-facebook'><a href='http://www.facebook.com/sharer/sharer.php?u="+current_url+"'>Facebook</a></li> \
										<li class='by-twitter'><a href='https://twitter.com/intent/tweet?text="+twitter_text+"&url="+current_url+"&via="+twitter_handle+"' target='_blank'>Twitter</a></li> \
										<li class='by-email'><a href='mailto:?subject="+share_text+"&body="+current_url+"'>Email</a></li> \
									</ul> \
									</section>";
				self.setup_tabs("share",sharehtml);
			} // End Share Generation
		}
	});
} (jQuery) );
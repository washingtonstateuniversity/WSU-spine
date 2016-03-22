/*!
*
* Depends:
*		jquery.ui.spine.js
*/
/*jshint multistr: true */
( function( $ ) {
	$.extend( $.ui.spine.prototype, {
		social_init: function( options ) {
			$.extend( this.social_options, options );

			this._set_globals( this.social_globals );
			this.social_create();
		},
		/**
		 * These default options can be overridden with an object before
		 * the Spine framework is started and with `$('body').spine( spineoptions )`.
		 *
		 * NOTE: The structure of these social options **will** change and could be
		 * deprecated in a future release. Please communicate via the WSU Spine repository
		 * when using these so that we can reach out before a transition in the future.
		 *
		 * https://github.com/washingtonstateuniversity/WSU-spine/issues/230
		 */
		social_options:{
			share_text:"You should know ...",
			twitter_text:"You should know...",
			twitter_handle:"wsupullman",
			linkedin_source:"wsu.edu"
		},
		social_globals: {
			share_block: $( "#wsu-share" )
		},
		social_create: function() {
			var self, share_block, share_text, current_url, wsu_actions, sharehtml, twitter_text, twitter_handle, linkedin_source;
			self = this;//Hold to preserve scope
			share_block = self._get_globals( "share_block" ).refresh();
			if ( !share_block.length ) {
				share_text = encodeURIComponent( this.social_options.share_text );
				twitter_text = encodeURIComponent( this.social_options.twitter_text );
				twitter_handle = encodeURIComponent( this.social_options.twitter_handle );
				current_url = self._get_globals( "current_url" );
				wsu_actions = self._get_globals( "wsu_actions" ).refresh();

				sharehtml  = "<section id='wsu-share' class='spine-share spine-action closed'>";
				sharehtml += "<ul>";
				sharehtml += "<li class='by-facebook'><a href='https://www.facebook.com/sharer/sharer.php?u=" + current_url + "'>Facebook</a></li>";
				sharehtml += "<li class='by-twitter'><a href='https://twitter.com/intent/tweet?text=" + twitter_text + "&url=" + current_url + "&via=" + twitter_handle + "' target='_blank'>Twitter</a></li>";
				sharehtml += "<li class='by-googleplus'><a href='https://plus.google.com/share?url=" + current_url + "'>Google+</a></li>";
				sharehtml += "<li class='by-linkedin'><a href='https://www.linkedin.com/shareArticle?mini=true&url=" + current_url + "&summary=" + share_text + "&source=" + linkedin_source + "' target='_blank'>Linkedin</a></li>";
				sharehtml += "<li class='by-email'><a href='mailto:?subject=" + share_text + "&body=" + current_url + "'>Email</a></li>";
				sharehtml += "</ul>";
				sharehtml += "</section>";

				self.setup_tabs( "share", sharehtml );
			} // End Share Generation
		}
	} );
}( jQuery ) );

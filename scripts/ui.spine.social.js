 /*!
 *
 * Depends:
 *		jquery.ui.spine.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        social_init: function(options) {
            alert('init social');
            alert("options==>"+dump(options));
        },
	});
} (jQuery) );
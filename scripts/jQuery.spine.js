/** intended usage is 
 *	$.spine({
 *		"option":"value"
 *	});
**/
;(function ( $, window, document, undefined ) {
	var SPINE = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
	};
	
	SPINE.prototype = {
		defaults: {
			message: 'Hello world!'
		},
		init: function() {
            
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			
			this.displayMessage();
			
			return this;
		},
		displayMessage: function() {
			alert(this.config.message);
		}
	}
	
	SPINE.defaults = SPINE.prototype.defaults;
	
	$.spine = function(options) {
        //we are going to prep for the day we move to correction to the dom
        var targ = this.jquery===undefined ? $(window) : this;
		return $.each(targ,function() {
			new SPINE(this, options).init();
		});
	};
	
	window.SPINE = SPINE;
})( jQuery, window, document );
( function( $ ) {
	"use strict";
	$( document ).ready( function() {
		$( "html" ).removeClass( "no-js" ).addClass( "js" );
		var spineoptions = window.spineoptions || {};
		$.spine( spineoptions );
	} );
} )( jQuery );

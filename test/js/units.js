/* global alert */
var native = window.alert;

window.alert = function(){
    console.log("alerting...");
    native.apply(window, arguments);
    console.log("alerted!");
};

(function($){
	"use strict";
	$(document).ready(function(){
		alert("ready to test");
	});
})(jQuery);
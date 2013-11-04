var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src.split('?')[0];
var spine_dir = path.split('/').slice(0, -1).join('/')+'/';
var modernizr = spine_dir + '2014/scripts/modernizr/modernizr.custom.64252.js';
var spine_scripts = spine_dir + '2014/scripts/scripts.js';

$.when(
    $.getScript( "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" ),
    $.getScript( modernizr ),
    $.getScript( spine_scripts ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
	
    // we might need this at some point

});
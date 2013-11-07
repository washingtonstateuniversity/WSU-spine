$.when(
    $.getScript( "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" ),
    $.getScript( "http://images.wsu.edu/spine/1/2014/scripts/modernizr/modernizr.custom.64252.js" ),
    $.getScript( "http://nbj.me/spine/1/2014/scripts/scripts.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

    //place your code here, the scripts are all loaded

});
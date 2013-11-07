$("#shelve").click(function() {
	$('#spine').toggleClass('unshelved shelved');
	});



// Tools tabs

$(document).ready(function(){
function printPage(){
    window.print();
}
$("#wsu-tab-share button").click(function() {
	$('#wsu-actions *.opened,#wsu-share,#wsu-tab-share').toggleClass('opened closed');
	});
$("#wsu-tab-print .print-button button").click(function() {
	$('#wsu-actions *.opened').toggleClass('opened closed');
	$('html').toggleClass('print');
	setTimeout(function(){ printPage()},400);
	});
$("#wsu-tab-search button").click(function() {
	$('#wsu-actions *.opened,#wsu-search,#wsu-tab-search').toggleClass('opened closed');
	$('#spine section#wsu-search input').focus();
	});
$("#wsu-tab-contact button").click(function() {
	$('#wsu-actions *.opened,#wsu-contact,#wsu-tab-contact').toggleClass('opened closed');
	});	

// Shut (ie close) a tool section
$("button.shut").click(function() {
	$('#wsu-actions').find('.opened').toggleClass('opened closed');
	});

// Submit search
$("button#submit-search").click(function() {
	$('#results').show();
	return false;
	});	
	
});

$("#print-invoke").click(function() { window.print(); });
$("#print-cancel").click(function() { $('html').toggleClass('print'); });




// Fixed Horizontal Header

$(document).scroll(function() {
var top = $(document).scrollTop();
	if (top > 50) { $('#spine').not('.unshelved').addClass('scanned'); }
	else { $('#spine').removeClass('scanned'); } 
});



// Couplets

$(document).ready(function() {
	$("#spine:not(.test) nav ul,#spine:not(.test) ul").parents("li").addClass("parent");
	$("#spine:not(.test) nav li[class*=current],:not(.test) nav li[class*=active]").addClass("active").parents("li").addClass("active");
	$("#spine:not(.test) .active").not(":has(.active)").addClass("dogeared");
}); 



$(document).ready(function(){

$("#spine:not(.test) li.parent > a").click(function(e) { 
	e.preventDefault();
	$(this).parent("li").siblings().removeClass("opened");
	$(this).parent("li").toggleClass("opened");
  });
$("#spine:not(.test) li.parent > a").each( function() {
	
	var title = 'Overview';
	if ($(this).attr('title')) {
		var alt = $(this).attr('title').length;
		if ( alt > 0 ) {
		title = $(this).attr('title');
		}
		}
	var url = $(this).attr("href");
	if ( url != '#' ) {
		$(this).parent("li").children("ul").prepend('<li class="overview"><a href="'  + url +  '">' + title + '</a></li>');
	}
})
});




// Clicking Outside Spine Closes It
$(document).ready(function(){
	$(".tabs li button,.tabs li a").click(function() {
	$(this).parent('li').siblings('.active').toggleClass('active inactive'); $(this).parent('li').addClass('active');
	});
});



// Clicking Outside Spine Closes It
$(document).on('mouseup touchstart', function (e) {
    var container = $("#spine.unshelved");
    if (container.has(e.target).length === 0)
    { container.toggleClass('shelved unshelved'); }
});



// Cracking the Spine for Short Windows
$(window).on('load resize scroll mouseup touchend',function() {
	var windowHeight = window.innerHeight - 110;
	var spineHeight = $("#glue").height();
	if ( windowHeight < spineHeight ) {
		$("#spine").removeClass("uncracked").addClass("cracked");
	} else { 
		$("#spine").removeClass("cracked").addClass("uncracked");
	};
});



// Moving the Spine for Short Windows
$(document).scroll(function() {
	var windowHeight = window.innerHeight;
	var top = $(document).scrollTop();
	var spineHeight = $("#glue").height();
	var crack = spineHeight - windowHeight;
	if ( top > crack ) { $('#spine.cracked').addClass('pinned'); }
	else { $('#spine.cracked').removeClass('pinned'); }
});



// AZ Index Shortcuts

(function($) {
  /** Plugin Main Function */
  $.fn.livefilter = function(action, opts) {
    if (typeof action === "undefined") {
      action = "init";
    }
    if (typeof action === "object") {
      opts = action;
      action = "init";
    }
    if (action === "init") {
      opts = $.extend({}, $.fn.livefilter.defaults, opts);
      $(this).data("lf-data", opts);
      $(this).unbind(".livefilter").bind("keyup.livefilter", $.fn.livefilter.onKey(opts));
    } else if (action === "destroy") {
      opts = $(this).data("lf-data");
      $(opts.selector).filter("." + opts.hiddenClass)[opts.showFn]();
      $(this).unbind(".livefilter");
    } else {
      log("action unknown", action);
    }
    return $(this);
  };

  /** keyup event action */
  $.fn.livefilter.onKey = function(opts) {
    var rv = function() {
      var v = $(this).val();
      log("filtering", v);
      if (v) {
        $(opts.selector).filter(":icontains(" + v + ")")[opts.showFn]().removeClass(opts.hiddenClass).end().filter(":not(:icontains(" + v + "))")[opts.hideFn]().addClass(opts.hiddenClass);
      } else {
        $(opts.selector).removeClass(opts.hiddenClass)[opts.showFn]();
      }
    };
    if (opts.debounce) {
      log("debounce active", opts.debounce);
      rv = $.fn.livefilter.debounce(rv, opts.debounce);
    }
    return rv;
  };

  /** Delay execution of too frequent tasks*/
  $.fn.livefilter.debounce = function(func, threshold) {
    var timeout;
    return function debounced() {
      var obj = this, args = arguments;
      function delayed() {
        func.apply(obj, args);
        timeout = null;
      }
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  /** Case insensitive :contains jQuery pseudo selector */
  $.expr[":"].icontains = function(obj, index, meta, stack) {
    return (obj.textContent || obj.innerText || jQuery(obj).text() || "").toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
  };

  var log=function(){
    if (typeof console!=='undefined' && console.log){
      console.log(Array.prototype.slice.call(arguments).join(', '));
    }
  };

  /** Plugin global defaults */
  $.fn.livefilter.defaults = {
    selector: "menu li",
    debounce: 500,

    hiddenClass: "filtered",
    showFn: "show",
    hideFn: "hide"
  };
})(jQuery);

// Start Filtering

$(document).ready(function(){

$('nav#site li a').clone().prependTo("#indices").wrap('<li>');
	$('#wsu-search input').livefilter({selector:'#indices li'});
	$('#wsu-keywords input').livefilter({selector:'#indices li'});

$("#wsu-search input[type=text]").keyup(function(){
	var i = $("#wsu-search input[type=text]").val().length;
	if (i >= 3) {
		$("#wsu-search menu").show();
	} else {
		$("#wsu-search menu").hide();
	}
});
});




// Equalize Columns

$(document).ready(function(){
	$('.row:not(".unequaled")').each(function(){  
	    var highestBox = 0;
	    $('.column', this).each(function(){
	        if($(this).height() > highestBox) 
	           highestBox = $(this).height(); 
	    });  
	    $('.column',this).not('.unequaled').css('min-height',highestBox);
	});
});



// External Links in nav

$('nav#site a').filter(function() {
   return this.hostname && this.hostname !== location.hostname;
}).addClass("external");






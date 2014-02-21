 /*!
 *
 * Depends:
 *		jquery.ui.v.js
 */
( function($) {
	$.extend($.ui.spine.prototype, {
        framework_init: function(options) {
            //alert('init framework');
            //alert("options==>"+dump(options));
            $.extend(this.framework_options,options);
            //alert("options==>"+dump(this.framework_options));
            this.framework_create();
        },
        framework_options:{
            equalizer_filter:".skip*"
        },
        framework_create: function(){
            //alert('framework_create');
            var self=this;
            // Cache the wsu-actions selector
            
            var $current_url = window.location.href;
            var $wsu_actions = $('#wsu-actions');
    
            // Cache the spine selector.
            var $spine = $('#spine');
    
            // Cache Spine sections selectors.
            var $wsu_search = $('#wsu-search');
            var $wsu_contact = $('#wsu-contact');
            var $wsu_share = $('#wsu-share');
    
            // Section -> Share
            // Just getting started on rolling our own... more to come.
            if (!$wsu_share.length) {
                var share_text = "";
            if ($('meta.share-text').length) /* Need a better name */ { share_text = $('meta.share-text'); } else { share_text = "You should know ..."; }
            var share  = '<section id="wsu-share" class="spine-share tools closed">';
                share += '	<ul>';
                share += '		<li class="by-facebook"><a href="http://www.facebook.com/sharer/sharer.php?u='+$current_url+'">Facebook</a></li>';
                share += '		<li class="by-twitter"><a href="https://twitter.com/intent/tweet?text='+share_text+'&url='+$current_url+'&via=wsupullman" target="_blank">Twitter</a></li>';
                share += '		<li class="by-email"><a href="mailto:?subject='+share_text+'&body='+$current_url+'">Email</a></li>';
                share += '		<!--<li class="by-gmail"><a href="https://plusone.google.com/_/+1/confirm?hl=en&url='+$current_url+'">Google+</a></li>-->';
                share += '		<!--<li class="by-linkedin"><a href="http://www.linkedin.com/shareArticle?mini=true&url='+$current_url+'&title=articleTitle&summary=articleSummary&source=articleSource">LinkedIn</a></li>-->';
                share += '		<!--<li class="by-pinterest"><a href="http://pinterest.com/pin/create/button/?url=""title="Pinterest">Pinterest</a></li>-->';
                share += '	</ul>';
                share += '</section>';
    
                $wsu_actions.append(share);
            } // End Share Generation
    
            // Section -> Contact
            if (!$("#wsu-contact").length) {
    
                // Can we loop through instead and set these on the fly?
                var name = $('meta[itemprop="name"]').attr('content');
                var department = $('meta[itemprop="department"]').attr('content');
                var url = $('meta[itemprop="url"]').attr('content');
                var streetAddress = $('meta[itemprop="streetAddress"]').attr('content');
                var addressLocality = $('meta[itemprop="addressLocality"]').attr('content');
                var postalCode = $('meta[itemprop="postalCode"]').attr('content');
                var telephone = $('meta[itemprop="telephone"]').attr('content');
                var email = $('meta[itemprop="email"]').attr('content');
                var ContactPointTitle = $('meta[itemprop="ContactPoint"]').attr('title');
                var ContactPoint = $('meta[itemprop="ContactPoint"]').attr('content');
    
                // We'll get to building these from declarations in the template
                var contact  = '<section id="wsu-contact" class="spine-contact tools closed">';
                    // contact += '<button id="shut-contact" class="shut">Close</button>';
                    contact += '<address itemscope itemtype="http://schema.org/Organization" class="hcard">';
                    contact += '	<div class="organization-unit fn org"><a href="'+url+'" class="url">'+department+'</a></div>';
                    contact += '	<div class="organization-name">'+name+'</div>';
                    contact += '	<div class="address">';
                    contact += '		<div class="street-address">'+streetAddress+'</div>';
                    contact += '		<div class="locality">'+addressLocality+' <span class="postalcode">'+postalCode+'</span></div>';
                    contact += '	</div>';
                    contact += '	<div class="tel"><i class="wsu-icon"></i>'+telephone+'</div>';
                    contact += '	<div class="email" rel="email"><a href="mailto:'+email+'"><i class="wsu-icon"></i>Email us</a></div>';
    
                if (typeof ContactPoint != 'undefined') {
                    contact += '	<div class="more"><a href="'+ContactPoint+'"><i class="wsu-icon"></i>'+ContactPointTitle+'</a></div>';
                    }
    
                    contact += '</address>';
                    contact += '</section>';
    
                $wsu_actions.append(contact);
            } // End Contact Generation
    

    

            self.setup_nav();
            self.setup_tabs();
            self.setup_spine();
            $(window).on('resize', function(){  
                self.sizing();
                self.equalizing();
                self.mainheight();
                var $main = $('main');
                // Only run function if an unbound element exists
                if( $('.unbound').length || $('#binder.broken').length ) {
                    var spread = $(window).width();
                    var verso = $main.offset().left;
                    var page = $main.width();
                    var recto = spread - $main.offset().left;
                    var recto_margin = "";
                    if (recto >= page ) { recto_margin = recto - page; } else { recto_margin = 0; }
					/* Broken Binding */ if ($('#binder').hasClass('broken')) { $('main').css('width',recto); }
                    var verso_width = verso + $main.width();
                    $('.unbound.recto').css('width',recto).css('margin-right',-(recto_margin));
                    $('.unbound.verso').css('width',verso_width).css('margin-left',-(verso));
                    $('.unbound.verso.recto').css('width',spread);
                }
            }).trigger('resize');
        },
        // Label #jacket with current window size
        sizing: function (jacket) {
                jacket=jacket||$('#jacket');
                var current_width = $(window).width();
                if(current_width >= 1188) {
                    jacket.stripClass("size-").addClass('size-xlarge size-gt-small size-gt-smallish size-gt-medium size-gt-large');
                } else if(current_width >= 990) {
                    jacket.stripClass("size-").addClass('size-large size-lt-xlarge size-gt-small size-gt-smallish size-gt-medium');
                } else if(current_width < 990 && current_width >= 792) {
                    jacket.stripClass("size-").addClass('size-medium size-lt-xlarge size-lt-large size-gt-smallish size-gt-small');
                } else if((current_width >= 694 && current_width < 792) && ($('#binder').hasClass('fixed'))) {
                    jacket.stripClass("size-").addClass('size-smallish size-lt-medium size-lt-large size-lt-xlarge size-gt-small');
                } else if(current_width < 792) {
                    jacket.stripClass("size-").addClass('size-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
                } else if(current_width < 396) {
                    jacket.stripClass("size-").addClass('size-small size-lt-small size-lt-smallish size-lt-medium size-lt-large size-lt-xlarge');
                }
         },
        // Equalize Columns
        equalizing: function () {
            if( $('.equalize').length ) {
                var obj=$('.row.equalize');
                obj.find('.column').css('min-height','');
                $.each(obj,function(){
                    var tallestBox = 0;
                    $.each($('.column', this),function(){
                        if($(this).height() > tallestBox) {
                           tallestBox = $(this).outerHeight();
                        }
                    });
                    $('.column',this).not('.unequaled').css('min-height',tallestBox);
                    $('section.equalize .column',this).css('min-height','auto');
                });
            }
        },        
        mainheight: function () {
            var main_top = $('main').offset().top;
            var window_height = $(window).height();
            var main_height = window_height;
            if ($('#binder').hasClass('size-lt-large')) {
                main_height -= 50;
            }
            $('main.fill-window-height').css('min-height',main_height);
        },

        /**
         * Sets up framework html and other DOM attributes
         */
        setup_jacket: function(){
            
            
        },
        
        /**
         * Sets up framework html and other DOM attributes
         */
        setup_binder: function(){
            
            
        },
        
         /**
         * Sets up framework html and other DOM attributes
         */
        setup_content: function(){
            
            
        },       
        
        /**
         * Sets up the spine area
         */
        setup_spine: function(){
            // Cache the spine selector.
            var $spine = $('#spine');
            // Fixed/Sticky Horizontal Header
            $(document).scroll(function() {
                var top = $(document).scrollTop();
                if (top > 49) {
                    $spine.not('.unshelved').addClass('scanned');
                } else { 
                    $spine.removeClass('scanned');
                } 
            });
    

    
            // Clicking Outside Spine Closes It
            /* $(document).on('mouseup touchstart', function (e) {
                var container = $("#spine.unshelved");
                if (container.has(e.target).length === 0)
                { container.toggleClass('shelved unshelved'); }
            }); */
            $('main').on('click swipeleft', function() {
                if ( $spine.hasClass('unshelved') ) {
                    $spine.toggleClass('shelved unshelved');
                }
            });
    
            // Cracking the Spine for Short Windows
            $(window).on('load resize scroll mouseup touchend',function() {
                var footerHeight = $("#spine footer").height();
                var windowHeight = window.innerHeight - footerHeight - 50;
                var spineHeight = $("#glue").height();
                //$('main').prepend(footerHeight);
                if ( windowHeight < spineHeight ) {
                    $spine.removeClass("uncracked").addClass("cracked");
                } else { 
                    $spine.removeClass("cracked").addClass("uncracked");
                }
            });
    
            // Moving the Spine for Short Windows
            /* $(document).scroll(function() {
                var windowHeight = window.innerHeight;
                var top = $(document).scrollTop();
                var spineHeight = $("#glue").height();
                var crack = spineHeight - windowHeight;
                if ( top > crack ) { $('#spine.cracked').addClass('pinned'); }
                else { $('#spine.cracked').removeClass('pinned'); }
            }); */
    
            // Moving the Spine for Short Windows
            $(document).scroll(function() {
                var windowHeight = window.innerHeight;
                var top = $(document).scrollTop();
                var spineHeight = $("#glue").height();
                var crack = spineHeight - windowHeight;
                if ( top > crack ) {
                    $('#spine.cracked').addClass('scrolled');
                } else {
                    $('#spine.cracked').removeClass('scrolled');
                }
            }); 
    
            // Moving the Spine for Short Windows
            /*$(document).scroll(function() {
                var windowHeight = window.innerHeight;
                var top = $(document).scrollTop();
                var spineHeight = $("#glue").height();
                var crack = spineHeight - windowHeight;
                if ( top > crack ) {
                    var top_pos = -(top);
                    $('#spine.cracked').addClass('pinned');
                    $('#spine.cracked #glue').css('top',top_pos);
                } else {
                    $('#spine.cracked').removeClass('pinned');
                }
            });*/
        },
        
        
        /**
         * Sets up the tabs that will be able to be used by other extensions
         */
        setup_tabs: function(){
            // Tools tabs		
            $("#wsu-share-tab button").on("click",function(e) {
                e.preventDefault();
                $('#wsu-actions *.opened,#wsu-share,#wsu-share-tab').toggleClass('opened closed');
                });
            $("#wsu-search-tab button").on("click",function(e) {
                e.preventDefault();
                $('#wsu-actions *.opened,#wsu-search,#wsu-search-tab').toggleClass('opened closed');
                $('#spine section#wsu-search input').focus();
                });
            $("#wsu-contact-tab button").on("click",function(e) {
                e.preventDefault();
                $('#wsu-actions *.opened,#wsu-contact,#wsu-contact-tab').toggleClass('opened closed');
                });
            this.setup_printing();
        },
        
        /**
         * Sets up navagation system
         */
        setup_nav: function(){
            // NAVIGATION
            // Tag location and hierarchy
            $("#spine nav ul,#spine ul").parents("li").addClass("parent");
            $("#spine nav li[class*=current], nav li[class*=active]").addClass("active").parents("li").addClass("active");
            $("#spine nav li a[class*=current], nav li a[class*=active]").parents("li").addClass("active");
            $("#spine .active").not(":has(.active)").addClass("dogeared");
    
            // Disclosure
            $("#spine nav li.parent > a").on("click",function(e) { 
                e.preventDefault();
                $(this).parent("li").siblings().removeClass("opened");
                $(this).parent("li").toggleClass("opened");
            });
    
            // Couplets
            $("#spine nav li.parent > a").each( function() {
                var title = 'Overview';
                if ($(this).attr('title')) {
                    var alt = $(this).attr('title').length;
                    if ( alt > 0 ) { title = $(this).attr('title'); }
                }
                var classes = "overview";
                if ($(this).closest('.parent').hasClass('dogeared')) {
                    classes += " dogeared";
                }
                var url = $(this).attr("href");
                if ( url != '#' ) {
                    $(this).parent("li").children("ul").prepend('<li class="' + classes + '"><a href="'  + url +  '">' + title + '</a></li>');
                }
            });
            // External Links in nav
            // this shouldn't be done this way
            $('nav#spine-sitenav a').filter(function() {
               return this.hostname && this.hostname !== location.hostname;
            }).addClass("external");
        },
        
        setup_printing: function(){
            var $wsu_actions = $('#wsu-actions');
            var $spine = $('#spine');
            // Print & Print View
            var print_controls = '<span class="print-controls"><button id="print-invoke">Print</button><button id="print-cancel">Cancel</button></span>';
    
            function printPage(){
                window.print();
            }
    
            function print_cancel() {
                $('html').toggleClass('print');
                $('.print-controls').remove();
            }
    
            /* var print_timeout = setTimeout(function() { window.print(); }, 400); Cancel timeout? */
            function print(e) {
                if ( undefined !== e ) {
                    e.preventDefault();
                }
                $wsu_actions.find('.opened').toggleClass('opened closed');
                $('html').toggleClass('print');
                $spine.find('header').prepend(print_controls);
                $spine.find('.unshelved').removeClass('unshelved').addClass('shelved');
                $("#print-invoke").on("click",function() { window.print(); });
                $("#print-cancel").on("click",print_cancel);
                setTimeout(function() { printPage(); }, 400);
            }
            $("#wsu-print-tab button").click(print);
    
            // Shut a tool section
            $("button.shut").on("click",function(e) {
                e.preventDefault();
                $wsu_actions.find('.opened').toggleClass('opened closed');
            });
        }
        
	});
} (jQuery) );
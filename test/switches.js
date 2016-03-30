$(document).ready(function(){

	if ($('#binder').hasClass('spineless')) { $('#spineless-switch').addClass('active'); }
	if ($('#spine').hasClass('bleed')) { $('#bleed-switch').addClass('active'); }

	//
	$('.spine-behavior button').on('click', function() {
		$(this).parents('dd').siblings().children('button').removeClass('active');
		var grid = $(this).attr('data-grid');
		$('#binder').removeClass('fluid fixed hybrid').addClass(grid);
		$(this).trigger( "resize" );
		return false;
	});

	// Change Spine color
	$('.spine-colors button').on('click', function() {
		var color = $(this).attr('data-color');
		$(this).toggleClass('active').parents('dd').siblings().children('button').removeClass('active');
		// $('html').removeClass('spokane-signature tricities-signature vancouver-signature globalcampus-signature extension-signature');
		$('#spine').removeClass('white lightest lightly lighter light gray dark darker darkest crimson transparent');
		$('#spine').addClass(color);
		$(this).trigger( "resize" );
		return false;
	});

	// Change Spine transparency
	$('.spine-transparency button').on('click', function() {
		var transparency = $(this).attr('data-transparency');
		$(this).parents('dd').siblings().children('button').removeClass('active');
		$('#spine').removeClass('vellum-00 vellum-05 vellum-10 vellum-15 vellum-20 vellum-25');
		$('#spine').addClass(transparency);
		$(this).trigger( "resize" );
		return false;
	});

	// Folio Sizes
	$('.spine-sizes button').on('click', function() {
		var max = $(this).attr('data-max');
		$(this).parents('dd').siblings().children('button').removeClass('active');
		$('#binder').removeClass('max-default max-1188 max-1386 max-1584 max-1782 max-1980');
		$('#binder').addClass('folio').addClass(max);
		$(this).trigger( "resize" );
		return false;
	});

	// Change Campus
	$('.spine-campuses button').on('click', function() {
		// $('#spine').removeClass('white lightest lightly lighter light gray dark darker darkest crimson transparent');
		$(this).parents('dd').siblings().children('button').removeClass('active');
		var campus = $(this).attr('data-campus');
		campus = campus + '-signature';
		$('body').removeClass('system-signature spokane-signature healthsciences-spokane-signature foundation-signature campaign-signature everett-signature tricities-signature vancouver-signature globalcampus-signature extension-signature').addClass(campus);
		$(this).trigger( "resize" );
		return false;
	});

	$('#switches button').on('click', function() {

		$(this).not('.active').toggleClass('active');

	});

});

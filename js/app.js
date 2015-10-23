var effects = function() {
	$('.nav-main-list').hide();
	$('.nav-secondary-list').hide();
	$('.about').hide();
	$('.contact').hide();

    $('.nav-title').click(function() {
        $('.nav-main-list').toggle();
    });

    $('#about').click(function() {
        $('.about').show(500);
        $('.contact').hide(200);
        $('.nav-secondary-list').hide();
    });

    $('#projects').click(function() {
        $('.nav-secondary-list').toggle();
        $('.contact').hide(200);
        $('.about').hide(200);
    });

    $('#contact').click(function() {
        $('.contact').show(500);
        $('.about').hide(200);
        $('.nav-secondary-list').hide();
    });


}

$(document).ready(effects);
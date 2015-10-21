var effects = function() {
	$('.nav-main-list').hide();
	$('.nav-secondary-list').hide();
	$('.about').hide();

    $('.nav-title').click(function() {
        $('.nav-main-list').toggle();
    });

    $('#about').click(function() {
        $('.about').toggle();
    });

    $('#projects').click(function() {
        $('.nav-secondary-list').toggle();
    });


}

$(document).ready(effects);
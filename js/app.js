var effects = function() {
	$('.nav-main-list').hide();
	$('.nav-secondary-list').hide();
	$('.about').hide();
	$('.contact').hide();
    $('.project').hide();
    $('#digitalembroidery').hide();
    $('#smflogo').hide();
    $('#psytroflo').hide();
    $('#gugologo').hide();
    $('#balloops').hide();
    $('#napnap').hide();

    $('.nav-title').click(function() {
        $('.nav-main-list').toggle();
        $('.nav-secondary-list').hide();
        $('.about').hide();
        $('.contact').hide();
        $('.project').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#psytroflo').hide();
        $('#gugologo').hide();
        $('#balloops').hide();
        $('#napnap').hide();
    });

    $('#about').click(function() {
        $('.about').show(500);
        $('.contact').hide(200);
        $('.project').hide(200);
        $('.nav-secondary-list').hide();
    });

    $('#projects').click(function() {
        $('.nav-secondary-list').toggle();
        $('.contact').hide(200);
        $('.about').hide(200);
        $('.project').show(0);
    });

    $('#contact').click(function() {
        $('.contact').show(500);
        $('.about').hide(200);
        $('.project').hide(200);
        $('.nav-secondary-list').hide();
    });

    $('.digitalembroidery').click(function() {
        $('#digitalembroidery').show();
        $('#smflogo').hide();
        $('#psytroflo').hide();
        $('#gugologo').hide();
        $('#balloops').hide();
        $('#napnap').hide();
    });

    $('.smflogo').click(function() {
        $('#smflogo').show();
        $('#digitalembroidery').hide();
        $('#psytroflo').hide();
        $('#gugologo').hide();
        $('#balloops').hide();
        $('#napnap').hide();
    });

    $('.psytroflo').click(function() {
        $('#psytroflo').show();
        $('#smflogo').hide();
        $('#digitalembroidery').hide();
        $('#gugologo').hide();
        $('#balloops').hide();
        $('#napnap').hide();
    });

    $('.gugologo').click(function() {
        $('#gugologo').show();
        $('#smflogo').hide();
        $('#digitalembroidery').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#napnap').hide();
    });

    $('.balloops').click(function() {
        $('#balloops').show();
        $('#smflogo').hide();
        $('#digitalembroidery').hide();
        $('#psytroflo').hide();
        $('#gugologo').hide();
        $('#napnap').hide();
    });

    $('.napnap').click(function() {
        $('#napnap').show();
        $('#smflogo').hide();
        $('#digitalembroidery').hide();
        $('#psytroflo').hide();
        $('#gugologo').hide();
        $('#balloops').hide();
    });
}

$(document).ready(effects);
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

    $('.napnap').click(function() {
        $('#napnap').show();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
    });

    $('.digitalembroidery').click(function() {
        $('#napnap').hide();
        $('#digitalembroidery').show();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
    });

    $('.smflogo').click(function() {
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').show();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
    });

    $('.gugologo').click(function() {
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').show();
        $('#psytroflo').hide();
        $('#balloops').hide();
    });

    $('.psytroflo').click(function() {
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').show();
        $('#balloops').hide();
    })

    $('.balloops').click(function() {
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').show();
    });
}

$(document).ready(effects);
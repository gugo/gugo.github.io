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
    $('#babeltower').hide();
    $('#moodwall').hide();
    $('#utopia').hide();

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
        $('#babeltower').hide();
        $('#moodwall').hide();
        $('#utopia').hide();
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

    $('.moodwall').click(function() {
        $('#moodwall').show();
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#utopia').hide();
    });

    $('.utopia').click(function() {
        $('#moodwall').hide();
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#utopia').show();
    });

    $('.babeltower').click(function() {
        $('#babeltower').show();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#moodwall').hide();
        $('#utopia').hide();
    });

    $('.napnap').click(function() {
        $('#babeltower').hide();
        $('#napnap').show();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#moodwall').hide();
        $('#utopia').hide();
    });

    $('.digitalembroidery').click(function() {
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').show();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#moodwall').hide();
        $('#utopia').hide();
    });

    $('.smflogo').click(function() {
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').show();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#moodwall').hide();
        $('#utopia').hide();
    });

    $('.gugologo').click(function() {
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').show();
        $('#psytroflo').hide();
        $('#balloops').hide();
        $('#moodwall').hide();
    });

    $('.psytroflo').click(function() {
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').show();
        $('#balloops').hide();
        $('#moodwall').hide();
        $('#utopia').hide();
    })

    $('.balloops').click(function() {
        $('#babeltower').hide();
        $('#napnap').hide();
        $('#digitalembroidery').hide();
        $('#smflogo').hide();
        $('#gugologo').hide();
        $('#psytroflo').hide();
        $('#balloops').show();
        $('#moodwall').hide();
        $('#utopia').hide();
    });
}

$(document).ready(effects);
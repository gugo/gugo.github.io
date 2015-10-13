var effects = function() {
	$('.nav-list').hide();

    $('.nav-title').click(function() {
        $('.nav-list').toggle();
    });
}

$(document).ready(effects);
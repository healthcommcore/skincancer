(function($) {
	$(document).ready(function() {
		var WINDOW_SIZE = 992;
		var submenus = $('#main-menu-collapse .expanded ul');
		var dropdown = '<a href="#" class="dropdown-toggle submenu-reveal" data-toggle="dropdown">></a>';

		var respond = function () {
			if(window.innerWidth < WINDOW_SIZE) {
				$(submenus).each(function () {
					$(this).addClass('dropdown-menu').parent().prepend(dropdown);
				});
			}
			else {
				$(submenus).each(function () {
					$(this).removeClass('dropdown-menu');
					/*
					if( $('#main-menu-collapse').find('.submenu-reveal') ) {
						$('.submenu-reveal').remove();
					}
					*/
				});
			}
		}

		respond();
		$(window).resize(respond);

	});
})(jQuery);

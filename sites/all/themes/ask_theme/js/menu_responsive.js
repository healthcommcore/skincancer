(function($) {
	$(document).ready(function() {
		var WINDOW_SIZE = 992;
		var submenus = $('#main-menu-collapse .expanded ul');
		var dropdown = '<a href="#" class="dropdown-toggle submenu-reveal" data-toggle="dropdown"></a>';

		respond();
		$(window).resize(respond);

		/*
		*/



		function respond () {
			if(window.innerWidth < WINDOW_SIZE) {
				if( !($(submenus[0]).hasClass('dropdown-menu')) && !(existy(submenus[0])) ) {
					$(submenus).each(function () {
						$(this).addClass('dropdown-menu').parent().prepend(dropdown);
					});
				}
				$('.submenu-reveal').on('click', function() {
					$(this).toggleClass('subnav-on');
				});
			}
			else {
				$(submenus).each(function () {
					$(this).removeClass('dropdown-menu').prevAll('.dropdown-toggle').remove();
				});
			}
		}

		function existy(submenu) {
			if ($(submenu).find('dropdown-toggle').length > 0) {
				return true;
			}
			else {
				return false;
			}
		}

	});
})(jQuery);

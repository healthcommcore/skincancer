(function($) {
	$(document).ready(function() {
		var TABLET_WINDOW_SIZE = 992;
		var CELL_WINDOW_SIZE = 768;
		var search = $('#block-search-form'),  menu_container = $('#main-header'),
		    submenus = $('#main-menu-collapse .expanded ul'),
				top_header = $('#top-header');
		var mobile_search = $('#mobile-search');
		var dropdown = '<a href="#" class="dropdown-toggle submenu-reveal" data-toggle="dropdown"></a>';
		var photoLabel = $('.form-item-field-skin-photo-und-0').find('label');
		//var newUpload = $('#custom-upload-button');

		respond();
		$(window).resize(respond);


		function respond () {
			if($(window).width() < TABLET_WINDOW_SIZE) {
			  var submenu = submenus[0];
				if( !($(submenu).hasClass('dropdown-menu')) && 
					  !( existy( $(submenu).find('dropdown-toggle') ) ) ) {
					$(submenus).each(function () {
						$(this).addClass('dropdown-menu').parent().prepend(dropdown);
					});
					$(photoLabel).text('Take a photo');
				}
				if($(window).width() < CELL_WINDOW_SIZE ) {
					if( existy($(top_header).find(search)) ){
						$(search).remove();
						$(mobile_search).append(search);
					}
				}
				else {
					if( existy($(mobile_search).find(search)) ){
						$(search).remove();
						$(top_header).find('.region-top-header').append(search);
					}
				}
				$('.submenu-reveal').click(function() {
					$(this).toggleClass('subnav-on');
				});
			}
/*
			else if( existy( $(menu_container).find(search) ) && ($(window).width() > CELL_WINDOW_SIZE && $(window).width() < TABLET_WINDOW_SIZE) ) {
			}
*/
			else {
				/*
				 */
					$(search).remove();
					$(top_header).find('.region-top-header').append(search);
					$(photoLabel).text('Upload a photo');
				$(submenus).each(function () {
					$(this).removeClass('dropdown-menu').prevAll('.dropdown-toggle').remove();
				});
			}
		}

		function existy(htmlObj) {
			return htmlObj.length > 0;
		}

	});
})(jQuery);

/**
 * This file controls functionality for both the skin cancer images
 * and the ASK quiz, both features of the ASK website.
 */
(function($) {
	$(document).ready(function() { 
		var openclose = $('.openclose');

// Start with all images hidden
		$('.openclose').each(function () {
			$(this).hide();
		});

// Toggle slide effect for all elements when overall
// open/close link clicked
		$('#all-imgs').on('click', function () {
			openclose.each(function () {
				$(this).slideToggle();
			});
		});

// Toggle slide effect for an individual element
// when corresponding link clicked
		$('.skin-imgs-page').on('click', function (e) {
			e.preventDefault();
			//console.log($(e.target).parent().parent());
			var skin_imgs = $(e.target).parent().parent();
			if(skin_imgs.hasClass('skin-imgs')) {
				skin_imgs.find('.openclose').slideToggle();
			}
		});

// ASK Quiz functionality
		$('#ask-quiz li').on('click', function (e) {
			var chosen = e.target;
			if($(chosen).attr('type') == 'radio') {
				var answer = $(this).find('.openclose');
				if ($(answer).is(':hidden')) {
					$(answer).slideDown();
					if (isCorrect($(chosen).val(), this)) {
						$(answer).find('h2').html('Correct!');
					}
					else {
						$(answer).find('h2').html('Actually...');
					}
				}
			}
		});

		var isCorrect = function (chosen, question) {
			return chosen == $(question).find('input[type="hidden"]').val();
		}
		
/*
*/
	});
})(jQuery);

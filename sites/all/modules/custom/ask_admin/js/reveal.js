/**
 * This file controls functionality for both the skin cancer images
 * and the ASK quiz, both features of the ASK website.
 */
(function($) {
	$(document).ready(function() { 
		var openclose = $('.openclose');
		var quiz_questions = $('.ask-quiz .highlight-content');

// Start with all images hidden
		$('.openclose').each(function () {
			$(this).hide();
		});

		$(quiz_questions).find('input').each(function () {
			if( this.type == 'radio' && $(this).attr('checked', true) ) {
				$(this).attr('checked', false);
			}
		});

// Toggle slide effect for all elements when overall
// open/close link clicked
		$('#all-imgs').click(function (e) {
			e.preventDefault();
			openclose.each(function () {
				$(this).slideToggle();
			});
		});

// Toggle slide effect for an individual element
// when corresponding link clicked
		$('.img-toggle').click(function (e) {
			if( $(e.target).hasClass('trigger') ) {
				e.preventDefault();
				$(this).find('.openclose').slideToggle();
			}
		});

// ASK Quiz functionality
		$(quiz_questions).click(function (e) {
			var chosen = e.target;
			if($(chosen).attr('type') == 'radio') {
			  //console.log('Radio button clicked!');
				var answer = $(this).find('.openclose');
				if ($(answer).is(':hidden')) {
					$(answer).slideDown();
					if (isCorrect($(chosen).val(), this)) {
						$(answer).find('.answer').html('Correct!');
					}
					else {
						$(answer).find('.answer').html('Actually...');
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

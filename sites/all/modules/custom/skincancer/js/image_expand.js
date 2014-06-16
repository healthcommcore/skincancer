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
		$('.clinical-imgs').on('click', function (e) {
			e.preventDefault();
			//console.log($(e.target).parent().parent());
			var skin_imgs = $(e.target).parent().parent();
			if(skin_imgs.hasClass('skin-imgs')) {
				skin_imgs.find('.openclose').slideToggle();
			}
		});
	});
})(jQuery);

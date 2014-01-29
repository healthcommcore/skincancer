(function($){
  $(document).ready(function(){
		var submittedBefore = $('#edit-field-skin-submitted-before');
    var spotChangedYes = $('#edit-field-skin-submitted-before-und-yes-this-spot-has-changed-since-the-last-photo-that-i-submitted');
    var spotChangedFollowup = $('#edit-field-skin-saw-health-provider');
    //var sawProviderYes = $('#edit-field-skin-saw-health-provider-und-yes');
    var whatHappenedText = $('#edit-field-skin-provider-visit');
		var otherSymptoms = $('#edit-field-skin-symptom-other');

		// Start by hiding all decision tree components
	  $([spotChangedFollowup, whatHappenedText, otherSymptoms]).each(function(){
			$(this).addClass('hidden');
    });

		function getClickedItem(){
			$(document).click(function(event){
				console.log($(event.target).val());
			});
		}
		submittedBefore.find('input').click(function(){
			if(spotChangedYes.is(':checked')){
				spotChangedFollowup.removeClass('hidden');
			}
		else{
		  spotChangedFollowup.addClass('hidden');
		}
		});
  });
})(jQuery);

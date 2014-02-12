(function($){
  $(document).ready(function(){
		var form = $('#image-upload-entityform-edit-form');
		var submittedBefore = $('#edit-field-skin-submitted-before');
    var spotChangedYes = $('#edit-field-skin-submitted-before-und-yes-this-spot-has-changed-since-the-last-photo-that-i-submitted');
    var spotChangedFollowup = $('#edit-field-skin-saw-health-provider');
    var sawProviderYes = $('#edit-field-skin-saw-health-provider-und-yes');
    var whatHappenedText = $('#edit-field-skin-provider-visit');
		var otherCheck = $('#edit-field-skin-symptom-other-checkbo-und');
		var otherSymptoms = $('#edit-field-skin-symptom-other');
		var na = $('#edit-field-skin-saw-health-provider-und-none');
		var revealButtons = [spotChangedYes, sawProviderYes, otherCheck];
		var firstLoad = true;


// When page first loads, hide all decision tree options
		if(firstLoad){
			hideAll();
		}

// If any radio buttons are already selected, keep them selected
		$(revealButtons).each(function(){
			if($(this).is(':checked')){
				hideAndShow($(this));
			}
		});

// If any radio buttons or Other symptom checkbox is clicked, determin
// what should be hidden and what should be revealed
    $([submittedBefore.find('input'), spotChangedFollowup.find('input'), otherCheck,]).each(function(){
		  $(this).bind('click', {clicked:true}, hideAndShow);
		});
		
		function hideAll(){
	    $([spotChangedFollowup, whatHappenedText, otherSymptoms, na.parent()]).each(function(){
			  $(this).addClass('hidden');
      });
			firstLoad = false;
		}

		function hideAndShow(event){
			var active = event.data.clicked ? event.target : event;
			switch($(active).get(0)){
				case spotChangedYes.get(0) :
					spotChangedFollowup.removeClass('hidden');
				break;
				case sawProviderYes.get(0) :
					whatHappenedText.removeClass('hidden');
				break;
				case otherCheck.get(0) :
				  if(otherCheck.is(':checked')){
						otherSymptoms.removeClass('hidden');
					}
					else{
						otherSymptoms.addClass('hidden');
					}
				break;
				default:
				  hideOthers(active);
				break;
			}
		}

		function hideOthers(active){
			whatHappenedText.addClass('hidden');
      $(whatHappenedText).find('textarea').val('');
			if(submittedBefore.has(active).length > 0 && !spotChangedYes.is(':checked')){
				if(sawProviderYes.is(':checked')){
				  $(sawProviderYes).removeAttr('checked');
				}
			  spotChangedFollowup.addClass('hidden');
			}
		}
  });
})(jQuery);

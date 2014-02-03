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


		/*
		  Start by clearing all radio buttons and hiding all decision 
		  tree components
		*/
		$('input:radio').removeAttr('checked');
	  $([spotChangedFollowup, whatHappenedText, otherSymptoms, na.parent()]).each(function(){
			$(this).addClass('hidden');
    });

		// Show/hide different components when inputs are clicked
		form.find('input').click(function(event){
			displayFollowup($(event.target));
		});

		/*
		// May not use this form validation after all
		form.submit(function(event){
			if(spotChangedYes.is(':checked') && unTouched(spotChangedFollowup)){
			  console.log('You need to fill in all fields!');
				event.preventDefault();
			}
		});

		function unTouched(question){
		  var unChecked = true;
			question.find('input').each(function(){
			  if($(this).is(':checked')){
				  return unChecked = false;
				}
			});
			return unChecked;
		}
		*/

		function displayFollowup(clicked){
			switch($(clicked).get(0)){
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
				  hideOthers(clicked);
				break;
			}
		}

		function hideOthers(clicked){
			form.find('.field-type-list-text').each(function(){
        if($(this).find($(clicked))){
				  switch($(this).get(0)){
					  case spotChangedFollowup.get(0) :
							whatHappenedText.addClass('hidden');
							break;
					  case submittedBefore.get(0) :
						  if(!spotChangedYes.is(':checked')){
								spotChangedFollowup.addClass('hidden');
							}
							whatHappenedText.addClass('hidden');
							break;
				  }
			  }
			});
		}
        
  });
})(jQuery);

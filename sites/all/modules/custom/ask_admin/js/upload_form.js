/**
 * @file upload_form.js
 * Author: Dave Rothfarb
 * Date: 4-4-14
 * Copyright 2014 Health Communication Core
 *
 * This file is responsible for controlling visibility of
 * certain decision tree questions within the ASK study 
 * participant upload form. Follow-up questions must appear
 * only if the participant answers "Yes" to certain questions.
 */
(function($){
  $(document).ready(function(){
		var form = $('#image-upload-entityform-edit-form');
		var submittedBefore = $('#edit-field-skin-submitted-before');
// Gotta love Drupals's auto-generated IDs
    var spotChangedYes = $('#edit-field-skin-submitted-before-und-yes-this-spot-has-changed-since-the-last-photo-that-i-submitted');
    var spotChangedFollowup = $('#edit-field-skin-saw-health-provider');
    var sawProviderYes = $('#edit-field-skin-saw-health-provider-und-yes');
    var whatHappenedText = $('#edit-field-skin-provider-visit');
		var otherCheck = $('#edit-field-skin-symptom-other-checkbo-und');
		var otherSymptoms = $('#edit-field-skin-symptom-other');
		var na = $('#edit-field-skin-saw-health-provider-und-none');
		var revealButtons = [spotChangedYes, sawProviderYes, otherCheck];
		var newUpload = $('#edit-field-skin-photo-und-0-upload');
		var uploadContainer = $('.image-widget-data');
		var remove = $('#edit-field-skin-photo-und-0-remove-button');
		//var uploadImg = $('.take-upload-img');
		var firstLoad = true;

		//$(upload_button).val();

// When page first loads, hide all decision tree options
		if(firstLoad){
			hideAll();
		}

/*
		browseButtonSwitch();
		$(window).resize(browseButtonSwitch);
		$(remove).click(function() { console.log('This is a test') });
		//$(remove).click(browseButtonSwitch);
*/
		
		function browseButtonSwitch() {
			if(window.innerWidth < 1024) {
				replaceButton('take');
			}
			else {
				replaceButton('upload');
			}
		}

		function replaceButton(name) {
			var imgTag = '<img class="take-upload-img" src="/sites/default/files/images/' + name + '_photo.gif" />';
			if($(uploadContainer).find('img').length) {
				$(uploadContainer).find('img').remove();
			}
			$(newUpload).after(imgTag);
		}
			
/*
		$(remove).click(function() {
			location.reload();
		});
*/



// If any radio buttons are already selected, keep them selected
		$(revealButtons).each(function(){
			if($(this).is(':checked')){
				hideAndShow($(this));
			}
		});

// If any radio buttons or Other symptom checkbox is clicked, determine
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

// Look at the event source and show corresponding follow-up question
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

// This is used to hide all the other unrelated questions once
// the appropriate question is shown
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

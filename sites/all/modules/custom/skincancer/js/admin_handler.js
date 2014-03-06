(function($){
 $(document).ready(function(){

// Create div object in which targeted DOM elements will be stored
	 var div = {};
	 div.form = null;
	 $(document).bind('click', function(e){

// Load all DOM elements native to the admin form which contains the button
// just clicked
		 div.form = $(e.target).parent();
		 var form = div.form;
		 div.values ={
			 role: e.target.name,
			 id: $(form).find('#formid').val(),
			 selected: $(form).find('option:selected').html(),
			 comment: $(form).find('#commentField').val(),
		 };
		 div.tags = {
		   reviewedLabel: $(form).find('label[for="date_reviewed"]'),
		   reviewed: $(form).find('#date_reviewed'),
			 selectLabel: $(form).find('label[for="select"]'),
			 select: $(form).find('#select'),
			 selectVal: $(form).find('option:selected').val(),
			 commentsLabel: $(form).find('label[for="commentField"]'),
			 commentVal: $(form).find('#comments'),
			 textarea: $(form).find('#commentField'),
		   cancel: $(form).find('#cancel'),
		   del: $(form).find('#delete'),
			};
		 div.arrays = {
		  dataArray: [div.tags.reviewedLabel, div.tags.reviewed, div.tags.commentVal, div.tags.del],
      formArray: [div.tags.select, div.tags.textarea, div.tags.selectLabel, div.tags.cancel],
		 };

// Add to div arrays now that role is determined
		  var selectId = (div.values.role === 'staff' ? 'status' : 'findings');
		  div.arrays.dataArray.push(form.find('label[for="' + selectId + '"]'));
		  div.arrays.dataArray.push(form.find('#' + selectId));

// Determine the id of the clicked button and trigger corresponding actions
		 if(e.target.id === 'submit' || e.target.id === 'save'){
			 if(div.tags.selectVal === '0') {
				 var toSelect = (div.values.role === 'staff' ? 'photo status' : 'finding');
				 warn('You must select a <strong>' + toSelect + '</strong>').fadeIn();
			 }
			 else{
// Clear the date and time field in case it already exists
				 div.tags.reviewed.html('');
				 $(e.target).attr({'id' : 'edit', 'value' : 'Edit'});
				 uploadVals(div.values, selectId);
			 }
		 }
		 else if(e.target.id === 'edit'){
			 $(e.target).attr({'id' : 'save', 'value' : 'Save'});
			 editView(div.form, div.tags, selectId);
			 showHide(div.arrays.formArray, div.arrays.dataArray);
		 }
		 else if(e.target.id === 'cancel'){
			 $('#save').attr({'id' : 'edit', 'value' : 'Edit'});
			 showHide(div.arrays.dataArray, div.arrays.formArray);
		 }
		 else if(e.target.id === 'closeWarn'){
			 e.preventDefault();
			 $('#warn').remove();
		 }
	 });

// AJAX upload to php script and then format active admin form to reflect data submission
   function uploadVals(values, selectId) {
	   $.ajax({
       url:'sites/all/modules/custom/skincancer/includes/upload_data.php',
			 type: 'POST',
       data: values,
			 dataType: 'json',
       success: function(data, status, jqXHR){
			   loadView(data, selectId);
			   showHide(div.arrays.dataArray, div.arrays.formArray);
	     },
       error: function(jqXHR, textStatus, errorThrown){
         console.log(errorThrown);
	     }
		 });
	 }

// Load selected data into active admin form for view only
	 function loadView(time, selectId) {
		 var selectTag = div.form.find('#' + selectId);
		 div.tags.reviewed.append(time);
		 $(selectTag).html(div.values.selected);
		 if(div.values.comment != '') {
			 $(div.tags.commentVal).html(div.values.comment);
		 }
	 }

// Revert active admin form from view only to edit mode but load most recent data
   function editView(form, tags, selectId) {
     tags.textarea.html(tags.commentVal.text());
		 var selectText = form.find('#' + selectId).text();
		 tags.select.find('option').each(function(){
			 if($(this).text() == selectText) {
				 $(this).attr('selected', true);
			 }
		 });
	 }

// Efficiency function to show array elements in first argument and hide array
// elements in second argument
	 function showHide(toShow, toHide) {
		 $(toShow).each(function(){
		   $(this).removeClass('hidden');
		 });
		 $(toHide).each(function(){
		   $(this).addClass('hidden');
		 });
	 }

// Create a container for the purposes of alerting the user with a message
	 function warn(warning){
		 var warnDiv = $('<div id="warn" class="warn" />');
		 var close = $('<a id="closeWarn" class="closeWarn" href="#">X</a>');
		 var title = $('<h2>Warning!</h2>');
		 var message = $('<p>' + warning + '</p>');
		 $([close, title, message]).each(function(){
		   warnDiv.append($(this));
		 });
		 $('body').prepend(warnDiv);
		 var leftPos = ($(document).width() / 2) - (warnDiv.width() / 2);
		 warnDiv.css({'left': leftPos}).hide();
		 return warnDiv;
	 }
 });
})(jQuery);


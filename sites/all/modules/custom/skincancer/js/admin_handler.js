(function($){
 $(document).ready(function(){
	 var div = {};
	 div.form = null;
	 $(document).on('click', function(e){
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
			};

		 div.arrays = {
		  dataArray: [this.tags.reviewedLabel, this.tags.reviewed, this.tags.commentVal],
      formArray: [this.tags.select, this.tags.textarea, this.tags.selectLabel],
		 };
			e.target.blur();
		  var selection = (div.values.role === 'staff' ? 'status' : 'findings');
		  div.arrays.dataArray.push(form.find('label[for="' + selection + '"]'));
		  div.arrays.dataArray.push(form.find('#' + selection));
// Determine which button was pushed and trigger corresponding actions
		 if(e.target.id === 'submit' || e.target.id === 'save'){
			 // Clear the date and time field in case it already exists
			 div.tags.reviewed.html('');
			 $(e.target).attr({'id' : 'edit', 'value' : 'Edit'});
			 div.tags.cancel.addClass('hidden');
			 uploadVals(div.values);
		 }
		 else if(e.target.id === 'edit'){
			 $(e.target).attr({'id' : 'save', 'value' : 'Save'});
			 div.tags.cancel.removeClass('hidden');
			 visibility(div.arrays.dataArray, div.arrays.formArray);
		 }
		 else if(e.target.id === 'cancel'){
			 $('#save').attr({'id' : 'edit', 'value' : 'Edit'});
			 div.tags.cancel.addClass('hidden');
			 visibility(div.arrays.formArray, div.arrays.dataArray);
		 }
	 });

   function uploadVals(values) {
	   $.ajax({
       url:'sites/all/modules/custom/skincancer/includes/upload_data.php',
			 type: 'POST',
       data: values,
			 dataType: 'json',
       success: function(data, status, jqXHR){
			   loadView(data);
			   //console.log();
	     },
       error: function(jqXHR, textStatus, errorThrown){
         console.log(errorThrown);
	     }
		 });
	 }

	 function loadView(time) {
		 var selectId = div.values.role == 'staff' ? 'status' : 'findings';
		 var comments = div.values.comment ==='' ? 'No comments' : div.values.comment;
		 div.tags.reviewedLabel.removeClass('hidden');
		 div.tags.reviewed.removeClass('hidden').append(time);
		 div.tags.select.addClass('hidden');
		 div.tags.selectLabel.after('<p id="' + selectId + '">' + div.values.selected + '</p>');
		 div.tags.textarea.addClass('hidden');
		 div.tags.commentsLabel.after('<p id="comments">' + comments + '</p>');
	 }

	 function editView(form, values, tags) {
		 var toHide = [tags.reviewedLabel, tags.reviewed, tags.commentVal];
		 var toShow = [tags.select, tags.textarea, tags.selectLabel];
		 var selection = (values.role === 'staff' ? 'status' : 'findings');
		 toHide.push(form.find('label[for="' + selection + '"]'));
		 toHide.push(form.find('#' + selection));
		 $(toHide).each(function() {
		   $(this).addClass('hidden');
		 });
		 $(toShow).each(function() {
		   $(this).removeClass('hidden');
		 });
		 tags.textarea.html(tags.commentVal.text());
		 var selectText = form.find('#' + selection).text();
		 tags.select.find('option').each(function(){
			 if($(this).text() == selectText) {
				 $(this).attr('selected', true);
			 }
		 });
	 }

   function revertView(form, values, tags) {
		 var toHide = [tags.select, tags.textarea, tags.selectLabel];
		 var toShow = [tags.reviewedLabel, tags.reviewed, tags.commentVal];
		 var selection = (values.role === 'staff' ? 'status' : 'findings');
		 toShow.push(form.find('label[for="' + selection + '"]'));
		 toShow.push(form.find('#' + selection));
		 $(toHide).each(function() {
		   $(this).addClass('hidden');
		 });
		 $(toShow).each(function() {
		   $(this).removeClass('hidden');
		 });
	}
	 
 });
})(jQuery);


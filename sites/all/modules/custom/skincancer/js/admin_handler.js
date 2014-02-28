(function($){
 $(document).ready(function(){
	 var div = {};
	 div.form = null;
	 $(document).click(function(e){
		 //console.log(e);
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
			 selectLabel: $(form).find('label[for="select"]'),
			 commentsLabel: $(form).find('label[for="commentField"]'),
		   reviewed: $(form).find('#date_reviewed'),
			 select: $(form).find('#select'),
			 textarea: $(form).find('#commentField'),
		   cancel: $(form).find('#cancel'),
			};
		 if(e.target.id === 'submit' || e.target === 'save'){
			 uploadVals(div.values);
			 $(e.target).attr({'id' : 'edit', 'value' : 'Edit'});
			 //e.preventDefault();
form		 }
		 else if(e.target.id === 'edit'){
			 $(e.target).attr({'id' : 'save', 'value' : 'Save'});
			 div.tags.cancel.removeClass('hidden');
		 }
		 else if(e.target.id === 'cancel'){
		 }
		 
	 });

	 function uploadVals(values) {
	   $.ajax({
       url:'sites/all/modules/custom/skincancer/includes/upload_data.php',
			 type: 'POST',
       data: values,
			 dataType: 'json',
       success: function(data, status, jqXHR){
			   displayData(data);
			   //console.log();
	     },
       error: function(jqXHR, textStatus, errorThrown){
         console.log(errorThrown);
	     }
		 });
	 }

	 function displayData(time) {
		 var selectId = div.values.role == 'staff' ? 'status' : 'findings';
		 var comments = div.values.comment ==='' ? 'No comments' : div.values.comment;
		 div.tags.reviewedLabel.removeClass('hidden');
		 div.tags.reviewed.removeClass('hidden').append(time);
		 div.tags.select.addClass('hidden');
		 div.tags.selectLabel.after('<p id="' + selectId + '">' + div.values.selected + '</p>');
		 div.tags.textarea.addClass('hidden');
		 div.tags.commentsLabel.after('<p id="comments">' + comments + '</p>');

		 //console.log(time);
	 }
 });
})(jQuery);


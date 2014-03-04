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
		   reviewed: $(form).find('#date_reviewed'),
			 selectLabel: $(form).find('label[for="select"]'),
			 select: $(form).find('#select'),
			 selectVal: $(form).find('option:selected').val(),
			 commentsLabel: $(form).find('label[for="commentField"]'),
			 commentVal: $(form).find('#comments'),
			 textarea: $(form).find('#commentField'),
		   cancel: $(form).find('#cancel'),
			};

// Determine which button was pushed and trigger corresponding actions
		 if(e.target.id === 'submit' || e.target === 'save'){
			 uploadVals(div.values);
			 $(e.target).attr({'id' : 'edit', 'value' : 'Edit'});
		 }
		 else if(e.target.id === 'edit'){
			 $(e.target).attr({'id' : 'save', 'value' : 'Save'});
			 div.tags.cancel.removeClass('hidden');
			 editView(form, div.values, div.tags);
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

		 //console.log(time);
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
		 //tags.select.find('option[value="' + tags.selectVal + '"]').attr('selected', true);
			 //console.log(id);
	 }
   function revertView(form, values, tags) {
		 var toShow = [tags.reviewedLabel, tags.reviewed, tags.commentVal];
		 var toHide = [tags.select, tags.textarea, tags.selectLabel];
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
		 //tags.select.find('option[value="' + tags.selectVal + '"]').attr('selected', true);
			 //console.log(id);
	 }

	 /*
	function reformatView(values, tags, id) {
		if(id === 'edit'){
			$(e.target).attr({'id' : 'save', 'value' : 'Save'});
			div.tags.cancel.removeClass('hidden');
		}
		else if(id === 'cancel'){
		}
	}
*/
	 
 });
})(jQuery);


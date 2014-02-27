(function($){
 $(document).ready(function(){
	 $(document).click(function(e){
		 //console.log(e);
		 var form = $(e.target).parent();
		 var cancel = $(form).find('#cancel');
		 var values ={
			 role: e.target.name,
			 id: $(form).find('#formid').val(),
			 selected: $(form).find('option:selected').val(),
			 comment: $(form).find('#commentField').val(),
		 };
		 if(e.target.id === 'submit'){
			 uploadVals(values);
			 //e.preventDefault();
		 }
		 else if(e.target.id === 'edit'){
		 }
		 else if(e.target.id === 'cancel'){
		 }
		 
	 });

	 function uploadVals(values) {
	   $.ajax({
       url:'sites/all/modules/custom/skincancer/includes/upload_data.php',
			 type: 'POST',
       data: values,
       success: function(data, status, jqXHR){
			   console.log(status);
	     },
       error: function(jqXHR, textStatus, errorThrown){
         console.log(errorThrown);
	     }
		 });
	 }
 });
})(jQuery);


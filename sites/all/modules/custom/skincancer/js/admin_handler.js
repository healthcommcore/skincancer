(function($){
 $(document).ready(function(){
	 $(document).click(function(e){
		 //console.log(e);
		 if(e.target.id === 'submit'){
		   var form = $(e.target).parent();
			 var values ={
			   time: e.timeStamp,
			   role: e.target.name,
				 id: $(form).find('#formid').val(),
			   selected: $(form).find('option:selected').val(),
				 comment: $(form).find('#comments').val(),
			 };
			 uploadVals(values);
			 console.log(e.timeStamp);
			 //e.preventDefault();
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


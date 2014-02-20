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
		 }
	 });

	 function uploadVals(values) {
	   $.ajax({
       url:'sites/all/modules/custom/skincancer/skincancer.php',
       data: JSON.stringify(values),
       success: function(data, status, jqXHR){
			   console.log(jqXHR);
	     },
		 });
		 //console.log(JSON.stringify(values));
	 }
 });
})(jQuery);


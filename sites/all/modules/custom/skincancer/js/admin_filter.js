(function($){
  $(document).ready(function(){
		var rows = $('table.views-table tr').has('td');
	  var apply = $('#edit-submit-skin-cancer-admin-view');
		apply.bind('click', function(e){
		  if($('#edit-user').val() != ''){
			  return undefined;
			}
		  var option = $('#edit-admin-options option:selected');
		  e.preventDefault();
			$(rows).each(function(){
				$(this).removeClass('hidden');
			  if(isInRow(this, option)){
			    $(this).removeClass('hidden');
			  }
				else{
			    $(this).addClass('hidden');
			  }
		    //console.log($(option).val());
			});//row loop
    });//click

		function isInRow(row, option){
		  var pattern = new RegExp($(option).val());
		  var stat = $(row).find('#status').text();
		  var finding = $(row).find('#findings').text();
// I know this is silly and messy but I needed to return a
// double negative so the function works correctly
			if(pattern.test(stat) || pattern.test(finding) || $(option).val() == 'all'){
				return true;
			}
	  }
	});//doc ready
})(jQuery);

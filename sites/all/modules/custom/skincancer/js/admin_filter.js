/**
 * @file admin_filter.js
 * Author: Dave Rothfarb
 * Date: 4-4-14
 * Copyright 2014 Health Communication Core
 *
 * This functionality could've been included in the main
 * admin_handler.js file but I decided to modularize it instead.
 * It implements a front-end powered filtering functionality
 * by simply showing or hiding table rows based on values specified
 * in a filter select list. Kind of a hack method I used to avoid
 * tiresome Drupal programming overhead.
 */
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
// I know this could've been written more succinctly but it took me a while to
// get it to work properly and I chose not to mess with it anymore.
			if(pattern.test(stat) || pattern.test(finding) || $(option).val() == 'all'){
				return true;
			}
	  }
	});//doc ready
})(jQuery);

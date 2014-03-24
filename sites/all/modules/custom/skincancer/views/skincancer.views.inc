<?php
/**
 * Code referenced from https://isovera.com/blog/programmatically-creating-forms-views-drupal-7
 *
 * Implements hook_views_data_alter().
 *
 * @param $data
 *   Information about Views' tables and fields.
 */

/**
 * Implementst hook_views_pre_render().
 */
function skincancer_views_query_alter(&$view, &$query){
	//dpm($view->name);
}

/**
 * Implementst hook_views_pre_render().
 */
function skincancer_views_pre_render(&$view){
	//dpm($view);
}

/**
 * Implements hook_views_post_render().
 */
function skincancer_views_post_render(&$view, &$output, &$cache) {
  //dpm($output);
}

/**
 * Implements hook_views_pre_view().
 */
function skincancer_views_pre_view(&$view, &$display_id, &$args) {
  //dpm($view);
}

/**
 * Implements hook_views_data().
 */
function skincancer_views_data() {
	$data['admin']['table']['group'] = t('Admin form');
	$data['admin']['table']['join'] = array(
		'#global' => array(),
	);

	$data['admin']['admin_handler'] = array(
		'title' => t('Admin feedback form'),
		'help' => t('Admin feedback form'),
		'field' => array(
			'handler' => 'skincancer_admin_handler',
		),
	);

  $data['admin']['admin_filter'] = array(
		'title' => t('Admin form filter'),
		'help' => t('Enables admin form to be filtered by otherwise inaccessible
		             fields in skin cancer view'),
		'filter' => array(
			'handler' => 'skincancer_admin_handler_filter',
		),
	);

	return $data;
}
/**
 * Implements hook_views_data().
 */
/*
function skincancer_views_data() {
	$data['skincancer_admin']['table']['group'] = t('Skin Cancer admin table');
	$data['skincancer_admin']['table']['base'] = array(
		'field' => 'aid',
		'title' => t('Skin Cancer admin table'),
		'help' => t('All staff and dermatologist findings pertaining to Skin Cancer
		project stored here'),
		'weight' => -10,
	);

	$data['skincancer_admin']['table']['join'] = array(
		'entityform' => array(
			'left_field' => 'entityform_id',
			'field' => 'entityform_id',
		),
	);

	$data['skincancer_admin']['aid'] = array(
		'title' => t('Admin data'),
		'help' => t('Unique identifier of admin data pertaining to a single
		participant Entityform submission'),
		'field' => array(
			'handler' => 'views_handler_field_numeric',
			'click sortable' => TRUE,
		),
		'filter' => array(
			'handler' => 'views_handler_filter_numeric',
		),
		'sort' => array(
			'handler' => 'views_handler_sort',
		),
	);

	$data['skincancer_admin']['entityform_id'] = array(
		'title' => t('Participant Entityform submission'),
		'help' => t('A reference to the unique Entityform a participant submitted'),
		'relationship' => array(
			'base' => 'entityform',
			'base_field' => 'entityform_id',
			'handler' => 'views_handler_relationship',
			'label' => t('Entityform-Skin Cancer relationship'),
			'title' => t('Admin feedback to participant uploads'),
			'help' => t('The relationship of staff and dermatologist feedback to
			individual participant photo uploads'),
		),
	);

  $data['skincancer_admin']['photo_status'] = array(
		'title' => t('Photo status'),
		'help' => t('Status of user submitted photo as noted by staff'),
		'field' => array(
			'handler' => 'views_handler_field',
		),
		'filter' => array(
			'handler' => 'views_handler_filter_string',
		),
	);

  $data['skincancer_admin']['staff_review_date'] = array(
		'title' => t('Staff review date'),
		'help' => t('Date photo was reviewed by staff'),
		'field' => array(
			'handler' => 'views_handler_field_date',
			'click sortable' => TRUE,
		),
		'sort' => array(
			'handler' => 'views_handler_sort_date',
		),
		'filter' => array(
			'handler' => 'views_handler_filter_date',
		),
	);

  $data['skincancer_admin']['staff_comments'] = array(
		'title' => t('Staff comments'),
		'help' => t('Comments staff has for Dermatologist'),
		'field' => array(
			'handler' => 'views_handler_field',
		),
	);

  $data['skincancer_admin']['findings'] = array(
		'title' => t('Dermatologist findings'),
		'help' => t('The Dermatologist opinion about participant submitted photo'),
		'field' => array(
			'handler' => 'views_handler_field',
		),
		'filter' => array(
			'handler' => 'views_handler_filter_string',
		),
	);

  $data['skincancer_admin']['derma_review_date'] = array(
		'title' => t('Dermatologist review date'),
		'help' => t('Date photo was reviewed by Dermatologist'),
		'field' => array(
			'handler' => 'views_handler_field_date',
			'click sortable' => TRUE,
		),
		'sort' => array(
			'handler' => 'views_handler_sort_date',
		),
		'filter' => array(
			'handler' => 'views_handler_filter_date',
		),
	);

  $data['skincancer_admin']['derma_comments'] = array(
		'title' => t('Dermatologist comments'),
		'help' => t('Comments Dermatologist has for staff'),
		'field' => array(
			'handler' => 'views_handler_field',
		),
	);

	return $data;
}
 */
/*
function skincancer_views_data_alter(&$data) {
  $data['skincancer_admin']['staff_form'] = array(
    'field' => array(
      'title' => t('Staff feedback form'),
	    'help' => t('Add a form for staff to add feedback to a participant photo submission'),
	    'handler' => 'skincancer_admin_form_field_handler',
	  ),
  );
  $data['skincancer_admin']['derma_form'] = array(
    'field' => array(
      'title' => t('Dermatologist feedback form'),
	    'help' => t('Add a form for a Dermatologist to add feedback to a participant photo submission'),
	    'handler' => 'skincancer_admin_form_field_handler',
	  ),
  );
}
 */

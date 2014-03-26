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
		'filter' => array(
			'handler' => 'skincancer_admin_handler_filter',
		),
	);
	/*
  $data['admin']['admin_filter'] = array(
		'title' => t('Admin form filter'),
		'help' => t('Enables admin form to be filtered by otherwise inaccessible
		             fields in skin cancer view'),
		'filter' => array(
			'handler' => 'skincancer_admin_handler_filter',
		),
	);
	 */
	return $data;
}

	/*
  $data['admin']['admin_filter'] = array(
		'title' => t('Admin form filter'),
		'help' => t('Enables admin form to be filtered by otherwise inaccessible
		             fields in skin cancer view'),
		'filter' => array(
			'handler' => 'skincancer_admin_handler_filter',
		),
	);

	 */



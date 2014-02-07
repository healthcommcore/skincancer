<?php
/**
 * Code referenced from https://isovera.com/blog/programmatically-creating-forms-views-drupal-7
 *
 * Implements hook_views_data_alter().
 *
 * @param $data
 *   Information about Views' tables and fields.
 */
function skincancer_views_data_alter(&$data) {
  $data['entityform']['staff_form'] = array(
    'field' => array(
      'title' => t('Staff feedback form'),
	    'help' => t('Add a form for staff to add feedback to a participant photo submission'),
	    'handler' => 'skincancer_admin_form_field_handler',
	  ),
  );
  $data['entityform']['derma_form'] = array(
    'field' => array(
      'title' => t('Dermatologist feedback form'),
	    'help' => t('Add a form for a Dermatologist to add feedback to a participant photo submission'),
	    'handler' => 'skincancer_admin_form_field_handler',
	  ),
  );
}

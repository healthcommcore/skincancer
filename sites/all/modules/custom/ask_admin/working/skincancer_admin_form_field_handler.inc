<?php
/**
 * Code referenced from https://isovera.com/blog/programmatically-creating-forms-views-drupal-7
 * 
 * @file
 *
 * A Views' field handler for inserting a form for Staff and Dermatogist feedback 
 * on participant submissions for the Skin Cancer study.
 */
class skincancer_admin_form_field_handler extends views_handler_field {
  function construct() {
    parent :: construct();
  }

  function render($values) {
    return '<!--form-item-' . $this->options['id'] . '--' . 
	  $this->view->row_index . '-->';
  }

  function views_form(&$form, &$form_state) {
    $form[$this->options['id']] = array(
      '#type' => 'container',
	  '#tree' => TRUE,
	);

	foreach($this->view->result as $row_index => $row) {
	  $form[$this->options['id']][$row_index] = array(
	    '#title' => t('Comments'),
	    '#type' => 'textarea',
	  );
	}//foreach
  }
}

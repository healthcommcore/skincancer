<?php
class skincancer_admin_handler_filter extends views_handler_filter{
	/*
	 */
	function value_form(&$form, &$form_state) {
		drupal_add_js(drupal_get_path('module', 'skincancer') .
			                            '/js/admin_filter.js');
    $form['value'] = array();
   	$options = array(
			'all' => t('Show all'),
			'review' => t('Ready for review'),
			'complete' => t('Complete'),
			'benign' => t('Benign'),
			'indeterminate' => t('Indeterminate'),
			'malignant' => t('Malignant'),
			'quality' => t('Insufficient quality'),
			're-submission' => t('Patient re-submission'),
		);

		$form['admin_options'] = array(
			'#type' => 'select',
			'#title' => t('Filter results by:'),
			'#options' => $options,
		);
	}

	function accept_exposed_input(&$input) {
		$input['admin_handler'] = 'All';
		parent::accept_exposed_input($input);
	}


	/*
	function query() {
		$this->ensure_my_table();
		$this->query->add_table('skincancer_admin');
		$value = $this->value[0];
		dpm($this->value);

		switch($value) {
		case 'all' :
			return;
		}
	}
	 */
	/*
	 */
}

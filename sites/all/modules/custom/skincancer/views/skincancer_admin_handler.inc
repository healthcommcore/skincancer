<?php
/**
 * Handler for Skin Cancer admin purposes
 */
class skincancer_admin_handler extends views_handler_field {
	$adminSelectOptions = array(
		'staff' => array(
			t('New photo needed, poor quality, request sent'),
		  t('New photo needed, unrelated content, request sent'),
			t('Ready for review, photo is re-submission, study staff requested'),
			t('Ready for review, photo is a re-submission, participant initiated'),
			t('Ready for review'),
			t('Re-submission, review complete, letter sent to participant to visit
			RHCP'),
			t('Review complete, report sent to RHCP'),
		),
		'derma' => array(
			t('Morphology is suggestive of a benign lesion'),
			t('Morphology is indeterminate and management will require evaluation and
			follow-up with a physician'),
			t('Lesion has morphologic features suggestive of malignancy'),
			t('Image of insuggiciant quality - photograph needs to be re-taken'),
			t('Patient initiated re-submission'),
		),
	);

										 
	//function query(){}

	function option_definition(){
		$options = parent::option_definition();
		$options['alter']['contains']['alter_text'] = array('default' => TRUE);
		return $options;
	}

	function options_form(&$form, &$form_state) {
		parent::options_form($form, $form_state);

		unset($form['alter']['alter_text']);
		unset($form['alter']['text']['#dependency']);
		unset($form['alter']['text']['#process']);

		$form['skincancer_admin_type'] = array(
			'#type' => 'radios',
			'#title' => t('Admin form type'),
			'#options' => array('staff' => t('Staff'), 'derma' => t('Dermatologist')),
			'#description' => t('Select what type of admin form to create'),
		);
	}

	function query() {
		$this->add_additional_fields();
	}

	function buildForm($type) {
		$form = '<div id="admin_form">';
	}

	function render($values) {
		//dpm($values);
		return '';
	}
}

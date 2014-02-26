<?php
/**
 * Handler for Skin Cancer admin purposes
 */
module_load_include('inc', 'skincancer', 'includes/admin_output_builder');

class skincancer_admin_handler extends views_handler_field {
	var $adminData = array();

	function construct() {
		parent::construct();
	}
	//function query(){}

	function option_definition(){
		$options = parent::option_definition();
		$options['alter']['contains']['alter_text'] = array('default' => TRUE);
    $options['skincancer_admin_type'] = array(
        'default' => '',
        'translatable' => TRUE,
    );
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
		//$this->add_additional_fields();
	}

	function loadAdminData($id) {
		$records = db_query("SELECT * FROM skincancer_admin WHERE entityform_id = " . $id);
		//$records = db_query("SELECT * FROM skincancer_admin");
		if(!$records) {
			return;
		}
		foreach($records as $record) {
			$this->adminData[$record->entityform_id] = array(
				'status' => $record->photo_status,
				'staff_date' => $record->staff_review_date,
				'staff_comments' => $record->staff_comments,
				'findings' => $record->findings,
				'derma_date' => $record->derma_review_date,
				'derma_comments' => $record->derma_comments,
			);
		}
	}

	function pre_render($values) {
	}

	function render($values) {
		//dpm($this);
		$id = $values->entityform_id;
		$this->loadAdminData($id);
		$role = $this->options['skincancer_admin_type'];
		$builder = new adminOutputBuilder($id, $role, $this->adminData);
		return $builder->generateOutput();
	}
}

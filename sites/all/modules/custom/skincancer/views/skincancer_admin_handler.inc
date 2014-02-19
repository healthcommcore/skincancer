<?php
/**
 * Handler for Skin Cancer admin purposes
 */
class skincancer_admin_handler extends views_handler_field {
	private $_adminSelectOptions = array(
		'staff' => array(
			'title' => 'Study staff',
			'label' => 'Photo status:',
			'options' => array(
				'Select a photo status...',
				'New photo needed, poor quality, request sent',
				'New photo needed, unrelated content, request sent',
				'Ready for review, photo is re-submission, study staff requested',
				'Ready for review, photo is a re-submission, participant initiated',
				'Ready for review',
				'Re-submission, review complete, letter sent to participant to visit
				RHCP',
				'Review complete, report sent to RHCP',
			),
		),
		'derma' => array(
			'title' => 'Dermatologist',
			'label' => 'Findings:',
			'options' => array(
				'Select finding...',
				'Morphology is suggestive of a benign lesion',
				'Morphology is indeterminate and management will require evaluation and
				follow-up with a physician',
				'Lesion has morphologic features suggestive of malignancy',
				'Image of insuggiciant quality - photograph needs to be re-taken',
				'Patient initiated re-submission',
			),
		),
	);

										 
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
			/*
			'#ajax' => array(
				'path' => views_ui_build_form_url($form_state),
			),
			'#submit' => array('views_ui_config_item_form_submit_temporary'),
			 */
		);
	}

	function query() {
		//$this->add_additional_fields();
	}

	function buildForm($option, $id) {
		$role = $this->_adminSelectOptions[$option];
		$form = '<div id="admin_form">';
		$form .= '<h2>' . $role['title'] . '</h2>';
		$form .= '<div id="date_reviewed" class="hidden"></div>';
		$form .= '<label for="select">' . $role['label'] . '</label>';
		$form .= '<select id="select" name="select">';
		foreach($role['options'] as $opt) {
			$form .= '<option value="' . $opt . '"> ' . $opt . '</option>';
		}
		$form .= '</select>';
		$form .= '<label for="comments">Comments:</label>';
		$form .= '<textarea id="comments"></textarea>';
		$form .= '<button name="' . $option . '" id="submit">Submit</button>';
		$form .= '<input id="formid" type="hidden" name="formid" value="' . 
			$id . '" />';
		$form .= '</div>';
		return $form;
	}

	function render($values) {
		//dpm($values);
		$id = $values->entityform_id;
		$output = '';
		$output = $this->buildForm($this->options['skincancer_admin_type'], $id);
		//dpm($this->options);
		return $output;
	}
}

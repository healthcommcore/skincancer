<?php
/**
 * Handler for Skin Cancer admin purposes
 */
class skincancer_admin_handler extends views_handler_field {
	var $adminData = array();
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
				'Image of insufficiant quality - photograph needs to be re-taken',
				'Patient initiated re-submission',
			),
		),
	);

										 
	function construct() {
		parent::construct();
		$this->loadAdminData();
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

	function buildForm($option, $id) {
		$role = $this->_adminSelectOptions[$option];
		$form = '<div id="admin_form">';
		$form .= '<h2>' . $role['title'] . '</h2>';
		$form .= '<label for="date_reviewed" class="hidden">Reviewed:</label>';
		$form .= '<div id="date_reviewed" class="hidden"></div>';
		$form .= '<label for="select">' . $role['label'] . '</label>';
		$form .= '<select id="select" name="select">';
		foreach($role['options'] as $opt) {
			$form .= '<option value="' . $opt . '"> ' . $opt . '</option>';
		}
		$form .= '</select>';
		$form .= '<label for="comments">Comments:</label>';
		$form .= '<textarea id="comments"></textarea>';
		$form .= '<input name="' . $option . '" id="submit" class="form-submit"
			value="Submit" />';
		$form .= '<input id="formid" type="hidden" name="formid" value="' . 
			$id . '" />';
		$form .= '</div>';
		return $form;
	}

	function createOutput($id) {
		$role = $this->options['skincancer_admin_type'];
		$output = '';
		if(array_key_exists($id, $this->adminData)) {
			if($role == 'staff' && $this->adminData[$id]['staff_date'] > 0) {
				$output = '<p>Staff values here</p>';
			}
			else if($role == 'derma' && $this->adminData[$id]['derma_date'] > 0) {
				$output = '<p>Derma values here</p>';
			}
		}
		else{
			$output = $this->buildForm($role, $id);
		}
		return $output;
	}

	function loadAdminData() {
		$records = db_query("SELECT * FROM skincancer_admin");
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

	function render($values) {
		//dpm($this);
		$id = $values->entityform_id;
		$output = $this->createOutput($id);
		return $output;
	}
}

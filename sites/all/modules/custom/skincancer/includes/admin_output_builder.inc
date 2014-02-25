<?php

class adminOutputBuilder {
	var $id;
	var $role;
	var $data;
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

	private $_html = array(
		'dateLabel' => '<label for="date_reviewed" class="hidden">Reviewed:</label>',
		'date' => '<div id="date_reviewed" class="hidden"></div>',
		'commentsLabel' => '<label for="comments">Comments:</label>',
	);

	function __construct($id, $role, $data = NULL) {
		$this->id = $id;
		$this->role = $role;
		$this->data = $data;
	}

	function generateOutput() {
	  $output = '<div id="admin_form">';	
		$title = $this->_adminSelectOptions[$this->role]['title'];
		$output .= '<h2>' . $title . '</h2>';
	  $output .= '</div>';
		return $output;
	}

	function buildContent() {
	}


	function getDate() {
	}

  function buildForm($option, $id) {
		$role = $this->_adminSelectOptions[$option];
		$form .= '<label for="select">' . $role['label'] . '</label>';
		$form .= '<select id="select" name="select">';
		foreach($role['options'] as $opt) {
			$form .= '<option value="' . $opt . '"> ' . $opt . '</option>';
		}
		$form .= '</select>';
		$form .= $this->_html['commentsLabel'];
		$form .= '<textarea id="comments"></textarea>';
		$form .= '<input name="' . $option . '" id="submit" class="form-submit"
			value="Submit" />';
		$form .= '<input id="formid" type="hidden" name="formid" value="' . 
			$id . '" />';
		return $form;
	}

	function createOutput($id) {
		$admin = 
		$output = $this->_html['open'];
		$output .= '<h2>' . $admin['title'] . '</h2>';
		if(array_key_exists($id, $this->adminData)) {
			/*
			if($admin == 'staff' && $this->adminData[$id]['staff_date'] > 0) {
				$output = '<p>Staff values here</p>';
			}
			else if($admin == 'derma' && $this->adminData[$id]['derma_date'] > 0) {
				$output = '<p>Derma values here</p>';
			}
			 */
		}
		else{
		  $output .= $this->_html['dateLabel'];
		  $output .= $this->_html['date'];
			$output .= $this->buildForm($admin, $id);
		}
		return $output;
	}
}

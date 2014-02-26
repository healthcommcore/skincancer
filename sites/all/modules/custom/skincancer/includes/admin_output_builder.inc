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
				'Re-submission, review complete, letter sent to participant to visit RHCP',
				'Review complete, report sent to RHCP',
			),
		),
		'derma' => array(
			'title' => 'Dermatologist',
			'label' => 'Findings:',
			'options' => array(
				'Select finding...',
				'Morphology is suggestive of a benign lesion',
				'Morphology is indeterminate and management will require evaluation and follow-up with a physician',
				'Lesion has morphologic features suggestive of malignancy',
				'Image of insufficiant quality - photograph needs to be re-taken',
				'Patient initiated re-submission',
			),
		),
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
		if(array_key_exists($this->id, $this->data)){
		  $cellData = $this->data[$this->id];
			// I chose the required date field to check if a record exists for this
			// admin type.
		  $date = $this->role . '_date';
			if($cellData[$date] > 0) {
			  $output .= $this->dataLayout($cellData);
			}
			else{
			  $output .= $this->formLayout();
			}
			//dpm($this->data);
		}
		else{
			//$output .= $this->dataLayout();
			$output .= $this->formLayout();
		}
	  $output .= '</div>';
		return $output;
	}

	function formLayout() {
		$admin = $this->_adminSelectOptions[$this->role];
		$form = '<label for="date_reviewed" class="hidden">Reviewed:</label>';
		$form .= '<p id="date_reviewed" class="hidden"></p>';
		$form .= '<label for="select">' . $admin['label'] . '</label>';
		$form .= '<select id="select" name="select">';
		foreach($admin['options'] as $opt) {
			$form .= '<option value="' . $opt . '"> ' . $opt . '</option>';
		}
		$form .= '</select>';
		$form .= '<label for="comments">Comments:</label>';
		$form .= '<textarea id="comments"></textarea>';
		$form .= '<input name="' . $this->role . '" id="submit" class="form-submit"
			value="Submit" />';
		$form .= '<input id="formid" type="hidden" name="formid" value="' . 
			$this->id . '" />';
		return $form;
	}

	function dataLayout($cellData) {
		$dateType = $this->role . '_date';
		$date = date('m/d/Y', $cellData[$dateType]);
		$date .= '<br />' . date('g:i a', $cellData[$dateType]);
		$commentType = $this->role . '_comments';
		$data = '<label for="date_reviewed">Reviewed:</label>';
		$data .= '<p id="date_reviewed">' . $date . '</p>';
		if($this->role == 'staff') {
			$data .= '<label for="status">Status:</label>';
			$data .= '<p id="status">' . $cellData['status'] . '</p>';
		}
		else if($this->role == 'derma') {
			$data .= '<label for="findings">Findings:</label>';
			$data .= '<p id="findings">' . $cellData['findings'] . '</p>';
		}
		$data .= '<label for="comments">Comments:</label>';
		$commentData = trim($cellData[$commentType]);
		if(!empty($commentData)) {
			$data .= '<p id="comments"> ' . $commentData . '</p>';
		}
		else{
			$data .= '<p id="comments">No comments</p>';
		}
		$data .= '<input name="' . $this->role . '" id="submit" class="form-submit"
			value="Edit" />';
		$data .= '<input id="formid" type="hidden" name="formid" value="' . 
			$this->id . '" />';
		return $data;
	}
	
}

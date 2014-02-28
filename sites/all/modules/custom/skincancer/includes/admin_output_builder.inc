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
				array('val' => 0, 'label' => 'Select a photo status...'),
				array('val' => 'poor', 'label' => 'New photo needed, poor quality, request sent'),
				array('val' => 'unrelated', 'label' => 'New photo needed, unrelated content, request sent'),
				array('val' => 'staff_resubmit', 'label' => 'Ready for review, photo is re-submission, study staff requested'),
				array('val' => 'part_resubmit', 'label' => 'Ready for review, photo is a re-submission, participant initiated'),
				array('val' => 'ready', 'label' => 'Ready for review'),
				array('val' => 'visit_rhcp', 'label' => 'Re-submission, review complete, letter sent to participant to visit RHCP'),
				array('val' => 'report_send', 'label' => 'Review complete, report sent to RHCP'),
			),
		),
		'derma' => array(
			'title' => 'Dermatologist',
			'label' => 'Findings:',
			'options' => array(
				array('val' => 0, 'label' => 'Select finding...'),
				array('val' => 'benign', 'label' => 'Morphology is suggestive of a benign lesion'),
				array(
					'val' => 'indeterminate', 
					'label' => 'Morphology is indeterminate and management will require evaluation and follow-up with a physician',
				),
				array('val' => 'malignancy', 'label' => 'Lesion has morphologic features suggestive of malignancy'),
				array('val' => 'quality', 'label' => 'Image of insufficiant quality - photograph needs to be re-taken'),
				array('val' => 'resubmit', 'label' => 'Patient initiated re-submission'),
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
		$output .= '<input name="' . $this->role . '" id="cancel" class="form-submit hidden" value="Cancel" />';
		$output .= '<input id="formid" type="hidden" name="formid" value="' . 
			$this->id . '" />';
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
			$form .= '<option value="' . $opt['val'] . '"> ' . $opt['label'] . '</option>';
		}
		$form .= '</select>';
		$form .= '<label for="commentField">Comments:</label>';
		$form .= '<textarea id="commentField"></textarea>';
		$form .= '<input name="' . $this->role . '" id="submit" class="form-submit"
			value="Submit" />';
		return $form;
	}

	function dataLayout($cellData) {
		$admin = $this->_adminSelectOptions[$this->role];
		$dateType = $this->role . '_date';
		$date = date('m/d/Y', $cellData[$dateType]);
		$date .= '<br />' . date('g:i a', $cellData[$dateType]);
		$commentType = $this->role . '_comments';
		$data = '<label for="date_reviewed">Reviewed:</label>';
		$data .= '<p id="date_reviewed">' . $date . '</p>';
		if($this->role == 'staff') {
			$data .= '<label for="status">' . $admin['label'] . '</label>';
			$data .= '<p id="status">' . $cellData['status'] . '</p>';
		}
		else if($this->role == 'derma') {
			$data .= '<label for="findings">' . $admin['label'] . '</label>';
			$data .= '<p id="findings">' . $cellData['findings'] . '</p>';
		}
		$data .= '<label for="commentField">Comments:</label>';
		$commentData = 'No comments';
		if(!empty($cellData[$commentType])) {
			$commentData = trim($cellData[$commentType]);
		}
		$data .= '<p id="comments"> ' . $commentData . '</p>';
		$data .= '<textarea id="commentField" class="hidden"></textarea>';
		$data .= '<input name="' . $this->role . '" id="edit" class="form-submit"
			value="Edit" />';
		return $data;
	}
	
}

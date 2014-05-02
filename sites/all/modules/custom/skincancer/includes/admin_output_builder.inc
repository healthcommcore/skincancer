<?php
/**
 * @file AdminOutputBuilder
 * Author: Dave Rothfarb
 * Date: 4-4-14
 * Copyright 2014 Health COmmunication Core
 *
 * This class is used to construct the html output of the Study Admin and
 * Dermatologist feedback forms where observations can be made based on
 * corresponding participant uploaded skin examination data. These feedback 
 * forms are programmed as fields within a View and are available only as part 
 * of Views. Construction of the feedback forms requires data be passed to the 
 * constructor, specifying the EntityForm ID, admin role, and any admin feedback 
 * data stored in the database.
 */
class AdminOutputBuilder {
	var $id;
	var $role;
	var $data;
// These select list items could have been stored in the database but I chose
// to simply declare and initialize them here.
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
				array('val' => 'malignant', 'label' => 'Lesion has morphologic features suggestive of malignancy'),
				array('val' => 'quality', 'label' => 'Image of insufficiant quality - photograph needs to be re-taken'),
				array('val' => 're-submission', 'label' => 'Patient initiated re-submission'),
			),
		),
	);

	function __construct($id, $role, $data = NULL) {
		$this->id = $id;
		$this->role = $role;
		$this->data = $data;
	}

// Reformat date from Unix timestamp to human-friendly
	function getDate($dateType, $cellData){
		$date = '';
		if(isset($cellData[$dateType])) {
			$date = date('m/d/Y', $cellData[$dateType]);
			$date .= '<br />' . date('g:i a', $cellData[$dateType]);
		}
		return $date;
	}

// Load data from prior select list selections if there is any
	function getAdminSelections($cellData, $admin, $hideData){
		$selections = '';
		if($this->role == 'staff') {
			$selections .= '<label for="status"' . $hideData . '>' . $admin['label'] . '</label>';
			$selections .= '<p id="status"' . $hideData . '>';
      $selections .= isset($cellData['status']) ? $cellData['status'] : '';
			$selections .= '</p>';
		}
		else if($this->role == 'derma') {
			$selections .= '<label for="findings"' . $hideData . '>' . $admin['label'] . '</label>';
			$selections .= '<p id="findings"' . $hideData . '>';
      $selections .= isset($cellData['findings']) ? $cellData['findings'] : '';
			$selections .= '</p>';
		}
		return $selections;
	}

// Load comments from database if there are any. Otherwise add "No comments."
	function getAdminComments($cellData, $hideData){
		$comments = '';
		$commentData = 'No comments';
		$commentType = $this->role . '_comments';
		if(isset($cellData[$commentType]) && !empty($cellData[$commentType])) {
			$commentData = trim($cellData[$commentType]);
		}
		$comments .= '<p id="comments"' . $hideData . '> ' . $commentData . '</p>';
		return $comments;
	}

// Determine which action buttons should accomany admin feedback form depending
// on whether or not data already exists
	function getAdminButtons($cellData, $date) {
		$clrButClass = 'form-submit';
		$buttons = '<input type="submit" class="form-submit"';
		if($cellData == '' || $date == ''){
			$buttons .= ' name="' . $this->role . '" id="submit" value="Submit" />';
			$clrButClass = $clrButClass . ' hidden';
		}
		else{
			$buttons .= ' name="' . $this->role . '" id="edit" value="Edit" />';
		}
		$buttons .= '<input name="' . $this->role . '" id="clear" type="submit"
			                      class="' . $clrButClass . '" value="Clear" />';
		$buttons .= '<input name="' . $this->role . '" id="cancel" type="submit" class="form-submit hidden" value="Cancel" />';
		return $buttons;
	}

// Main function responsible for html output generation of admin feedback form
// All html elements are present at all times but their visibility is
// determined by whether or not data already exists in database.
  function generateOutput() {
		$hideForm = $hideData = $date = $cellData = '';
		$admin = $this->_adminSelectOptions[$this->role];
	  $output = '<div id="admin_form">';	
		$output .= '<h2>' . $admin['title'] . '</h2>';
		if(array_key_exists($this->id, $this->data)){
		  $cellData = $this->data[$this->id];
// I chose the required date field to check if a record exists for this admin type.
		  $dateType = $this->role . '_date';
			if($cellData[$dateType] > 0) {
				$hideForm = ' class="hidden"';
				$date = $this->getDate($dateType, $cellData);
			}
			else{
				$hideData = ' class="hidden"';
			}
		}
		else{
			$hideData = 'class="hidden"';
		}
		$output .= '<label for="date_reviewed"' . $hideData . '>Reviewed:</label>';
		$output .= '<p id="date_reviewed"' .  $hideData . '>' . $date . '</p>';
	  $output .= '<label for="select"' . $hideForm . '>' . $admin['label'] . '</label>';
		$output .= '<select id="select" name="select"' . $hideForm . '>';
		foreach($admin['options'] as $opt) {
			$output .= '<option value="' . $opt['val'] . '">' . $opt['label'] . '</option>';
		}
		$output .= '</select>';
		$output .= $this->getAdminSelections($cellData, $admin, $hideData);
		$output .= '<label for="commentField">Comments:</label>';
		$output .= '<textarea id="commentField"' . $hideForm . '></textarea>';
		$output .= $this->getAdminComments($cellData, $hideData);
		$output .= $this->getAdminButtons($cellData, $date);
		$output .= '<input id="formid" type="hidden" name="formid" value="' . 
			$this->id . '" />';
	  $output .= '</div>';
		return $output;
	}
	
}

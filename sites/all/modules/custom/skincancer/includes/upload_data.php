<?php
/**
 * @file upload_data.php
 * Author: Dave Rothfarb
 * Date: 4-4-14
 * Copyright 2014 Health Communication Core
 *
 * This file acts as the server-side script, working in conjunction with
 * AJAX requests within the js/admin_handler.js script. It is responsible
 * for all CRUD operations on the skincancer_admin table of the database.
 */

// First set constants relevant to Skin Cancer Admin table
define('DB', 'skincancer');
define('USER', 'skincancer');
define('PWORD', 'nfd97!inuf4uabv8u3');
define('TABLE', 'skincancer_admin');
define('ID', 'entityform_id');

$db = new mysqli('localhost', USER, PWORD, DB);
if($db->connect_errno) {
	echo "Connection failure";
}

// This area is for inserting/updating data to database from admin forms
if(isset($_POST['role']) && isset($_POST['id'])) {
	
// Clean and fill variables with form data from admin area sent through AJAX
	$query;
	$role = $db->real_escape_string($_POST['role']);
	$id = $db->real_escape_string($_POST['id']);
	$fields = getAdminFields($role);

	if(isset($_POST['selected'])) {
			$selection = $db->real_escape_string($_POST['selected']);
			$comment = $db->real_escape_string($_POST['comment']);
			$date = strtotime('now');

// Determine if we are inserting new values or updating a row that already exists
			$insertQuery = "INSERT INTO " . TABLE . " (" . ID . ", " . $fields['selection'] .
				", " . $fields['date'] . ", " . $fields['comment'] . ") " .
				"VALUES (" . $id . ", '" . $selection	. "', " . $date . ", '" . $comment . "')";

			$updateQuery = "UPDATE " . TABLE . " SET " . $fields['selection'] . "='" . $selection .
				"', " . $fields['date'] . "=" . $date . ", " . $fields['comment'] . "='" . $comment .
				"' WHERE " . ID . "=" . $id;

			$query = idExists($id) ? $updateQuery : $insertQuery;

// Format the date and pass it back as JSON
			$mdy = date('m/d/Y', $date);
			$time .= '<br />' . date('g:i a', $date);
			echo json_encode($mdy . $time);
	}
	else if(isset($_POST['delete'])) {
		$deleteRecord = "DELETE FROM " . TABLE . " WHERE " . ID . "=" . $id;
		$deleteFields = "UPDATE " . TABLE . " SET " . $fields['selection'] . "='', " . 
			          $fields['date'] . "=0, " . $fields['comment'] . "=''" . " WHERE " . ID . "=" . $id;

		$query = fieldsExist($role, $id) ? $deleteFields : $deleteRecord;
	}

// Use mysqli's prepare statement as security precaution before running query
	if(isset($query) && !$stmt = $db->prepare($query)) {
			echo "Prepare failed: (" . $db->errno . ") " . $db->error;
	}
	$stmt->bind_param('isis', $id, $selection, $date, $comment);

	if(!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}
}
/*
 */

// Using the entityform_id primary key, check if any records exist in db
function idExists($id) {
	global $db;
	$query = "SELECT " . ID . " FROM " . TABLE . " WHERE " . ID . "=" . $id;
	$result = $db->query($query);
  return $result->num_rows > 0;
}	

// Using the date field of the corresponding admin to see if any
// observation data exists in database
function fieldsExist($role, $id) {
	global $db;
	$otherRole = ($role == 'staff' ? 'derma' : 'staff');
	$otherFields = getAdminFields($otherRole);
	$query = "SELECT " . $otherFields['date'] . " FROM " . TABLE . " WHERE " . ID . "=" . $id;
	$result = $db->query($query);
	$row = $result->fetch_assoc();
  return $row[$otherFields['date']] > 0;
}	

// Determine which database table fields to use based on
// the role of the admin
function getAdminFields($role) {
	if($role == 'staff') {
		$fields['selection'] = 'photo_status';
		$fields['date'] = 'staff_review_date';
		$fields['comment'] = 'staff_comments';
	}
	else{
		$fields['selection'] = 'findings';
		$fields['date'] = 'derma_review_date';
		$fields['comment'] = 'derma_comments';
	}
	return $fields;
}


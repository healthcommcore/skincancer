<?php
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
if(isset($_POST['role']) && isset($_POST['id']) && isset($_POST['selected'])) {
	
	// Clean and fill variables with form data from admin area sent through AJAX
	$role = $db->real_escape_string($_POST['role']);
	$id = $db->real_escape_string($_POST['id']);
	$selection = $db->real_escape_string($_POST['selected']);
	$comment = $db->real_escape_string($_POST['comment']);
	$fields = getAdminFields($role);
	$date = strtotime('now');

	// Determine if we are inserting new values or updating a row that already 
	// exists
	$insertQuery = "INSERT INTO " . TABLE . " (" . ID . ", " . $fields['selection'] .
		", " . $fields['date'] . ", " . $fields['comment'] . ") " .
		"VALUES (" . $id . ", '" . $selection	. "', " . $date . ", '" . $comment . "')";

	$updateQuery = "UPDATE " . TABLE . " SET " . $fields['selection'] . "='" . $selection .
		"', " . $fields['date'] . "=" . $date . ", " . $fields['comment'] . "='" . $comment .
		"' WHERE " . ID . "=" . $id;

	$query = idExists($id) ? $updateQuery : $insertQuery;

	// Use mysqli's prepare statement as security precaution before running query
	if(!$stmt = $db->prepare($query)) {
			echo "Prepare failed: (" . $db->errno . ") " . $db->error;
	}
	$stmt->bind_param('isis', $id, $selection, $date, $comment);

	if(!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}

	$mdy = date('m/d/Y', $date);
	$time .= '<br />' . date('g:i a', $date);
	echo json_encode($mdy . $time);

/*
 */
}

function idExists($id) {
	global $db;
	$query = "SELECT " . ID . " FROM " . TABLE . " WHERE " . ID . "=" . $id;
	$result = $db->query($query);
  return $result->num_rows > 0;
}	

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


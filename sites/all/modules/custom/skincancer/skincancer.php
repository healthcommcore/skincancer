<?php
define('DB', 'skincancer');
define('USER', 'skincancer');
define('PWORD', 'nfd97!inuf4uabv8u3');
define('TABLE', 'skincancer_admin');

$db = new mysqli('localhost', USER, PWORD, DB);
if($db->connect_errno) {
	echo "Connection failure";
}

if(isset($_POST['time']) && isset($_POST['role']) && isset($_POST['id']) && 
	isset($_POST['selected']) && isset($_POST['comment'])) {
	$role = $db->real_escape_string($_POST['role']);
	$id = $db->real_escape_string($_POST['id']);
	$selection = $db->real_escape_string($_POST['selected']);
	$date = $db->real_escape_string($_POST['time']);
	$comment = $db->real_escape_string($_POST['comment']);
	$fields = getAdminFields($role);

	if(!$stmt = $db->prepare("INSERT INTO " . TABLE . " (" . $fields['id'] . ", " . $fields['selection'] .
		", " . $fields['date'] . ", " . $fields['comment'] . ") " .
		"VALUES (" . $id . ", '" . $selection	. "', " . $date . ", '" . $comment . "')")) {
			echo "Prepare failed: (" . $db->errno . ") " . $db->error;
	}
	$stmt->bind_param('isis', $id, $selection, $date, $comment);

	if(!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}

	//print_r($fields);
/*
 */
}

function getAdminFields($role) {
	$fields = array('id' => 'entityform_id');
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


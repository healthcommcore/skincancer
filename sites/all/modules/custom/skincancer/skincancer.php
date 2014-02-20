<?php

if(isset($_GET['comment'])) {
	$comment = $_GET['comment'];
	echo '<h1>' . $comment . '</h1>';
}
var_dump($_GET);


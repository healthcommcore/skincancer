<?php
/**
 * @file
 * Author: Dave Rothfarb
 * Date: 4-4-14
 * Copyright 2014 Health Communication Core
 *
 * This is a template file used to override the table output of a Drupal
 * View. I needed to insert a div into the participant data listing in the 
 * first cells of the View in which all text data should be placed. This 
 * allowed me to isolate the participant uploaded photo and corresponding
 * data as 2 entities, giving me more control over the output.
 */
?>
<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
          <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?>>
            <?php print $label; ?>
          </th>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rows as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php foreach ($row as $field => $content): ?>
          <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print reformatContent($content); ?>
          </td>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>

<?php 
/**
 * This function is used to correct some of the subpar default views formatting
 * of the Participant Data. It parses through the view's html output, inserts 
 * a new div into the Participant Data cell, extracts all participant data 
 * fields (except the image) from the output, then places them back in to 
 * the newly created div.
 */
function reformatContent($content) {
	$doc = new DOMDocument();
	$doc->preserveWhiteSpace = false;
	$doc->loadHTML($content);
	$newDiv = $doc->createElement('div');
	$newDiv->setAttribute('class', 'patient_details');
	$imgs = $doc->getElementsByTagName('img');
	foreach($imgs as $img){
// Get the uppermost parent div that holds only participant data divs
		$parent = $img->parentNode->parentNode->parentNode->parentNode;
		$parent->appendChild($newDiv);
// Skip over the img div and start with the next one.
		$divToRemove = $parent->firstChild->nextSibling->nextSibling->nextSibling;
// Iterate through participant data, extracting and inserting into new div
		while($divToRemove->nextSibling){
			$nextNode = $divToRemove->nextSibling->nextSibling;
			$divToInsert = $divToRemove->cloneNode(true);
			$newDiv->appendChild($divToInsert);
			$remove = $parent->removeChild($divToRemove);
			$divToRemove = $nextNode;
		}// while
	}// foreach
	return $doc->saveHTML();
}
?>

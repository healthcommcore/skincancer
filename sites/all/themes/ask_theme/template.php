<?php
/**
 * Implements theme_menu_tree().
 */
function ask_theme_menu_tree($variables) {
  return '<ul class="menu nav">' . $variables['tree'] . '</ul>';
}

function ask_theme_preprocess_page(&$variables) {
	//dpm($variables);
}

/** 
 *Implements theme_menu_link()
 */
function ask_theme_menu_link($variables) {
	// What we want to do here is add a class just to the "Physicians"
	// menu link, leaving all others untouched
	$element = $variables['element'];
	if(isset($element['#href']) && $element['#href'] == 'node/2') {
		$element['#attributes']['class'][] = 'physician-link';
		$submenu = '';

	// build menu item, render, and return
		if($element['#below']) {
			$submenu = drupal_render($element['#below']);
		}
		$output = l($element['#title'], $element['#href'], $element['#localized_options']);
		return '<li' . drupal_attributes($element['#attributes']) . '>' . $output .
			$submenu . "</li>\n";
	}
	return theme_menu_link($variables);
}

/**
 * Implements theme_preprocess_html
 *
 * Adding css, jqery library to fix legacy jquery code, viewport tag
 * giving appropriate settings for optimized viewing on  mobile browser 
 */
function ask_theme_preprocess_html(&$variables) {
	$css_path = drupal_get_path('theme', 'ask_theme') . '/css/fonts.css';
  if (file_exists($css_path)) {
    drupal_add_css($css_path, array(
      'preprocess' => TRUE,
      'group' => CSS_THEME,
      'media' => 'screen',
      'every_page' => TRUE,
		));
		// Needed to add this in order for javascript in the MD Slider module to work
		drupal_add_js(drupal_get_path('theme', 'ask_theme') . '/js/jquery-migrate-1.2.1.min.js');
	}

	// Add viewport tag
	$viewport = array(
		'#type' => 'html_tag',
		'#tag' => 'meta',
		'#attributes' => array(
			'name' =>  'viewport',
			'content' =>  'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
		)
	);
	drupal_add_html_head($viewport, 'viewport');

}

/**
 * Implements hook_form_element
 *
 * This function is used to rearrange Drupal's default placement of form 
 * element labels from under the element to above the element.
 */
function ask_theme_form_element($variables) {
  $element = &$variables['element'];

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');
  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'form-disabled';
  }
  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }
  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
  $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
			if (!empty($element['#description'])) {
				$output .= '<div class="description">' . $element['#description'] . "</div>\n";
			}
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      $output .= ' ' . $prefix . $element['#children'] . $suffix;
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
			if (!empty($element['#description'])) {
				$output .= '<div class="description">' . $element['#description'] . "</div>\n";
			}
      break;

    case 'none':
    case 'attribute':
			if (!empty($element['#description'])) {
				$output .= '<div class="description">' . $element['#description'] . "</div>\n";
			}
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }


  $output .= "</div>\n";

  return $output;
}

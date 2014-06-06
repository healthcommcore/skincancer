<?php

/**
 * Override or insert variables into the html template.
 */
function ask_mobile_preprocess_html(&$vars) {
	drupal_add_js('http://code.jquery.com/jquery-1.10.2.min.js');
	drupal_add_js('http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.js')
	drupal_add_css('http://code.jquery.com/mobile/1.4.2/jquery.mobile.structure-1.4.2.min.css');
	drupal_add_css(path_to_theme() . '/css/ask_mobile.min.css');
	drupal_add_css(path_to_theme() . '/css/jquery.mobile.icons.min.css');

}

/**
 * Override or insert variables into the page template.
function ask_mobile_preprocess_page(&$vars) {
  $vars['primary_local_tasks'] = $vars['tabs'];
  unset($vars['primary_local_tasks']['#secondary']);
  $vars['secondary_local_tasks'] = array(
    '#theme' => 'menu_local_tasks',
    '#secondary' => $vars['tabs']['#secondary'],
  );
}
 */

/**
 * Display the list of available node types for node creation.
function ask_mobile_node_add_list($variables) {
  $content = $variables['content'];
  $output = '';
  if ($content) {
    $output = '<ul class="admin-list">';
    foreach ($content as $item) {
      $output .= '<li class="clearfix">';
      $output .= '<span class="label">' . l($item['title'], $item['href'], $item['localized_options']) . '</span>';
      $output .= '<div class="description">' . filter_xss_admin($item['description']) . '</div>';
      $output .= '</li>';
    }
    $output .= '</ul>';
  }
  else {
    $output = '<p>' . t('You have not created any content types yet. Go to the <a href="@create-content">content type creation page</a> to add a new content type.', array('@create-content' => url('admin/structure/types/add'))) . '</p>';
  }
  return $output;
}
 */

/**
 * Implements hook_css_alter().
function ask_mobile_css_alter(&$css) {
  // Use Seven's vertical tabs style instead of the default one.
  if (isset($css['misc/vertical-tabs.css'])) {
    $css['misc/vertical-tabs.css']['data'] = drupal_get_path('theme', 'seven') . '/vertical-tabs.css';
    $css['misc/vertical-tabs.css']['type'] = 'file';
  }
  if (isset($css['misc/vertical-tabs-rtl.css'])) {
    $css['misc/vertical-tabs-rtl.css']['data'] = drupal_get_path('theme', 'seven') . '/vertical-tabs-rtl.css';
    $css['misc/vertical-tabs-rtl.css']['type'] = 'file';
  }
  // Use Seven's jQuery UI theme style instead of the default one.
  if (isset($css['misc/ui/jquery.ui.theme.css'])) {
    $css['misc/ui/jquery.ui.theme.css']['data'] = drupal_get_path('theme', 'seven') . '/jquery.ui.theme.css';
    $css['misc/ui/jquery.ui.theme.css']['type'] = 'file';
  }
}
 */

<?php
/**
 * Handler for Skin Cancer admin purposes
 */
class skincancer_admin_handler extends views_handler_field {
	function query(){}

	function option_definition(){
		$options = parent::option_definition();
		$options['alter']['contains']['alter_text'] = array('default' => TRUE);
		return $options;
	}

	function options_form(&$form, &$form_state) {
		parent::options_form($form, $form_state);

		unset($form['alter']['alter_text']);
		unset($form['alter']['text']['#dependency']);
		unset($form['alter']['text']['#process']);
	}

	function render($values) {
		return 'This is a test';
	}
}

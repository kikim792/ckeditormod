<?php

/**
 * @file
 * Admin settings page.
 */

function ckeditormod_settings_form($form, &$form_state) {
  $form['link'] = array(
    '#type' => 'fieldset',
    '#title' => t('Link dialog'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  
  $form['link']['ckemod_link_hide_advanced'] = array(
    '#type' => 'checkbox',
    '#title' => t('Hide "Advanced" tab'),
    '#default_value' => variable_get('ckemod_link_hide_advanced', TRUE),
  );

  $form['link']['ckemod_link_button_label'] = array(
    '#type' => 'textfield',
    '#title' => t('Field title for adding class name to link.'),
    '#default_value' => variable_get('ckemod_link_button_label', 'Display link as a button'),
  );

  $form['link']['ckemod_link_button_types'] = array(
    '#type' => 'textarea',
    '#title' => t('Available label and class names for link'),
    '#default_value' => variable_get('ckemod_link_button_types', _ckeditormod_link_button_types_default()),
    '#description' => t('<em>Label: class1 class2 etc</em> on each line. Leave blank to revert to default values.<br>Bootstrap class names are provided by default, but you can add your own class names that are rendered by your theme.'),
  );

  return system_settings_form($form);
}

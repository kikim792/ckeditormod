(function ($) {
$(function() {

  if (CKEDITOR) {
    CKEDITOR.on('dialogDefinition', function(ev) {
      var settings = Drupal.settings.ckeditormod;
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;

      if (dialogName == 'link') {
        var infoTab = dialogDefinition.getContents('info');
        var advTab =  dialogDefinition.getContents('advanced');
        var advCSSClasses = advTab.get( 'advCSSClasses' );

        if (settings.link_hide_advanced) {
          advTab.hidden = true;
        }

        // Create custom widget on the 'info' dialog tab.
        var select = infoTab.add({
          type: 'select',
          label: settings.link_button_label,
          id: 'buttonType',
          'default': '',
          items: settings.link_button_types,

          // Sync class names to the dropdown upon showing.
          onShow: function(data) {
            var dialog = CKEDITOR.dialog.getCurrent();
            var value = dialog.getContentElement('advanced', 'advCSSClasses').getValue();
            dialog.getContentElement('info', 'buttonType').setValue(value);
          },

          commit: function(data) {
            data.buttonType = this.getValue();
          }
        });

        // Place chosen class names to textbox (and thus to the HTML source).
        var advCSSClassesCommit = advCSSClasses.commit;

        advCSSClasses.commit = function(data) {
          advCSSClassesCommit.apply( this, arguments );

          // Older version uses adv instead of advanced.
          var adv = data.advanced || data.adv;
          adv.advCSSClasses = data.buttonType;
        };
      }
    });
  }

});
})(jQuery);

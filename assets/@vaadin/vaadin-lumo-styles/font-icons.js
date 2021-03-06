/// BareSpecifier=@vaadin\vaadin-lumo-styles\font-icons
import '../../@polymer/polymer/lib/elements/custom-style.js';
import './version.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: 'lumo-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      --lumo-icons-angle-down: "\\ea01";
      --lumo-icons-angle-left: "\\ea02";
      --lumo-icons-angle-right: "\\ea03";
      --lumo-icons-angle-up: "\\ea04";
      --lumo-icons-arrow-down: "\\ea05";
      --lumo-icons-arrow-left: "\\ea06";
      --lumo-icons-arrow-right: "\\ea07";
      --lumo-icons-arrow-up: "\\ea08";
      --lumo-icons-bar-chart: "\\ea09";
      --lumo-icons-bell: "\\ea0a";
      --lumo-icons-calendar: "\\ea0b";
      --lumo-icons-checkmark: "\\ea0c";
      --lumo-icons-chevron-down: "\\ea0d";
      --lumo-icons-chevron-left: "\\ea0e";
      --lumo-icons-chevron-right: "\\ea0f";
      --lumo-icons-chevron-up: "\\ea10";
      --lumo-icons-clock: "\\ea11";
      --lumo-icons-cog: "\\ea12";
      --lumo-icons-cross: "\\ea13";
      --lumo-icons-download: "\\ea14";
      --lumo-icons-dropdown: "\\ea15";
      --lumo-icons-edit: "\\ea16";
      --lumo-icons-error: "\\ea17";
      --lumo-icons-eye: "\\ea18";
      --lumo-icons-eye-disabled: "\\ea19";
      --lumo-icons-menu: "\\ea1a";
      --lumo-icons-minus: "\\ea1b";
      --lumo-icons-phone: "\\ea1c";
      --lumo-icons-play: "\\ea1d";
      --lumo-icons-plus: "\\ea1e";
      --lumo-icons-reload: "\\ea1f";
      --lumo-icons-search: "\\ea20";
      --lumo-icons-upload: "\\ea21";
      --lumo-icons-user: "\\ea22";
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);

/* NOTICE: Generated with 'gulp icons' */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
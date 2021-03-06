/// BareSpecifier=@vaadin\vaadin-overlay\theme\material\vaadin-overlay-styles
import '../../../vaadin-material-styles/mixins/overlay.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="material-vaadin-overlay" theme-for="vaadin-overlay">
  <template>
    <style include="material-overlay">
      /* stylelint-disable no-empty-source */
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
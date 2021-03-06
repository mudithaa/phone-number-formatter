/// BareSpecifier=@vaadin\vaadin-overlay\theme\lumo\vaadin-overlay-styles
import '../../../vaadin-lumo-styles/mixins/overlay.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="lumo-vaadin-overlay" theme-for="vaadin-overlay">
  <template>
    <style include="lumo-overlay">
      /* stylelint-disable no-empty-source */
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/// BareSpecifier=@vaadin\vaadin-list-box\theme\material\vaadin-list-box-styles
import '../../../vaadin-material-styles/font-icons.js';
import '../../../vaadin-material-styles/color.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="material-list-box" theme-for="vaadin-list-box">
  <template>
    <style>
      :host {
        -webkit-tap-highlight-color: transparent;
        --_material-item-selected-icon-display: block;
      }

      /* ShadyCSS workaround */
      [part="items"] ::slotted(vaadin-item)::before {
        display: block;
      }

      /* IE11 flexbox fix (https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items) */
      [part="items"] {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      [part="items"] ::slotted(*) {
        cursor: default;
      }

      [part="items"] ::slotted(vaadin-item) {
        min-height: 36px;
        padding: 8px 32px 8px 10px;
        font-size: var(--material-small-font-size);
        line-height: 24px;
      }

      [part="items"] ::slotted(vaadin-item:hover:not([disabled])) {
        background-color: var(--material-secondary-background-color);
      }

      [part="items"] ::slotted(vaadin-item[focused]:not([disabled])) {
        background-color: var(--material-divider-color);
      }

      @media (pointer: coarse) {
        [part="items"] ::slotted(vaadin-item:hover:not([disabled])),
        [part="items"] ::slotted(vaadin-item[focused]:not([disabled])) {
          background-color: transparent;
        }
      }

      /* Easily add section dividers */

      [part="items"] ::slotted(hr) {
        height: 1px;
        border: 0;
        padding: 0;
        margin: 8px 0;
        background-color: var(--material-divider-color);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
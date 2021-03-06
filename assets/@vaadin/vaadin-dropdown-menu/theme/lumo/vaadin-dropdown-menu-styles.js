/// BareSpecifier=@vaadin\vaadin-dropdown-menu\theme\lumo\vaadin-dropdown-menu-styles
import '../../../vaadin-lumo-styles/sizing.js';
import '../../../vaadin-lumo-styles/spacing.js';
import '../../../vaadin-lumo-styles/style.js';
import '../../../vaadin-lumo-styles/font-icons.js';
import '../../../vaadin-lumo-styles/mixins/menu-overlay.js';
import '../../../vaadin-lumo-styles/mixins/field-button.js';
import '../../../vaadin-text-field/theme/lumo/vaadin-text-field.js';
import '../../../vaadin-item/theme/lumo/vaadin-item.js';
import '../../../vaadin-list-box/theme/lumo/vaadin-list-box.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="lumo-dropdown-menu" theme-for="vaadin-dropdown-menu">
  <template>
    <style include="lumo-field-button">
      :host {
        outline: none;
        -webkit-tap-highlight-color: transparent;
        z-index:13000;
      }

      [selected] {
        padding-left: 0;
        padding-right: 0;
      }

      [part="toggle-button"]::before {
        content: var(--lumo-icons-dropdown);
      }

      /* Highlight the toggle button when hovering over the entire component */
      :host(:hover:not([readonly]):not([disabled])) [part="toggle-button"] {
        color: var(--lumo-contrast-80pct);
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-dropdown-menu-text-field" theme-for="vaadin-dropdown-menu-text-field">
  <template>
    <style>
      [part="input-field"] {
        cursor: default;
      }

      [part="input-field"] ::slotted([part="value"]) {
        display: flex;
      }

      /* ShadyCSS limitation workaround */
      [part="input-field"] ::slotted([part="value"]) [selected]::before {
        display: none;
      }

      [part="input-field"]:focus {
        outline: none;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-dropdown-menu-overlay" theme-for="vaadin-dropdown-menu-overlay">
  <template>
    <style include="lumo-menu-overlay">
      :host {
        --_lumo-item-selected-icon-display: block;
      }

      :host([bottom-aligned]) {
        justify-content: flex-end;
      }

      [part~="overlay"] {
        min-width: var(--vaadin-dropdown-menu-text-field-width);
        z-index: 12000;
      }

      /* Small viewport adjustment */
      :host([phone]) {
        top: 0 !important;
        right: 0 !important;
        bottom: var(--vaadin-overlay-viewport-bottom, 0) !important;
        left: 0 !important;
        align-items: stretch;
        justify-content: flex-end;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/// BareSpecifier=@vaadin\vaadin-dropdown-menu\theme\material\vaadin-dropdown-menu-styles
import '../../../vaadin-item/theme/material/vaadin-item.js';
import '../../../vaadin-list-box/theme/material/vaadin-list-box.js';
import '../../../vaadin-text-field/theme/material/vaadin-text-field.js';
import '../../../vaadin-material-styles/color.js';
import '../../../vaadin-material-styles/font-icons.js';
import '../../../vaadin-material-styles/mixins/menu-overlay.js';
import '../../../vaadin-material-styles/mixins/field-button.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="material-dropdown-menu" theme-for="vaadin-dropdown-menu">
  <template>
    <style include="material-field-button">
      :host {
        display: inline-flex;
        -webkit-tap-highlight-color: transparent;
      }

      [part="toggle-button"]::before {
        content: var(--material-icons-dropdown);
      }

      :host([opened]) [part="toggle-button"] {
        transform: rotate(180deg);
      }

      /* Disabled */

      :host([disabled]) {
        pointer-events: none;
      }
    </style>
  </template>
</dom-module><dom-module id="material-dropdown-menu-text-field" theme-for="vaadin-dropdown-menu-text-field">
  <template>
    <style>
      :host {
        width: 100%;
      }

      :host([disabled]) [part="input-field"],
      [part="input-field"],
      [part="value"] {
        cursor: default;
      }

      [part="input-field"]:focus {
        outline: none;
      }

      ::slotted([part="value"]) {
        display: flex;
      }
    </style>
  </template>
</dom-module><dom-module id="material-dropdown-menu-overlay" theme-for="vaadin-dropdown-menu-overlay">
  <template>
    <style include="material-menu-overlay">
      :host([bottom-aligned]) {
        justify-content: flex-end;
      }

      [part="overlay"] {
        min-width: var(--vaadin-dropdown-menu-text-field-width);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
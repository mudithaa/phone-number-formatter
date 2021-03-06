/// BareSpecifier=@vaadin\vaadin-text-field\theme\material\vaadin-password-field-styles
import './vaadin-text-field-styles.js';
import '../../../vaadin-material-styles/font-icons.js';
import '../../../vaadin-material-styles/mixins/field-button.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="material-password-field" theme-for="vaadin-password-field">
  <template>
    <style include="material-field-button">
      [part="reveal-button"]::before {
        content: var(--material-icons-eye);
      }

      :host([password-visible]) [part="reveal-button"]::before {
        content: var(--material-icons-eye-disabled);
      }

      /* The reveal button works also in readonly  mode */

      :host([readonly]) [part\$="button"] {
        color: var(--material-secondary-text-color);
      }

      [part="reveal-button"] {
        cursor: pointer;
      }

      [part="reveal-button"]:hover {
        color: var(--material-text-color);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
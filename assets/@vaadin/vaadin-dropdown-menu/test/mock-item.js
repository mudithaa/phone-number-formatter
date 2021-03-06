/// BareSpecifier=@vaadin\vaadin-dropdown-menu\test\mock-item
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class MockItemElement extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
`;
  }

  static get is() {
    return 'mock-item';
  }

  static get properties() {
    return {
      _hasVaadinItemMixin: {
        type: Boolean,
        value: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged'
      },
      value: {
        type: String,
        value: ''
      },
      selected: {
        type: Boolean
      }
    };
  }

  _disabledChanged(disabled) {
    if (disabled) {
      this.selected = false;
    }
  }
}

customElements.define(MockItemElement.is, MockItemElement);
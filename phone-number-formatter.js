import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `phone-number-formatter`
 * formats the input to a valid E164 phone number
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class PhoneNumberFormatter extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <input type="text" value="[[number]]" placeholder="">
    `;
  }
  static get properties() {
    return {
      label:{
        type: String,
        value: 'Phone Number'
      },
      number: {
        type: String,
        value: '',
      },
    };
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

import { html, PolymerElement } from "./node_modules/@polymer/polymer/polymer-element.js";
import "./node_modules/google-libphonenumber/dist/libphonenumber.js";
/**
 * `phone-number-formatter`
 * formats the input to a valid E164 phone number
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

export class PhoneNumberFormatter extends PolymerElement {
  constructor() {
    super(); //https://www.polymer-project.org/3.0/docs/devguide/data-system#change-events

    this.addEventListener('keyup', this.log.bind(this));
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;                    
        }
        input {
          padding:5px;
        }
      </style>
      <input type="text" value="[[number]]" placeholder="[[placeHolder]]" />`;
  }

  static get properties() {
    return {
      label: {
        type: String,
        value: 'Phone Number'
      },
      number: {
        type: String,
        value: '',
        notify: true,
        reflectToAttribute: true
      },
      placeHolder: {
        type: String,
        value: 'phone number'
      },
      countryCode: {
        type: String,
        value: 'AU'
      }
    };
  }

  log() {
    console.log(this.countryCode);
  }

}
window.customElements.define('phone-number-formatter', PhoneNumberFormatter);
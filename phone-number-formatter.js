import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'google-libphonenumber/dist/libphonenumber';
import '@polymer/iron-input/iron-input.js';

/**
 * `phone-number-formatter`
 * formats the input to a valid E164 phone number
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class PhoneNumberFormatter extends PolymerElement {
  constructor(){
    super();
    //https://www.polymer-project.org/3.0/docs/devguide/data-system#change-events
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
        label {
          margin-right:5px;
        }
      </style>     
      <label>{{label}}</label>
      <iron-input bind-value="{{number}}" >
      <input value="{{value::number}}" placeholder="[[placeHolder]]">
      </iron-input>
      <br />
      You typed: {{number}}`;
  }
  static get properties() {
    
    return {
      label:{
        type: String,
        value: 'Phone Number'
      },
      number: {
        type: String,
        value: ''
      },
      placeHolder:{
        type: String,
        value: 'phone number'
      },
      countryCode: 
      {
        type:String,
        value: 'AU'        
      },
      E164format:
      {
        type:String,
        computed:'getE164Number(number)'
      }
    };
  }

  getE164Number(number) {    
    if (number!=undefined && number!="")
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();
      var phoneNumber = instance.parse(number, "AU")
      if (typeof (phoneNumber) !== "undefined" && typeof (phoneNumber.phone) !== "undefined")
      {
        console.log(instance.isValidNumberForRegion(phoneNumber.phone, "AU"));
      }   

    }
    
  }

  log() {
    console.log(this.number);
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

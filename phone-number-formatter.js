import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'google-libphonenumber/dist/libphonenumber';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import {NeonAnimationRunnerBehavior} from '@polymer/neon-animation/neon-animation-runner-behavior.js';
import '@polymer/neon-animation/animations/scale-down-animation.js';

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
      <paper-dropdown-menu label="Country">
        <paper-listbox slot="dropdown-content" selected="1">
          <dom-repeat items="{{flags}}" selected="1">
            <template>
              <paper-item><img src="/images/{{item}}.png"</paper-item>
            </template>
          </dom-repeat>
        </paper-listbox>
      </paper-dropdown-menu>
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
      },
      flags:      
      {
        type: Array,
        computed:'getFlags()'        
      }
    };
  }

  getFlags() {
    return ['AU', 'US', 'IN', 'LK', 'GB', 'JP', 'FR', 'IN', 'NZ'];
  }
  getE164Number(number) {    
    if (number!=undefined && number!="")
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();
      var phoneNumber = instance.parse(number, "AU")
      if (typeof (phoneNumber) !== "undefined" && typeof (phoneNumber.phone) !== "undefined")
      {
        console.log(instance.isValidNumberForRegion(phoneNumber.phone, "AU"));
        console.log(phoneNumber); 
      }   
      
    }
    
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

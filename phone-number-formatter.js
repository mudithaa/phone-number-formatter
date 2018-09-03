import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'google-libphonenumber/dist/libphonenumber';
import '@polymer/iron-input/iron-input.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu.js';

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
        vaadin-dropdown-menu{
          width: 80px;          
          background-color:#ffffff;
        }
        vaadin-item{
          width: 80px;
          text-align: center;
        }
        vaadin-item img{
          width: 40px;
          height: 20px;
          border: solid 1px #000000;
        }
      </style>     
      <label>{{label}}</label>
           
      <vaadin-dropdown-menu>
      <template>
        <vaadin-list-box>
        <dom-repeat items="{{flags}}" value="{{countryCode}}">
          <template>
            <vaadin-item value={{item}}><img src="/images/{{item}}.png"</vaadin-item>
          </template>
        </dom-repeat>
        </vaadin-list-box>
      </template>
    </vaadin-dropdown-menu>
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
      },
      flags:      
      {
        type: Array,
        computed:'getFlags()'        
      }
    };
  }

  getFlags() {
    return ['AU','US','IN','LK','GB','JP','FR','NZ'].sort();
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

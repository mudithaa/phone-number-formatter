import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'google-libphonenumber/dist/libphonenumber.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu.js';
import '@polymer/polymer/lib/utils/resolve-url.js';

//import lk from "../src/images/lk.png";

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
    this.addEventListener('number-changed', this.numberChanged);
    this.addEventListener('country-code-changed', this.countryCodeChanged);
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
          height:50px;       
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
        input textbox{
          padding: 9px 10px;
    background: #f4f4f4;
    border: 1px solid #e8e8e9;
        }
      </style>     
      <label>{{label}}</label>
      <img src="{{lk}}">
      <vaadin-dropdown-menu value="{{countryCode}}">
      <template>
        <vaadin-list-box  >
        <dom-repeat items="{{flags}}">
          <template>
            <vaadin-item value={{item}}><img src="{{item}}"</vaadin-item>
            {{item}}
          </template>
        </dom-repeat>
        </vaadin-list-box>
      </template>
    </vaadin-dropdown-menu>
    <iron-input bind-value="{{number}}" > 
      <input value="{{value::number}}" placeholder="[[placeHolder]]">
    </iron-input>
    <iron-icon icon="icons:check"></iron-icon>
    <template is="dom-if" if="{{debug===true}}">
      <br />
      You typed: {{number}}
      <br />
      Country Code: {{countryCode}}
      <br/>
      Formatted Number: {{response.e164format}}
      <br />
      Region Prefix: {{response.regionPrefix}}
      <br />
      Is Valid: {{response.isValid}}
      <br />
      {{images}}
    </template>`;
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
        notify:true,
      },
      debug: {
        type:Boolean,
        value: false
      },
      placeHolder:{
        type: String,
        value: 'phone number'
      },
      countryCode: 
      {
        type:String, 
        notify:true,     
      },
      response: {
        type: Object,
        readOnly: true,
        notify: true
      }
    };
  }

numberChanged(){
  var result = {
    isValid:false,
    e164format:'',
    regionPrefix:'',
    nationalFormat: ''
  };   

  if (this.number!=undefined && this.number!="" && this.number.length>4)
  {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();
      
      var phoneNumber = instance.parse(this.number, this.countryCode)
      console.log(instance.getRegionCodeForNumber(phoneNumber));

      if(typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.getRegionCodeForNumber(phoneNumber)!=="undefined" 
      && instance.getRegionCodeForNumber(phoneNumber)!==null){
        this.countryCode = instance.getRegionCodeForNumber(phoneNumber);
      }

      if (typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.isValidNumberForRegion(phoneNumber, this.countryCode))
      {        
        var regionPrefix = instance.getCountryCodeForRegion(this.countryCode);
        var e164format = instance.formatOutOfCountryCallingNumber(phoneNumber);
        result = {
          e164format: e164format, 
          regionPrefix : regionPrefix, 
          nationalFormat: phoneNumber.getNationalNumber(), 
          isValid: true
        };
        console.log(result); 
        console.log(phoneNumber);
      }
    }

    this._setResponse(result);
}

countryCodeChanged() { 
  var result = {
    isValid:false,
    e164format:'',
    regionPrefix:'',
    nationalFormat: ''
  };   
    if (this.number!=undefined && this.number!="" && this.number.length>4)
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();      
      var phoneNumber = instance.parse(this.number, this.countryCode);
      if (typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.isValidNumberForRegion(phoneNumber, this.countryCode))
      {        
        var regionPrefix = instance.getCountryCodeForRegion(this.countryCode);
        var e164format = instance.formatOutOfCountryCallingNumber(phoneNumber);
        result = {
          e164format: e164format, 
          regionPrefix : regionPrefix, 
          nationalFormat: phoneNumber.getNationalNumber(), 
          isValid: true
        };
        console.log(result); 
        console.log(phoneNumber);
      }
    }

    this._setResponse(result);
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'google-libphonenumber/dist/libphonenumber.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
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
      <vaadin-dropdown-menu value="{{countryCode}}">
      <template>
        <vaadin-list-box>
        <dom-repeat items="{{flags}}">
          <template>
            <vaadin-item value={{item}}><img src="../src/images/{{item}}.png"</vaadin-item>
          </template>
        </dom-repeat>
        </vaadin-list-box>
      </template>
    </vaadin-dropdown-menu>
    <input value="{{number::input}}" placeholder="[[placeHolder]]">
    
    <template is="dom-if" if="[[debugInfo]]">
      <br />
      debuginfo: [[debugInfo]]
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
        reflectToAttribute:true
      },
      debugInfo: {
        type:Boolean,
        value:false
      },
      placeHolder:{
        type: String,
        value: 'phone number'
      },
      countryCode: 
      {
        type:String, 
        notify:true,   
        reflectToAttribute:true  
      },
      flags:{
        type:Array,
        computed:'getFlags()'        
      },
      response: {
        type: Object,
        readOnly: true,
        notify: true,
        reflectToAttribute:true
      }
    };
  }

  getFlags() {
    return ['AU','US','IN','LK','GB','JP','FR','NZ','CN','SA', 'AE', 'LB', 'DE'].sort();
  }

  clearResponse(){
    var result = {
      isValid:false,
      e164format:'',
      regionPrefix:'',
      nationalFormat: ''
    };   
    this._setResponse(result);
  }

  setResponse(instance, phoneNumber){
    var regionPrefix = instance.getCountryCodeForRegion(this.countryCode);
    var e164format = instance.formatOutOfCountryCallingNumber(phoneNumber);
    var nationalNumber = instance.formatNationalNumberWithCarrierCode(phoneNumber);
    var result = {
      e164format: e164format, 
      regionPrefix : regionPrefix, 
      nationalFormat: nationalNumber, 
      isValid: true
    };
    this.number = nationalNumber;
    this._setResponse(result);
  }

  numberChanged(){
    this.clearResponse();

    if (this.isValidNumber(this.number))
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();      
      var phoneNumber = instance.parse(this.number, this.countryCode);

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
        this.setResponse(instance, phoneNumber);
      }
    }
  }

  countryCodeChanged() { 
    this.clearResponse();
    if (this.isValidNumber(this.number))
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();      
      var phoneNumber = instance.parse(this.number, this.countryCode);

      if (typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.isValidNumberForRegion(phoneNumber, this.countryCode))
      {        
        this.setResponse(instance, phoneNumber);        
      }
    }
  }

  isValidNumber(number){
    var pattern = /^\+?(9[976][0-9]|8[987530][0-9]|6[987][0-9]|5[90][0-9]|42[0-9]|3[875][0-9]|2[98654321][0-9]|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1|0)[0-9]{1,14}$/
    if (number!=undefined 
      && number!="" 
      && number.length>4
      && number.match(pattern)){
      return true;
    }
    return false;
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

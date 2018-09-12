import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'google-libphonenumber/dist/libphonenumber';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-icon/iron-icon.js';
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
           
      <vaadin-dropdown-menu value="{{countrycode}}">
      <template>
        <vaadin-list-box  >
        <dom-repeat items="{{flags}}">
          <template>
            <vaadin-item value={{item}}><img src="../images/{{item}}.png"</vaadin-item>
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
      Country Code: {{countrycode}}
      <br/>
      Formatted Number: {{result.e164format}}
      <br />
      Region Prefix: {{result.regionPrefix}}
      <br />
      Is Valid: {{result.isValid}}
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
        value: ''
      },
      debug: {
        type:Boolean,
        value: false
      },
      placeHolder:{
        type: String,
        value: 'phone number'
      },
      countrycode: 
      {
        type:String,      
      },
      result:
      {
        computed:'formatInput(number, countrycode)'
      },
      flags:      
      {
        type: Array,
        computed:'getFlags()'        
      }
    };
  }

  getFlags() {
    return ['AU','US','IN','LK','GB','JP','FR','NZ','CN','SA','HK'].sort();
  }
  formatInput(number, countrycode) { 
    var result = {
      isValid:false,
      e164format:'',
      regionPrefix:'',
      nationalFormat: ''
    };    
    if (this.number!=undefined && this.number!="" && this.number.length>4)
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();
      
      var phoneNumber = instance.parse(this.number, this.countrycode)
      console.log(instance.getRegionCodeForNumber(phoneNumber));

      if(typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.getRegionCodeForNumber(phoneNumber)!=="undefined" 
      && instance.getRegionCodeForNumber(phoneNumber)!==null){
        this.countrycode = instance.getRegionCodeForNumber(phoneNumber);
      }

      if (typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.isValidNumberForRegion(phoneNumber, this.countrycode))
      {        
        var regionPrefix = instance.getCountryCodeForRegion(this.countrycode);
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

    return result;
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

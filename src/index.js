import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@webcomponents/webcomponentsjs/webcomponents-loader.js';
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
          --vaadin-dropdown-menu-text-field-z-index: 12000px;                  
        }
        input {
          @apply --phone-number-formatter-input-theme         
        }
        label {
          margin-right:5px;
          @apply --phone-number-formatter-label-theme
        }
        vaadin-dropdown-menu{
          width: 80px;
          z-index: 12000;          
        }
        vaadin-list-box{
          z-index: 12000;
        }
        div.vaadin-text-field-container{
          max-height:36px;          
          @apply --phone-number-formatter-select-theme
        }
        vaadin-item{          
          @apply --phone-number-formatter-option-theme
        }
        vaadin-item img{
          width: 40px;
          border: solid 1px #000000;
          @apply --phone-number-formatter-option-image-theme
        }
      </style>     
      <label>{{label}}</label>
    
    <vaadin-dropdown-menu value="{{countryCode}}">
      <template>
        <vaadin-list-box>
        <dom-repeat items="{{flags}}">
          <template>
            <vaadin-item value={{item}}><img src="{{imageUrl}}/{{item}}.png"</vaadin-item>
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
      validationMessage:{
        type:String,
        notify:true,
        reflectToAttribute:true,
        value:'Phone number is not valid'
      },
      flags:{
        type:Array,
        computed:'getFlags()'        
      },
      imageUrl:{
        type:String,
        notify:false,
        value:'/images/'
      },
      response: {
        type: Object,
        readOnly: true,
        notify: true,
        reflectToAttribute:true
      }
    };
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
    var result = {
      isValid:false,
      e164format:'',
      regionPrefix:'',
      nationalFormat: ''
    };   
    
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
        var regionPrefix = instance.getCountryCodeForRegion(this.countryCode);
        var e164format = instance.formatOutOfCountryCallingNumber(phoneNumber);
        var nationalNumber = instance.formatNationalNumberWithCarrierCode(phoneNumber);
        result = {
          e164format: e164format, 
          regionPrefix : regionPrefix, 
          nationalFormat: nationalNumber, 
          isValid: true
        };
       
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
    if (this.isValidNumber(this.number))
    {
      var instance = libphonenumber.PhoneNumberUtil.getInstance();      
      var phoneNumber = instance.parse(this.number, this.countryCode);

      if (typeof (phoneNumber) !== "undefined" 
      && instance.isPossibleNumber(phoneNumber) 
      && instance.isValidNumberForRegion(phoneNumber, this.countryCode))
      {        
        var regionPrefix = instance.getCountryCodeForRegion(this.countryCode);
        var e164format = instance.formatOutOfCountryCallingNumber(phoneNumber);
        var nationalNumber = instance.formatNationalNumberWithCarrierCode(phoneNumber);
        result = {
          e164format: e164format, 
          regionPrefix : regionPrefix, 
          nationalFormat: nationalNumber, 
          isValid: true
        };        
      }
    }
    this._setResponse(result);
  }

  isValidNumber(number){    
    if (number!=undefined 
      && number!="" 
      && number.length>4){
        return true;
      }
    return false;
  }

  getFlags(){
    return ["ad","ae","af","ag","al","am","ao","ar","at","au","az",
    "ba","bb","bd","be","bf","bg","bh","bi","bj","bn","bo","br","bs","bt","bw","by","bz",
    "ca","cd",
    "cf",
    "cg",
    "ch",
    "ci",
    "cl",
    "cm",
    "cn",
    "co",
    "cr",
    "cu",
    "cv",
    "cy",
    "cz",
    "de",
    "dj",
    "dk",
    "dm",
    "do",
    "dz",
    "ec",
    "ee",
    "eg",
    "eh",
    "er",
    "es",
    "et",
    "fi",
    "fj",
    "fm",
    "fr",
    "ga",
    "gb",
    "gd",
    "ge",
    "gh",
    "gm",
    "gn",
    "gq",
    "gr",
    "gt",
    "gw",
    "gy",
    "hn",
    "hr",
    "ht",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "iq",
    "ir",
    "is",
    "it",
    "jm",
    "jo",
    "jp",
    "ke",
    "kg",
    "kh",
    "ki",
    "km",
    "kn",
    "kp",
    "kr",
    "ks",
    "kw",
    "kz",
    "la",
    "lb",
    "lc",
    "li",
    "lk",
    "lr",
    "ls",
    "lt",
    "lu",
    "lv",
    "ly",
    "ma",
    "mc",
    "md",
    "me",
    "mg",
    "mh",
    "mk",
    "ml",
    "mm",
    "mn",
    "mr",
    "mt",
    "mu",
    "mv",
    "mw",
    "mx",
    "my",
    "mz",
    "na",
    "ne",
    "ng",
    "ni",
    "nl",
    "no",
    "np",
    "nr",
    "nz",
    "om",
    "pa",
    "pe",
    "pg",
    "ph",
    "pk",
    "pl",
    "pt",
    "pw",
    "py",
    "qa",
    "ro",
    "rs",
    "ru",
    "rw",
    "sa",
    "sb",
    "sc",
    "sd",
    "se",
    "sg",
    "si",
    "sk",
    "sl",
    "sm",
    "sn",
    "so",
    "sr",
    "st",
    "sv",
    "sy",
    "sz",
    "td",
    "tg",
    "th",
    "tj",
    "tl",
    "tm",
    "tn",
    "to",
    "tr",
    "tt",
    "tv",
    "tw",
    "tz",
    "ua",
    "ug",
    "us",
    "uy",
    "uz",
    "va",
    "vc",
    "ve",
    "vn",
    "vu",
    "ws",
    "ye",
    "za",
    "zm",
    "zw"].sort();
  }
}

window.customElements.define('phone-number-formatter', PhoneNumberFormatter);

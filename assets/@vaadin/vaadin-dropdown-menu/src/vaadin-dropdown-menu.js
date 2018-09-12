/// BareSpecifier=@vaadin\vaadin-dropdown-menu\src\vaadin-dropdown-menu
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/polymer/lib/elements/custom-style.js';
import { ThemableMixin } from '../../vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ControlStateMixin } from '../../vaadin-control-state-mixin/vaadin-control-state-mixin.js';
import { IronResizableBehavior } from '../../../@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '../../../@polymer/iron-media-query/iron-media-query.js';
import { ElementMixin } from '../../vaadin-element-mixin/vaadin-element-mixin.js';
import './vaadin-dropdown-menu-overlay.js';
import './vaadin-dropdown-menu-text-field.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '../../../@polymer/polymer/lib/legacy/class.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: "vaadin-dropdown-menu-icons";
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAASEAAsAAAAABDgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIGKmNtYXAAAAFoAAAAVAAAAFQXVtKHZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAHwAAAB8CohkJ2hlYWQAAAJAAAAANgAAADYOavgEaGhlYQAAAngAAAAkAAAAJAarA8ZobXR4AAACnAAAABQAAAAUCAABP2xvY2EAAAKwAAAADAAAAAwAKABSbWF4cAAAArwAAAAgAAAAIAAHABduYW1lAAAC3AAAAYYAAAGGmUoJ+3Bvc3QAAARkAAAAIAAAACAAAwAAAAMEAAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QADwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkA//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQE/AUAC6QIVABQAAAEwFx4BFxYxMDc+ATc2MTAjKgEjIgE/ISJPIiEhIk8iIUNCoEJDAhUhIk8iISEiTyIhAAEAAAABAABvL5bdXw889QALBAAAAAAA1jHaeQAAAADWMdp5AAAAAALpAhUAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAAukAAQAAAAAAAAAAAAAAAAAAAAUEAAAAAAAAAAAAAAAAAAAABAABPwAAAAAACgAUAB4APgABAAAABQAVAAEAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
/**
 * `<vaadin-dropdown-menu>` is a Web Component for selecting values from a list of items.
 *
 * ```
 * <vaadin-dropdown-menu>
 *   <template>
 *     <vaadin-list-box>
 *       <vaadin-item label="foo">Foo</vaadin-item>
 *       <vaadin-item>Bar</vaadin-item>
 *       <vaadin-item>Baz</vaadin-item>
 *     </vaadin-list-box>
 *   </template>
 * </vaadin-dropdown-menu>
 * ```
 *
 * Hint: By setting the `label` property of inner vaadin-items you will
 * be able to change the visual representation of the selected value in the input part.
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `toggle-button` | The toggle button
 *
 * The following state attributes are available for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `opened` | Set when the dropdown menu is open | :host
 * `invalid` | Set when the element is invalid | :host
 * `focused` | Set when the element is focused | :host
 * `focus-ring` | Set when the element is keyboard focused | :host
 * `readonly` | Set when the dropdown menu is read only | :host
 *
 * `<vaadin-dropdown-menu>` element sets these custom CSS properties:
 *
 * Property name | Description | Theme for element
 * --- | --- | ---
 * `--vaadin-dropdown-menu-text-field-width` | Width of the menu text field | `vaadin-dropdown-menu-overlay`
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @memberof Vaadin
 * @mixes Vaadin.ElementMixin
 * @mixes Vaadin.ControlStateMixin
 * @mixes Vaadin.ThemableMixin
 * @demo demo/index.html
 */
class DropdownMenuElement extends ElementMixin(ControlStateMixin(ThemableMixin(mixinBehaviors(IronResizableBehavior, PolymerElement)))) {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-block;
      }

      vaadin-dropdown-menu-text-field {
        width: 100%;
        min-width: 0;
      }

      :host([hidden]) {
        display: none !important;
      }

      [part="toggle-button"] {
        font-family: "vaadin-dropdown-menu-icons";
      }

      [part="toggle-button"]::before {
        content: "\\e900";
      }
    </style>

    <vaadin-dropdown-menu-text-field placeholder="[[placeholder]]" label="[[label]]" required="[[required]]" invalid="[[invalid]]" error-message="[[errorMessage]]" readonly\$="[[readonly]]">
      <slot name="prefix" slot="prefix"></slot>
      <div part="value"></div>
      <div part="toggle-button" slot="suffix" role="button" aria-label="Toggle"></div>
    </vaadin-dropdown-menu-text-field>
    <vaadin-dropdown-menu-overlay opened="{{opened}}" with-backdrop="[[_phone]]" phone\$="[[_phone]]"></vaadin-dropdown-menu-overlay>

    <iron-media-query query="[[_phoneMediaQuery]]" query-matches="{{_phone}}">
    </iron-media-query>
`;
  }

  static get is() {
    return 'vaadin-dropdown-menu';
  }

  static get version() {
    return '1.1.0';
  }

  static get properties() {
    return {
      /**
       * Set when the dropdown menu is open
       */
      opened: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: '_openedChanged'
      },

      /**
       * The error message to display when the dropdown menu value is invalid
       */
      errorMessage: {
        type: String,
        value: ''
      },

      /**
       * String used for the label element.
       */
      label: {
        type: String
      },

      /**
       * It stores the the `value` property of the selected item, providing the
       * value for iron-form.
       * When there’s an item selected, it's the value of that item, otherwise
       * it's an empty string.
       * On change or initialization, the component finds the item which matches the
       * value and displays it.
       * If no value is provided to the component, it selects the first item without
       * value or empty value.
       * Hint: If you do not want to select any item by default, you can either set all
       * the values of inner vaadin-items, or set the vaadin-dropdown-menu value to
       * an inexistent value in the items list.
       */
      value: {
        type: String,
        value: '',
        notify: true,
        observer: '_valueChanged'
      },

      /**
       * The current required state of the dropdown menu. True if required.
       */
      required: {
        type: Boolean,
        reflectToAttribute: true,
        observer: '_requiredChanged'
      },

      /**
       * Set to true if the value is invalid.
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false
      },

      /**
       * The name of this element.
       */
      name: {
        type: String,
        reflectToAttribute: true
      },

      /**
       * A hint to the user of what can be entered in the control.
       * The placeholder will be displayed in the case that there
       * is no item selected, or the selected item has an empty
       * string label, or the selected item has no label and it's
       * DOM content is empty.
       */
      placeholder: {
        type: String
      },

      /**
       * When present, it specifies that the element is read-only.
       */
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      _phone: Boolean,

      _phoneMediaQuery: {
        value: '(max-width: 420px), (max-height: 420px)'
      },

      _overlayElement: Object,

      _inputElement: Object,

      _toggleElement: Object,

      _items: Object
    };
  }

  static get observers() {
    return ['_updateSelectedItem(value, _items)', '_updateAriaExpanded(opened, _toggleElement)'];
  }

  /** @private */
  constructor() {
    super();
    this._boundSetPosition = this._setPosition.bind(this);
  }

  /** @private */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-resize', this._boundSetPosition);
  }

  ready() {
    super.ready();

    this._overlayElement = this.shadowRoot.querySelector('vaadin-dropdown-menu-overlay');
    this._valueElement = this.shadowRoot.querySelector('[part="value"]');
    this._toggleElement = this.shadowRoot.querySelector('[part="toggle-button"]');
    this._nativeInput = this.focusElement.shadowRoot.querySelector('input');
    this._nativeInput.setAttribute('aria-hidden', true);
    this._nativeInput.setAttribute('tabindex', -1);
    this._nativeInput.style.pointerEvents = 'none';

    this.focusElement.addEventListener('click', e => this.opened = !this.readonly);
    this.focusElement.addEventListener('keydown', e => this._onKeyDown(e));

    const template = this.querySelector('template');
    this._overlayElement.template = template;
    if (this._overlayElement.content) {
      const origForwardHostProp = this._overlayElement._instance && this._overlayElement._instance.forwardHostProp;

      this._overlayElement._instance.forwardHostProp = (...args) => {
        origForwardHostProp.apply(this._overlayElement._instance, args);
        setTimeout(() => {
          this._updateValueSlot();
        });
      };

      this._menuElement = Array.from(this._overlayElement.content.children).filter(element => element.localName !== 'style')[0];

      if (this._menuElement) {
        this._menuElement.addEventListener('items-changed', e => {
          this._items = this._menuElement.items;
        });
        this._menuElement.addEventListener('selected-changed', () => this._updateValueSlot());
        this._menuElement.addEventListener('keydown', e => this._onKeyDownInside(e));
        this._menuElement.addEventListener('click', e => this.opened = false);
      }
    }
  }

  /** @protected */
  get focusElement() {
    return this._inputElement || (this._inputElement = this.shadowRoot.querySelector('vaadin-dropdown-menu-text-field'));
  }

  /** @private */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('iron-resize', this._boundSetPosition);
    // Making sure the dropdown is closed and removed from DOM after detaching the dropdown.
    this.opened = false;
  }

  /** @private */
  notifyResize() {
    super.notifyResize();
    if (this.positionTarget && this.opened) {
      this._setPosition();
      // Schedule another position update (to cover virtual keyboard opening for example)
      requestAnimationFrame(this._setPosition.bind(this));
    }
  }

  _requiredChanged(required) {
    this.setAttribute('aria-required', required);
  }

  _valueChanged(value, oldValue) {
    if (value === '') {
      this.focusElement.removeAttribute('has-value');
    } else {
      this.focusElement.setAttribute('has-value', '');
    }

    // Skip validation for the initial empty string value
    if (value === '' && oldValue === undefined) {
      return;
    }
    this.validate();
  }

  _onKeyDown(e) {
    if (!this.readonly && !this.opened && /^(ArrowDown|Down|ArrowUp|Up|Enter|SpaceBar| )$/.test(e.key)) {
      e.preventDefault();
      this.opened = true;
    }
  }

  _onKeyDownInside(e) {
    if (/^(Tab)$/.test(e.key)) {
      this.opened = false;
    }
  }

  _openedChanged(opened, wasOpened) {
    if (!this._overlayElement || !this._menuElement || !this._toggleElement || !this.focusElement || this.disabled || this.readonly) {
      this.opened = false;
      return;
    }

    if (opened) {
      this._openedWithFocusRing = this.hasAttribute('focus-ring') || this.focusElement.hasAttribute('focus-ring');
      this._menuElement.focus();
      this._setPosition();
      window.addEventListener('scroll', this._boundSetPosition, true);
    } else if (wasOpened) {
      if (this._phone) {
        this._setFocused(false);
      } else {
        this.focusElement.focus();
        if (this._openedWithFocusRing) {
          this.focusElement.setAttribute('focus-ring', '');
        }
      }
      this.validate();
      window.removeEventListener('scroll', this._boundSetPosition, true);
    }
  }

  _hasContent(selected) {
    if (!selected) {
      return false;
    }
    return Boolean(selected.hasAttribute('label') ? selected.getAttribute('label') : selected.textContent.trim() || selected.children.length);
  }

  _attachSelectedItem(selected) {
    if (!selected) {
      return;
    }
    let labelItem;
    if (selected.hasAttribute('label')) {
      labelItem = document.createElement('vaadin-item');
      labelItem.textContent = selected.getAttribute('label');
    } else {
      labelItem = selected.cloneNode(true);
    }

    labelItem.removeAttribute('tabindex');

    this._valueElement.appendChild(labelItem);

    labelItem.selected = true;
  }

  _updateAriaExpanded(opened, toggleElement) {
    toggleElement && toggleElement.setAttribute('aria-expanded', opened);
  }

  _updateValueSlot() {
    this.opened = false;
    this._valueElement.innerHTML = '';

    const selected = this._items[this._menuElement.selected];

    const hasContent = this._hasContent(selected);

    // Toggle visibility of _valueElement vs fallback input with placeholder
    this._valueElement.slot = hasContent ? 'value' : '';

    // Ensure the slot distribution to apply correct style scope for cloned item
    if (hasContent && window.ShadyDOM) {
      window.ShadyDOM.flush();
    }

    this._attachSelectedItem(selected);

    if (!this._valueChanging && selected) {
      this._selectedChanging = true;
      this.value = selected.value || '';
      delete this._selectedChanging;
    }
  }

  _updateSelectedItem(value, items) {
    if (items) {
      this._menuElement.selected = items.reduce((prev, item, idx) => {
        return prev === undefined && item.value === value ? idx : prev;
      }, undefined);
      if (!this._selectedChanging) {
        this._valueChanging = true;
        this._updateValueSlot();
        delete this._valueChanging;
      }
    }
  }

  /** @override */
  _setFocused(focused) {
    // Keep `focused` state when opening the overlay for styling purpose.
    super._setFocused(this.opened || focused);
    this.focusElement._setFocused(this.hasAttribute('focused'));
    !this.hasAttribute('focused') && this.validate();
  }

  _setPosition() {
    const inputRect = this._inputElement.shadowRoot.querySelector('[part~="input-field"]').getBoundingClientRect();
    const viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
    const bottomAlign = inputRect.top > (viewportHeight - inputRect.height) / 2;

    this._overlayElement.style.left = inputRect.left + 'px';
    if (bottomAlign) {
      this._overlayElement.setAttribute('bottom-aligned', '');
      this._overlayElement.style.removeProperty('top');
      this._overlayElement.style.bottom = viewportHeight - inputRect.bottom + 'px';
    } else {
      this._overlayElement.removeAttribute('bottom-aligned');
      this._overlayElement.style.removeProperty('bottom');
      this._overlayElement.style.top = inputRect.top + 'px';
    }

    this._overlayElement.updateStyles({ '--vaadin-dropdown-menu-text-field-width': inputRect.width + 'px' });
  }

  /**
   * Returns true if `value` is valid, and sets the `invalid` flag appropriately.
   *
   * @return {boolean} True if the value is valid and sets the `invalid` flag appropriately
   */
  validate() {
    return !(this.invalid = !(this.disabled || !this.required || this.value));
  }
}

customElements.define(DropdownMenuElement.is, DropdownMenuElement);

export { DropdownMenuElement };
/// BareSpecifier=@vaadin\vaadin-text-field\src\vaadin-text-area
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';

import { TextFieldMixin } from './vaadin-text-field-mixin.js';
import { ElementMixin } from '../../vaadin-element-mixin/vaadin-element-mixin.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { ThemableMixin } from '../../vaadin-themable-mixin/vaadin-themable-mixin.js';
/**
 * `<vaadin-text-area>` is a Web Component for text area control in forms.
 *
 * ```html
 * <vaadin-text-area label="Add description">
 * </vaadin-text-area>
 * ```
 *
 * ### Prefixes and suffixes
 *
 * These are child elements of a `<vaadin-text-area>` that are displayed
 * inline with the input, before or after.
 * In order for an element to be considered as a prefix, it must have the slot
 * attribute set to `prefix` (and similarly for `suffix`).
 *
 * ```html
 * <vaadin-text-area label="Add description">
 *   <div slot="prefix">Details:</div>
 *   <div slot="suffix">The end!</div>
 * </vaadin-text-area>
 * ```
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `label` | The label element
 * `input-field` | The element that wraps prefix, value and suffix
 * `value` | The text value element inside the `input-field` element
 * `error-message` | The error message element
 *
 * The following state attributes are available for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `disabled` | Set to a disabled text field | :host
 * `has-value` | Set when the element has a value | :host
 * `has-label` | Set when the element has a label | :host
 * `invalid` | Set when the element is invalid | :host
 * `focused` | Set when the element is focused | :host
 * `focus-ring` | Set when the element is keyboard focused | :host
 * `readonly` | Set to a readonly text field | :host
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @memberof Vaadin
 * @mixes Vaadin.TextFieldMixin
 * @mixes Vaadin.ThemableMixin
 * @demo demo/index.html
 */
class TextAreaElement extends ElementMixin(TextFieldMixin(ThemableMixin(PolymerElement))) {
  static get template() {
    return html`
    <style include="vaadin-text-field-shared-styles">
      .vaadin-text-area-container {
        flex: auto;
        max-height: inherit; /* MSIE 11 */
        min-height: inherit; /* MSIE 11 */
      }

      /* The label and the error message should neither grow nor shrink. */
      [part="label"],
      [part="error-message"] {
        flex: none;
      }

      [part="input-field"] {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      [part="value"] {
        resize: none;
      }

      [part="value"],
      [part="input-field"] ::slotted(*) {
        align-self: flex-start;
      }
    </style>

    <div class="vaadin-text-area-container">

      <label part="label" on-click="focus" id="[[_labelId]]">[[label]]</label>

      <div part="input-field">

        <slot name="prefix"></slot>

        <textarea part="value" autocomplete\$="[[autocomplete]]" autocorrect\$="[[autocorrect]]" autocapitalize\$="[[autocapitalize]]" autofocus\$="[[autofocus]]" disabled\$="[[disabled]]" maxlength\$="[[maxlength]]" minlength\$="[[minlength]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" aria-readonly\$="[[readonly]]" required\$="[[required]]" aria-required\$="[[required]]" value="{{value::input}}" on-blur="validate" on-input="_onInput" on-change="_onChange" aria-describedby\$="[[_getActiveErrorId(invalid, errorMessage, _errorId)]]" aria-labelledby\$="[[_getActiveLabelId(label, _labelId)]]" aria-invalid\$="[[invalid]]"></textarea>

        <slot name="suffix"></slot>

      </div>

      <div part="error-message" id="[[_errorId]]" aria-live="assertive" aria-hidden\$="[[_getErrorMessageAriaHidden(invalid, errorMessage, _errorId)]]">[[errorMessage]]</div>

    </div>
`;
  }

  static get is() {
    return 'vaadin-text-area';
  }

  static get version() {
    return '2.1.2';
  }

  static get observers() {
    return ['_textAreaValueChanged(value)'];
  }

  ready() {
    super.ready();
    this._updateHeight();
  }

  _textAreaValueChanged(value) {
    this._updateHeight();
  }

  _updateHeight() {
    const inputField = this.root.querySelector('[part=input-field]');
    const scrollTop = inputField.scrollTop;
    const input = this.focusElement;

    const inputWidth = getComputedStyle(input).width;

    const valueLength = this.value ? this.value.length : 0;
    // Only clear the height when the content shortens to minimize scrollbar flickering.
    if (this._oldValueLength >= valueLength) {
      // Fix the input element width so its scroll height isn't affected by host's disappearing scrollbars
      input.style.maxWidth = inputWidth;
      input.style.height = 'auto';
      // Avoid a jumpy Safari rendering issue
      inputField.style.display = 'block';
    }
    this._oldValueLength = valueLength;

    const inputHeight = input.scrollHeight;
    if (inputHeight > input.clientHeight) {
      input.style.height = inputHeight + 'px';
    }

    // Restore
    input.style.removeProperty('max-width');
    inputField.style.removeProperty('display');
    inputField.scrollTop = scrollTop;
  }
}

customElements.define(TextAreaElement.is, TextAreaElement);

export { TextAreaElement };
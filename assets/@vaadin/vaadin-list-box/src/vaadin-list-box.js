/// BareSpecifier=@vaadin\vaadin-list-box\src\vaadin-list-box
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';

import { ThemableMixin } from '../../vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ListMixin } from '../../vaadin-list-mixin/vaadin-list-mixin.js';
import { ElementMixin } from '../../vaadin-element-mixin/vaadin-element-mixin.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * `<vaadin-list-box>` is a Web Component for creating menus.
 *
 * ```
 *   <vaadin-list-box selected="2">
 *     <vaadin-item>Item 1</vaadin-item>
 *     <vaadin-item>Item 2</vaadin-item>
 *     <vaadin-item>Item 3</vaadin-item>
 *     <vaadin-item>Item 4</vaadin-item>
 *   </vaadin-list-box>
 * ```
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name         | Description
 * ------------------|------------------------
 * `items`           | The items container
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @memberof Vaadin
 * @mixes Vaadin.ListMixin
 * @mixes Vaadin.ThemableMixin
 * @demo demo/index.html
 */
class ListBoxElement extends ElementMixin(ListMixin(ThemableMixin(PolymerElement))) {
  static get template() {
    return html`
    <style>
      :host {
        display: flex;
      }

      :host([hidden]) {
        display: none !important;
      }

      [part="items"] {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    </style>
    <div part="items">
      <slot></slot>
    </div>
`;
  }

  static get is() {
    return 'vaadin-list-box';
  }

  static get version() {
    return '1.1.0';
  }

  static get properties() {
    return {
      // We don't need to define this property since super default is vertical,
      // but we don't want it to be modified, or be shown in the API docs.
      /** @private */
      orientation: {
        readOnly: true
      }
    };
  }

  ready() {
    super.ready();
    this.setAttribute('role', 'list');
  }

  get _scrollerElement() {
    return this.shadowRoot.querySelector('[part="items"]');
  }
}

customElements.define(ListBoxElement.is, ListBoxElement);

export { ListBoxElement };
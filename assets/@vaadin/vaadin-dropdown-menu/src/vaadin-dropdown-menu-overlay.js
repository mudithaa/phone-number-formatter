/// BareSpecifier=@vaadin\vaadin-dropdown-menu\src\vaadin-dropdown-menu-overlay
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import '../../../@polymer/polymer/lib/elements/dom-module.js';

import { OverlayElement } from '../../vaadin-overlay/src/vaadin-overlay.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="vaadin-dropdown-menu-overlay-styles" theme-for="vaadin-dropdown-menu-overlay">
  <template>
    <style>
      :host {
        align-items: flex-start;
        justify-content: flex-start;
        z-index:15000;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
  * The overlay element.
  *
  * ### Styling
  *
  * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/src/vaadin-overlay.html)
  * for `<vaadin-dropdown-menu-overlay>` parts.
  *
  * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
  *
  * @memberof Vaadin
  * @extends Vaadin.OverlayElement
  */
class DropdownMenuOverlayElement extends OverlayElement {
  static get is() {
    return 'vaadin-dropdown-menu-overlay';
  }
}
customElements.define(DropdownMenuOverlayElement.is, DropdownMenuOverlayElement);
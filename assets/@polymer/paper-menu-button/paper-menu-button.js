/// BareSpecifier=@polymer\paper-menu-button\paper-menu-button
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../polymer/polymer-legacy.js';
import '../iron-dropdown/iron-dropdown.js';
import '../neon-animation/animations/fade-in-animation.js';
import '../neon-animation/animations/fade-out-animation.js';
import '../paper-styles/default-theme.js';
import '../paper-styles/shadow.js';
import './paper-menu-button-animations.js';

import { IronA11yKeysBehavior } from '../iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import { IronControlState } from '../iron-behaviors/iron-control-state.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
import { dom } from '../polymer/lib/legacy/polymer.dom.js';
import { html } from '../polymer/lib/utils/html-tag.js';

var config = {
  ANIMATION_CUBIC_BEZIER: 'cubic-bezier(.3,.95,.5,1)',
  MAX_ANIMATION_TIME_MS: 400
};

/**
Material design: [Dropdown
buttons](https://www.google.com/design/spec/components/buttons.html#buttons-dropdown-buttons)

`paper-menu-button` allows one to compose a designated "trigger" element with
another element that represents "content", to create a dropdown menu that
displays the "content" when the "trigger" is clicked.

The child element assigned to the `dropdown-trigger` slot will be used as the
"trigger" element. The child element assigned to the `dropdown-content` slot
will be used as the "content" element.

The `paper-menu-button` is sensitive to its content's `iron-select` events. If
the "content" element triggers an `iron-select` event, the `paper-menu-button`
will close automatically.

Example:

    <paper-menu-button>
      <paper-icon-button icon="menu"
slot="dropdown-trigger"></paper-icon-button> <paper-listbox
slot="dropdown-content"> <paper-item>Share</paper-item>
        <paper-item>Settings</paper-item>
        <paper-item>Help</paper-item>
      </paper-listbox>
    </paper-menu-button>

### Styling

The following custom properties and mixins are also available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--paper-menu-button-dropdown-background` | Background color of the paper-menu-button dropdown | `--primary-background-color`
`--paper-menu-button` | Mixin applied to the paper-menu-button | `{}`
`--paper-menu-button-disabled` | Mixin applied to the paper-menu-button when disabled | `{}`
`--paper-menu-button-dropdown` | Mixin applied to the paper-menu-button dropdown | `{}`
`--paper-menu-button-content` | Mixin applied to the paper-menu-button content | `{}`

@hero hero.svg
@demo demo/index.html
*/
export const PaperMenuButton = Polymer({
  _template: html`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;

        @apply --paper-menu-button;
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--disabled-text-color);

        @apply --paper-menu-button-disabled;
      }

      iron-dropdown {
        @apply --paper-menu-button-dropdown;
      }

      .dropdown-content {
        @apply --shadow-elevation-2dp;

        position: relative;
        border-radius: 2px;
        background-color: var(--paper-menu-button-dropdown-background, var(--primary-background-color));

        @apply --paper-menu-button-content;
      }

      :host([vertical-align="top"]) .dropdown-content {
        margin-bottom: 20px;
        margin-top: -10px;
        top: 10px;
      }

      :host([vertical-align="bottom"]) .dropdown-content {
        bottom: 10px;
        margin-bottom: -10px;
        margin-top: 20px;
      }

      #trigger {
        cursor: pointer;
      }
    </style>

    <div id="trigger" on-tap="toggle">
      <slot name="dropdown-trigger"></slot>
    </div>

    <iron-dropdown id="dropdown" opened="{{opened}}" horizontal-align="[[horizontalAlign]]" vertical-align="[[verticalAlign]]" dynamic-align="[[dynamicAlign]]" horizontal-offset="[[horizontalOffset]]" vertical-offset="[[verticalOffset]]" no-overlap="[[noOverlap]]" open-animation-config="[[openAnimationConfig]]" close-animation-config="[[closeAnimationConfig]]" no-animations="[[noAnimations]]" focus-target="[[_dropdownContent]]" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]" on-iron-overlay-canceled="__onIronOverlayCanceled">
      <div slot="dropdown-content" class="dropdown-content">
        <slot id="content" name="dropdown-content"></slot>
      </div>
    </iron-dropdown>
`,

  is: 'paper-menu-button',

  /**
   * Fired when the dropdown opens.
   *
   * @event paper-dropdown-open
   */

  /**
   * Fired when the dropdown closes.
   *
   * @event paper-dropdown-close
   */

  behaviors: [IronA11yKeysBehavior, IronControlState],

  properties: {
    /**
     * True if the content is currently displayed.
     */
    opened: { type: Boolean, value: false, notify: true, observer: '_openedChanged' },

    /**
     * The orientation against which to align the menu dropdown
     * horizontally relative to the dropdown trigger.
     */
    horizontalAlign: { type: String, value: 'left', reflectToAttribute: true },

    /**
     * The orientation against which to align the menu dropdown
     * vertically relative to the dropdown trigger.
     */
    verticalAlign: { type: String, value: 'top', reflectToAttribute: true },

    /**
     * If true, the `horizontalAlign` and `verticalAlign` properties will
     * be considered preferences instead of strict requirements when
     * positioning the dropdown and may be changed if doing so reduces
     * the area of the dropdown falling outside of `fitInto`.
     */
    dynamicAlign: { type: Boolean },

    /**
     * A pixel value that will be added to the position calculated for the
     * given `horizontalAlign`. Use a negative value to offset to the
     * left, or a positive value to offset to the right.
     */
    horizontalOffset: { type: Number, value: 0, notify: true },

    /**
     * A pixel value that will be added to the position calculated for the
     * given `verticalAlign`. Use a negative value to offset towards the
     * top, or a positive value to offset towards the bottom.
     */
    verticalOffset: { type: Number, value: 0, notify: true },

    /**
     * If true, the dropdown will be positioned so that it doesn't overlap
     * the button.
     */
    noOverlap: { type: Boolean },

    /**
     * Set to true to disable animations when opening and closing the
     * dropdown.
     */
    noAnimations: { type: Boolean, value: false },

    /**
     * Set to true to disable automatically closing the dropdown after
     * a selection has been made.
     */
    ignoreSelect: { type: Boolean, value: false },

    /**
     * Set to true to enable automatically closing the dropdown after an
     * item has been activated, even if the selection did not change.
     */
    closeOnActivate: { type: Boolean, value: false },

    /**
     * An animation config. If provided, this will be used to animate the
     * opening of the dropdown.
     */
    openAnimationConfig: {
      type: Object,
      value: function () {
        return [{ name: 'fade-in-animation', timing: { delay: 100, duration: 200 } }, {
          name: 'paper-menu-grow-width-animation',
          timing: {
            delay: 100,
            duration: 150,
            easing: config.ANIMATION_CUBIC_BEZIER
          }
        }, {
          name: 'paper-menu-grow-height-animation',
          timing: {
            delay: 100,
            duration: 275,
            easing: config.ANIMATION_CUBIC_BEZIER
          }
        }];
      }
    },

    /**
     * An animation config. If provided, this will be used to animate the
     * closing of the dropdown.
     */
    closeAnimationConfig: {
      type: Object,
      value: function () {
        return [{ name: 'fade-out-animation', timing: { duration: 150 } }, {
          name: 'paper-menu-shrink-width-animation',
          timing: {
            delay: 100,
            duration: 50,
            easing: config.ANIMATION_CUBIC_BEZIER
          }
        }, {
          name: 'paper-menu-shrink-height-animation',
          timing: { duration: 200, easing: 'ease-in' }
        }];
      }
    },

    /**
     * By default, the dropdown will constrain scrolling on the page
     * to itself when opened.
     * Set to true in order to prevent scroll from being constrained
     * to the dropdown when it opens.
     */
    allowOutsideScroll: { type: Boolean, value: false },

    /**
     * Whether focus should be restored to the button when the menu closes.
     */
    restoreFocusOnClose: { type: Boolean, value: true },

    /**
     * This is the element intended to be bound as the focus target
     * for the `iron-dropdown` contained by `paper-menu-button`.
     */
    _dropdownContent: { type: Object }
  },

  hostAttributes: { role: 'group', 'aria-haspopup': 'true' },

  listeners: { 'iron-activate': '_onIronActivate', 'iron-select': '_onIronSelect' },

  /**
   * The content element that is contained by the menu button, if any.
   */
  get contentElement() {
    // Polymer 2.x returns slot.assignedNodes which can contain text nodes.
    var nodes = dom(this.$.content).getDistributedNodes();
    for (var i = 0, l = nodes.length; i < l; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        return nodes[i];
      }
    }
  },

  /**
   * Toggles the dropdown content between opened and closed.
   */
  toggle: function () {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  },

  /**
   * Make the dropdown content appear as an overlay positioned relative
   * to the dropdown trigger.
   */
  open: function () {
    if (this.disabled) {
      return;
    }

    this.$.dropdown.open();
  },

  /**
   * Hide the dropdown content.
   */
  close: function () {
    this.$.dropdown.close();
  },

  /**
   * When an `iron-select` event is received, the dropdown should
   * automatically close on the assumption that a value has been chosen.
   *
   * @param {CustomEvent} event A CustomEvent instance with type
   * set to `"iron-select"`.
   */
  _onIronSelect: function (event) {
    if (!this.ignoreSelect) {
      this.close();
    }
  },

  /**
   * Closes the dropdown when an `iron-activate` event is received if
   * `closeOnActivate` is true.
   *
   * @param {CustomEvent} event A CustomEvent of type 'iron-activate'.
   */
  _onIronActivate: function (event) {
    if (this.closeOnActivate) {
      this.close();
    }
  },

  /**
   * When the dropdown opens, the `paper-menu-button` fires `paper-open`.
   * When the dropdown closes, the `paper-menu-button` fires `paper-close`.
   *
   * @param {boolean} opened True if the dropdown is opened, otherwise false.
   * @param {boolean} oldOpened The previous value of `opened`.
   */
  _openedChanged: function (opened, oldOpened) {
    if (opened) {
      // TODO(cdata): Update this when we can measure changes in distributed
      // children in an idiomatic way.
      // We poke this property in case the element has changed. This will
      // cause the focus target for the `iron-dropdown` to be updated as
      // necessary:
      this._dropdownContent = this.contentElement;
      this.fire('paper-dropdown-open');
    } else if (oldOpened != null) {
      this.fire('paper-dropdown-close');
    }
  },

  /**
   * If the dropdown is open when disabled becomes true, close the
   * dropdown.
   *
   * @param {boolean} disabled True if disabled, otherwise false.
   */
  _disabledChanged: function (disabled) {
    IronControlState._disabledChanged.apply(this, arguments);
    if (disabled && this.opened) {
      this.close();
    }
  },

  __onIronOverlayCanceled: function (event) {
    var uiEvent = event.detail;
    var trigger = this.$.trigger;
    var path = dom(uiEvent).path;

    if (path.indexOf(trigger) > -1) {
      event.preventDefault();
    }
  }
});

Object.keys(config).forEach(function (key) {
  PaperMenuButton[key] = config[key];
});
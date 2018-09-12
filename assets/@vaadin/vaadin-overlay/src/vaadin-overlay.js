/// BareSpecifier=@vaadin\vaadin-overlay\src\vaadin-overlay
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';

import { templatize } from '../../../@polymer/polymer/lib/utils/templatize.js';
import { afterNextRender } from '../../../@polymer/polymer/lib/utils/render-status.js';
import { FlattenedNodesObserver } from '../../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { ThemableMixin } from '../../vaadin-themable-mixin/vaadin-themable-mixin.js';
import { IronFocusablesHelper } from '../../../@polymer/iron-overlay-behavior/iron-focusables-helper.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { useNativeCustomElements } from '../../../@polymer/polymer/lib/utils/settings.js';
let overlayContentCounter = 0;

const createOverlayContent = cssText => {
  overlayContentCounter++;
  const is = `vaadin-overlay-content-${overlayContentCounter}`;

  const styledTemplate = document.createElement('template');
  const style = document.createElement('style');
  style.textContent = ':host { display: block; }' + cssText;
  styledTemplate.content.appendChild(style);

  if (window.ShadyCSS) {
    window.ShadyCSS.prepareTemplate(styledTemplate, is);
  }

  // NOTE(platosha): Have to use an awkward IIFE returning class here
  // to prevent this class from showing up in analysis.json & API docs.
  /** @private */
  const klass = (() => class extends HTMLElement {
    static get is() {
      return is;
    }

    connectedCallback() {
      if (window.ShadyCSS) {
        window.ShadyCSS.styleElement(this);
      }

      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(styledTemplate.content, true));

        // FIXME(platosha): IronFocusablesHelper does only use legacy .root
        this.root = this.shadowRoot;
      }
    }
  })();

  customElements.define(klass.is, klass);

  return document.createElement(is);
};

/**
 * `<vaadin-overlay>` is a Web Component for creating overlays.
 *
 * ```html
 * <vaadin-overlay>
 *   <template>Overlay content</template>
 * </vaadin-overlay>
 * ```
 *
 * ### Templating
 *
 * By default, the overlay finds the child template and uses that.
 * You can also set a custom template using the `template` property.
 *
 * After the content from the template is stamped, the `content` property
 * points to the content container.
 *
 * The overlay provides `forwardHostProp` when calling
 * `Polymer.Templatize.templatize` for the template, so that the bindings
 * from the parent scope propagate to the content.  You can also pass
 * custom `instanceProps` object using the `instanceProps` property.
 *
 * Note when using `instanceProps`: because of the Polymer limitation,
 * every template can only be templatized once, so it is important
 * to set `instanceProps` before the `template` is assigned to the overlay.
 *
 * ### Styling
 *
 * To style the overlay content, use styles in the parent scope:
 *
 * - If the overlay is used in a component, then the component styles
 *   apply the overlay content.
 * - If the overlay is used in the global DOM scope, then global styles
 *   apply to the overlay content.
 *
 * See examples for styling the overlay content in the live demos.
 *
 * The following Shadow DOM parts are available for styling the overlay component itself:
 *
 * Part name  | Description
 * -----------|---------------------------------------------------------|
 * `backdrop` | Backdrop of the overlay
 * `overlay`  | Container for position/sizing/alignment of the content
 * `content`  | Content of the overlay
 *
 * The following state attributes are available for styling:
 *
 * Attribute | Description | Part
 * ---|---|---
 * `opening` | Applied just after the overlay is attached to the DOM. You can apply a CSS @keyframe animation for this state. | `:host`
 * `closing` | Applied just before the overlay is detached from the DOM. You can apply a CSS @keyframe animation for this state. | `:host`
 *
 * The following custom CSS properties are available for styling:
 *
 * Custom CSS property | Description | Default value
 * ---|---|---
 * `--vaadin-overlay-viewport-bottom` | Bottom offset of the visible viewport area | `0` or detected offset
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @memberof Vaadin
 * @mixes Vaadin.ThemableMixin
 * @demo demo/index.html
 */
class OverlayElement extends ThemableMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        z-index: 200;
        position: fixed;

        /*
          Despite of what the names say, <vaadin-overlay> is just a container
          for position/sizing/alignment. The actual overlay is the overlay part.
        */

        /*
          Default position constraints: the entire viewport. Note: themes can
          override this to introduce gaps between the overlay and the viewport.
        */
        top: 0;
        right: 0;
        bottom: var(--vaadin-overlay-viewport-bottom);
        left: 0;

        /* Use flexbox alignment for the overlay part. */
        display: flex;
        flex-direction: column; /* makes dropdowns sizing easier */
        /* Align to center by default. */
        align-items: center;
        justify-content: center;

        /* Allow centering when max-width/max-height applies. */
        margin: auto;

        /* The host is not clickable, only the overlay part is. */
        pointer-events: none;

        /* Remove tap highlight on touch devices. */
        -webkit-tap-highlight-color: transparent;

        /* CSS API for host */
        --vaadin-overlay-viewport-bottom: 0;
      }

      :host([hidden]),
      :host(:not([opened]):not([closing])) {
        display: none !important;
      }

      [part="overlay"] {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        pointer-events: auto;

        /* Prevent overflowing the host in MSIE 11 */
        max-width: 100%;
        box-sizing: border-box;

        -webkit-tap-highlight-color: initial; /* reenable tap highlight inside */
      }

      [part="backdrop"] {
        z-index: -1;
        content: "";
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: auto;
      }
    </style>

    <div id="backdrop" part="backdrop" hidden\$="{{!withBackdrop}}"></div>
    <div part="overlay" id="overlay" tabindex="0">
      <div part="content" id="content">
        <slot></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'vaadin-overlay';
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true
      },

      /**
       * The template of the overlay content.
       */
      template: {
        type: Object,
        notify: true
      },

      /**
       * Optional argument for `Polymer.Templatize.templatize`.
       */
      instanceProps: {
        type: Object
      },

      /**
       * References the content container after the template is stamped.
       */
      content: {
        type: Object,
        notify: true
      },

      withBackdrop: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * When true the overlay won't disable the main content, showing
       * it doesn’t change the functionality of the user interface.
       */
      modeless: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_modelessChanged'
      },

      /**
       * When true move focus to the first focusable element in the overlay,
       * or to the overlay if there are no focusable elements.
       */
      focusTrap: {
        type: Boolean,
        value: false
      },

      _mouseDownInside: {
        type: Boolean
      },

      _mouseUpInside: {
        type: Boolean
      },

      _instance: {
        type: Object
      },

      _boundIronOverlayCanceledListener: {
        type: Object
      },

      _originalContentPart: Object,

      _contentNodes: Array
    };
  }

  static get observers() {
    return ['_openedChanged(opened)', '_templateChanged(template)'];
  }

  constructor() {
    super();
    this._boundMouseDownListener = this._mouseDownListener.bind(this);
    this._boundMouseUpListener = this._mouseUpListener.bind(this);
    this._boundOutsideClickListener = this._outsideClickListener.bind(this);
    this._boundKeydownListener = this._keydownListener.bind(this);

    this._observer = new FlattenedNodesObserver(this, info => {
      this._setTemplateFromNodes(info.addedNodes);
    });

    // Listener for preventing closing of the paper-dialog and all components extending `iron-overlay-behavior`.
    this._boundIronOverlayCanceledListener = e => {
      e.preventDefault();
      window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
    };

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this._boundIosResizeListener = () => this._detectIosNavbar();
    }
  }

  ready() {
    super.ready();

    this._observer.flush();

    // Need to add dummy click listeners to this and the backdrop or else
    // the document click event listener (_outsideClickListener) may never
    // get invoked on iOS Safari (reproducible in <vaadin-dialog>
    // and <vaadin-context-menu>).
    this.addEventListener('click', () => {});
    this.$.backdrop.addEventListener('click', () => {});
  }

  _detectIosNavbar() {
    if (!this.opened) {
      return;
    }

    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;

    const landscape = innerWidth > innerHeight;

    const clientHeight = document.documentElement.clientHeight;

    if (landscape && clientHeight > innerHeight) {
      this.style.setProperty('--vaadin-overlay-viewport-bottom', clientHeight - innerHeight + 'px');
    } else {
      this.style.setProperty('--vaadin-overlay-viewport-bottom', '0');
    }
  }

  _setTemplateFromNodes(nodes) {
    this.template = nodes.filter(node => node.localName && node.localName === 'template')[0] || this.template;
  }

  /**
   * @event vaadin-overlay-close
   * fired before the `vaadin-overlay` will be closed. If canceled the closing of the overlay is canceled as well.
   */
  close(sourceEvent) {
    var evt = new CustomEvent('vaadin-overlay-close', { bubbles: true, cancelable: true, detail: { sourceEvent: sourceEvent } });
    this.dispatchEvent(evt);
    if (!evt.defaultPrevented) {
      this.opened = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.parentNode === document.body) {
      window.addEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
    }

    if (this._boundIosResizeListener) {
      this._detectIosNavbar();
      window.addEventListener('resize', this._boundIosResizeListener);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Removing the event listener in case `iron-overlay-canceled` was not fired.
    // In Shady DOM the overlay can be reattached asynchronously so we need to check that the overlay is not currently attached to body.
    if (window.ShadyDOM && window.ShadyDOM.inUse) {
      if (this.parentNode !== document.body) {
        window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
      }
    } else {
      if (!this.parentNode) {
        window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
      }
    }

    this._boundIosResizeListener && window.removeEventListener('resize', this._boundIosResizeListener);
  }

  _mouseDownListener(event) {
    this._mouseDownInside = event.composedPath().indexOf(this.$.overlay) >= 0;
  }

  _mouseUpListener(event) {
    this._mouseUpInside = event.composedPath().indexOf(this.$.overlay) >= 0;
  }

  /**
   * We need to listen on 'click' / 'tap' event and capture it and close the overlay before
   * propagating the event to the listener in the button. Otherwise, if the clicked button would call
   * open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4
   *
   * @event vaadin-overlay-outside-click
   * fired before the `vaadin-overlay` will be closed on outside click. If canceled the closing of the overlay is canceled as well.
   */
  _outsideClickListener(event) {
    if (event.composedPath().indexOf(this.$.overlay) !== -1 || this._mouseDownInside || this._mouseUpInside) {
      this._mouseDownInside = false;
      this._mouseUpInside = false;
      return;
    }
    if (!this._last) {
      return;
    }

    const evt = new CustomEvent('vaadin-overlay-outside-click', { bubbles: true, cancelable: true, detail: { sourceEvent: event } });
    this.dispatchEvent(evt);

    if (this.opened && !evt.defaultPrevented) {
      this.close(event);
    }
  }

  /**
   * @event vaadin-overlay-escape-press
   * fired before the `vaadin-overlay` will be closed on ESC button press. If canceled the closing of the overlay is canceled as well.
   */
  _keydownListener(event) {
    if (!this._last) {
      return;
    }

    // TAB
    if (event.key === 'Tab' && this.focusTrap) {
      // if only tab key is pressed, cycle forward, else cycle backwards.
      this._cycleTab(event.shiftKey ? -1 : 1);

      event.preventDefault();

      // ESC
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      const evt = new CustomEvent('vaadin-overlay-escape-press', { bubbles: true, cancelable: true, detail: { sourceEvent: event } });
      this.dispatchEvent(evt);

      if (this.opened && !evt.defaultPrevented) {
        this.close(event);
      }
    }
  }

  _ensureTemplatized() {
    this._setTemplateFromNodes(Array.from(this.children));
  }

  /**
   * @event vaadin-overlay-open
   * fired after the `vaadin-overlay` is opened.
   */
  _openedChanged(opened) {
    if (!this._instance) {
      this._ensureTemplatized();
    }

    if (opened) {
      this._animatedOpening();

      afterNextRender(this, () => {
        if (this.focusTrap && !this.contains(document._activeElement || document.activeElement)) {
          this._cycleTab(0, 0);
        }

        const evt = new CustomEvent('vaadin-overlay-open', { bubbles: true });
        this.dispatchEvent(evt);
      });

      if (!this.modeless) {
        this._enterModalState();
      }
    } else {
      this._animatedClosing();
      this._exitModalState();
    }
  }

  _animatedOpening() {
    this._attachOverlay();
    this.setAttribute('opening', '');
    const name = getComputedStyle(this).getPropertyValue('animation-name');
    if (name && name != 'none') {
      const listener = () => {
        this.removeEventListener('animationend', listener);
        this.removeAttribute('opening');
      };
      this.addEventListener('animationend', listener);
    } else {
      this.removeAttribute('opening');
    }
  }

  _attachOverlay() {
    this._placeholder = document.createComment('vaadin-overlay-placeholder');
    this.parentNode.insertBefore(this._placeholder, this);
    document.body.appendChild(this);
  }

  _animatedClosing() {
    if (this._placeholder) {
      this.setAttribute('closing', '');
      const name = getComputedStyle(this).getPropertyValue('animation-name');
      if (name && name != 'none') {
        const listener = () => {
          this._detachOverlay();
          this.removeAttribute('closing');
          this.removeEventListener('animationend', listener);
        };
        this.addEventListener('animationend', listener);
      } else {
        this._detachOverlay();
        this.removeAttribute('closing');
      }
    }
  }

  _detachOverlay() {
    // The detaching overlay is happening after closing animation is finished.
    // If in the meantime of closing animation user quickly clicked
    // the element to show the same ovelay, `opened` will be true
    // and no need to detach the overlay
    if (this.opened || !this._placeholder.parentNode) {
      return;
    }
    this._placeholder.parentNode.insertBefore(this, this._placeholder);
    this._processPendingMutationObserversFor(document.body);
    this._placeholder.parentNode.removeChild(this._placeholder);
  }

  /**
   * Returns all attached overlays.
   */
  static get __attachedInstances() {
    return Array.from(document.body.children).filter(el => el instanceof OverlayElement);
  }

  /**
   * returns true if this is the last one in the opened overlays stack
   */
  get _last() {
    return this === OverlayElement.__attachedInstances.pop();
  }

  _modelessChanged(modeless) {
    if (!modeless) {
      if (this.opened) {
        this._enterModalState();
      }
    } else {
      this._exitModalState();
    }
  }

  _enterModalState() {
    document.addEventListener('mousedown', this._boundMouseDownListener);
    document.addEventListener('mouseup', this._boundMouseUpListener);
    document.addEventListener('click', this._boundOutsideClickListener, true);
    document.addEventListener('keydown', this._boundKeydownListener);

    if (document.body.style.pointerEvents !== 'none') {
      // Set body pointer-events to 'none' to disable mouse interactions with
      // other document nodes.
      this._previousDocumentPointerEvents = document.body.style.pointerEvents;
      document.body.style.pointerEvents = 'none';
    }

    // Disable pointer events in other attached overlays
    OverlayElement.__attachedInstances.forEach(el => {
      if (el !== this) {
        el.shadowRoot.querySelector('[part="overlay"]').style.pointerEvents = 'none';
      }
    });
  }

  _exitModalState() {
    document.removeEventListener('mousedown', this._boundMouseDownListener);
    document.removeEventListener('mouseup', this._boundMouseUpListener);
    document.removeEventListener('click', this._boundOutsideClickListener, true);
    document.removeEventListener('keydown', this._boundKeydownListener);

    if (this._previousDocumentPointerEvents !== undefined) {
      // Restore body pointer-events
      document.body.style.pointerEvents = this._previousDocumentPointerEvents;
      delete this._previousDocumentPointerEvents;
    }

    // Restore pointer events in the previous overlay(s) in reverse order
    const instances = OverlayElement.__attachedInstances.reverse();
    let el;
    while (el = instances.pop()) {
      if (el === this) {
        // Skip the current instance
        continue;
      }
      el.shadowRoot.querySelector('[part="overlay"]').style.removeProperty('pointer-events');
      if (!el.modeless) {
        // Stop after the last modal
        break;
      }
    }
  }

  _removeOldContent() {
    if (!this.content || !this._contentNodes) {
      return;
    }

    this._observer.disconnect();

    this._contentNodes.forEach(node => {
      if (node.parentNode === this.content) {
        this.content.removeChild(node);
      }
    });

    if (this._originalContentPart) {
      // Restore the original <div part="content">
      this.$.content.parentNode.replaceChild(this._originalContentPart, this.$.content);
      this.$.content = this._originalContentPart;
      this._originalContentPart = undefined;
    }

    this._observer.connect();

    this._contentNodes = undefined;
    this.content = undefined;
  }

  _templateChanged(template) {
    this._removeOldContent();

    if (!template) {
      return;
    }

    if (!template._Templatizer) {
      template._Templatizer = templatize(template, this, {
        instanceProps: this.instanceProps,
        forwardHostProp: function (prop, value) {
          if (this._instance) {
            this._instance.forwardHostProp(prop, value);
          }
        }
      });
    }

    this._instance = new template._Templatizer({});
    this._contentNodes = Array.from(this._instance.root.childNodes);

    const templateRoot = template.getRootNode();
    const _isScoped = templateRoot !== document;

    if (_isScoped) {
      if (!this.$.content.shadowRoot) {
        this.$.content.attachShadow({ mode: 'open' });
        // FIXME(platosha): IronFocusablesHelper does only use legacy .root
        this.$.content.root = this.$.content.shadowRoot;
      }

      let scopeCssText = Array.from(templateRoot.querySelectorAll('style')).reduce((result, style) => result + style.textContent, '');

      if (window.ShadyCSS && !window.ShadyCSS.nativeShadow) {
        // NOTE(platosha): ShadyCSS removes <style>’s from templates, so
        // we have to use these protected APIs to get their contents back
        const styleInfo = window.ShadyCSS.ScopingShim._styleInfoForNode(templateRoot.host);
        if (styleInfo) {
          scopeCssText += styleInfo._getStyleRules().parsedCssText;
          scopeCssText += '}';
        }
      }

      // The overlay root’s :host styles should not apply inside the overlay
      scopeCssText = scopeCssText.replace(/:host/g, ':host-nomatch');

      if (scopeCssText) {
        if (window.ShadyCSS && !window.ShadyCSS.nativeShadow) {
          // ShadyDOM: replace the <div part="content"> with a generated
          // styled custom element
          const contentPart = createOverlayContent(scopeCssText);
          contentPart.id = 'content';
          contentPart.setAttribute('part', 'content');
          this.$.content.parentNode.replaceChild(contentPart, this.$.content);
          // NOTE(platosha): carry the style scope of the content part
          contentPart.className = this.$.content.className;
          this._originalContentPart = this.$.content;
          this.$.content = contentPart;
        } else {
          // Shadow DOM: append a style to the content shadowRoot
          const style = document.createElement('style');
          style.textContent = scopeCssText;
          this.$.content.shadowRoot.appendChild(style);
          this._contentNodes.unshift(style);
        }
      }

      this.$.content.shadowRoot.appendChild(this._instance.root);
      this.content = this.$.content.shadowRoot;
    } else {
      this.appendChild(this._instance.root);
      this.content = this;
    }
  }

  _isFocused(element) {
    return element && element.getRootNode().activeElement === element;
  }

  _focusedIndex(elements) {
    elements = elements || this._getFocusableElements();
    return elements.indexOf(elements.filter(this._isFocused).pop());
  }

  _cycleTab(increment, index) {
    const focusableElements = this._getFocusableElements();

    if (index === undefined) {
      index = this._focusedIndex(focusableElements);
    }

    index += increment;

    // rollover to first item
    if (index >= focusableElements.length) {
      index = 0;
      // go to last item
    } else if (index < 0) {
      index = focusableElements.length - 1;
    }

    focusableElements[index].focus();
  }

  _getFocusableElements() {
    // collect all focusable elements
    return IronFocusablesHelper.getTabbableNodes(this.$.overlay);
  }

  _processPendingMutationObserversFor(node) {
    if (window.CustomElements && !useNativeCustomElements) {
      CustomElements.takeRecords(node);
    }
  }
}

customElements.define(OverlayElement.is, OverlayElement);

export { OverlayElement };
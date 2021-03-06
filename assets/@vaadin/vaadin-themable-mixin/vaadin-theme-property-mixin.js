/// BareSpecifier=@vaadin\vaadin-themable-mixin\vaadin-theme-property-mixin
/**
 * @polymerMixin
 */
export const ThemePropertyMixin = superClass => class VaadinThemePropertyMixin extends superClass {
  static get properties() {
    return {
      /**
       * Helper property with theme attribute value facilitating propagation
       * in shadow DOM. Allows using `theme$="[[theme]]"` in the template.
       *
       * @protected
       */
      theme: {
        type: String,
        readOnly: true
      }
    };
  }

  /** @protected */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'theme') {
      this._setTheme(newValue);
    }
  }
};
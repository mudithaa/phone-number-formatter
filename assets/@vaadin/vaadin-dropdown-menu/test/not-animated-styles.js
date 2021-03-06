/// BareSpecifier=@vaadin\vaadin-dropdown-menu\test\not-animated-styles
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="not-animated-dropdown-menu-overlay" theme-for="vaadin-dropdown-menu-overlay">
  <template>
    <style include="lumo-dropdown-menu-overlay">
      :host([opening]),
      :host([closing]),
      :host([opening]) [part="overlay"],
      :host([closing]) [part="overlay"] {
        animation: none !important;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
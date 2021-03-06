/// BareSpecifier=@vaadin\vaadin-lumo-styles\style
import './version.js';
import '../../@polymer/polymer/lib/elements/custom-style.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      --lumo-border-radius: 0.25em;

      /* Shadows */
      --lumo-box-shadow-s: 0 1px 2px 0 var(--lumo-shade-20pct), 0 2px 8px -2px var(--lumo-shade-40pct);
      --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
      --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
      --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
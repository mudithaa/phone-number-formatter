/// BareSpecifier=@vaadin\vaadin-list-box\demo\list-box-basic-demos
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
class ListBoxBasicDemos extends DemoReadyEventEmitter(ListBoxDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>List Box</h3>
    <vaadin-demo-snippet id="list-box-basic-demos-basic">
      <template preserve-content="">
        <vaadin-list-box>
          <b>Register to a Run Event</b>
          <vaadin-item>5k</vaadin-item>
          <vaadin-item disabled="">10k (sold out)</vaadin-item>
          <hr>
          <vaadin-item>Half marathon</vaadin-item>
          <vaadin-item>Marathon</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'list-box-basic-demos';
  }
}
customElements.define(ListBoxBasicDemos.is, ListBoxBasicDemos);
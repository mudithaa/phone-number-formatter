/// BareSpecifier=@polymer\iron-a11y-announcer\demo\x-announces
/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE The complete set of authors may be found at
http://polymer.github.io/AUTHORS The complete set of contributors may be found
at http://polymer.github.io/CONTRIBUTORS Code distributed by Google as part of
the polymer project is also subject to an additional IP rights grant found at
http://polymer.github.io/PATENTS
*/
import '../../polymer/polymer-legacy.js';
import '@polymer/paper-button/paper-button.js';

import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
import { html } from '../../polymer/lib/utils/html-tag.js';

import { IronA11yAnnouncer } from '../iron-a11y-announcer.js';

Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        padding: 1em 0;
        font-family: inherit;
      }
    </style>

    <span>[[message]]</span>
    <paper-button raised on-tap="_onTapAnnounce">Announce</paper-button>
  `,

  is: 'x-announces',
  hostAttributes: { 'aria-hidden': 'true' },
  properties: { message: { type: String } },

  attached: function () {
    IronA11yAnnouncer.requestAvailability();
  },

  _onTapAnnounce: function () {
    this.fire('iron-announce', { text: this.message.trim() }, { bubbles: true });
  }
});
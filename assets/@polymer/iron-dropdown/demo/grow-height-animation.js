/// BareSpecifier=@polymer\iron-dropdown\demo\grow-height-animation
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
import '../../polymer/polymer-legacy.js';

import { NeonAnimationBehavior } from '../../neon-animation/neon-animation-behavior.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  is: 'expand-animation',

  behaviors: [NeonAnimationBehavior],

  configure: function (config) {
    var node = config.node;

    var height = node.getBoundingClientRect().height;

    this._effect = new KeyframeEffect(node, [{ height: height / 2 + 'px' }, { height: height + 'px' }], this.timingFromConfig(config));

    return this._effect;
  }
});
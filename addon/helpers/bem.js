import Ember from 'ember';
import config from 'ember-get-config';
import { get } from '@ember/object';
import { isArray, A } from '@ember/array';
import { dasherize } from '@ember/string';

export function bem(params, additionalModifiers) {

  // return params;
  let globalBase = get(config, 'bem-sauce.globalBaseClass');
  let base, element, modifiers;

  base = params[0];
  if (isArray(params[1])) {
    modifiers = params[1] || A();
  } else {
    element = params[1];
    modifiers = params[2] || A();
  }

  let baseClass = A([base, element]).compact().join('__');
  let classNames = A();

  if (globalBase) {
    classNames.pushObject(globalBase);
  }
  classNames.pushObject(baseClass);

  modifiers.forEach(function(modifier) {
    classNames.pushObject(`${baseClass}--${modifier}`);
  });

  if (additionalModifiers)
    for (var modifier in additionalModifiers) {
      if (additionalModifiers[modifier]) {
        if (modifier.match(/-$/)) {
          classNames.pushObject(`${baseClass}--${modifier}${dasherize('' + additionalModifiers[modifier])}`);
        } else {
          classNames.pushObject(`${baseClass}--${modifier}`);
        }
      }
    }

  return classNames.join(' ');
}

export default Ember.Helper.helper(bem);

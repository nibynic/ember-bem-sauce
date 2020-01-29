import Ember from 'ember';
import config from 'ember-get-config';
import {
  get
} from '@ember/object';
import { dasherize } from '@ember/string';

export function bem(params, additionalModifiers) {

  // return params;
  let globalBase = get(config, 'bem-sauce.globalBaseClass'),
    base = params[0],
    element = params[1],
    modifiers = params[2],
    baseClass = `${base}__${element}`,
    classNames = Ember.A();

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

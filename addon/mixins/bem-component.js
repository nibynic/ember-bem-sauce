import Ember from 'ember';
import getBemClasses from 'ember-bem-sauce/utils/get-bem-classes';
import getBemModifiers from 'ember-bem-sauce/utils/get-bem-modifiers';

const {
  isEmpty,
  copy,
  computed,
  computed: {
    alias,
  },
  defineProperty,
  Mixin
} = Ember;

export default Mixin.create({
  base: null,
  modifiers: [],
  classNameBindings: [],
  // Computed
  b: alias('base'),
  componentBaseClasses: computed('m', function() {
    // do not add class bindings for naked components
    if (this.get('tagName') === '') {
      return;
    }
    let base = this.get('base'),
      modifiers = this.get('modifiers');
    return getBemClasses(base, modifiers, this);
  }),
  init() {
    this._super(...arguments);
    this._defineModifierComputedProperty();
    this._addCompomentClassBindings();
  },
  /**
   * Add a classNameBinding computed property
   * that will add base classes
   */
  _addCompomentClassBindings() {
    // Get existing bindings
    let classNameBindings = this.get('classNameBindings');
    // Create of modify classNameBindings
    if (isEmpty(classNameBindings)) {
      classNameBindings = [];
    } else {
      classNameBindings = copy(classNameBindings);
    }
    // Add class computed property
    classNameBindings.push('componentBaseClasses');
    this.set('classNameBindings', classNameBindings);
  },
  /**
   * Create a computed property that will observe all properties
   * defined in the "modifiers" property.
   * This computed enables us to clean up use of the bem helper so
   * you only need pass one modifier argument.
   */
  _defineModifierComputedProperty() {
    // get all modifier property strings
    let args = copy(this.get('modifiers'));
    // add the computed function
    args.push(
      function() {
        return getBemModifiers(this.get('modifiers'), this);
      }
    );
    // define computed using spread operator
    defineProperty(this, 'm', computed(
      ...args,
    ));
  },
});

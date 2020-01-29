import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-get-config';

moduleForComponent('bem', 'helper:bem', {
  integration: true
});

test('test helper returns correct modifier classes', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);

  this.render(hbs `{{bem b 'element' m}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--active component__element--primary');
});

test('test helper returns correct modifier classes with a global base class', function(assert) {

  config['bem-sauce'].globalBaseClass = "global-base-class";

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);

  this.render(hbs `{{bem b 'element' m}}`);

  assert.equal(this.$().text().trim(), 'global-base-class component__element component__element--active component__element--primary');

  // turn base class off
  config['bem-sauce'].globalBaseClass = false;
});

test('test helper returns correct no modifier classes', function(assert) {

  this.set('b', 'component');
  this.set('m', []);

  this.render(hbs `{{bem b 'element' m}}`);

  assert.equal(this.$().text().trim(), 'component__element');
});

test('test helper returns additional custom modifiers', function(assert) {

  this.set('b', 'component');
  this.set('m', []);
  this.set('boop', true);
  this.set('bar', true);

  this.render(hbs `{{bem b 'element' m boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--boop component__element--foo');
});

test('test helper returns correct modifier classes with additional custom modifiers', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);
  this.set('boop', false);
  this.set('bar', true);

  this.render(hbs `{{bem b 'element' m boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--active component__element--primary component__element--foo');
});

test('test helper returns correct modifier classes even if no element is provided', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);
  this.set('boop', false);
  this.set('bar', true);

  this.render(hbs `{{bem b m boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component component--active component--primary component--foo');
});

test('test helper returns correct modifier classes even if no modifiers are provided', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);
  this.set('boop', false);
  this.set('bar', true);

  this.render(hbs `{{bem b boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component component--foo');

  this.render(hbs `{{bem b 'element' boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--foo');
});

test('test helper returns correct modifier classes with key-value custom modifiers', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);
  this.set('boop', 'beep');
  this.set('bar', true);

  this.render(hbs `{{bem b 'element' m boop-=boop foo-=bar}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--active component__element--primary component__element--boop-beep component__element--foo-true');
});

test('test dummy component', function(assert) {
  this.set('disabled', false);

  this.render(hbs `{{test-component disabled=disabled}}`);

  let $component = this.$('.test');

  assert.equal($component.attr("class"), 'test ember-view', 'Has correct classes');

  // change disabled

  this.set('disabled', true);

  assert.equal($component.attr("class"), 'test test--disabled ember-view', 'Has correct classes');
})

import {equal, test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('collapsible-panel', 'CollapsiblePanelComponent', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('is a button tag', function() {
  equal('BUTTON', this.$().prop('tagName'));

  this.subject().teardownCollapsiblePanel();
});

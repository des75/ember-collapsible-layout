import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isCollapsed:collapsible-panel-container--collapsed:collapsible-panel-container'],
  actions: {
    collapsePanel(){
      this.set('isCollapsed', true);
      this.sendAction('collapsePanel');
    },
    expandPanel(){
      this.set('isCollapsed', false);
      this.sendAction('expandPanel');
    }
  }
});

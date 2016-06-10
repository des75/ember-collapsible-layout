import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [
    "isCollapsed:collapsible-panel-container--collapsed:collapsible-panel-container",
    "alignmentNorth:collapsible-panel--north",
    "alignmentEast:collapsible-panel--east",
    "alignmentSouth:collapsible-panel--south",
    "alignmentWest:collapsible-panel--west"
  ],
  
  actions: {
    collapsePanel(){
      this.set('isCollapsed', true);
      this.sendAction('collapsePanel');
    },
    expandPanel(){
      this.set('isCollapsed', false);
      this.sendAction('expandPanel');
    }
  },
  
  init(){
    this._super(...arguments);

    let config = this.get("config");

    switch(config.region){
    case "north":
      this.set("alignmentNorth", true);
      break;

    case "east":
      this.set("alignmentEast", true);
      break;

    case "south":
      this.set("alignmentSouth", true);
      break;

    case "west":
      this.set("alignmentWest", true);
      break;
    }
  }
});

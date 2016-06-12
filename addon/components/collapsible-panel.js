import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [
    "isCollapsed:collapsed",
    "top:collapsible-panel--top",
    "right:collapsible-panel--right",
    "bottom:collapsible-panel--bottom",
    "left:collapsible-panel--left",
    "center:collapsible-panel--center"
  ],
  classNames: "collapsible-panel-container",

  actions: {
    collapsePanel(){
      this.get("layout").collapsePanel(this.get("region"));
    },
    expandPanel(){
      this.get("layout").expandPanel(this.get("region"));
    }
  },

  collapse() {
    this.set('isCollapsed', true);
    this.layout.set(`${this.region}Collapsed`, this.isCollapsed);
    this.layout.restylePanels();
    this.sendAction('collapsePanel');
  },
  expand() {
    this.set('isCollapsed', false);
    this.layout.set(`${this.region}Collapsed`, this.isCollapsed);
    this.layout.restylePanels();
    this.sendAction('expandPanel');
  },

  updateLayout(){
    this.set("relStyle", this.layout.styleFor(this.region));
  },

  init(){
    this._super(...arguments);
    let config = this.get("config");
    let layout = this.get("layout");
    this.set(config.region, true);
    this.set("region", config.region);
    layout.set(config.region, this);
  },

  didInsertElement(){
    this._super(...arguments);

    let config = this.get("config");

    if(config.region == "top" || config.region == "bottom"){
      let height = config.height || 100;

      this.set("sizeValue", height);
      this.set("keySizeValue", "height");
    }
    else if(config.region == "left" || config.region == "right"){
      let width = config.width || 100;

      this.set("sizeValue", width);
      this.set("keySizeValue", "width");
    }
    this.layout.restylePanels(this.region);
  }

});

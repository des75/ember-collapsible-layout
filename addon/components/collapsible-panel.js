import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [
    "isCollapsed:collapsed:",
    "top:collapsible-panel--top",
    "right:collapsible-panel--right",
    "bottom:collapsible-panel--bottom",
    "left:collapsible-panel--left",
    "center:collapsible-panel--center"
  ],
  classNames: "collapsible-panel-container",

  actions: {
    collapsePanel(){
      this.set('isCollapsed', true);
      this.updateLayout();
      this.sendAction('collapsePanel');
    },
    expandPanel(){
      this.set('isCollapsed', false);
      this.updateLayout();
      this.sendAction('expandPanel');
    }
  },

  updateLayout(){
    let position_value = 0;

    if(!this.get('isCollapsed')){
      position_value = this.get("sizeValue");
    }
    
    let css = {};    
    css[`${this.get("region")}`] = position_value;
    
    this.get("layout").togglePanel(this.get("region"), css);
    this.$(".collapsible-panel").css(this.get("keySizeValue"), position_value);
  },

  updateStyle(css){
    this.$(".collapsible-panel").css(css);
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
      let height = config.height || this.$(".collapsible-panel").css("height");

      this.set("sizeValue", height);
      this.set("keySizeValue", "height");
    }
    else if(config.region == "left" || config.region == "right"){
      let width = config.width || this.$(".collapsible-panel").css("width");

      this.set("sizeValue", width);
      this.set("keySizeValue", "width");
    }
    
    this.updateLayout();
  }
});

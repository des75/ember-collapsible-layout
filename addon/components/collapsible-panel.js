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
    let layout_el = this.$().closest(".collapsible-layout");
    let position_value = 0;
    
    if(this.get('isCollapsed')){
      layout_el.addClass(`${this.get("region")}-collapsed`);
    }
    else{
      layout_el.removeClass(`${this.get("region")}-collapsed`);
      position_value = this.get("sizeValue");      
    }

    if(this.get("region") == "top" || this.get("region") == "bottom"){
      $(".collapsible-panel--left .collapsible-panel, .collapsible-panel--right .collapsible-panel", layout_el).css(this.get("region"), position_value);      
    }
   
    this.$(".collapsible-panel").css(this.get("_style"));
    
    $(".collapsible-panel--center .collapsible-panel", layout_el).css(this.get("region"), position_value);
  },

  init(){
    this._super(...arguments);

    let config = this.get("config");
    this.set(config.region, true);
    this.set("region", config.region);

    let height = config.height || 0;
    let width = config.width || 0;

    if(config.region == "top" || config.region == "bottom"){
      this.set("sizeValue", `${height}px`);
      this.set("_style", {height: this.get("sizeValue")} );
    }   
    else if(config.region == "left" || config.region == "right"){
      this.set("sizeValue", `${width}px`);
      this.set("_style", {width: this.get("sizeValue")} );
    }
  },

  didRender(){
    this._super(...arguments);
    this.updateLayout();
  }
});

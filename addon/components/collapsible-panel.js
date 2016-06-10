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

      let layout_el = this.$(".collapsible-panel-container").closest("collapsible-layout");
      layout_el.addClass(`${this.get("region")}-collapsed`);

      $(".collapsible-panel--center", layout_el).css(this.get("region"), 0);
      
      this.sendAction('collapsePanel');
    },
    expandPanel(){
      this.set('isCollapsed', false);
      
      let layout_el = this.$(".collapsible-panel-container").closest("collapsible-layout");
      layout_el.removeClass(`${this.get("region")}-collapsed`);
      
      $(".collapsible-panel--center", layout_el).css(this.get("region"), this.get("sizeValue"));
      
      this.sendAction('expandPanel');
    }
  },

  init(){
    this._super(...arguments);

    let config = this.get("config");
    this.set(config.region, true);
    this.set("region", config.region);

    let height = config.height || 0;
    let width = config.width || 0;

    if(config.region == "top" || config.region == "bottom")
      this.set("sizeValue", `${height}px`);
    else
      this.set("sizeValue", `${width}px`);
  }
});

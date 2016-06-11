import Ember from 'ember';

export default Ember.Component.extend({
  classNames: "collapsible-layout",
  classNameBindings: [
    "topCollapsed:top-collapsed",
    "rightCollapsed:right-collapsed",
    "bottomCollapsed:bottom-collapsed",
    "leftCollapsed:left-collapsed"
  ],
  togglePanel (region, css){
    this.set(`${region}Collapsed`, this.get(region).get("isCollapsed"));
    
    if(region == "top" || region == "bottom"){
      if(this.get("left"))
        this.get("left").updateStyle(css);

      if(this.get("right"))
        this.get("right").updateStyle(css);
    }
    
    if(this.get("center"))
      this.get("center").updateStyle(css);
  }
});

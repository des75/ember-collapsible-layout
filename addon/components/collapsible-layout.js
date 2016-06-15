import Ember from 'ember';

export default Ember.Component.extend({
  classNames: "collapsible-layout",
  classNameBindings: [
    "topCollapsed:top-collapsed",
    "rightCollapsed:right-collapsed",
    "bottomCollapsed:bottom-collapsed",
    "leftCollapsed:left-collapsed"
  ],

  regions: ["top", "right", "bottom", "left", "center"],
  primaryRegion: "center",

  actions: {
    collapsePanel (region){
      this.collapsePanel(region);
    },
    expandPanel (region){
      this.expandPanel(region);
    },
  },

  // ==
  collapseMobilePanel (region){
    this._collapse(region);
    this._expand("center");
  },
  expandMobilePanel (region){
    this.collapseAllPanels();
    this._expand(region);
  },
  collapsePanel (region){
    if(this.get(region)){
      if(this.get("mobile")){
        this.collapseMobilePanel(region);
      }
      else{
        this._collapse(region);
      }
    }
  },
  expandPanel (region){
    if(this.get(region)){
      if(this.get("mobile")){
        this.expandMobilePanel(region);
      }
      else{
        this._expand(region);
      }
    }
  },
  // ==


  _collapse(region){
    if(this.get(region)){
      this.get(region).collapse();
    }
  },
  _expand(region){
    if(this.get(region)){
      this.get(region).expand();
    }
  },

  collapseNonPrimaryPanels (){
    this.regions.forEach((r) => {
      if(this.get(r) && this.get("primaryRegion") != r){
        this.get(r).collapse();
      }
    });
    this.get(this.primaryRegion).expand();
  },
  expandNonPrimaryPanels (){
    this.regions.forEach((r) => {
      if(this.get(r) && this.get("primaryRegion") != r){
        this.get(r).expand();
      }
    });
  },

  collapseAllPanels(){
    this.regions.forEach((r) => {
      if(this.get(r)){
	this.get(r).collapse();
      }
    });
  },
  expandAllPanels(){
    this.regions.forEach((r) => {
      if(this.get(r)){
	this.get(r).expand();
      }
    });
  },

  restylePanels(){
    this.regions.forEach((r) => {
      if(this.get(r)){
        this.get(r).updateLayout();
      }
    });
  },

  styleFor(region){
    var layout =this;
    var styleValue = function(r){
      if(layout.get(r)){
        return layout.get(r).isCollapsed ? 0 : layout.get(r).sizeValue;
      }
      else{
        return 0;
      }
    };

    switch(region){
    case "top":
    case "bottom":
      return `height: ${styleValue(region)}px;`;
      break;

    case "left":
    case "right":
      return `width: ${styleValue(region)}px;
top: ${styleValue("top")}px;
bottom: ${styleValue("bottom")}px;`;
      break;

    case "center":
      return `top: ${styleValue("top")}px;
right: ${styleValue("right")}px;
bottom: ${styleValue("bottom")}px;
left: ${styleValue("left")}px;`;
      break;
    }

    return "";
  },

  init (){
    this._super(...arguments);

    if(this.get("parentController"))
      this.get("parentController").set(this.layoutId||"layout", this);

    if($(window).width() < 1000){
      this.set("mobile", false);
    }

    var view = this;

    var resizeHandler = function() {
      if(view.get("mobile")) {
        if($(window).width() >= 1000){
          view.set("mobile", false);
          view.expandAllPanels();
          //view.rerender();
        }
      }
      else{
        if($(window).width() < 1000){
          view.set("mobile", true);
          view.collapseNonPrimaryPanels();
          //view.rerender();
        }
      }
    };

    this.set('resizeHandler', resizeHandler);
    $(window).bind('resize', this.get('resizeHandler'));
  },
  willDestroy (){
    $(window).unbind('resize', this.get('resizeHandler'));
  },
  didRender(){
    this._super(...arguments);
    this.get("resizeHandler")();
  }
});

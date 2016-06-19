import Ember from 'ember';

export default Ember.Component.extend({
  classNames: "collapsible-layout",
  classNameBindings: [
    "topCollapsed:top-collapsed",
    "rightCollapsed:right-collapsed",
    "bottomCollapsed:bottom-collapsed",
    "leftCollapsed:left-collapsed",
    "responsiveLayout:responsive-layout"
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
      if(this.get(r) && this.get("primaryRegion") !== r){
        this.get(r).collapse();
      }
    });
    this.get(this.primaryRegion).expand();
  },
  expandNonPrimaryPanels (){
    this.regions.forEach((r) => {
      if(this.get(r) && this.get("primaryRegion") !== r){
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

    case "left":
    case "right":
      return `width: ${styleValue(region)}px;
top: ${styleValue("top")}px;
bottom: ${styleValue("bottom")}px;`;

    case "center":
      return `top: ${styleValue("top")}px;
right: ${styleValue("right")}px;
bottom: ${styleValue("bottom")}px;
left: ${styleValue("left")}px;`;
    }

    return "";
  },

  init (){
    this._super(...arguments);

    if(this.get("parentController")){
      this.get("parentController").set(this.layoutId||"layout", this);
    }

    if(this.responsiveLayout){
      if(Ember.$(window).width() < 1000){
        this.set("mobile", false);
      }

      var view = this;

      var resizeHandler = function() {
        if(view.get("mobile")) {
          if(Ember.$(window).width() >= 1000){
            view.set("mobile", false);
            view.expandAllPanels();
            //view.rerender();
          }
        }
        else{
          if(Ember.$(window).width() < 1000){
            view.set("mobile", true);
            view.collapseNonPrimaryPanels();
            //view.rerender();
          }
        }
      };

      this.set('resizeHandler', resizeHandler);
      Ember.$(window).bind('resize', this.get('resizeHandler'));
    }
  },
  willDestroy (){
    if(this.responsiveLayout){
      Ember.$(window).unbind('resize', this.get('resizeHandler'));
    }
  },
  didRender(){
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, 'onAfterRender');
  },
  onAfterRender(){
    if(this.responsiveLayout){
      this.get("resizeHandler")();
    }
    this.restylePanels();
  },

  // ==



  mouseDown(e){
    if(this.$(e.target).is("div.collapsible-panel-controls")){
      let region;

      for(let r of this.regions) {
        if(  this.$(e.target).closest(".collapsible-panel-container").is(this.get(r).$() )){
          region = this.get(r);
          break;
        }
      }

      if(region.resizeable){
        this.set("resizeMode", region);
        this.set("resizedSize", region.sizeValue);

        let resizeMarker = Ember.$("<div></div>").addClass("resize-marker");
        this.$().append(resizeMarker);

        if(region.keySizeValue === "width"){
          this.set("initialCoord", e.clientX);
          resizeMarker.css({
            top: 0,
            left: e.clientX - this.$().offset().left,
            height: "100%",
            width: 1
          });
        }
        else if(region.keySizeValue === "height"){
          this.set("initialCoord", e.clientY);
          resizeMarker.css({
            left: 0,
            top: e.clientY - this.$().offset().top,
            width: "100%",
            height: 1
          });
        }
      }
    }
  },
  mouseUp(){
    if(this.resizeMode){
      let region = this.resizeMode;

      this.$(".resize-marker").remove();
      region.set("sizeValue", this.resizedSize);

      this.set("resizeMode", false);
      this.set("initialCoord", null);
      this.set("resizedSize", null);
      this.restylePanels();
    }
  },
  mouseMove(e){
    if(this.resizeMode){
      let region = this.resizeMode;
      let regionsResizeMultipliers = {
        top: -1,
        right: 1,
        bottom: 1,
        left: -1
      };
      let resizeMarker = this.$(".resize-marker");

      if(region.keySizeValue === "width"){
        this.set("resizedSize",  region.sizeValue + (parseInt(this.initialCoord) - parseInt(e.clientX)) * regionsResizeMultipliers[region.region]);
        resizeMarker.css({
          left: e.clientX - this.$().offset().left
        });
      }
      else if(region.keySizeValue === "height"){
        this.set("resizedSize", region.sizeValue + (parseInt(this.initialCoord) - parseInt(e.clientY)) * regionsResizeMultipliers[region.region]);
        resizeMarker.css({
          top: e.clientY - this.$().offset().top
        });
      }

      return false;
    }

    return true;
  }

});

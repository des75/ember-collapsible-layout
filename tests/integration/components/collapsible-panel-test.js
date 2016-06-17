import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('collapsible-panel', 'Integration | Component | collapsible panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:

  this.set("config", {region: "center"});
  
  this.render(hbs`
{{#collapsible-layout as |layout| }}
    {{#collapsible-panel layout=layout config=config }}
      template block text
    {{/collapsible-panel}}
{{/collapsible-layout}}
  `);
  
  assert.equal(this.$(".collapsible-panel-content").text().trim(), 'template block text');
});


test('it render all panels', function(assert) {
  this.set("config", {
    center: {region: "center"},
    top: {region: "top"},
    right: {region: "right"},
    bottom: {region: "bottom"},
    left: {region: "left"}
  });
  
  this.render(hbs`
{{#collapsible-layout as |layout| }}
    {{#collapsible-panel layout=layout config=config.top }}
      top panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.center }}
      center panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.right }}
      right panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.bottom }}
      bottom panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.left }}
      left panel
    {{/collapsible-panel}}
{{/collapsible-layout}}
  `);
  
  assert.equal(this.$(".collapsible-panel--center .collapsible-panel-content").text().trim(), 'center panel');
  assert.equal(this.$(".collapsible-panel--top .collapsible-panel-content").text().trim(), 'top panel');
  assert.equal(this.$(".collapsible-panel--right .collapsible-panel-content").text().trim(), 'right panel');
  assert.equal(this.$(".collapsible-panel--bottom .collapsible-panel-content").text().trim(), 'bottom panel');
  assert.equal(this.$(".collapsible-panel--left .collapsible-panel-content").text().trim(), 'left panel');
});


test('it got size property', function(assert) {
  this.set("config", {
    center: {region: "center"},
    right: {region: "right"},
    left: {region: "left", width: 500},
    top: {region: "top", height: 150}
  });
  
  this.render(hbs`
{{#collapsible-layout as |layout| }}
    {{#collapsible-panel layout=layout config=config.top }}
      top panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.center }}
      center panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.right }}
      right panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.left }}
      left panel
    {{/collapsible-panel}}
{{/collapsible-layout}}
  `);
  
  assert.equal(this.$(".collapsible-panel--right .collapsible-panel").width(), 100);
  assert.equal(this.$(".collapsible-panel--left .collapsible-panel").width(), 500);
  assert.equal(this.$(".collapsible-panel--top .collapsible-panel").height(), 150);
});



test('all panels have collapse/expand buttons,  but center', function(assert) {
  this.set("config", {
    center: {region: "center"},
    top: {region: "top"},
    right: {region: "right"},
    bottom: {region: "bottom"},
    left: {region: "left"}
  });
  
  this.render(hbs`
{{#collapsible-layout as |layout| }}
    {{#collapsible-panel layout=layout config=config.top }}
      top panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.center }}
      center panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.right }}
      right panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.bottom }}
      bottom panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.left }}
      left panel
    {{/collapsible-panel}}
{{/collapsible-layout}}
  `);
  
  assert.equal(this.$(".collapsible-panel--center .collapsible-panel-controls .button-collapse-panel").length, 0);
  assert.equal(this.$(".collapsible-panel--center .collapsible-panel-controls .button-expand-panel").length, 0);
  
  assert.equal(this.$(".collapsible-panel--top .collapsible-panel-controls .button-collapse-panel").length, 1);
  assert.equal(this.$(".collapsible-panel--top .collapsible-panel-controls .button-expand-panel").length, 1);
  
  assert.equal(this.$(".collapsible-panel--right .collapsible-panel-controls .button-collapse-panel").length, 1);
  assert.equal(this.$(".collapsible-panel--right .collapsible-panel-controls .button-expand-panel").length, 1);
  
  assert.equal(this.$(".collapsible-panel--bottom .collapsible-panel-controls .button-collapse-panel").length, 1);
  assert.equal(this.$(".collapsible-panel--bottom .collapsible-panel-controls .button-expand-panel").length, 1);
  
  assert.equal(this.$(".collapsible-panel--left .collapsible-panel-controls .button-collapse-panel").length, 1);
  assert.equal(this.$(".collapsible-panel--left .collapsible-panel-controls .button-expand-panel").length, 1);
});




test('it collapses and expands after', function(assert) {
  this.set("config", {
    center: {region: "center"},
    top: {region: "top"},
    right: {region: "right"},
    bottom: {region: "bottom"},
    left: {region: "left"}
  });
  
  this.render(hbs`
{{#collapsible-layout as |layout| }}
    {{#collapsible-panel layout=layout config=config.top }}
      top panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.center }}
      center panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.right }}
      right panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.bottom }}
      bottom panel
    {{/collapsible-panel}}

    {{#collapsible-panel layout=layout config=config.left }}
      left panel
    {{/collapsible-panel}}
{{/collapsible-layout}}
  `);

  // == collapse actions
  
  this.$(".collapsible-panel--top .collapsible-panel-controls .button-collapse-panel").click();    
  assert.equal(this.$(".collapsible-panel--top .collapsible-panel").height(), 0);
  
  this.$(".collapsible-panel--right .collapsible-panel-controls .button-collapse-panel").click();    
  assert.equal(this.$(".collapsible-panel--right .collapsible-panel").width(), 0);
  
  this.$(".collapsible-panel--bottom .collapsible-panel-controls .button-collapse-panel").click();    
  assert.equal(this.$(".collapsible-panel--bottom .collapsible-panel").height(), 0);
  
  this.$(".collapsible-panel--left .collapsible-panel-controls .button-collapse-panel").click();    
  assert.equal(this.$(".collapsible-panel--left .collapsible-panel").width(), 0);
  
  // == expand actions
  
  this.$(".collapsible-panel--top .collapsible-panel-controls .button-expand-panel").click();    
  assert.notEqual(this.$(".collapsible-panel--top .collapsible-panel").height(), 0);
  
  this.$(".collapsible-panel--right .collapsible-panel-controls .button-expand-panel").click();    
  assert.notEqual(this.$(".collapsible-panel--right .collapsible-panel").width(), 0);
  
  this.$(".collapsible-panel--bottom .collapsible-panel-controls .button-expand-panel").click();    
  assert.notEqual(this.$(".collapsible-panel--bottom .collapsible-panel").height(), 0);
  
  this.$(".collapsible-panel--left .collapsible-panel-controls .button-expand-panel").click();    
  assert.notEqual(this.$(".collapsible-panel--left .collapsible-panel").width(), 0);
});

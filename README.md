[![Build Status](https://travis-ci.org/des75/ember-collapsible-layout.svg?branch=master)](https://travis-ci.org/des75/ember-collapsible-layout)
[![Coverage Status](https://coveralls.io/repos/github/des75/ember-collapsible-layout/badge.svg?branch=master)](https://coveralls.io/github/des75/ember-collapsible-layout?branch=master)

# Ember collapsible layout

See demo [here](https://des75.github.io/ember-collapsible-layout-demo/)

## Installation

```
npm install ember-collapsible-layout --save-dev
```

## Usage

In your template:

```
{{#collapsible-layout as |layout|}}

  {{#collapsible-panel
  layout=layout
  config=centerPanel
  }}
    Center panel content here
  {{/collapsible-panel}}

  {{#collapsible-panel
  layout=layout
  config=leftPanel
  }}
    Left panel content here
  {{/collapsible-panel}}

{{/collapsible-layout}}
```

In the controller:

```
export default Ember.Controller.extend({
  leftPanel: {
    region: "left", // required field
    width: 300,     
    resizeable: true
  },  

  centerPanel: {  // center panel is only required panel
    region: "center"
  }
});
```


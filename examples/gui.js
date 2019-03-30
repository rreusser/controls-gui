var wrapGui = require('../');
var Controls = require('../../controls-state');
var h = require('h');
var beautify = require('json-beautify');

var FONT_FAMILY = 'Fira Sans Condensed';

var fontStyle = document.createElement('style');
fontStyle.setAttribute('type', 'text/css');
document.querySelector('head').appendChild(fontStyle);
fontStyle.textContent = `
  @import url('https://fonts.googleapis.com/css?family=${FONT_FAMILY.replace(/ /g, '+')}');
`;

require('insert-css')(`
.docs {
  max-width: 600px;
  margin: 15px;
  font-family: 'Helvetica', sans-serif;
}

.docs pre {
  background-color: #eee;
  margin-left: 15px;
  padding: 15px;
}

.myControlPanel {
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 1;
}

.myControlPanel2 {
  width: 400px;
}
`);

var inlineControlsDiv = h('div');

document.body.append(h('div.docs', [
  h('h2', 'State Initialization'),
  h('p', 'Excluding some event handling and customization, the state object controlled by the panel to the right is created with the code:'),
  h('pre', h('code', `window.controls = Controls({
  name: 'test',
  color: '#ff0000',
  action: () => alert('Hello!'),
  simulation: {
    running: true,
    iterations: 5,
    method: Controls.Select('RK4', {
      options: ['Euler', 'RK2', 'RK4']
    }),
    shape: {
      width: 640,
      height: 480
    }
  },
  analysis: {
    cost: Controls.Slider(1, {
      min: 0,
      max: 1,
      step: 0.01
    }),
    benefit: Controls.Slider(0, {
      min: 0,
      max: 1,
      step: 0.01
    })
  }
});`)),
  h('h2', 'GUI Initialization'),
  h('p', 'You can also attach a GUI. The GUI implemented in this project is just a wrapper around the state object that controls it  strictly through its public API.'),
  h('pre', h('code', `var gui = Gui(controls)`)),
  h('p', 'You may pass additional configuration as the second argument of a constructor. For example, we may initialize the shape section in a collapsed state with the code below.'),
  h('pre', h('code', `shape: Controls.Section({
  width: 640,
  height: 480,
}, {
  expanded: false
})`)),
  h('p', 'Although the GUI receives these props as a config object, what to make of it is strictly the concern of the GUI.'),

  h('h2', 'Properties'),

  h('p', 'Open up the inspector console and try accessing the property values with, for example,'),
  h('pre', h('code', `> controls.name
"test"

> controls.simulation.shape.width
640`)),

  h('p', 'You can also set values and the panel will update:'),
  h('pre', h('code', `> controls.simulation.running = false
false`)),

  h('h2', 'Events'),
  h('p', 'You can subscribe to events on sections instead of just individual fields by expanding the implicit section definition into an object. That is, the shape section,'),
  h('pre', h('code', `shape: {
  width: 640,
  height: 480
}`)),
  h('p', 'can be expanded to'),
  h('pre', h('code', `shape: Controls.Shape({
  width: 640,
  height: 480
})`)),
  h('p', 'after which it\'s easy to add event listeners.'),
  h('pre', h('code', `shape: Controls.Section({
  width: 640,
  height: 480
}).onChanges(function (updates) {
  console.log(updates);
  // Resize your simulation here
})`)),
  h('p', 'You can even accomplish fancy effects like coupling two fields together.'),
  h('pre', h('code', `analysis: Controls.Section({
  cost: Controls.Slider(1, {
    min: 0,
    max: 1,
    step: 0.01
  }),
  benefit: Controls.Slider(0, {
    min: 0,
    max: 1,
    step: 0.01
  })
}).onChanges(updates => {
  if (updates.cost) {
    controls.analysis.benefit = 1 - controls.analysis.cost;
  } else {
    controls.analysis.cost = 1 - controls.analysis.benefit;
  }
})`)),
  h('h2', 'Markup'),
  h('p', 'Since it\'s loosely coupled to the GUI, you can simply create additional GUI instances! And it\'s all just (reasonably) semantic HTML. Unstyled, the panel looks like this.'),
  inlineControlsDiv,
  
  h('h2', 'Advanced Usage'),
  h('p', 'Sections are a bit fancy so that you can typically just get or set properties by name. You may access the section instance itself using ', h('code', '$field'), '.'),

  h('pre', h('code', `> controls.simulation.$field
Section {
  parent: Section,
  events: {…},
  type: "section",
  name: "simulation",
  batchedUpdates: {…},
  …
}`)),

  h('p', 'In case you need to interface with nested control field instances directly, you may access the field using ', h('code', '$path'), '.'),
  h('pre', h('code', `> controls.$path.simulation.shape.height
Slider {
  parent: Section,
  events: {…},
  type: "slider",
  name: "height",
  batchedUpdates: {…},
  …
}`)),

  h('p', 'The API and corresponding documentation isn\'t stable or complete. Suggestsions are welcome'),
]));

function resize () {
  console.log('resize!');
}

function balance () {
  controls.analysis.cost = 1 - controls.analysis.benefit;
}

var controls = window.controls = Controls(
  {
    instructions: Controls.Raw(`<p>
      Hello! Below you'll find a number of controls!
      You can modify the values and watch as they feed
      directly into the JSON-serialized output.
    </p>`),

    name: 'test',

    color: '#ff0000',

    action: () => alert('Hello!'),

    simulation: Controls.Section({
      running: true,

      iterationsPerTimeStep: 5,

      method: Controls.Select('RK4', {
        options: ['Euler', 'RK2', 'RK4']
      }),

      shape: Controls.Section({
        width: 640,
        height: 480,
      }, {
        label: 'Dimensions',
      })
    },
    {
      label: 'Simulation',
    }),
    analysis: Controls.Section({
      content: Controls.Raw((state, analysis) => `<p>
        The sliders below will update each other in
        an opposing manner. They do this by checking
        which has been updated and then updating the
        opposing control. Currently the cost is ${analysis.cost.toFixed(2)}
        and the benefit is ${analysis.benefit.toFixed(2)}.
      </p>`),

      cost: Controls.Slider(1, {
        min: 0,
        max: 1,
        step: 0.01
      }),

      benefit: Controls.Slider(0, {
        min: 0,
        max: 1,
        step: 0.01
      }),
    }, {
      expanded: false,
      label: 'Analysis',
    })
      .onChanges(updates => {
        if (updates.cost) {
          controls.analysis.benefit = 1 - controls.analysis.cost;
        } else {
          controls.analysis.cost = 1 - controls.analysis.benefit;
        }
      }),
    output: Controls.Section({
      content: Controls.Raw(state => `<pre>JSON.stringify(controls):\n${beautify(controls, null, 2, 0)}</pre>`)
    }, {
      enumerable: false,
      label: 'JSON Output',
    })
  }
)

var gui1 = wrapGui(controls, {
  containerCSS: "position:fixed;top:0;right:8px;max-width:300px",
  theme: {
    fontFamily: `${FONT_FAMILY}, Helvetica, sans-serif`,
    fontColor: 'black',
    controlBgColor: 'white',
    controlBorderRadius: '2px',
    controlBorderColor: '#aaa',
    fieldBgColor: 'white',
    fieldHoverColor: '#f8f8f8',
    fieldActiveColor: '#ddd',
    fieldBorderColor: '#aaa',
    sectionHeadingColor: 'white',
    sectionHeadingBgColor: '#28e',
    sectionHeadingHoverColor: '#5af',
    sectionHeadingBorderColor: '#28e',
    visibilityFontColor: '#fff',
    sliderThumbColor: '#aaa',
    focusBorderColor: '#888',
  }
});

var gui2 = wrapGui(controls, {
  containerCSS: null,
  className: 'myControlPanel2',
  style: false,
  root: inlineControlsDiv,
});

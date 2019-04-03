var preact = require('preact');
var insertCSS = require('insert-css');
var defaults = require('defaults');

var createClass = require('./util/preact-classless-component');
var computeStyles = require('./compute-styles');

module.exports = function GuiFactory () {
  var components = {};

  GUI.registerComponent = function (component) {
    components[component.name] = component;
    return GUI;
  };

  GUI.registerComponents = function (components) {
    for (var i = 0; i < components.length; i++) {
      GUI.registerComponent(components[i]);
    }
    return GUI;
  };

  function getComponent (name) {
    var component = components[name];
    if (!component) throw new Error('Unrecognized component, "'+name+'"');
    return component;
  }

  function GUI (state, opts) {
    opts = defaults(opts || {}, {
      containerCSS: "position:fixed;top:0;right:8px",
      style: true,
      className: `controlPanel-${Math.random().toString(36).substring(2, 15)}`,
    });

    opts.root = opts.root || document.body;

    var className = opts.className;

    var ControlComponent = createClass({
      render: function () {
        return preact.h(getComponent(this.props.field.type).component, {
          ControlComponent: ControlComponent,
          className: className,
          field: this.props.field,
          state: state,
          h: preact.h,
        });
      }
    });

    var App = createClass({
      state: {dummy: 0},
      componentDidMount: function () {
        this.props.state.$field.onChanges(updates => {
          this.setState({dummy: this.state.dummy + 1});
        });
      },
      getRef: function (c) {
        var eventList = ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend', 'wheel'];
        for (var i = 0; i < eventList.length; i++) {
          c.addEventListener(eventList[i], function (e) {
            e.stopPropagation();
          });
        }

        if (opts.containerCSS) {
          c.style.cssText = opts.containerCSS;
        }
      },
      render: function () {
        return preact.h('div', {
            className: `${className}`,
            ref: this.getRef,
          }, preact.h(ControlComponent, {field: this.props.state.$field})
        );
      }
    });

    if (opts.style) {
      insertCSS(computeStyles(className, opts.theme, components));
    }

    preact.render(preact.h(App, {
      state: state
    }), opts.root);

    return state;
  }

  return GUI;
};

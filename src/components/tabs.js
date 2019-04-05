var preact = require('preact');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'tabs',
  component: createClass({
    init: function () {
      var field = this.props.field;
      var tabs = Object.keys(field.value.$displayFields);

      this.state = {
        activeTab: tabs[0]
      };
    },
    getRef: function (ref) {
      this.contentsEl = ref;
    },

    activateTab: function (tabName) {
      this.setState({
        activeTab: tabName
      });
    },

    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var title = config.label || field.name;
      var className = this.props.className;

      if (!field.parentField && title === '') title = 'Controls'

      var tabs = Object.keys(field.value.$displayFields);

      var names = {};
      for (var i = 0; i < tabs.length; i++) {
        var tabName = tabs[i];
        names[tabName] = tabName;

        var tabPath = field.value.$path[tabName];
        if (!tabPath) continue;

        var tabField = tabPath.$field;
        if (!tabField) continue;

        var tabConfig = tabField.$config;
        if (!tabConfig) continue;

        if (tabConfig.label) names[tabName] = tabConfig.label;
      }

      return h('div', {
        className: `${className}__tabs`,
      },
        h('ul', {
          className: `${className}__tabList`
        },
          tabs.map(tabName =>
            h('li', {
              className: `${className}__tabItem ${tabName === this.state.activeTab ? `${className}__tabItem--active` : ''}`,
            }, h('a', {
              href: `#${tabName}`,
              id: `tab-${tabName}`,
              onClick: () => this.activateTab(tabName)
            }, names[tabName]))
          )
        ),
        tabs.map(tabName => 
          tabName === this.state.activeTab && h('div', {
            className: `${className}__tabPanel`,
            id: tabName,
          },
            h(this.props.ControlComponent, {field: field.value.$path[tabName].$field})
          )
        )
      );
    }
  }),
  css: function (className, theme) {
    return `
      .${className}__tabs {
        margin: 0;
        margin-top: -1px;
        padding: 0;
        border: none;
      }

      .${className}__tabList {
        background-color: ${theme.sectionHeadingBgColor};
        border-bottom: 6px solid ${theme.activeTabBgColor};
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin: 0;
        padding: 0;
        padding-top: 6px;
        align-items: flex-end;
      }

      .${className}__tabItem {
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        list-style-type: none;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        margin-left: 6px;
        display: inline-block;
        background-color: ${theme.inactiveTabBgColor};
        color: ${theme.inactiveTabColor};
        padding: 5px 7px;
        padding-bottom: 3px;
        margin-top: 5px;
      }

      .${className}__tabItem:hover {
        background-color: ${theme.inactiveTabHoverBgColor};
        color: ${theme.inactiveTabHoverColor};
      }

      .${className}__tabItem--active {
        background-color: ${theme.activeTabBgColor};
        color: ${theme.activeTabColor};
        padding-bottom: 5px;
        margin-top: 3px;
      }

      .${className}__tabItem--active:hover {
        background-color: ${theme.activeTabBgColor};
        color: ${theme.activeTabColor};
      }

      .${className}__tabItem a {
        color: inherit;
        text-decoration: none;
      }
    `;
  }
};

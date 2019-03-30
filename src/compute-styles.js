var defaults = require('defaults');

var toPx = require('./util/to-px');
var defaultTheme = require('../themes/default');

module.exports = function (className, theme, components) {
  var theme = Object.assign({}, defaults(theme || {}, defaultTheme));

  theme.fontSize = toPx(theme.fontSize);
  theme.sliderHeight = toPx(theme.sliderHeight);
  theme.fieldHeight = toPx(theme.fieldHeight);
  theme.sectionHeadingHeight = toPx(theme.sectionHeadingHeight);
  theme.minLabelWidth = toPx(theme.minLabelWidth);
  theme.minControlWidth = toPx(theme.minControlWidth);
  theme.controlBorderRadius = toPx(theme.controlBorderRadius);
  theme.focusBorder = `
    outline: none;
    border-color: ${theme.focusBorderColor};
    box-shadow: 0 0 3px ${theme.focusBorderColor};
  `;

  return `
    .${className} {
      color: ${theme.fontColor};
      ${theme.fontSize ? `font-size: ${theme.fontSize}` : ''};
      ${theme.fontFamily ? `font-family: ${theme.fontFamily}` : ''};
    }

    .${className}__field {
      position: relative;
      background-color: ${theme.fieldBgColor};
      border-right: 1px solid ${theme.fieldBorderColor};
    }

    .${className}__label {
      display: block;
      height: ${theme.fieldHeight};
      line-height: ${theme.fieldHeight};
      display: flex;
      flex-direction: row;
      background-color: ${theme.fieldBgColor};
    }

    .${className}__field:hover {
      background-color: ${theme.fieldHoverColor};
    }

    .${className}__container {
      display: flex;
      flex-direction: row;
      align-content: stretch;
      justify-content: stretch;
    
      height: ${theme.fieldHeight};
      flex: 1;
      position: relative;
      align-items: center;
      position: relative;

      min-width: ${theme.minControlWidth};
      width: ${theme.fieldHeight};
      padding-right: 8px;
      text-indent: 8px;
    }

    .${className}__labelText {
      user-select: none;
      -moz-user-select: -moz-none;
      text-indent: 8px;
      margin-right: 4px;
      display: inline-block;
      min-width: ${theme.minLabelWidth};
      line-height: ${theme.fieldHeight};
    }

    .${className}__field::before {
      content: '';
      width: 3px;
      display: inline-block;
      vertical-align: middle;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
    }

    .${className}__field--text::before { background-color: #49f; }
    .${className}__field--color::before { background-color: #94f; }
    .${className}__field--checkbox::before { background-color: #f49; }
    .${className}__field--slider::before { background-color: #f84; }
    .${className}__field--select::before { background-color: #8f4; }
    .${className}__field--button > button::before { background-color: #8ff; }

    ${Object.keys(components).map(name => {
      var css = components[name].css;
      if (!css) return '';
      return css(className, theme);
    }).join('\n')}
  `;
}

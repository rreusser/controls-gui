module.exports = selectCSS;

function selectCSS (className, theme) {
  return `
    .${className}__field--select select {
      font-family: inherit;
      font-size: inherit;
      height: ${theme.sliderHeight};
      width: 100%;
      color: inherit;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: ${theme.controlBgColor};
      border: 1px solid ${theme.controlBorderColor};
      outline: none;
      margin: 0;
      padding: 0 5px;
      border-radius: ${theme.controlBorderRadius};
      background-image: linear-gradient(${theme.controlBorderColor}, ${theme.controlBorderColor}),
        linear-gradient(-130deg, transparent 50%, ${theme.controlBgColor} 52%),
        linear-gradient(-230deg, transparent 50%, ${theme.controlBgColor} 52%),
        linear-gradient(${theme.fontColor} 42%, ${theme.controlBgColor} 42%);
      background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
      background-size: 1px 100%, 20px 16px, 20px 16px, 20px 60%;
      background-position: right 20px center, right bottom, right bottom, right bottom;
    }

    .${className}__field--select select:focus {
      ${theme.focusBorder}
    }
  `;
}

var guiFactory = require('./src/factory');

var gui = guiFactory();

gui.registerComponents([
  require('./src/components/select'),
  require('./src/components/section'),
  require('./src/components/slider'),
  require('./src/components/checkbox'),
  require('./src/components/textinput'),
  require('./src/components/button'),
  require('./src/components/color'),
  require('./src/components/raw'),
]);

module.exports = gui;

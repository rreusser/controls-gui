// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import browserifyPlugin from 'rollup-plugin-browserify-transform'
import es2020 from 'es2020'

export default [
  {
    input: 'index.js',
    output: 'dist/controls-gui.js',
    format: 'umd',
    name: 'ControlsGUI',
  },
].map(bundle => ({
  input: bundle.input,
  output: {
    //exports: 'named',
    file: bundle.output,
    format: bundle.format,
    name: bundle.name,
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    browserifyPlugin(es2020),
  ]
}));

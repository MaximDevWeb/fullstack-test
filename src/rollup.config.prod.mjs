import scss from 'rollup-plugin-scss'
import terser from '@rollup/plugin-terser';

export default {
  input: 'assets/scripts/app.js',
  output: {
    file: 'public/scripts/app.min.js',
    format: 'iife',
    plugins: [terser()]
  },
  plugins: [
    scss({
      output: 'public/styles/app.css',
      outputStyle: 'compressed',
      sourceMap: true,
      failOnError: true
    }),
  ]
};
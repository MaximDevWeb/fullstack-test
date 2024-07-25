import scss from 'rollup-plugin-scss'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'assets/scripts/app.js',
  output: {
    file: 'public/scripts/app.js',
    format: 'cjs',
  },
  plugins: [
    scss({
      output: 'public/styles/app.css',
      outputStyle: 'compressed',
      sourceMap: true,
      failOnError: true
    }),
    livereload({
      watch: '../'
    })
  ]
};
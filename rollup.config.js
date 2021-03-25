import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default{
  input:'./src/index.js',
  output:{
    format:'umd',
    file:'lib/clear-webpack-exclude-plugin.js'
  },
  plugins:[
    babel({
      exclude:'node_modules/**'
    }),

  ]
}
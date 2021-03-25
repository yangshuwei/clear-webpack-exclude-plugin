## Install
  $ npm install clear-webpack-exclude-plugin

## Usage
  webpack.config.js
  
  const ClearWebpackExcludePlugin = require('clear-webpack-exclude-plugin')
  
 module.exports={
     ...
    plugins:[
    new ClearWebpackExcludePlugin({
          exclude:['filename.xx']
        })
      ]
 }
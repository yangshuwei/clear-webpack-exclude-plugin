const fs = require('fs');
const path = require('path')
function removeFiles(filepath, excludes) {
  filepath = filepath.split(path.sep).join('/')
  fs.stat(filepath, function (err, stats) {
    if (err) {
      console.log(err)
      return;
    }
    if (stats.isDirectory()) {
      fs.readdir(filepath, function (err, files) {
        if (err) {
          console.error(err);
          return;
        }
        if (excludes.length != 0) {
          files = files.filter(file => (excludes.indexOf(file) == -1))
        }
        files.map(file => {
          const removeFilepath = path.join(filepath, file).split(path.sep).join('/')
          console.log(removeFilepath)
          fs.unlink(removeFilepath, function (err) {
            if (err) throw err;
          })
        });
      });

    }
  })
}
class ClearWebpackExcludeDll {
  constructor(options) {
    this.options = options;
    if (options && options.exclude && !Array.isArray(options.exclude)) {
      throw new Error('the ClearWebpackExcludeDll option ‘exclude’ must be a array')
    }

  }
  apply(compiler) {
    const exclude = (this.options && this.options.exclude) ? this.options.exclude : [];
    compiler.hooks.emit.tap('ClearWebpackExcludeDll', function (compilation) {
      const filepath = compiler.options.output.path;
      removeFiles(filepath, exclude)
    })
  }
}
module.exports = ClearWebpackExcludeDll;
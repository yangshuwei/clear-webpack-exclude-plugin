(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var fs = require('fs');

  var path = require('path');

  function removeFiles(filepath, excludes) {
    filepath = filepath.split(path.sep).join('/');
    fs.stat(filepath, function (err, stats) {
      if (err) {
        console.log(err);
        return;
      }

      if (stats.isDirectory()) {
        fs.readdir(filepath, function (err, files) {
          if (err) {
            console.error(err);
            return;
          }

          if (excludes.length != 0) {
            files = files.filter(function (file) {
              return excludes.indexOf(file) == -1;
            });
          }

          files.map(function (file) {
            var removeFilepath = path.join(filepath, file).split(path.sep).join('/');
            console.log(removeFilepath);
            fs.unlink(removeFilepath, function (err) {
              if (err) throw err;
            });
          });
        });
      }
    });
  }

  var ClearWebpackExcludeDll = /*#__PURE__*/function () {
    function ClearWebpackExcludeDll(options) {
      _classCallCheck(this, ClearWebpackExcludeDll);

      this.options = options;

      if (options && options.exclude && !Array.isArray(options.exclude)) {
        throw new Error('the ClearWebpackExcludeDll option ‘exclude’ must be a array');
      }
    }

    _createClass(ClearWebpackExcludeDll, [{
      key: "apply",
      value: function apply(compiler) {
        var exclude = this.options && this.options.exclude ? this.options.exclude : [];
        compiler.hooks.emit.tap('ClearWebpackExcludeDll', function (compilation) {
          var filepath = compiler.options.output.path;
          removeFiles(filepath, exclude);
        });
      }
    }]);

    return ClearWebpackExcludeDll;
  }();

  module.exports = ClearWebpackExcludeDll;

})));

'use strict';

var util      = require('util'),
    LoadFiles = require('./load-files');

function NgModuleFromDir(moduleName, objectName, dir) {
  var obj = LoadFiles.directory(dir),
      template = 'angular.module(\'%s\', []).constant(\'%s\', JSON.parse(\'%s\'));\n';

  return util.format(template, moduleName, objectName, JSON.stringify(obj));
}

module.exports = { create: NgModuleFromDir};

module.exports = (function () {
    'use strict';

    var path = require('path'),
        NgModuleFromDir = require('./ng-module-from-dir');

    function jsonDirToJs(logger, config) {
        config = config || {};

        var log = logger.create('preprocessor.json-dir-to-js');

        return function (content, file, done) {
          var configKey = file.originalPath.slice(process.cwd().length + 1),
              localConfig = config[configKey],
              dir = localConfig.dir,
              moduleName = localConfig.moduleName,
              objectName = localConfig.objectName,
              result;

          try {
            result = NgModuleFromDir.create(moduleName, objectName, dir);
            log.debug('Updating: ' + file);
          } catch (e) {
            log.error('Generating object for ' + configKey);
            throw new Error(e);
          }
          done(result);
        };
    }

    jsonDirToJs.$inject = ['logger', 'config.jsonDirToJs'];

    return jsonDirToJs;
})();

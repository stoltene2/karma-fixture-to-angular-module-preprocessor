'use strict';

var fs      = require('fs'),
    path    = require('path'),
    JsonDir = require('./json-dir');

function fileAsProp(file) {
  return path.basename(file, '.json');
}

function objectFromFiles(files) {
  var obj = {};

  files.forEach(function(file) {
    try {
      obj[fileAsProp(file)] = JSON.parse(fs.readFileSync(file));
    } catch (e) {
      throw new Error('Malformed JSON from file: ' + file);
    }
  });

  return obj;
}

function LoadFiles(dir) {
  var files = JsonDir.contents(dir);

  return objectFromFiles(files.map( function(file) {
    return path.join(dir, file);
  }));
}

module.exports = { directory: LoadFiles };

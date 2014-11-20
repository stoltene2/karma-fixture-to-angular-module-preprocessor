
var fs   = require('fs'),
    path = require('path');

function isJson(file) {
  return path.extname(file) === ".json";
}

function JsonDir(dir) {
  var contents = fs.readdirSync(dir);

  return contents.filter(isJson);
}

module.exports = {contents: JsonDir};

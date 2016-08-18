'use strict';
require( 'meteor/meteor');
require( 'meteor/random');
require( '../__lib__/localstorage');
var pkg = Package['localstorage'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

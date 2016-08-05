'use strict';
require( 'meteor/meteor');
require( '../__lib__/sha');
var pkg = Package['sha'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

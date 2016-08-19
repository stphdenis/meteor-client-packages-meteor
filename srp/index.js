'use strict';
require( 'meteor/meteor');
require( 'meteor/random');
require( 'meteor/check');
require( 'meteor/sha');
require( 'meteor/underscore');
require( '../__lib__/srp');
var pkg = Package['srp'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

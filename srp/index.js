'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/check');
require( 'meteor/random');
require( 'meteor/sha');
require( '../__lib__/srp');
var pkg = Package['srp'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

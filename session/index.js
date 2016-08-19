'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( 'meteor/reactive-dict');
require( 'meteor/ejson');
require( '../__lib__/session');
var pkg = Package['session'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

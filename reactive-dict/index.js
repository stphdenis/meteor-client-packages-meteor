'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/ejson');
require( 'meteor/tracker');
require( 'meteor/promise');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( '../__lib__/reactive-dict');
var pkg = Package['reactive-dict'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

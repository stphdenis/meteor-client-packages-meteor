'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( 'meteor/modules');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/promise');
require( '../__lib__/random');
var pkg = Package['random'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/promise');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( '../__lib__/random');
var pkg = Package['random'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

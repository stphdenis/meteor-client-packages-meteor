'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/diff-sequence');
require( 'meteor/tracker');
require( 'meteor/random');
require( 'meteor/mongo-id');
require( '../__lib__/observe-sequence');
var pkg = Package['observe-sequence'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

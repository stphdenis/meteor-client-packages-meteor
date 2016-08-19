'use strict';
require( 'meteor/meteor');
require( 'meteor/tracker');
require( 'meteor/mongo-id');
require( 'meteor/diff-sequence');
require( 'meteor/underscore');
require( 'meteor/random');
require( '../__lib__/observe-sequence');
var pkg = Package['observe-sequence'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

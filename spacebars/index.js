'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/tracker');
require( 'meteor/observe-sequence');
require( 'meteor/htmljs');
require( 'meteor/blaze');
require( '../__lib__/spacebars');
var pkg = Package['spacebars'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

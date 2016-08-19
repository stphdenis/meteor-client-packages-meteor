'use strict';
require( 'meteor/meteor');
require( 'meteor/htmljs');
require( 'meteor/tracker');
require( 'meteor/blaze');
require( 'meteor/observe-sequence');
require( 'meteor/underscore');
require( '../__lib__/spacebars');
var pkg = Package['spacebars'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

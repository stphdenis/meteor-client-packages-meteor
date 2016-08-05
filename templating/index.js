'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/htmljs');
require( 'meteor/blaze');
require( 'meteor/spacebars');
require( '../__lib__/templating');
var pkg = Package['templating'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

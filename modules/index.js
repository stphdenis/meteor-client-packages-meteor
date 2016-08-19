'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( 'meteor/modules-runtime');
require( '../__lib__/modules');
var pkg = Package['modules'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

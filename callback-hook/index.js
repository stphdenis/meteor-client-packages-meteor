'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( '../__lib__/callback-hook');
var pkg = Package['callback-hook'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

'use strict';
require( 'meteor/meteor');
require( '../__lib__/modules-runtime');
var pkg = Package['modules-runtime'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

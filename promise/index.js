'use strict';
require( 'meteor/meteor');
require( 'meteor/modules');
require( '../__lib__/promise');
var pkg = Package['promise'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

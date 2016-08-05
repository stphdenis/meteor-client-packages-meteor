'use strict';
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/promise');
require( '../__lib__/ecmascript-runtime');
var pkg = Package['ecmascript-runtime'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

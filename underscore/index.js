'use strict';
require( '../__lib__/underscore');
var pkg = Package['underscore'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

'use strict';
require( 'meteor/meteor');
require( 'meteor/tracker');
require( '../__lib__/reactive-var');
var pkg = Package['reactive-var'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

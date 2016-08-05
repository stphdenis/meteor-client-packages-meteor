'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( '../__lib__/ordered-dict');
var pkg = Package['ordered-dict'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

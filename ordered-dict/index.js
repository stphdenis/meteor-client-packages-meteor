'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( '../__lib__/ordered-dict');
var pkg = Package['ordered-dict'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

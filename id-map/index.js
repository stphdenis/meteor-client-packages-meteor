'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/ejson');
require( '../__lib__/id-map');
var pkg = Package['id-map'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

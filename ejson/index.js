'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/base64');
require( '../__lib__/ejson');
var pkg = Package['ejson'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

'use strict';
require( 'meteor/meteor');
require( '../__lib__/base64');
var pkg = Package['base64'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

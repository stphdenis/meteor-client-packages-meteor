'use strict';
require( 'meteor/meteor');
require( 'meteor/mongo');
require( 'meteor/accounts-base');
require( '../__lib__/service-configuration');
var pkg = Package['service-configuration'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

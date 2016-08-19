'use strict';
require( 'meteor/meteor');
require( 'meteor/accounts-base');
require( 'meteor/mongo');
require( '../__lib__/service-configuration');
var pkg = Package['service-configuration'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

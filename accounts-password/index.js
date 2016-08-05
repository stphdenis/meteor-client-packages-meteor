'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/ejson');
require( 'meteor/check');
require( 'meteor/promise');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/ddp-client');
require( 'meteor/accounts-base');
require( 'meteor/sha');
require( 'meteor/srp');
require( '../__lib__/accounts-password');
var pkg = Package['accounts-password'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

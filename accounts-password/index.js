'use strict';
require( 'meteor/meteor');
require( 'meteor/accounts-base');
require( 'meteor/srp');
require( 'meteor/sha');
require( 'meteor/ejson');
require( 'meteor/ddp-client');
require( 'meteor/check');
require( 'meteor/underscore');
require( 'meteor/modules');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/promise');
require( '../__lib__/accounts-password');
var pkg = Package['accounts-password'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

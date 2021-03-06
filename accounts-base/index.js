'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( 'meteor/tracker');
require( 'meteor/random');
require( 'meteor/callback-hook');
require( 'meteor/ddp-client');
require( 'meteor/mongo');
require( 'meteor/modules');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/promise');
require( 'meteor/localstorage');
require( '../__lib__/accounts-base');
var pkg = Package['accounts-base'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.Accounts = pkg.Accounts;
}

'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/ejson');
require( 'meteor/check');
require( 'meteor/tracker');
require( 'meteor/random');
require( 'meteor/retry');
require( '../__lib__/ddp-common');
var pkg = Package['ddp-common'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

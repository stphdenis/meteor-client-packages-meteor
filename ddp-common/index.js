'use strict';
require( 'meteor/meteor');
require( 'meteor/check');
require( 'meteor/random');
require( 'meteor/ejson');
require( 'meteor/underscore');
require( 'meteor/tracker');
require( 'meteor/retry');
require( '../__lib__/ddp-common');
var pkg = Package['ddp-common'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

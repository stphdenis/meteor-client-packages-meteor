'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/ejson');
require( 'meteor/check');
require( 'meteor/diff-sequence');
require( 'meteor/tracker');
require( 'meteor/random');
require( 'meteor/id-map');
require( 'meteor/mongo-id');
require( 'meteor/retry');
require( 'meteor/ddp-common');
require( '../__lib__/ddp-client');
var pkg = Package['ddp-client'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

'use strict';
require( 'meteor/meteor');
require( 'meteor/check');
require( 'meteor/random');
require( 'meteor/ejson');
require( 'meteor/underscore');
require( 'meteor/tracker');
require( 'meteor/retry');
require( 'meteor/id-map');
require( 'meteor/ddp-common');
require( 'meteor/diff-sequence');
require( 'meteor/mongo-id');
require( '../__lib__/ddp-client');
var pkg = Package['ddp-client'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

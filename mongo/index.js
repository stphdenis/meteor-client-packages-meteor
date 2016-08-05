'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/ejson');
require( 'meteor/check');
require( 'meteor/diff-sequence');
require( 'meteor/tracker');
require( 'meteor/promise');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/random');
require( 'meteor/mongo-id');
require( 'meteor/ddp-client');
require( 'meteor/minimongo');
require( 'meteor/allow-deny');
require( '../__lib__/mongo');
var pkg = Package['mongo'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.Mongo = pkg.Mongo;
}

'use strict';
require( 'meteor/meteor');
require( 'meteor/allow-deny');
require( 'meteor/random');
require( 'meteor/ejson');
require( 'meteor/underscore');
require( 'meteor/minimongo');
require( 'meteor/ddp-client');
require( 'meteor/tracker');
require( 'meteor/diff-sequence');
require( 'meteor/mongo-id');
require( 'meteor/check');
require( 'meteor/modules');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/promise');
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

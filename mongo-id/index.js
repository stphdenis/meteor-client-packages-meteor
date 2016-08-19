'use strict';
require( 'meteor/meteor');
require( 'meteor/ejson');
require( 'meteor/id-map');
require( 'meteor/random');
require( '../__lib__/mongo-id');
var pkg = Package['mongo-id'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.MongoID = pkg.MongoID;
}

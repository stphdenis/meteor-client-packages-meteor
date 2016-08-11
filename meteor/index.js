'use strict';
require( 'meteor/underscore');
require( 'meteor-client-packages/meteor-runtime-config');
require( '../__lib__/meteor');
var pkg = Package['meteor'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.Meteor = pkg.Meteor;
}

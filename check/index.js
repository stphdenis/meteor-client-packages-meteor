'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/ejson');
require( '../__lib__/check');
var pkg = Package['check'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.check = pkg.check;
  globals.Match = pkg.Match;
}

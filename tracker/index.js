'use strict';
require( 'meteor/meteor');
require( '../__lib__/tracker');
var pkg = Package['tracker'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.Tracker = pkg.Tracker;
}

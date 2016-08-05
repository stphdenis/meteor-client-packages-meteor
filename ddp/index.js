'use strict';
require( 'meteor/ddp-client');
require( '../__lib__/ddp');
var pkg = Package['ddp'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.DDP = pkg.DDP;
}

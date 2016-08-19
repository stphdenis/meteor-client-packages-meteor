'use strict';
require( 'meteor/meteor');
require( 'meteor/tracker');
require( '../__lib__/htmljs');
var pkg = Package['htmljs'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.HTML = pkg.HTML;
}

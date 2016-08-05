'use strict';
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/check');
require( 'meteor/tracker');
require( 'meteor/jquery');
require( 'meteor/reactive-var');
require( 'meteor/observe-sequence');
require( 'meteor/htmljs');
require( '../__lib__/blaze');
var pkg = Package['blaze'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];
if(__meteor_runtime_config__.PUBLIC_SETTINGS.__global_scope__) {
  globals.Blaze = pkg.Blaze;
  globals.UI = pkg.UI;
  globals.Handlebars = pkg.Handlebars;
}

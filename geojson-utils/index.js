'use strict';
require( 'meteor/meteor');
require( 'meteor/modules');
require( '../__lib__/geojson-utils');
var pkg = Package['geojson-utils'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

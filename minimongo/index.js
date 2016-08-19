'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( 'meteor/ejson');
require( 'meteor/id-map');
require( 'meteor/ordered-dict');
require( 'meteor/tracker');
require( 'meteor/mongo-id');
require( 'meteor/random');
require( 'meteor/diff-sequence');
require( 'meteor/geojson-utils');
require( '../__lib__/minimongo');
var pkg = Package['minimongo'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

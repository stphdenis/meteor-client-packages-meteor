'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/ejson');
require( 'meteor/diff-sequence');
require( 'meteor/tracker');
require( 'meteor/random');
require( 'meteor/id-map');
require( 'meteor/mongo-id');
require( 'meteor/geojson-utils');
require( 'meteor/ordered-dict');
require( '../__lib__/minimongo');
var pkg = Package['minimongo'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

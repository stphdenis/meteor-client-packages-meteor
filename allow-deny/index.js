'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/modules');
require( 'meteor/ejson');
require( 'meteor/check');
require( 'meteor/promise');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/ddp-client');
require( 'meteor/minimongo');
require( '../__lib__/allow-deny');
var pkg = Package['allow-deny'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

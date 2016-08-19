'use strict';
require( 'meteor/meteor');
require( 'meteor/underscore');
require( 'meteor/minimongo');
require( 'meteor/check');
require( 'meteor/ejson');
require( 'meteor/ddp-client');
require( 'meteor/modules');
require( 'meteor/ecmascript-runtime');
require( 'meteor/babel-runtime');
require( 'meteor/promise');
require( '../__lib__/allow-deny');
var pkg = Package['allow-deny'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

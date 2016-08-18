'use strict';
require( 'meteor/underscore');
require( 'meteor/meteor');
require( 'meteor/tracker');
require( 'meteor/jquery');
require( 'meteor/htmljs');
require( 'meteor/blaze');
require( 'meteor/service-configuration');
require( 'meteor/accounts-base');
require( 'meteor/spacebars');
require( 'meteor/session');
require( 'meteor/templating');
require( '../__lib__/accounts-ui-unstyled');
var pkg = Package['accounts-ui-unstyled'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

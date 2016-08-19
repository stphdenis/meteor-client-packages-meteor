'use strict';
require( 'meteor/meteor');
require( 'meteor/tracker');
require( 'meteor/service-configuration');
require( 'meteor/accounts-base');
require( 'meteor/underscore');
require( 'meteor/templating');
require( 'meteor/session');
require( 'meteor/jquery');
require( 'meteor/blaze');
require( 'meteor/spacebars');
require( 'meteor/htmljs');
require( '../__lib__/accounts-ui-unstyled');
var pkg = Package['accounts-ui-unstyled'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

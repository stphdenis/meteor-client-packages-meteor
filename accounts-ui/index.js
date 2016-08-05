'use strict';
require( 'meteor/meteor');
require( 'meteor/accounts-base');
require( 'meteor/accounts-ui-unstyled');
require( '../__lib__/accounts-ui');
var pkg = Package['accounts-ui'];
for(var key in pkg) {
  exports[key] = pkg[key];
}
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = pkg[0];

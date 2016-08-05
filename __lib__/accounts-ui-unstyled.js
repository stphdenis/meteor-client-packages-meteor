//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Session = Package.session.Session;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var passwordSignupFields, displayName, getLoginServices, hasPasswordService, dropdown, validateUsername, validateEmail, validatePassword;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/accounts_ui.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @summary Accounts UI                                                                                                // 2
 * @namespace                                                                                                          // 3
 * @memberOf Accounts                                                                                                  // 4
 * @importFromPackage accounts-base                                                                                    // 5
 */                                                                                                                    // 6
Accounts.ui = {};                                                                                                      // 7
                                                                                                                       // 8
Accounts.ui._options = {                                                                                               // 9
  requestPermissions: {},                                                                                              // 10
  requestOfflineToken: {},                                                                                             // 11
  forceApprovalPrompt: {}                                                                                              // 12
};                                                                                                                     // 13
                                                                                                                       // 14
// XXX refactor duplicated code in this function                                                                       // 15
                                                                                                                       // 16
/**                                                                                                                    // 17
 * @summary Configure the behavior of [`{{> loginButtons}}`](#accountsui).                                             // 18
 * @locus Client                                                                                                       // 19
 * @param {Object} options                                                                                             // 20
 * @param {Object} options.requestPermissions Which [permissions](#requestpermissions) to request from the user for each external service.
 * @param {Object} options.requestOfflineToken To ask the user for permission to act on their behalf when offline, map the relevant external service to `true`. Currently only supported with Google. See [Meteor.loginWithExternalService](#meteor_loginwithexternalservice) for more details.
 * @param {Object} options.forceApprovalPrompt If true, forces the user to approve the app's permissions, even if previously approved. Currently only supported with Google.
 * @param {String} options.passwordSignupFields Which fields to display in the user creation form. One of '`USERNAME_AND_EMAIL`', '`USERNAME_AND_OPTIONAL_EMAIL`', '`USERNAME_ONLY`', or '`EMAIL_ONLY`' (default).
 * @importFromPackage accounts-base                                                                                    // 25
 */                                                                                                                    // 26
Accounts.ui.config = function(options) {                                                                               // 27
  // validate options keys                                                                                             // 28
  var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'requestOfflineToken', 'forceApprovalPrompt'];       // 29
  _.each(_.keys(options), function (key) {                                                                             // 30
    if (!_.contains(VALID_KEYS, key))                                                                                  // 31
      throw new Error("Accounts.ui.config: Invalid key: " + key);                                                      // 32
  });                                                                                                                  // 33
                                                                                                                       // 34
  // deal with `passwordSignupFields`                                                                                  // 35
  if (options.passwordSignupFields) {                                                                                  // 36
    if (_.contains([                                                                                                   // 37
      "USERNAME_AND_EMAIL",                                                                                            // 38
      "USERNAME_AND_OPTIONAL_EMAIL",                                                                                   // 39
      "USERNAME_ONLY",                                                                                                 // 40
      "EMAIL_ONLY"                                                                                                     // 41
    ], options.passwordSignupFields)) {                                                                                // 42
      if (Accounts.ui._options.passwordSignupFields)                                                                   // 43
        throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");                        // 44
      else                                                                                                             // 45
        Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;                                      // 46
    } else {                                                                                                           // 47
      throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);
    }                                                                                                                  // 49
  }                                                                                                                    // 50
                                                                                                                       // 51
  // deal with `requestPermissions`                                                                                    // 52
  if (options.requestPermissions) {                                                                                    // 53
    _.each(options.requestPermissions, function (scope, service) {                                                     // 54
      if (Accounts.ui._options.requestPermissions[service]) {                                                          // 55
        throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);           // 56
      } else if (!(scope instanceof Array)) {                                                                          // 57
        throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");                        // 58
      } else {                                                                                                         // 59
        Accounts.ui._options.requestPermissions[service] = scope;                                                      // 60
      }                                                                                                                // 61
    });                                                                                                                // 62
  }                                                                                                                    // 63
                                                                                                                       // 64
  // deal with `requestOfflineToken`                                                                                   // 65
  if (options.requestOfflineToken) {                                                                                   // 66
    _.each(options.requestOfflineToken, function (value, service) {                                                    // 67
      if (service !== 'google')                                                                                        // 68
        throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment.");   // 69
                                                                                                                       // 70
      if (Accounts.ui._options.requestOfflineToken[service]) {                                                         // 71
        throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);          // 72
      } else {                                                                                                         // 73
        Accounts.ui._options.requestOfflineToken[service] = value;                                                     // 74
      }                                                                                                                // 75
    });                                                                                                                // 76
  }                                                                                                                    // 77
                                                                                                                       // 78
  // deal with `forceApprovalPrompt`                                                                                   // 79
  if (options.forceApprovalPrompt) {                                                                                   // 80
    _.each(options.forceApprovalPrompt, function (value, service) {                                                    // 81
      if (service !== 'google')                                                                                        // 82
        throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");   // 83
                                                                                                                       // 84
      if (Accounts.ui._options.forceApprovalPrompt[service]) {                                                         // 85
        throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);          // 86
      } else {                                                                                                         // 87
        Accounts.ui._options.forceApprovalPrompt[service] = value;                                                     // 88
      }                                                                                                                // 89
    });                                                                                                                // 90
  }                                                                                                                    // 91
};                                                                                                                     // 92
                                                                                                                       // 93
passwordSignupFields = function () {                                                                                   // 94
  return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";                                                    // 95
};                                                                                                                     // 96
                                                                                                                       // 97
                                                                                                                       // 98
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("loginButtons");                                                                                  // 2
Template["loginButtons"] = new Template("Template.loginButtons", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    id: "login-buttons",                                                                                               // 6
    "class": function() {                                                                                              // 7
      return [ "login-buttons-dropdown-align-", Spacebars.mustache(view.lookup("align")) ];                            // 8
    }                                                                                                                  // 9
  }, "\n    ", Blaze.If(function() {                                                                                   // 10
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 11
  }, function() {                                                                                                      // 12
    return [ "\n      ", Blaze.If(function() {                                                                         // 13
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 14
    }, function() {                                                                                                    // 15
      return [ "\n        \n        ", Blaze.If(function() {                                                           // 16
        return Spacebars.call(view.lookup("dropdown"));                                                                // 17
      }, function() {                                                                                                  // 18
        return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];     // 19
      }, function() {                                                                                                  // 20
        return [ "\n          ", HTML.DIV({                                                                            // 21
          "class": "login-buttons-with-only-one-button"                                                                // 22
        }, "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n          "), "\n        " ];
      }), "\n      " ];                                                                                                // 24
    }, function() {                                                                                                    // 25
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedIn")), "\n      " ];            // 26
    }), "\n    " ];                                                                                                    // 27
  }, function() {                                                                                                      // 28
    return [ "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOut")), "\n    " ];                 // 29
  }), "\n  ");                                                                                                         // 30
}));                                                                                                                   // 31
                                                                                                                       // 32
Template.__checkName("_loginButtonsLoggedIn");                                                                         // 33
Template["_loginButtonsLoggedIn"] = new Template("Template._loginButtonsLoggedIn", (function() {                       // 34
  var view = this;                                                                                                     // 35
  return Blaze.If(function() {                                                                                         // 36
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 37
  }, function() {                                                                                                      // 38
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdown")), "\n  " ];              // 39
  }, function() {                                                                                                      // 40
    return [ "\n    ", HTML.DIV({                                                                                      // 41
      "class": "login-buttons-with-only-one-button"                                                                    // 42
    }, "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInSingleLogoutButton")), "\n    "), "\n  " ];
  });                                                                                                                  // 44
}));                                                                                                                   // 45
                                                                                                                       // 46
Template.__checkName("_loginButtonsLoggedOut");                                                                        // 47
Template["_loginButtonsLoggedOut"] = new Template("Template._loginButtonsLoggedOut", (function() {                     // 48
  var view = this;                                                                                                     // 49
  return Blaze.If(function() {                                                                                         // 50
    return Spacebars.call(view.lookup("services"));                                                                    // 51
  }, function() {                                                                                                      // 52
    return [ " \n    ", Blaze.If(function() {                                                                          // 53
      return Spacebars.call(view.lookup("configurationLoaded"));                                                       // 54
    }, function() {                                                                                                    // 55
      return [ "\n      ", Blaze.If(function() {                                                                       // 56
        return Spacebars.call(view.lookup("dropdown"));                                                                // 57
      }, function() {                                                                                                  // 58
        return [ " \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n      " ];
      }, function() {                                                                                                  // 60
        return [ "\n        ", Spacebars.With(function() {                                                             // 61
          return Spacebars.call(view.lookup("singleService"));                                                         // 62
        }, function() {                                                                                                // 63
          return [ " \n          ", HTML.DIV({                                                                         // 64
            "class": "login-buttons-with-only-one-button"                                                              // 65
          }, "\n            ", Blaze.If(function() {                                                                   // 66
            return Spacebars.call(view.lookup("loggingIn"));                                                           // 67
          }, function() {                                                                                              // 68
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n            " ];
          }, function() {                                                                                              // 70
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n            " ];
          }), "\n          "), "\n        " ];                                                                         // 72
        }), "\n      " ];                                                                                              // 73
      }), "\n    " ];                                                                                                  // 74
    }), "\n  " ];                                                                                                      // 75
  }, function() {                                                                                                      // 76
    return [ "\n    ", HTML.DIV({                                                                                      // 77
      "class": "no-services"                                                                                           // 78
    }, "No login services configured"), "\n  " ];                                                                      // 79
  });                                                                                                                  // 80
}));                                                                                                                   // 81
                                                                                                                       // 82
Template.__checkName("_loginButtonsMessages");                                                                         // 83
Template["_loginButtonsMessages"] = new Template("Template._loginButtonsMessages", (function() {                       // 84
  var view = this;                                                                                                     // 85
  return [ Blaze.If(function() {                                                                                       // 86
    return Spacebars.call(view.lookup("errorMessage"));                                                                // 87
  }, function() {                                                                                                      // 88
    return [ "\n    ", HTML.DIV({                                                                                      // 89
      "class": "message error-message"                                                                                 // 90
    }, Blaze.View("lookup:errorMessage", function() {                                                                  // 91
      return Spacebars.mustache(view.lookup("errorMessage"));                                                          // 92
    })), "\n  " ];                                                                                                     // 93
  }), "\n  ", Blaze.If(function() {                                                                                    // 94
    return Spacebars.call(view.lookup("infoMessage"));                                                                 // 95
  }, function() {                                                                                                      // 96
    return [ "\n    ", HTML.DIV({                                                                                      // 97
      "class": "message info-message"                                                                                  // 98
    }, Blaze.View("lookup:infoMessage", function() {                                                                   // 99
      return Spacebars.mustache(view.lookup("infoMessage"));                                                           // 100
    })), "\n  " ];                                                                                                     // 101
  }) ];                                                                                                                // 102
}));                                                                                                                   // 103
                                                                                                                       // 104
Template.__checkName("_loginButtonsLoggingIn");                                                                        // 105
Template["_loginButtonsLoggingIn"] = new Template("Template._loginButtonsLoggingIn", (function() {                     // 106
  var view = this;                                                                                                     // 107
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")), HTML.Raw('\n  <div class="loading">&nbsp;</div>\n  '), Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")) ];
}));                                                                                                                   // 109
                                                                                                                       // 110
Template.__checkName("_loginButtonsLoggingInPadding");                                                                 // 111
Template["_loginButtonsLoggingInPadding"] = new Template("Template._loginButtonsLoggingInPadding", (function() {       // 112
  var view = this;                                                                                                     // 113
  return Blaze.Unless(function() {                                                                                     // 114
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 115
  }, function() {                                                                                                      // 116
    return [ "\n    \n    ", HTML.DIV({                                                                                // 117
      "class": "login-buttons-padding"                                                                                 // 118
    }, "\n      ", HTML.DIV({                                                                                          // 119
      "class": "login-button single-login-button",                                                                     // 120
      style: "visibility: hidden;",                                                                                    // 121
      id: "login-buttons-logout"                                                                                       // 122
    }, HTML.CharRef({                                                                                                  // 123
      html: "&nbsp;",                                                                                                  // 124
      str: " "                                                                                                         // 125
    })), "\n    "), "\n  " ];                                                                                          // 126
  }, function() {                                                                                                      // 127
    return [ "\n    \n    ", HTML.DIV({                                                                                // 128
      "class": "login-buttons-padding"                                                                                 // 129
    }), "\n  " ];                                                                                                      // 130
  });                                                                                                                  // 131
}));                                                                                                                   // 132
                                                                                                                       // 133
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_single.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedOutSingleLoginButton");                                                       // 2
Template["_loginButtonsLoggedOutSingleLoginButton"] = new Template("Template._loginButtonsLoggedOutSingleLoginButton", (function() {
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "login-text-and-button"                                                                                   // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": function() {                                                                                              // 8
      return [ "login-button single-login-button ", Blaze.Unless(function() {                                          // 9
        return Spacebars.call(view.lookup("configured"));                                                              // 10
      }, function() {                                                                                                  // 11
        return "configure-button";                                                                                     // 12
      }) ];                                                                                                            // 13
    },                                                                                                                 // 14
    id: function() {                                                                                                   // 15
      return [ "login-buttons-", Spacebars.mustache(view.lookup("name")) ];                                            // 16
    }                                                                                                                  // 17
  }, "\n      ", HTML.DIV({                                                                                            // 18
    "class": "login-image",                                                                                            // 19
    id: function() {                                                                                                   // 20
      return [ "login-buttons-image-", Spacebars.mustache(view.lookup("name")) ];                                      // 21
    }                                                                                                                  // 22
  }), "\n      ", Blaze.If(function() {                                                                                // 23
    return Spacebars.call(view.lookup("configured"));                                                                  // 24
  }, function() {                                                                                                      // 25
    return [ "\n        ", HTML.SPAN({                                                                                 // 26
      "class": function() {                                                                                            // 27
        return [ "text-besides-image sign-in-text-", Spacebars.mustache(view.lookup("name")) ];                        // 28
      }                                                                                                                // 29
    }, "Sign in with ", Blaze.View("lookup:capitalizedName", function() {                                              // 30
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 31
    })), "\n      " ];                                                                                                 // 32
  }, function() {                                                                                                      // 33
    return [ "\n        ", HTML.SPAN({                                                                                 // 34
      "class": function() {                                                                                            // 35
        return [ "text-besides-image configure-text-", Spacebars.mustache(view.lookup("name")) ];                      // 36
      }                                                                                                                // 37
    }, "Configure ", Blaze.View("lookup:capitalizedName", function() {                                                 // 38
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 39
    }), " Login"), "\n      " ];                                                                                       // 40
  }), "\n    "), "\n  ");                                                                                              // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
Template.__checkName("_loginButtonsLoggingInSingleLoginButton");                                                       // 44
Template["_loginButtonsLoggingInSingleLoginButton"] = new Template("Template._loginButtonsLoggingInSingleLoginButton", (function() {
  var view = this;                                                                                                     // 46
  return HTML.DIV({                                                                                                    // 47
    "class": "login-text-and-button"                                                                                   // 48
  }, "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n  ");                              // 49
}));                                                                                                                   // 50
                                                                                                                       // 51
Template.__checkName("_loginButtonsLoggedInSingleLogoutButton");                                                       // 52
Template["_loginButtonsLoggedInSingleLogoutButton"] = new Template("Template._loginButtonsLoggedInSingleLogoutButton", (function() {
  var view = this;                                                                                                     // 54
  return HTML.DIV({                                                                                                    // 55
    "class": "login-text-and-button"                                                                                   // 56
  }, "\n    ", HTML.DIV({                                                                                              // 57
    "class": "login-display-name"                                                                                      // 58
  }, "\n      ", Blaze.View("lookup:displayName", function() {                                                         // 59
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 60
  }), "\n    "), HTML.Raw('\n    <div class="login-button single-login-button" id="login-buttons-logout">Sign Out</div>\n  '));
}));                                                                                                                   // 62
                                                                                                                       // 63
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_dropdown.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedInDropdown");                                                                 // 2
Template["_loginButtonsLoggedInDropdown"] = new Template("Template._loginButtonsLoggedInDropdown", (function() {       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "login-link-and-dropdown-list"                                                                            // 6
  }, "\n    ", HTML.A({                                                                                                // 7
    "class": "login-link-text",                                                                                        // 8
    id: "login-name-link"                                                                                              // 9
  }, "\n      ", Blaze.View("lookup:displayName", function() {                                                         // 10
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 11
  }), " ▾\n    "), "\n\n    ", Blaze.If(function() {                                                                   // 12
    return Spacebars.call(view.lookup("dropdownVisible"));                                                             // 13
  }, function() {                                                                                                      // 14
    return [ "\n      ", HTML.DIV({                                                                                    // 15
      id: "login-dropdown-list",                                                                                       // 16
      "class": "accounts-dialog"                                                                                       // 17
    }, "\n        ", HTML.A({                                                                                          // 18
      "class": "login-close-text"                                                                                      // 19
    }, "Close"), "\n        ", HTML.DIV({                                                                              // 20
      "class": "login-close-text-clear"                                                                                // 21
    }), "\n\n        ", Blaze.If(function() {                                                                          // 22
      return Spacebars.call(view.lookup("inMessageOnlyFlow"));                                                         // 23
    }, function() {                                                                                                    // 24
      return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n        " ];        // 25
    }, function() {                                                                                                    // 26
      return [ "\n          ", Blaze.If(function() {                                                                   // 27
        return Spacebars.call(view.lookup("inChangePasswordFlow"));                                                    // 28
      }, function() {                                                                                                  // 29
        return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n          " ];
      }, function() {                                                                                                  // 31
        return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n          " ];
      }), "\n        " ];                                                                                              // 33
    }), "\n      "), "\n    " ];                                                                                       // 34
  }), "\n  ");                                                                                                         // 35
}));                                                                                                                   // 36
                                                                                                                       // 37
Template.__checkName("_loginButtonsLoggedInDropdownActions");                                                          // 38
Template["_loginButtonsLoggedInDropdownActions"] = new Template("Template._loginButtonsLoggedInDropdownActions", (function() {
  var view = this;                                                                                                     // 40
  return [ Blaze.If(function() {                                                                                       // 41
    return Spacebars.call(view.lookup("allowChangingPassword"));                                                       // 42
  }, function() {                                                                                                      // 43
    return [ "\n    ", HTML.DIV({                                                                                      // 44
      "class": "login-button",                                                                                         // 45
      id: "login-buttons-open-change-password"                                                                         // 46
    }, "\n      Change password\n    "), "\n  " ];                                                                     // 47
  }), HTML.Raw('\n\n  <div class="login-button" id="login-buttons-logout">\n    Sign out\n  </div>\n\n  '), Spacebars.include(view.lookupTemplate("_loginButtonsMessages")) ];
}));                                                                                                                   // 49
                                                                                                                       // 50
Template.__checkName("_loginButtonsLoggedOutDropdown");                                                                // 51
Template["_loginButtonsLoggedOutDropdown"] = new Template("Template._loginButtonsLoggedOutDropdown", (function() {     // 52
  var view = this;                                                                                                     // 53
  return HTML.DIV({                                                                                                    // 54
    "class": function() {                                                                                              // 55
      return [ "login-link-and-dropdown-list ", Spacebars.mustache(view.lookup("additionalClasses")) ];                // 56
    }                                                                                                                  // 57
  }, "\n    ", Blaze.If(function() {                                                                                   // 58
    return Spacebars.call(view.lookup("dropdownVisible"));                                                             // 59
  }, function() {                                                                                                      // 60
    return [ "\n      \n      ", HTML.A({                                                                              // 61
      "class": "login-link-text",                                                                                      // 62
      id: "login-sign-in-link"                                                                                         // 63
    }, "Sign in ▾"), "\n      ", HTML.DIV({                                                                            // 64
      id: "login-dropdown-list",                                                                                       // 65
      "class": "accounts-dialog"                                                                                       // 66
    }, "\n        ", HTML.A({                                                                                          // 67
      "class": "login-close-text"                                                                                      // 68
    }, "Close"), "\n        ", Blaze.If(function() {                                                                   // 69
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 70
    }, function() {                                                                                                    // 71
      return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];       // 72
    }), "\n        ", HTML.DIV({                                                                                       // 73
      "class": "login-close-text-clear"                                                                                // 74
    }), "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n      "), "\n    " ];
  }, function() {                                                                                                      // 76
    return [ "\n      ", Blaze.If(function() {                                                                         // 77
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 78
    }, function() {                                                                                                    // 79
      return [ "\n        \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n      " ];
    }, function() {                                                                                                    // 81
      return [ "\n        ", HTML.A({                                                                                  // 82
        "class": "login-link-text",                                                                                    // 83
        id: "login-sign-in-link"                                                                                       // 84
      }, "Sign in ▾"), "\n      " ];                                                                                   // 85
    }), "\n    " ];                                                                                                    // 86
  }), "\n  ");                                                                                                         // 87
}));                                                                                                                   // 88
                                                                                                                       // 89
Template.__checkName("_loginButtonsLoggedOutAllServices");                                                             // 90
Template["_loginButtonsLoggedOutAllServices"] = new Template("Template._loginButtonsLoggedOutAllServices", (function() {
  var view = this;                                                                                                     // 92
  return [ Blaze.Each(function() {                                                                                     // 93
    return Spacebars.call(view.lookup("services"));                                                                    // 94
  }, function() {                                                                                                      // 95
    return [ "\n    ", Blaze.If(function() {                                                                           // 96
      return Spacebars.call(view.lookup("isPasswordService"));                                                         // 97
    }, function() {                                                                                                    // 98
      return [ "\n      ", Blaze.If(function() {                                                                       // 99
        return Spacebars.call(view.lookup("hasOtherServices"));                                                        // 100
      }, function() {                                                                                                  // 101
        return [ " \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n      " ];
      }), "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n    " ];     // 103
    }, function() {                                                                                                    // 104
      return [ "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n    " ];
    }), "\n  " ];                                                                                                      // 106
  }), "\n\n  ", Blaze.Unless(function() {                                                                              // 107
    return Spacebars.call(view.lookup("hasPasswordService"));                                                          // 108
  }, function() {                                                                                                      // 109
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n  " ];                      // 110
  }) ];                                                                                                                // 111
}));                                                                                                                   // 112
                                                                                                                       // 113
Template.__checkName("_loginButtonsLoggedOutPasswordServiceSeparator");                                                // 114
Template["_loginButtonsLoggedOutPasswordServiceSeparator"] = new Template("Template._loginButtonsLoggedOutPasswordServiceSeparator", (function() {
  var view = this;                                                                                                     // 116
  return HTML.Raw('<div class="or">\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n    <span class="or-text">or</span>\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n  </div>');
}));                                                                                                                   // 118
                                                                                                                       // 119
Template.__checkName("_loginButtonsLoggedOutPasswordService");                                                         // 120
Template["_loginButtonsLoggedOutPasswordService"] = new Template("Template._loginButtonsLoggedOutPasswordService", (function() {
  var view = this;                                                                                                     // 122
  return Blaze.If(function() {                                                                                         // 123
    return Spacebars.call(view.lookup("inForgotPasswordFlow"));                                                        // 124
  }, function() {                                                                                                      // 125
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_forgotPasswordForm")), "\n  " ];                        // 126
  }, function() {                                                                                                      // 127
    return [ "\n    ", HTML.DIV({                                                                                      // 128
      "class": "login-form login-password-form"                                                                        // 129
    }, "\n      ", Blaze.Each(function() {                                                                             // 130
      return Spacebars.call(view.lookup("fields"));                                                                    // 131
    }, function() {                                                                                                    // 132
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n      " ];           // 133
    }), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({        // 134
      "class": "login-button login-button-form-submit",                                                                // 135
      id: "login-buttons-password"                                                                                     // 136
    }, "\n        ", Blaze.If(function() {                                                                             // 137
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 138
    }, function() {                                                                                                    // 139
      return "\n          Create account\n        ";                                                                   // 140
    }, function() {                                                                                                    // 141
      return "\n          Sign in\n        ";                                                                          // 142
    }), "\n      "), "\n\n      ", Blaze.If(function() {                                                               // 143
      return Spacebars.call(view.lookup("inLoginFlow"));                                                               // 144
    }, function() {                                                                                                    // 145
      return [ "\n        ", Blaze.If(function() {                                                                     // 146
        return Spacebars.call(view.lookup("showCreateAccountLink"));                                                   // 147
      }, function() {                                                                                                  // 148
        return [ "\n          ", HTML.DIV({                                                                            // 149
          "class": "additional-link-container"                                                                         // 150
        }, "\n            ", HTML.A({                                                                                  // 151
          id: "signup-link",                                                                                           // 152
          "class": "additional-link"                                                                                   // 153
        }, "Create account"), "\n          "), "\n        " ];                                                         // 154
      }), "\n\n        ", Blaze.If(function() {                                                                        // 155
        return Spacebars.call(view.lookup("showForgotPasswordLink"));                                                  // 156
      }, function() {                                                                                                  // 157
        return [ "\n          ", HTML.DIV({                                                                            // 158
          "class": "additional-link-container"                                                                         // 159
        }, "\n            ", HTML.A({                                                                                  // 160
          id: "forgot-password-link",                                                                                  // 161
          "class": "additional-link"                                                                                   // 162
        }, "Forgot password"), "\n          "), "\n        " ];                                                        // 163
      }), "\n      " ];                                                                                                // 164
    }), "\n\n      ", Blaze.If(function() {                                                                            // 165
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 166
    }, function() {                                                                                                    // 167
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n      " ];     // 168
    }), "\n    "), "\n  " ];                                                                                           // 169
  });                                                                                                                  // 170
}));                                                                                                                   // 171
                                                                                                                       // 172
Template.__checkName("_forgotPasswordForm");                                                                           // 173
Template["_forgotPasswordForm"] = new Template("Template._forgotPasswordForm", (function() {                           // 174
  var view = this;                                                                                                     // 175
  return HTML.DIV({                                                                                                    // 176
    "class": "login-form"                                                                                              // 177
  }, HTML.Raw('\n    <div id="forgot-password-email-label-and-input"> \n      <label id="forgot-password-email-label" for="forgot-password-email">Email</label>\n      <input id="forgot-password-email" type="email">\n    </div>\n\n    '), Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n\n    <div class="login-button login-button-form-submit" id="login-buttons-forgot-password">\n      Reset password\n    </div>\n\n    '), Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n  ");
}));                                                                                                                   // 179
                                                                                                                       // 180
Template.__checkName("_loginButtonsBackToLoginLink");                                                                  // 181
Template["_loginButtonsBackToLoginLink"] = new Template("Template._loginButtonsBackToLoginLink", (function() {         // 182
  var view = this;                                                                                                     // 183
  return HTML.Raw('<div class="additional-link-container">\n    <a id="back-to-login-link" class="additional-link">Sign in</a>\n  </div>');
}));                                                                                                                   // 185
                                                                                                                       // 186
Template.__checkName("_loginButtonsFormField");                                                                        // 187
Template["_loginButtonsFormField"] = new Template("Template._loginButtonsFormField", (function() {                     // 188
  var view = this;                                                                                                     // 189
  return Blaze.If(function() {                                                                                         // 190
    return Spacebars.call(view.lookup("visible"));                                                                     // 191
  }, function() {                                                                                                      // 192
    return [ "\n    ", HTML.DIV({                                                                                      // 193
      id: function() {                                                                                                 // 194
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")), "-label-and-input" ];                         // 195
      }                                                                                                                // 196
    }, "\n      ", HTML.LABEL({                                                                                        // 197
      id: function() {                                                                                                 // 198
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")), "-label" ];                                   // 199
      },                                                                                                               // 200
      "for": function() {                                                                                              // 201
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                             // 202
      }                                                                                                                // 203
    }, "\n        ", Blaze.View("lookup:fieldLabel", function() {                                                      // 204
      return Spacebars.mustache(view.lookup("fieldLabel"));                                                            // 205
    }), "\n      "), "\n      ", HTML.INPUT({                                                                          // 206
      id: function() {                                                                                                 // 207
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                             // 208
      },                                                                                                               // 209
      type: function() {                                                                                               // 210
        return Spacebars.mustache(view.lookup("inputType"));                                                           // 211
      }                                                                                                                // 212
    }), "\n    "), "\n  " ];                                                                                           // 213
  });                                                                                                                  // 214
}));                                                                                                                   // 215
                                                                                                                       // 216
Template.__checkName("_loginButtonsChangePassword");                                                                   // 217
Template["_loginButtonsChangePassword"] = new Template("Template._loginButtonsChangePassword", (function() {           // 218
  var view = this;                                                                                                     // 219
  return [ Blaze.Each(function() {                                                                                     // 220
    return Spacebars.call(view.lookup("fields"));                                                                      // 221
  }, function() {                                                                                                      // 222
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n  " ];                     // 223
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n\n  <div class="login-button login-button-form-submit" id="login-buttons-do-change-password">\n    Change password\n  </div>') ];
}));                                                                                                                   // 225
                                                                                                                       // 226
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_dialogs.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return [ Spacebars.include(view.lookupTemplate("_resetPasswordDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_justResetPasswordDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_enrollAccountDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_justVerifiedEmailDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_configureLoginServiceDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_configureLoginOnDesktopDialog")), "\n\n  \n  ", Spacebars.include(view.lookupTemplate("_loginButtonsMessagesDialog")) ];
}));                                                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                                                        // 6
                                                                                                                       // 7
Template.__checkName("_resetPasswordDialog");                                                                          // 8
Template["_resetPasswordDialog"] = new Template("Template._resetPasswordDialog", (function() {                         // 9
  var view = this;                                                                                                     // 10
  return Blaze.If(function() {                                                                                         // 11
    return Spacebars.call(view.lookup("inResetPasswordFlow"));                                                         // 12
  }, function() {                                                                                                      // 13
    return [ "\n    ", HTML.DIV({                                                                                      // 14
      "class": "hide-background"                                                                                       // 15
    }), "\n\n    ", HTML.DIV({                                                                                         // 16
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 17
    }, "\n      ", HTML.LABEL({                                                                                        // 18
      id: "reset-password-new-password-label",                                                                         // 19
      "for": "reset-password-new-password"                                                                             // 20
    }, "\n        New password\n      "), "\n\n      ", HTML.DIV({                                                     // 21
      "class": "reset-password-new-password-wrapper"                                                                   // 22
    }, "\n        ", HTML.INPUT({                                                                                      // 23
      id: "reset-password-new-password",                                                                               // 24
      type: "password"                                                                                                 // 25
    }), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({
      "class": "login-button login-button-form-submit",                                                                // 27
      id: "login-buttons-reset-password-button"                                                                        // 28
    }, "\n        Set password\n      "), "\n\n      ", HTML.A({                                                       // 29
      "class": "accounts-close",                                                                                       // 30
      id: "login-buttons-cancel-reset-password"                                                                        // 31
    }, HTML.CharRef({                                                                                                  // 32
      html: "&times;",                                                                                                 // 33
      str: "×"                                                                                                         // 34
    })), "\n    "), "\n  " ];                                                                                          // 35
  });                                                                                                                  // 36
}));                                                                                                                   // 37
                                                                                                                       // 38
Template.__checkName("_justResetPasswordDialog");                                                                      // 39
Template["_justResetPasswordDialog"] = new Template("Template._justResetPasswordDialog", (function() {                 // 40
  var view = this;                                                                                                     // 41
  return Blaze.If(function() {                                                                                         // 42
    return Spacebars.call(view.lookup("visible"));                                                                     // 43
  }, function() {                                                                                                      // 44
    return [ "\n    ", HTML.DIV({                                                                                      // 45
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 46
    }, "\n      Password reset.\n      You are now logged in as ", Blaze.View("lookup:displayName", function() {       // 47
      return Spacebars.mustache(view.lookup("displayName"));                                                           // 48
    }), ".\n      ", HTML.DIV({                                                                                        // 49
      "class": "login-button",                                                                                         // 50
      id: "just-verified-dismiss-button"                                                                               // 51
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 52
  });                                                                                                                  // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
Template.__checkName("_enrollAccountDialog");                                                                          // 56
Template["_enrollAccountDialog"] = new Template("Template._enrollAccountDialog", (function() {                         // 57
  var view = this;                                                                                                     // 58
  return Blaze.If(function() {                                                                                         // 59
    return Spacebars.call(view.lookup("inEnrollAccountFlow"));                                                         // 60
  }, function() {                                                                                                      // 61
    return [ "\n    ", HTML.DIV({                                                                                      // 62
      "class": "hide-background"                                                                                       // 63
    }), "\n\n    ", HTML.DIV({                                                                                         // 64
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 65
    }, "\n      ", HTML.LABEL({                                                                                        // 66
      id: "enroll-account-password-label",                                                                             // 67
      "for": "enroll-account-password"                                                                                 // 68
    }, "\n        Choose a password\n      "), "\n\n      ", HTML.DIV({                                                // 69
      "class": "enroll-account-password-wrapper"                                                                       // 70
    }, "\n        ", HTML.INPUT({                                                                                      // 71
      id: "enroll-account-password",                                                                                   // 72
      type: "password"                                                                                                 // 73
    }), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({
      "class": "login-button login-button-form-submit",                                                                // 75
      id: "login-buttons-enroll-account-button"                                                                        // 76
    }, "\n        Create account\n      "), "\n\n      ", HTML.A({                                                     // 77
      "class": "accounts-close",                                                                                       // 78
      id: "login-buttons-cancel-enroll-account"                                                                        // 79
    }, HTML.CharRef({                                                                                                  // 80
      html: "&times;",                                                                                                 // 81
      str: "×"                                                                                                         // 82
    })), "\n    "), "\n  " ];                                                                                          // 83
  });                                                                                                                  // 84
}));                                                                                                                   // 85
                                                                                                                       // 86
Template.__checkName("_justVerifiedEmailDialog");                                                                      // 87
Template["_justVerifiedEmailDialog"] = new Template("Template._justVerifiedEmailDialog", (function() {                 // 88
  var view = this;                                                                                                     // 89
  return Blaze.If(function() {                                                                                         // 90
    return Spacebars.call(view.lookup("visible"));                                                                     // 91
  }, function() {                                                                                                      // 92
    return [ "\n    ", HTML.DIV({                                                                                      // 93
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 94
    }, "\n      Email verified.\n      You are now logged in as ", Blaze.View("lookup:displayName", function() {       // 95
      return Spacebars.mustache(view.lookup("displayName"));                                                           // 96
    }), ".\n      ", HTML.DIV({                                                                                        // 97
      "class": "login-button",                                                                                         // 98
      id: "just-verified-dismiss-button"                                                                               // 99
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 100
  });                                                                                                                  // 101
}));                                                                                                                   // 102
                                                                                                                       // 103
Template.__checkName("_configureLoginServiceDialog");                                                                  // 104
Template["_configureLoginServiceDialog"] = new Template("Template._configureLoginServiceDialog", (function() {         // 105
  var view = this;                                                                                                     // 106
  return Blaze.If(function() {                                                                                         // 107
    return Spacebars.call(view.lookup("visible"));                                                                     // 108
  }, function() {                                                                                                      // 109
    return [ "\n    ", HTML.DIV({                                                                                      // 110
      id: "configure-login-service-dialog",                                                                            // 111
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 112
    }, "\n      ", Spacebars.include(view.lookupTemplate("configurationSteps")), "\n\n      ", HTML.P("\n        Now, copy over some details.\n      "), "\n      ", HTML.P("\n        ", HTML.TABLE("\n          ", HTML.COLGROUP("\n            ", HTML.COL({
      span: "1",                                                                                                       // 114
      "class": "configuration_labels"                                                                                  // 115
    }), "\n            ", HTML.COL({                                                                                   // 116
      span: "1",                                                                                                       // 117
      "class": "configuration_inputs"                                                                                  // 118
    }), "\n          "), "\n          ", Blaze.Each(function() {                                                       // 119
      return Spacebars.call(view.lookup("configurationFields"));                                                       // 120
    }, function() {                                                                                                    // 121
      return [ "\n            ", HTML.TR("\n              ", HTML.TD("\n                ", HTML.LABEL({                // 122
        "for": function() {                                                                                            // 123
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 124
        }                                                                                                              // 125
      }, Blaze.View("lookup:label", function() {                                                                       // 126
        return Spacebars.mustache(view.lookup("label"));                                                               // 127
      })), "\n              "), "\n              ", HTML.TD("\n                ", HTML.INPUT({                         // 128
        id: function() {                                                                                               // 129
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 130
        },                                                                                                             // 131
        type: "text"                                                                                                   // 132
      }), "\n              "), "\n            "), "\n          " ];                                                    // 133
    }), "\n        "), "\n      "), "\n      ", HTML.P({                                                               // 134
      "class": "new-section"                                                                                           // 135
    }, "\n        Choose the login style:\n      "), "\n      ", HTML.P("\n        ", HTML.CharRef({                   // 136
      html: "&emsp;",                                                                                                  // 137
      str: " "                                                                                                         // 138
    }), HTML.INPUT({                                                                                                   // 139
      id: "configure-login-service-dialog-popupBasedLogin",                                                            // 140
      type: "radio",                                                                                                   // 141
      checked: "checked",                                                                                              // 142
      name: "loginStyle",                                                                                              // 143
      value: "popup"                                                                                                   // 144
    }), "\n        ", HTML.LABEL({                                                                                     // 145
      "for": "configure-login-service-dialog-popupBasedLogin"                                                          // 146
    }, "Popup-based login (recommended for most applications)"), "\n\n        ", HTML.BR(), HTML.CharRef({             // 147
      html: "&emsp;",                                                                                                  // 148
      str: " "                                                                                                         // 149
    }), HTML.INPUT({                                                                                                   // 150
      id: "configure-login-service-dialog-redirectBasedLogin",                                                         // 151
      type: "radio",                                                                                                   // 152
      name: "loginStyle",                                                                                              // 153
      value: "redirect"                                                                                                // 154
    }), "\n        ", HTML.LABEL({                                                                                     // 155
      "for": "configure-login-service-dialog-redirectBasedLogin"                                                       // 156
    }, "\n          Redirect-based login (special cases explained\n          ", HTML.A({                               // 157
      href: "https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients#popup-versus-redirect-flow",        // 158
      target: "_blank"                                                                                                 // 159
    }, "here"), ")\n        "), "\n      "), "\n      ", HTML.DIV({                                                    // 160
      "class": "new-section"                                                                                           // 161
    }, "\n        ", HTML.DIV({                                                                                        // 162
      "class": "login-button configure-login-service-dismiss-button"                                                   // 163
    }, "\n          I'll do this later\n        "), "\n        ", HTML.A({                                             // 164
      "class": "accounts-close configure-login-service-dismiss-button"                                                 // 165
    }, HTML.CharRef({                                                                                                  // 166
      html: "&times;",                                                                                                 // 167
      str: "×"                                                                                                         // 168
    })), "\n\n        ", HTML.DIV({                                                                                    // 169
      "class": function() {                                                                                            // 170
        return [ "login-button login-button-configure ", Blaze.If(function() {                                         // 171
          return Spacebars.call(view.lookup("saveDisabled"));                                                          // 172
        }, function() {                                                                                                // 173
          return "login-button-disabled";                                                                              // 174
        }) ];                                                                                                          // 175
      },                                                                                                               // 176
      id: "configure-login-service-dialog-save-configuration"                                                          // 177
    }, "\n          Save Configuration\n        "), "\n      "), "\n    "), "\n  " ];                                  // 178
  });                                                                                                                  // 179
}));                                                                                                                   // 180
                                                                                                                       // 181
Template.__checkName("_loginButtonsMessagesDialog");                                                                   // 182
Template["_loginButtonsMessagesDialog"] = new Template("Template._loginButtonsMessagesDialog", (function() {           // 183
  var view = this;                                                                                                     // 184
  return Blaze.If(function() {                                                                                         // 185
    return Spacebars.call(view.lookup("visible"));                                                                     // 186
  }, function() {                                                                                                      // 187
    return [ "\n    ", HTML.DIV({                                                                                      // 188
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 189
      id: "login-buttons-message-dialog"                                                                               // 190
    }, "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n      ", HTML.DIV({             // 191
      "class": "login-button",                                                                                         // 192
      id: "messages-dialog-dismiss-button"                                                                             // 193
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 194
  });                                                                                                                  // 195
}));                                                                                                                   // 196
                                                                                                                       // 197
Template.__checkName("_configureLoginOnDesktopDialog");                                                                // 198
Template["_configureLoginOnDesktopDialog"] = new Template("Template._configureLoginOnDesktopDialog", (function() {     // 199
  var view = this;                                                                                                     // 200
  return Blaze.If(function() {                                                                                         // 201
    return Spacebars.call(view.lookup("visible"));                                                                     // 202
  }, function() {                                                                                                      // 203
    return [ "\n    ", HTML.DIV({                                                                                      // 204
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 205
      id: "configure-on-desktop-dialog"                                                                                // 206
    }, "\n      ", HTML.P("\n        Please configure login on a desktop browser.\n      "), "\n      ", HTML.DIV({    // 207
      "class": "login-button",                                                                                         // 208
      id: "configure-on-desktop-dismiss-button"                                                                        // 209
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 210
  });                                                                                                                  // 211
}));                                                                                                                   // 212
                                                                                                                       // 213
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_session.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var VALID_KEYS = [                                                                                                     // 1
  'dropdownVisible',                                                                                                   // 2
                                                                                                                       // 3
  // XXX consider replacing these with one key that has an enum for values.                                            // 4
  'inSignupFlow',                                                                                                      // 5
  'inForgotPasswordFlow',                                                                                              // 6
  'inChangePasswordFlow',                                                                                              // 7
  'inMessageOnlyFlow',                                                                                                 // 8
                                                                                                                       // 9
  'errorMessage',                                                                                                      // 10
  'infoMessage',                                                                                                       // 11
                                                                                                                       // 12
  // dialogs with messages (info and error)                                                                            // 13
  'resetPasswordToken',                                                                                                // 14
  'enrollAccountToken',                                                                                                // 15
  'justVerifiedEmail',                                                                                                 // 16
  'justResetPassword',                                                                                                 // 17
                                                                                                                       // 18
  'configureLoginServiceDialogVisible',                                                                                // 19
  'configureLoginServiceDialogServiceName',                                                                            // 20
  'configureLoginServiceDialogSaveDisabled',                                                                           // 21
  'configureOnDesktopVisible'                                                                                          // 22
];                                                                                                                     // 23
                                                                                                                       // 24
var validateKey = function (key) {                                                                                     // 25
  if (!_.contains(VALID_KEYS, key))                                                                                    // 26
    throw new Error("Invalid key in loginButtonsSession: " + key);                                                     // 27
};                                                                                                                     // 28
                                                                                                                       // 29
var KEY_PREFIX = "Meteor.loginButtons.";                                                                               // 30
                                                                                                                       // 31
// XXX This should probably be package scope rather than exported                                                      // 32
// (there was even a comment to that effect here from before we had                                                    // 33
// namespacing) but accounts-ui-viewer uses it, so leave it as is for                                                  // 34
// now                                                                                                                 // 35
Accounts._loginButtonsSession = {                                                                                      // 36
  set: function(key, value) {                                                                                          // 37
    validateKey(key);                                                                                                  // 38
    if (_.contains(['errorMessage', 'infoMessage'], key))                                                              // 39
      throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");
                                                                                                                       // 41
    this._set(key, value);                                                                                             // 42
  },                                                                                                                   // 43
                                                                                                                       // 44
  _set: function(key, value) {                                                                                         // 45
    Session.set(KEY_PREFIX + key, value);                                                                              // 46
  },                                                                                                                   // 47
                                                                                                                       // 48
  get: function(key) {                                                                                                 // 49
    validateKey(key);                                                                                                  // 50
    return Session.get(KEY_PREFIX + key);                                                                              // 51
  },                                                                                                                   // 52
                                                                                                                       // 53
  closeDropdown: function () {                                                                                         // 54
    this.set('inSignupFlow', false);                                                                                   // 55
    this.set('inForgotPasswordFlow', false);                                                                           // 56
    this.set('inChangePasswordFlow', false);                                                                           // 57
    this.set('inMessageOnlyFlow', false);                                                                              // 58
    this.set('dropdownVisible', false);                                                                                // 59
    this.resetMessages();                                                                                              // 60
  },                                                                                                                   // 61
                                                                                                                       // 62
  infoMessage: function(message) {                                                                                     // 63
    this._set("errorMessage", null);                                                                                   // 64
    this._set("infoMessage", message);                                                                                 // 65
    this.ensureMessageVisible();                                                                                       // 66
  },                                                                                                                   // 67
                                                                                                                       // 68
  errorMessage: function(message) {                                                                                    // 69
    this._set("errorMessage", message);                                                                                // 70
    this._set("infoMessage", null);                                                                                    // 71
    this.ensureMessageVisible();                                                                                       // 72
  },                                                                                                                   // 73
                                                                                                                       // 74
  // is there a visible dialog that shows messages (info and error)                                                    // 75
  isMessageDialogVisible: function () {                                                                                // 76
    return this.get('resetPasswordToken') ||                                                                           // 77
      this.get('enrollAccountToken') ||                                                                                // 78
      this.get('justVerifiedEmail');                                                                                   // 79
  },                                                                                                                   // 80
                                                                                                                       // 81
  // ensure that somethings displaying a message (info or error) is                                                    // 82
  // visible.  if a dialog with messages is open, do nothing;                                                          // 83
  // otherwise open the dropdown.                                                                                      // 84
  //                                                                                                                   // 85
  // notably this doesn't matter when only displaying a single login                                                   // 86
  // button since then we have an explicit message dialog                                                              // 87
  // (_loginButtonsMessageDialog), and dropdownVisible is ignored in                                                   // 88
  // this case.                                                                                                        // 89
  ensureMessageVisible: function () {                                                                                  // 90
    if (!this.isMessageDialogVisible())                                                                                // 91
      this.set("dropdownVisible", true);                                                                               // 92
  },                                                                                                                   // 93
                                                                                                                       // 94
  resetMessages: function () {                                                                                         // 95
    this._set("errorMessage", null);                                                                                   // 96
    this._set("infoMessage", null);                                                                                    // 97
  },                                                                                                                   // 98
                                                                                                                       // 99
  configureService: function (name) {                                                                                  // 100
    if (Meteor.isCordova) {                                                                                            // 101
      this.set('configureOnDesktopVisible', true);                                                                     // 102
    } else {                                                                                                           // 103
      this.set('configureLoginServiceDialogVisible', true);                                                            // 104
      this.set('configureLoginServiceDialogServiceName', name);                                                        // 105
      this.set('configureLoginServiceDialogSaveDisabled', true);                                                       // 106
    }                                                                                                                  // 107
  }                                                                                                                    // 108
};                                                                                                                     // 109
                                                                                                                       // 110
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
// shared between dropdown and single mode                                                                             // 4
Template.loginButtons.events({                                                                                         // 5
  'click #login-buttons-logout': function() {                                                                          // 6
    Meteor.logout(function () {                                                                                        // 7
      loginButtonsSession.closeDropdown();                                                                             // 8
    });                                                                                                                // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
                                                                                                                       // 12
Template.registerHelper('loginButtons', function () {                                                                  // 13
  throw new Error("Use {{> loginButtons}} instead of {{loginButtons}}");                                               // 14
});                                                                                                                    // 15
                                                                                                                       // 16
//                                                                                                                     // 17
// helpers                                                                                                             // 18
//                                                                                                                     // 19
                                                                                                                       // 20
displayName = function () {                                                                                            // 21
  var user = Meteor.user();                                                                                            // 22
  if (!user)                                                                                                           // 23
    return '';                                                                                                         // 24
                                                                                                                       // 25
  if (user.profile && user.profile.name)                                                                               // 26
    return user.profile.name;                                                                                          // 27
  if (user.username)                                                                                                   // 28
    return user.username;                                                                                              // 29
  if (user.emails && user.emails[0] && user.emails[0].address)                                                         // 30
    return user.emails[0].address;                                                                                     // 31
                                                                                                                       // 32
  return '';                                                                                                           // 33
};                                                                                                                     // 34
                                                                                                                       // 35
// returns an array of the login services used by this app. each                                                       // 36
// element of the array is an object (eg {name: 'facebook'}), since                                                    // 37
// that makes it useful in combination with handlebars {{#each}}.                                                      // 38
//                                                                                                                     // 39
// don't cache the output of this function: if called during startup (before                                           // 40
// oauth packages load) it might not include them all.                                                                 // 41
//                                                                                                                     // 42
// NOTE: It is very important to have this return password last                                                        // 43
// because of the way we render the different providers in                                                             // 44
// login_buttons_dropdown.html                                                                                         // 45
getLoginServices = function () {                                                                                       // 46
  var self = this;                                                                                                     // 47
                                                                                                                       // 48
  // First look for OAuth services.                                                                                    // 49
  var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];                                       // 50
                                                                                                                       // 51
  // Be equally kind to all login services. This also preserves                                                        // 52
  // backwards-compatibility. (But maybe order should be                                                               // 53
  // configurable?)                                                                                                    // 54
  services.sort();                                                                                                     // 55
                                                                                                                       // 56
  // Add password, if it's there; it must come last.                                                                   // 57
  if (hasPasswordService())                                                                                            // 58
    services.push('password');                                                                                         // 59
                                                                                                                       // 60
  return _.map(services, function(name) {                                                                              // 61
    return {name: name};                                                                                               // 62
  });                                                                                                                  // 63
};                                                                                                                     // 64
                                                                                                                       // 65
hasPasswordService = function () {                                                                                     // 66
  return !!Package['accounts-password'];                                                                               // 67
};                                                                                                                     // 68
                                                                                                                       // 69
dropdown = function () {                                                                                               // 70
  return hasPasswordService() || getLoginServices().length > 1;                                                        // 71
};                                                                                                                     // 72
                                                                                                                       // 73
// XXX improve these. should this be in accounts-password instead?                                                     // 74
//                                                                                                                     // 75
// XXX these will become configurable, and will be validated on                                                        // 76
// the server as well.                                                                                                 // 77
validateUsername = function (username) {                                                                               // 78
  if (username.length >= 3) {                                                                                          // 79
    return true;                                                                                                       // 80
  } else {                                                                                                             // 81
    loginButtonsSession.errorMessage("Username must be at least 3 characters long");                                   // 82
    return false;                                                                                                      // 83
  }                                                                                                                    // 84
};                                                                                                                     // 85
validateEmail = function (email) {                                                                                     // 86
  if (passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')                                        // 87
    return true;                                                                                                       // 88
                                                                                                                       // 89
  if (email.indexOf('@') !== -1) {                                                                                     // 90
    return true;                                                                                                       // 91
  } else {                                                                                                             // 92
    loginButtonsSession.errorMessage("Invalid email");                                                                 // 93
    return false;                                                                                                      // 94
  }                                                                                                                    // 95
};                                                                                                                     // 96
validatePassword = function (password) {                                                                               // 97
  if (password.length >= 6) {                                                                                          // 98
    return true;                                                                                                       // 99
  } else {                                                                                                             // 100
    loginButtonsSession.errorMessage("Password must be at least 6 characters long");                                   // 101
    return false;                                                                                                      // 102
  }                                                                                                                    // 103
};                                                                                                                     // 104
                                                                                                                       // 105
//                                                                                                                     // 106
// loginButtonLoggedOut template                                                                                       // 107
//                                                                                                                     // 108
                                                                                                                       // 109
Template._loginButtonsLoggedOut.helpers({                                                                              // 110
  dropdown: dropdown,                                                                                                  // 111
  services: getLoginServices,                                                                                          // 112
  singleService: function () {                                                                                         // 113
    var services = getLoginServices();                                                                                 // 114
    if (services.length !== 1)                                                                                         // 115
      throw new Error(                                                                                                 // 116
        "Shouldn't be rendering this template with more than one configured service");                                 // 117
    return services[0];                                                                                                // 118
  },                                                                                                                   // 119
  configurationLoaded: function () {                                                                                   // 120
    return Accounts.loginServicesConfigured();                                                                         // 121
  }                                                                                                                    // 122
});                                                                                                                    // 123
                                                                                                                       // 124
                                                                                                                       // 125
//                                                                                                                     // 126
// loginButtonsLoggedIn template                                                                                       // 127
//                                                                                                                     // 128
                                                                                                                       // 129
  // decide whether we should show a dropdown rather than a row of                                                     // 130
  // buttons                                                                                                           // 131
Template._loginButtonsLoggedIn.helpers({                                                                               // 132
  dropdown: dropdown                                                                                                   // 133
});                                                                                                                    // 134
                                                                                                                       // 135
                                                                                                                       // 136
                                                                                                                       // 137
//                                                                                                                     // 138
// loginButtonsLoggedInSingleLogoutButton template                                                                     // 139
//                                                                                                                     // 140
                                                                                                                       // 141
Template._loginButtonsLoggedInSingleLogoutButton.helpers({                                                             // 142
  displayName: displayName                                                                                             // 143
});                                                                                                                    // 144
                                                                                                                       // 145
                                                                                                                       // 146
                                                                                                                       // 147
//                                                                                                                     // 148
// loginButtonsMessage template                                                                                        // 149
//                                                                                                                     // 150
                                                                                                                       // 151
Template._loginButtonsMessages.helpers({                                                                               // 152
  errorMessage: function () {                                                                                          // 153
    return loginButtonsSession.get('errorMessage');                                                                    // 154
  }                                                                                                                    // 155
});                                                                                                                    // 156
                                                                                                                       // 157
Template._loginButtonsMessages.helpers({                                                                               // 158
  infoMessage: function () {                                                                                           // 159
    return loginButtonsSession.get('infoMessage');                                                                     // 160
  }                                                                                                                    // 161
});                                                                                                                    // 162
                                                                                                                       // 163
                                                                                                                       // 164
//                                                                                                                     // 165
// loginButtonsLoggingInPadding template                                                                               // 166
//                                                                                                                     // 167
                                                                                                                       // 168
Template._loginButtonsLoggingInPadding.helpers({                                                                       // 169
  dropdown: dropdown                                                                                                   // 170
});                                                                                                                    // 171
                                                                                                                       // 172
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_single.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
                                                                                                                       // 4
var loginResultCallback = function (serviceName, err) {                                                                // 5
  if (!err) {                                                                                                          // 6
    loginButtonsSession.closeDropdown();                                                                               // 7
  } else if (err instanceof Accounts.LoginCancelledError) {                                                            // 8
    // do nothing                                                                                                      // 9
  } else if (err instanceof ServiceConfiguration.ConfigError) {                                                        // 10
    loginButtonsSession.configureService(serviceName);                                                                 // 11
  } else {                                                                                                             // 12
    loginButtonsSession.errorMessage(err.reason || "Unknown error");                                                   // 13
  }                                                                                                                    // 14
};                                                                                                                     // 15
                                                                                                                       // 16
                                                                                                                       // 17
// In the login redirect flow, we'll have the result of the login                                                      // 18
// attempt at page load time when we're redirected back to the                                                         // 19
// application.  Register a callback to update the UI (i.e. to close                                                   // 20
// the dialog on a successful login or display the error on a failed                                                   // 21
// login).                                                                                                             // 22
//                                                                                                                     // 23
Accounts.onPageLoadLogin(function (attemptInfo) {                                                                      // 24
  // Ignore if we have a left over login attempt for a service that is no longer registered.                           // 25
  if (_.contains(_.pluck(getLoginServices(), "name"), attemptInfo.type))                                               // 26
    loginResultCallback(attemptInfo.type, attemptInfo.error);                                                          // 27
});                                                                                                                    // 28
                                                                                                                       // 29
                                                                                                                       // 30
Template._loginButtonsLoggedOutSingleLoginButton.events({                                                              // 31
  'click .login-button': function () {                                                                                 // 32
    var serviceName = this.name;                                                                                       // 33
    loginButtonsSession.resetMessages();                                                                               // 34
                                                                                                                       // 35
    // XXX Service providers should be able to specify their                                                           // 36
    // `Meteor.loginWithX` method name.                                                                                // 37
    var loginWithService = Meteor["loginWith" +                                                                        // 38
                                  (serviceName === 'meteor-developer' ?                                                // 39
                                   'MeteorDeveloperAccount' :                                                          // 40
                                   capitalize(serviceName))];                                                          // 41
                                                                                                                       // 42
    var options = {}; // use default scope unless specified                                                            // 43
    if (Accounts.ui._options.requestPermissions[serviceName])                                                          // 44
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];                               // 45
    if (Accounts.ui._options.requestOfflineToken[serviceName])                                                         // 46
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];                             // 47
    if (Accounts.ui._options.forceApprovalPrompt[serviceName])                                                         // 48
      options.forceApprovalPrompt = Accounts.ui._options.forceApprovalPrompt[serviceName];                             // 49
                                                                                                                       // 50
    loginWithService(options, function (err) {                                                                         // 51
      loginResultCallback(serviceName, err);                                                                           // 52
    });                                                                                                                // 53
  }                                                                                                                    // 54
});                                                                                                                    // 55
                                                                                                                       // 56
Template._loginButtonsLoggedOutSingleLoginButton.helpers({                                                             // 57
  configured: function () {                                                                                            // 58
    return !!ServiceConfiguration.configurations.findOne({service: this.name});                                        // 59
  },                                                                                                                   // 60
  capitalizedName: function () {                                                                                       // 61
    if (this.name === 'github')                                                                                        // 62
      // XXX we should allow service packages to set their capitalized name                                            // 63
      return 'GitHub';                                                                                                 // 64
    else if (this.name === 'meteor-developer')                                                                         // 65
      return 'Meteor';                                                                                                 // 66
    else                                                                                                               // 67
      return capitalize(this.name);                                                                                    // 68
  }                                                                                                                    // 69
});                                                                                                                    // 70
                                                                                                                       // 71
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                         // 72
var capitalize = function(str){                                                                                        // 73
  str = str == null ? '' : String(str);                                                                                // 74
  return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 75
};                                                                                                                     // 76
                                                                                                                       // 77
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_dropdown.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
// events shared between loginButtonsLoggedOutDropdown and                                                             // 4
// loginButtonsLoggedInDropdown                                                                                        // 5
Template.loginButtons.events({                                                                                         // 6
  'click #login-name-link, click #login-sign-in-link': function () {                                                   // 7
    loginButtonsSession.set('dropdownVisible', true);                                                                  // 8
  },                                                                                                                   // 9
  'click .login-close-text': function () {                                                                             // 10
    loginButtonsSession.closeDropdown();                                                                               // 11
  }                                                                                                                    // 12
});                                                                                                                    // 13
                                                                                                                       // 14
                                                                                                                       // 15
//                                                                                                                     // 16
// loginButtonsLoggedInDropdown template and related                                                                   // 17
//                                                                                                                     // 18
                                                                                                                       // 19
Template._loginButtonsLoggedInDropdown.events({                                                                        // 20
  'click #login-buttons-open-change-password': function() {                                                            // 21
    loginButtonsSession.resetMessages();                                                                               // 22
    loginButtonsSession.set('inChangePasswordFlow', true);                                                             // 23
  }                                                                                                                    // 24
});                                                                                                                    // 25
                                                                                                                       // 26
Template._loginButtonsLoggedInDropdown.helpers({                                                                       // 27
  displayName: displayName,                                                                                            // 28
                                                                                                                       // 29
  inChangePasswordFlow: function () {                                                                                  // 30
    return loginButtonsSession.get('inChangePasswordFlow');                                                            // 31
  },                                                                                                                   // 32
                                                                                                                       // 33
  inMessageOnlyFlow: function () {                                                                                     // 34
    return loginButtonsSession.get('inMessageOnlyFlow');                                                               // 35
  },                                                                                                                   // 36
                                                                                                                       // 37
  dropdownVisible: function () {                                                                                       // 38
    return loginButtonsSession.get('dropdownVisible');                                                                 // 39
  }                                                                                                                    // 40
});                                                                                                                    // 41
                                                                                                                       // 42
Template._loginButtonsLoggedInDropdownActions.helpers({                                                                // 43
  allowChangingPassword: function () {                                                                                 // 44
    // it would be more correct to check whether the user has a password set,                                          // 45
    // but in order to do that we'd have to send more data down to the client,                                         // 46
    // and it'd be preferable not to send down the entire service.password document.                                   // 47
    //                                                                                                                 // 48
    // instead we use the heuristic: if the user has a username or email set.                                          // 49
    var user = Meteor.user();                                                                                          // 50
    return user.username || (user.emails && user.emails[0] && user.emails[0].address);                                 // 51
  }                                                                                                                    // 52
});                                                                                                                    // 53
                                                                                                                       // 54
                                                                                                                       // 55
//                                                                                                                     // 56
// loginButtonsLoggedOutDropdown template and related                                                                  // 57
//                                                                                                                     // 58
                                                                                                                       // 59
Template._loginButtonsLoggedOutDropdown.events({                                                                       // 60
  'click #login-buttons-password': function () {                                                                       // 61
    loginOrSignup();                                                                                                   // 62
  },                                                                                                                   // 63
                                                                                                                       // 64
  'keypress #forgot-password-email': function (event) {                                                                // 65
    if (event.keyCode === 13)                                                                                          // 66
      forgotPassword();                                                                                                // 67
  },                                                                                                                   // 68
                                                                                                                       // 69
  'click #login-buttons-forgot-password': function () {                                                                // 70
    forgotPassword();                                                                                                  // 71
  },                                                                                                                   // 72
                                                                                                                       // 73
  'click #signup-link': function () {                                                                                  // 74
    loginButtonsSession.resetMessages();                                                                               // 75
                                                                                                                       // 76
    // store values of fields before swtiching to the signup form                                                      // 77
    var username = trimmedElementValueById('login-username');                                                          // 78
    var email = trimmedElementValueById('login-email');                                                                // 79
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                          // 80
    // notably not trimmed. a password could (?) start or end with a space                                             // 81
    var password = elementValueById('login-password');                                                                 // 82
                                                                                                                       // 83
    loginButtonsSession.set('inSignupFlow', true);                                                                     // 84
    loginButtonsSession.set('inForgotPasswordFlow', false);                                                            // 85
    // force the ui to update so that we have the approprate fields to fill in                                         // 86
    Tracker.flush();                                                                                                   // 87
                                                                                                                       // 88
    // update new fields with appropriate defaults                                                                     // 89
    if (username !== null)                                                                                             // 90
      document.getElementById('login-username').value = username;                                                      // 91
    else if (email !== null)                                                                                           // 92
      document.getElementById('login-email').value = email;                                                            // 93
    else if (usernameOrEmail !== null)                                                                                 // 94
      if (usernameOrEmail.indexOf('@') === -1)                                                                         // 95
        document.getElementById('login-username').value = usernameOrEmail;                                             // 96
    else                                                                                                               // 97
      document.getElementById('login-email').value = usernameOrEmail;                                                  // 98
                                                                                                                       // 99
    if (password !== null)                                                                                             // 100
      document.getElementById('login-password').value = password;                                                      // 101
                                                                                                                       // 102
    // Force redrawing the `login-dropdown-list` element because of                                                    // 103
    // a bizarre Chrome bug in which part of the DIV is not redrawn                                                    // 104
    // in case you had tried to unsuccessfully log in before                                                           // 105
    // switching to the signup form.                                                                                   // 106
    //                                                                                                                 // 107
    // Found tip on how to force a redraw on                                                                           // 108
    // http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes/3485654#3485654
    var redraw = document.getElementById('login-dropdown-list');                                                       // 110
    redraw.style.display = 'none';                                                                                     // 111
    redraw.offsetHeight; // it seems that this line does nothing but is necessary for the redraw to work               // 112
    redraw.style.display = 'block';                                                                                    // 113
  },                                                                                                                   // 114
  'click #forgot-password-link': function () {                                                                         // 115
    loginButtonsSession.resetMessages();                                                                               // 116
                                                                                                                       // 117
    // store values of fields before swtiching to the signup form                                                      // 118
    var email = trimmedElementValueById('login-email');                                                                // 119
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                          // 120
                                                                                                                       // 121
    loginButtonsSession.set('inSignupFlow', false);                                                                    // 122
    loginButtonsSession.set('inForgotPasswordFlow', true);                                                             // 123
    // force the ui to update so that we have the approprate fields to fill in                                         // 124
    Tracker.flush();                                                                                                   // 125
                                                                                                                       // 126
    // update new fields with appropriate defaults                                                                     // 127
    if (email !== null)                                                                                                // 128
      document.getElementById('forgot-password-email').value = email;                                                  // 129
    else if (usernameOrEmail !== null)                                                                                 // 130
      if (usernameOrEmail.indexOf('@') !== -1)                                                                         // 131
        document.getElementById('forgot-password-email').value = usernameOrEmail;                                      // 132
                                                                                                                       // 133
  },                                                                                                                   // 134
  'click #back-to-login-link': function () {                                                                           // 135
    loginButtonsSession.resetMessages();                                                                               // 136
                                                                                                                       // 137
    var username = trimmedElementValueById('login-username');                                                          // 138
    var email = trimmedElementValueById('login-email')                                                                 // 139
          || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?                          // 140
    // notably not trimmed. a password could (?) start or end with a space                                             // 141
    var password = elementValueById('login-password');                                                                 // 142
                                                                                                                       // 143
    loginButtonsSession.set('inSignupFlow', false);                                                                    // 144
    loginButtonsSession.set('inForgotPasswordFlow', false);                                                            // 145
    // force the ui to update so that we have the approprate fields to fill in                                         // 146
    Tracker.flush();                                                                                                   // 147
                                                                                                                       // 148
    if (document.getElementById('login-username') && username !== null)                                                // 149
      document.getElementById('login-username').value = username;                                                      // 150
    if (document.getElementById('login-email') && email !== null)                                                      // 151
      document.getElementById('login-email').value = email;                                                            // 152
                                                                                                                       // 153
    var usernameOrEmailInput = document.getElementById('login-username-or-email');                                     // 154
    if (usernameOrEmailInput) {                                                                                        // 155
      if (email !== null)                                                                                              // 156
        usernameOrEmailInput.value = email;                                                                            // 157
      if (username !== null)                                                                                           // 158
        usernameOrEmailInput.value = username;                                                                         // 159
    }                                                                                                                  // 160
                                                                                                                       // 161
    if (password !== null)                                                                                             // 162
      document.getElementById('login-password').value = password;                                                      // 163
  },                                                                                                                   // 164
  'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function (event) {
    if (event.keyCode === 13)                                                                                          // 166
      loginOrSignup();                                                                                                 // 167
  }                                                                                                                    // 168
});                                                                                                                    // 169
                                                                                                                       // 170
Template._loginButtonsLoggedOutDropdown.helpers({                                                                      // 171
  // additional classes that can be helpful in styling the dropdown                                                    // 172
  additionalClasses: function () {                                                                                     // 173
    if (!hasPasswordService()) {                                                                                       // 174
      return false;                                                                                                    // 175
    } else {                                                                                                           // 176
      if (loginButtonsSession.get('inSignupFlow')) {                                                                   // 177
        return 'login-form-create-account';                                                                            // 178
      } else if (loginButtonsSession.get('inForgotPasswordFlow')) {                                                    // 179
        return 'login-form-forgot-password';                                                                           // 180
      } else {                                                                                                         // 181
        return 'login-form-sign-in';                                                                                   // 182
      }                                                                                                                // 183
    }                                                                                                                  // 184
  },                                                                                                                   // 185
                                                                                                                       // 186
  dropdownVisible: function () {                                                                                       // 187
    return loginButtonsSession.get('dropdownVisible');                                                                 // 188
  },                                                                                                                   // 189
                                                                                                                       // 190
  hasPasswordService: hasPasswordService                                                                               // 191
});                                                                                                                    // 192
                                                                                                                       // 193
// return all login services, with password last                                                                       // 194
Template._loginButtonsLoggedOutAllServices.helpers({                                                                   // 195
  services: getLoginServices,                                                                                          // 196
                                                                                                                       // 197
  isPasswordService: function () {                                                                                     // 198
    return this.name === 'password';                                                                                   // 199
  },                                                                                                                   // 200
                                                                                                                       // 201
  hasOtherServices: function () {                                                                                      // 202
    return getLoginServices().length > 1;                                                                              // 203
  },                                                                                                                   // 204
                                                                                                                       // 205
  hasPasswordService: hasPasswordService                                                                               // 206
});                                                                                                                    // 207
                                                                                                                       // 208
Template._loginButtonsLoggedOutPasswordService.helpers({                                                               // 209
  fields: function () {                                                                                                // 210
    var loginFields = [                                                                                                // 211
      {fieldName: 'username-or-email', fieldLabel: 'Username or Email',                                                // 212
       visible: function () {                                                                                          // 213
         return _.contains(                                                                                            // 214
           ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],                                                      // 215
           passwordSignupFields());                                                                                    // 216
       }},                                                                                                             // 217
      {fieldName: 'username', fieldLabel: 'Username',                                                                  // 218
       visible: function () {                                                                                          // 219
         return passwordSignupFields() === "USERNAME_ONLY";                                                            // 220
       }},                                                                                                             // 221
      {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',                                                    // 222
       visible: function () {                                                                                          // 223
         return passwordSignupFields() === "EMAIL_ONLY";                                                               // 224
       }},                                                                                                             // 225
      {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',                                           // 226
       visible: function () {                                                                                          // 227
         return true;                                                                                                  // 228
       }}                                                                                                              // 229
    ];                                                                                                                 // 230
                                                                                                                       // 231
    var signupFields = [                                                                                               // 232
      {fieldName: 'username', fieldLabel: 'Username',                                                                  // 233
       visible: function () {                                                                                          // 234
         return _.contains(                                                                                            // 235
           ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                     // 236
           passwordSignupFields());                                                                                    // 237
       }},                                                                                                             // 238
      {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',                                                    // 239
       visible: function () {                                                                                          // 240
         return _.contains(                                                                                            // 241
           ["USERNAME_AND_EMAIL", "EMAIL_ONLY"],                                                                       // 242
           passwordSignupFields());                                                                                    // 243
       }},                                                                                                             // 244
      {fieldName: 'email', fieldLabel: 'Email (optional)', inputType: 'email',                                         // 245
       visible: function () {                                                                                          // 246
         return passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";                                              // 247
       }},                                                                                                             // 248
      {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',                                           // 249
       visible: function () {                                                                                          // 250
         return true;                                                                                                  // 251
       }},                                                                                                             // 252
      {fieldName: 'password-again', fieldLabel: 'Password (again)',                                                    // 253
       inputType: 'password',                                                                                          // 254
       visible: function () {                                                                                          // 255
         // No need to make users double-enter their password if                                                       // 256
         // they'll necessarily have an email set, since they can use                                                  // 257
         // the "forgot password" flow.                                                                                // 258
         return _.contains(                                                                                            // 259
           ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                           // 260
           passwordSignupFields());                                                                                    // 261
       }}                                                                                                              // 262
    ];                                                                                                                 // 263
                                                                                                                       // 264
    return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;                                       // 265
  },                                                                                                                   // 266
                                                                                                                       // 267
  inForgotPasswordFlow: function () {                                                                                  // 268
    return loginButtonsSession.get('inForgotPasswordFlow');                                                            // 269
  },                                                                                                                   // 270
                                                                                                                       // 271
  inLoginFlow: function () {                                                                                           // 272
    return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');               // 273
  },                                                                                                                   // 274
                                                                                                                       // 275
  inSignupFlow: function () {                                                                                          // 276
    return loginButtonsSession.get('inSignupFlow');                                                                    // 277
  },                                                                                                                   // 278
                                                                                                                       // 279
  showCreateAccountLink: function () {                                                                                 // 280
    return !Accounts._options.forbidClientAccountCreation;                                                             // 281
  },                                                                                                                   // 282
                                                                                                                       // 283
  showForgotPasswordLink: function () {                                                                                // 284
    return _.contains(                                                                                                 // 285
      ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],                                             // 286
      passwordSignupFields());                                                                                         // 287
  }                                                                                                                    // 288
});                                                                                                                    // 289
                                                                                                                       // 290
Template._loginButtonsFormField.helpers({                                                                              // 291
  inputType: function () {                                                                                             // 292
    return this.inputType || "text";                                                                                   // 293
  }                                                                                                                    // 294
});                                                                                                                    // 295
                                                                                                                       // 296
                                                                                                                       // 297
//                                                                                                                     // 298
// loginButtonsChangePassword template                                                                                 // 299
//                                                                                                                     // 300
                                                                                                                       // 301
Template._loginButtonsChangePassword.events({                                                                          // 302
  'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function (event) {         // 303
    if (event.keyCode === 13)                                                                                          // 304
      changePassword();                                                                                                // 305
  },                                                                                                                   // 306
  'click #login-buttons-do-change-password': function () {                                                             // 307
    changePassword();                                                                                                  // 308
  }                                                                                                                    // 309
});                                                                                                                    // 310
                                                                                                                       // 311
Template._loginButtonsChangePassword.helpers({                                                                         // 312
  fields: function () {                                                                                                // 313
    return [                                                                                                           // 314
      {fieldName: 'old-password', fieldLabel: 'Current Password', inputType: 'password',                               // 315
       visible: function () {                                                                                          // 316
         return true;                                                                                                  // 317
       }},                                                                                                             // 318
      {fieldName: 'password', fieldLabel: 'New Password', inputType: 'password',                                       // 319
       visible: function () {                                                                                          // 320
         return true;                                                                                                  // 321
       }},                                                                                                             // 322
      {fieldName: 'password-again', fieldLabel: 'New Password (again)',                                                // 323
       inputType: 'password',                                                                                          // 324
       visible: function () {                                                                                          // 325
         // No need to make users double-enter their password if                                                       // 326
         // they'll necessarily have an email set, since they can use                                                  // 327
         // the "forgot password" flow.                                                                                // 328
         return _.contains(                                                                                            // 329
           ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                           // 330
           passwordSignupFields());                                                                                    // 331
       }}                                                                                                              // 332
    ];                                                                                                                 // 333
  }                                                                                                                    // 334
});                                                                                                                    // 335
                                                                                                                       // 336
                                                                                                                       // 337
//                                                                                                                     // 338
// helpers                                                                                                             // 339
//                                                                                                                     // 340
                                                                                                                       // 341
var elementValueById = function(id) {                                                                                  // 342
  var element = document.getElementById(id);                                                                           // 343
  if (!element)                                                                                                        // 344
    return null;                                                                                                       // 345
  else                                                                                                                 // 346
    return element.value;                                                                                              // 347
};                                                                                                                     // 348
                                                                                                                       // 349
var trimmedElementValueById = function(id) {                                                                           // 350
  var element = document.getElementById(id);                                                                           // 351
  if (!element)                                                                                                        // 352
    return null;                                                                                                       // 353
  else                                                                                                                 // 354
    return element.value.replace(/^\s*|\s*$/g, ""); // trim() doesn't work on IE8;                                     // 355
};                                                                                                                     // 356
                                                                                                                       // 357
var loginOrSignup = function () {                                                                                      // 358
  if (loginButtonsSession.get('inSignupFlow'))                                                                         // 359
    signup();                                                                                                          // 360
  else                                                                                                                 // 361
    login();                                                                                                           // 362
};                                                                                                                     // 363
                                                                                                                       // 364
var login = function () {                                                                                              // 365
  loginButtonsSession.resetMessages();                                                                                 // 366
                                                                                                                       // 367
  var username = trimmedElementValueById('login-username');                                                            // 368
  var email = trimmedElementValueById('login-email');                                                                  // 369
  var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                            // 370
  // notably not trimmed. a password could (?) start or end with a space                                               // 371
  var password = elementValueById('login-password');                                                                   // 372
                                                                                                                       // 373
  var loginSelector;                                                                                                   // 374
  if (username !== null) {                                                                                             // 375
    if (!validateUsername(username))                                                                                   // 376
      return;                                                                                                          // 377
    else                                                                                                               // 378
      loginSelector = {username: username};                                                                            // 379
  } else if (email !== null) {                                                                                         // 380
    if (!validateEmail(email))                                                                                         // 381
      return;                                                                                                          // 382
    else                                                                                                               // 383
      loginSelector = {email: email};                                                                                  // 384
  } else if (usernameOrEmail !== null) {                                                                               // 385
    // XXX not sure how we should validate this. but this seems good enough (for now),                                 // 386
    // since an email must have at least 3 characters anyways                                                          // 387
    if (!validateUsername(usernameOrEmail))                                                                            // 388
      return;                                                                                                          // 389
    else                                                                                                               // 390
      loginSelector = usernameOrEmail;                                                                                 // 391
  } else {                                                                                                             // 392
    throw new Error("Unexpected -- no element to use as a login user selector");                                       // 393
  }                                                                                                                    // 394
                                                                                                                       // 395
  Meteor.loginWithPassword(loginSelector, password, function (error, result) {                                         // 396
    if (error) {                                                                                                       // 397
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 398
    } else {                                                                                                           // 399
      loginButtonsSession.closeDropdown();                                                                             // 400
    }                                                                                                                  // 401
  });                                                                                                                  // 402
};                                                                                                                     // 403
                                                                                                                       // 404
var signup = function () {                                                                                             // 405
  loginButtonsSession.resetMessages();                                                                                 // 406
                                                                                                                       // 407
  var options = {}; // to be passed to Accounts.createUser                                                             // 408
                                                                                                                       // 409
  var username = trimmedElementValueById('login-username');                                                            // 410
  if (username !== null) {                                                                                             // 411
    if (!validateUsername(username))                                                                                   // 412
      return;                                                                                                          // 413
    else                                                                                                               // 414
      options.username = username;                                                                                     // 415
  }                                                                                                                    // 416
                                                                                                                       // 417
  var email = trimmedElementValueById('login-email');                                                                  // 418
  if (email !== null) {                                                                                                // 419
    if (!validateEmail(email))                                                                                         // 420
      return;                                                                                                          // 421
    else                                                                                                               // 422
      options.email = email;                                                                                           // 423
  }                                                                                                                    // 424
                                                                                                                       // 425
  // notably not trimmed. a password could (?) start or end with a space                                               // 426
  var password = elementValueById('login-password');                                                                   // 427
  if (!validatePassword(password))                                                                                     // 428
    return;                                                                                                            // 429
  else                                                                                                                 // 430
    options.password = password;                                                                                       // 431
                                                                                                                       // 432
  if (!matchPasswordAgainIfPresent())                                                                                  // 433
    return;                                                                                                            // 434
                                                                                                                       // 435
  Accounts.createUser(options, function (error) {                                                                      // 436
    if (error) {                                                                                                       // 437
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 438
    } else {                                                                                                           // 439
      loginButtonsSession.closeDropdown();                                                                             // 440
    }                                                                                                                  // 441
  });                                                                                                                  // 442
};                                                                                                                     // 443
                                                                                                                       // 444
var forgotPassword = function () {                                                                                     // 445
  loginButtonsSession.resetMessages();                                                                                 // 446
                                                                                                                       // 447
  var email = trimmedElementValueById("forgot-password-email");                                                        // 448
  if (email.indexOf('@') !== -1) {                                                                                     // 449
    Accounts.forgotPassword({email: email}, function (error) {                                                         // 450
      if (error)                                                                                                       // 451
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 452
      else                                                                                                             // 453
        loginButtonsSession.infoMessage("Email sent");                                                                 // 454
    });                                                                                                                // 455
  } else {                                                                                                             // 456
    loginButtonsSession.errorMessage("Invalid email");                                                                 // 457
  }                                                                                                                    // 458
};                                                                                                                     // 459
                                                                                                                       // 460
var changePassword = function () {                                                                                     // 461
  loginButtonsSession.resetMessages();                                                                                 // 462
                                                                                                                       // 463
  // notably not trimmed. a password could (?) start or end with a space                                               // 464
  var oldPassword = elementValueById('login-old-password');                                                            // 465
                                                                                                                       // 466
  // notably not trimmed. a password could (?) start or end with a space                                               // 467
  var password = elementValueById('login-password');                                                                   // 468
  if (!validatePassword(password))                                                                                     // 469
    return;                                                                                                            // 470
                                                                                                                       // 471
  if (!matchPasswordAgainIfPresent())                                                                                  // 472
    return;                                                                                                            // 473
                                                                                                                       // 474
  Accounts.changePassword(oldPassword, password, function (error) {                                                    // 475
    if (error) {                                                                                                       // 476
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 477
    } else {                                                                                                           // 478
      loginButtonsSession.set('inChangePasswordFlow', false);                                                          // 479
      loginButtonsSession.set('inMessageOnlyFlow', true);                                                              // 480
      loginButtonsSession.infoMessage("Password changed");                                                             // 481
    }                                                                                                                  // 482
  });                                                                                                                  // 483
};                                                                                                                     // 484
                                                                                                                       // 485
var matchPasswordAgainIfPresent = function () {                                                                        // 486
  // notably not trimmed. a password could (?) start or end with a space                                               // 487
  var passwordAgain = elementValueById('login-password-again');                                                        // 488
  if (passwordAgain !== null) {                                                                                        // 489
    // notably not trimmed. a password could (?) start or end with a space                                             // 490
    var password = elementValueById('login-password');                                                                 // 491
    if (password !== passwordAgain) {                                                                                  // 492
      loginButtonsSession.errorMessage("Passwords don't match");                                                       // 493
      return false;                                                                                                    // 494
    }                                                                                                                  // 495
  }                                                                                                                    // 496
  return true;                                                                                                         // 497
};                                                                                                                     // 498
                                                                                                                       // 499
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_dialogs.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
// since we don't want to pass around the callback that we get from our event                                          // 4
// handlers, we just make it a variable for the whole file                                                             // 5
var doneCallback;                                                                                                      // 6
                                                                                                                       // 7
Accounts.onResetPasswordLink(function (token, done) {                                                                  // 8
  loginButtonsSession.set("resetPasswordToken", token);                                                                // 9
  doneCallback = done;                                                                                                 // 10
});                                                                                                                    // 11
                                                                                                                       // 12
Accounts.onEnrollmentLink(function (token, done) {                                                                     // 13
  loginButtonsSession.set("enrollAccountToken", token);                                                                // 14
  doneCallback = done;                                                                                                 // 15
});                                                                                                                    // 16
                                                                                                                       // 17
Accounts.onEmailVerificationLink(function (token, done) {                                                              // 18
  Accounts.verifyEmail(token, function (error) {                                                                       // 19
    if (! error) {                                                                                                     // 20
      loginButtonsSession.set('justVerifiedEmail', true);                                                              // 21
    }                                                                                                                  // 22
                                                                                                                       // 23
    done();                                                                                                            // 24
    // XXX show something if there was an error.                                                                       // 25
  });                                                                                                                  // 26
});                                                                                                                    // 27
                                                                                                                       // 28
                                                                                                                       // 29
//                                                                                                                     // 30
// resetPasswordDialog template                                                                                        // 31
//                                                                                                                     // 32
                                                                                                                       // 33
Template._resetPasswordDialog.events({                                                                                 // 34
  'click #login-buttons-reset-password-button': function () {                                                          // 35
    resetPassword();                                                                                                   // 36
  },                                                                                                                   // 37
  'keypress #reset-password-new-password': function (event) {                                                          // 38
    if (event.keyCode === 13)                                                                                          // 39
      resetPassword();                                                                                                 // 40
  },                                                                                                                   // 41
  'click #login-buttons-cancel-reset-password': function () {                                                          // 42
    loginButtonsSession.set('resetPasswordToken', null);                                                               // 43
    if (doneCallback)                                                                                                  // 44
      doneCallback();                                                                                                  // 45
  }                                                                                                                    // 46
});                                                                                                                    // 47
                                                                                                                       // 48
var resetPassword = function () {                                                                                      // 49
  loginButtonsSession.resetMessages();                                                                                 // 50
  var newPassword = document.getElementById('reset-password-new-password').value;                                      // 51
  if (!validatePassword(newPassword))                                                                                  // 52
    return;                                                                                                            // 53
                                                                                                                       // 54
  Accounts.resetPassword(                                                                                              // 55
    loginButtonsSession.get('resetPasswordToken'), newPassword,                                                        // 56
    function (error) {                                                                                                 // 57
      if (error) {                                                                                                     // 58
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 59
      } else {                                                                                                         // 60
        loginButtonsSession.set('resetPasswordToken', null);                                                           // 61
        loginButtonsSession.set('justResetPassword', true);                                                            // 62
        if (doneCallback)                                                                                              // 63
          doneCallback();                                                                                              // 64
      }                                                                                                                // 65
    });                                                                                                                // 66
};                                                                                                                     // 67
                                                                                                                       // 68
Template._resetPasswordDialog.helpers({                                                                                // 69
  inResetPasswordFlow: function () {                                                                                   // 70
    return loginButtonsSession.get('resetPasswordToken');                                                              // 71
  }                                                                                                                    // 72
});                                                                                                                    // 73
                                                                                                                       // 74
//                                                                                                                     // 75
// justResetPasswordDialog template                                                                                    // 76
//                                                                                                                     // 77
                                                                                                                       // 78
Template._justResetPasswordDialog.events({                                                                             // 79
  'click #just-verified-dismiss-button': function () {                                                                 // 80
    loginButtonsSession.set('justResetPassword', false);                                                               // 81
  }                                                                                                                    // 82
});                                                                                                                    // 83
                                                                                                                       // 84
Template._justResetPasswordDialog.helpers({                                                                            // 85
  visible: function () {                                                                                               // 86
    return loginButtonsSession.get('justResetPassword');                                                               // 87
  },                                                                                                                   // 88
  displayName: displayName                                                                                             // 89
});                                                                                                                    // 90
                                                                                                                       // 91
                                                                                                                       // 92
                                                                                                                       // 93
//                                                                                                                     // 94
// enrollAccountDialog template                                                                                        // 95
//                                                                                                                     // 96
                                                                                                                       // 97
Template._enrollAccountDialog.events({                                                                                 // 98
  'click #login-buttons-enroll-account-button': function () {                                                          // 99
    enrollAccount();                                                                                                   // 100
  },                                                                                                                   // 101
  'keypress #enroll-account-password': function (event) {                                                              // 102
    if (event.keyCode === 13)                                                                                          // 103
      enrollAccount();                                                                                                 // 104
  },                                                                                                                   // 105
  'click #login-buttons-cancel-enroll-account': function () {                                                          // 106
    loginButtonsSession.set('enrollAccountToken', null);                                                               // 107
    if (doneCallback)                                                                                                  // 108
      doneCallback();                                                                                                  // 109
  }                                                                                                                    // 110
});                                                                                                                    // 111
                                                                                                                       // 112
var enrollAccount = function () {                                                                                      // 113
  loginButtonsSession.resetMessages();                                                                                 // 114
  var password = document.getElementById('enroll-account-password').value;                                             // 115
  if (!validatePassword(password))                                                                                     // 116
    return;                                                                                                            // 117
                                                                                                                       // 118
  Accounts.resetPassword(                                                                                              // 119
    loginButtonsSession.get('enrollAccountToken'), password,                                                           // 120
    function (error) {                                                                                                 // 121
      if (error) {                                                                                                     // 122
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 123
      } else {                                                                                                         // 124
        loginButtonsSession.set('enrollAccountToken', null);                                                           // 125
        if (doneCallback)                                                                                              // 126
          doneCallback();                                                                                              // 127
      }                                                                                                                // 128
    });                                                                                                                // 129
};                                                                                                                     // 130
                                                                                                                       // 131
Template._enrollAccountDialog.helpers({                                                                                // 132
  inEnrollAccountFlow: function () {                                                                                   // 133
    return loginButtonsSession.get('enrollAccountToken');                                                              // 134
  }                                                                                                                    // 135
});                                                                                                                    // 136
                                                                                                                       // 137
                                                                                                                       // 138
//                                                                                                                     // 139
// justVerifiedEmailDialog template                                                                                    // 140
//                                                                                                                     // 141
                                                                                                                       // 142
Template._justVerifiedEmailDialog.events({                                                                             // 143
  'click #just-verified-dismiss-button': function () {                                                                 // 144
    loginButtonsSession.set('justVerifiedEmail', false);                                                               // 145
  }                                                                                                                    // 146
});                                                                                                                    // 147
                                                                                                                       // 148
Template._justVerifiedEmailDialog.helpers({                                                                            // 149
  visible: function () {                                                                                               // 150
    return loginButtonsSession.get('justVerifiedEmail');                                                               // 151
  },                                                                                                                   // 152
  displayName: displayName                                                                                             // 153
});                                                                                                                    // 154
                                                                                                                       // 155
                                                                                                                       // 156
//                                                                                                                     // 157
// loginButtonsMessagesDialog template                                                                                 // 158
//                                                                                                                     // 159
                                                                                                                       // 160
Template._loginButtonsMessagesDialog.events({                                                                          // 161
  'click #messages-dialog-dismiss-button': function () {                                                               // 162
    loginButtonsSession.resetMessages();                                                                               // 163
  }                                                                                                                    // 164
});                                                                                                                    // 165
                                                                                                                       // 166
Template._loginButtonsMessagesDialog.helpers({                                                                         // 167
  visible: function () {                                                                                               // 168
    var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');                // 169
    return !dropdown() && hasMessage;                                                                                  // 170
  }                                                                                                                    // 171
});                                                                                                                    // 172
                                                                                                                       // 173
                                                                                                                       // 174
//                                                                                                                     // 175
// configureLoginServiceDialog template                                                                                // 176
//                                                                                                                     // 177
                                                                                                                       // 178
Template._configureLoginServiceDialog.events({                                                                         // 179
  'click .configure-login-service-dismiss-button': function () {                                                       // 180
    loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                              // 181
  },                                                                                                                   // 182
  'click #configure-login-service-dialog-save-configuration': function () {                                            // 183
    if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&                                               // 184
        ! loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {                                        // 185
      // Prepare the configuration document for this login service                                                     // 186
      var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                             // 187
      var configuration = {                                                                                            // 188
        service: serviceName                                                                                           // 189
      };                                                                                                               // 190
                                                                                                                       // 191
      // Fetch the value of each input field                                                                           // 192
      _.each(configurationFields(), function(field) {                                                                  // 193
        configuration[field.property] = document.getElementById(                                                       // 194
          'configure-login-service-dialog-' + field.property).value                                                    // 195
          .replace(/^\s*|\s*$/g, ""); // trim() doesnt work on IE8;                                                    // 196
      });                                                                                                              // 197
                                                                                                                       // 198
      configuration.loginStyle =                                                                                       // 199
        $('#configure-login-service-dialog input[name="loginStyle"]:checked')                                          // 200
        .val();                                                                                                        // 201
                                                                                                                       // 202
      // Configure this login service                                                                                  // 203
      Accounts.connection.call(                                                                                        // 204
        "configureLoginService", configuration, function (error, result) {                                             // 205
          if (error)                                                                                                   // 206
            Meteor._debug("Error configuring login service " + serviceName,                                            // 207
                          error);                                                                                      // 208
          else                                                                                                         // 209
            loginButtonsSession.set('configureLoginServiceDialogVisible',                                              // 210
                                    false);                                                                            // 211
        });                                                                                                            // 212
    }                                                                                                                  // 213
  },                                                                                                                   // 214
  // IE8 doesn't support the 'input' event, so we'll run this on the keyup as                                          // 215
  // well. (Keeping the 'input' event means that this also fires when you use                                          // 216
  // the mouse to change the contents of the field, eg 'Cut' menu item.)                                               // 217
  'input, keyup input': function (event) {                                                                             // 218
    // if the event fired on one of the configuration input fields,                                                    // 219
    // check whether we should enable the 'save configuration' button                                                  // 220
    if (event.target.id.indexOf('configure-login-service-dialog') === 0)                                               // 221
      updateSaveDisabled();                                                                                            // 222
  }                                                                                                                    // 223
});                                                                                                                    // 224
                                                                                                                       // 225
// check whether the 'save configuration' button should be enabled.                                                    // 226
// this is a really strange way to implement this and a Forms                                                          // 227
// Abstraction would make all of this reactive, and simpler.                                                           // 228
var updateSaveDisabled = function () {                                                                                 // 229
  var anyFieldEmpty = _.any(configurationFields(), function(field) {                                                   // 230
    return document.getElementById(                                                                                    // 231
      'configure-login-service-dialog-' + field.property).value === '';                                                // 232
  });                                                                                                                  // 233
                                                                                                                       // 234
  loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);                                   // 235
};                                                                                                                     // 236
                                                                                                                       // 237
// Returns the appropriate template for this login service.  This                                                      // 238
// template should be defined in the service's package                                                                 // 239
var configureLoginServiceDialogTemplateForService = function () {                                                      // 240
  var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                                 // 241
  // XXX Service providers should be able to specify their configuration                                               // 242
  // template name.                                                                                                    // 243
  return Template['configureLoginServiceDialogFor' +                                                                   // 244
                  (serviceName === 'meteor-developer' ?                                                                // 245
                   'MeteorDeveloper' :                                                                                 // 246
                   capitalize(serviceName))];                                                                          // 247
};                                                                                                                     // 248
                                                                                                                       // 249
var configurationFields = function () {                                                                                // 250
  var template = configureLoginServiceDialogTemplateForService();                                                      // 251
  return template.fields();                                                                                            // 252
};                                                                                                                     // 253
                                                                                                                       // 254
Template._configureLoginServiceDialog.helpers({                                                                        // 255
  configurationFields: function () {                                                                                   // 256
    return configurationFields();                                                                                      // 257
  },                                                                                                                   // 258
  visible: function () {                                                                                               // 259
    return loginButtonsSession.get('configureLoginServiceDialogVisible');                                              // 260
  },                                                                                                                   // 261
  configurationSteps: function () {                                                                                    // 262
    // renders the appropriate template                                                                                // 263
    return configureLoginServiceDialogTemplateForService();                                                            // 264
  },                                                                                                                   // 265
  saveDisabled: function () {                                                                                          // 266
    return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');                                         // 267
  }                                                                                                                    // 268
});                                                                                                                    // 269
                                                                                                                       // 270
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                         // 271
var capitalize = function(str){                                                                                        // 272
  str = str == null ? '' : String(str);                                                                                // 273
  return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 274
};                                                                                                                     // 275
                                                                                                                       // 276
Template._configureLoginOnDesktopDialog.helpers({                                                                      // 277
  visible: function () {                                                                                               // 278
    return loginButtonsSession.get('configureOnDesktopVisible');                                                       // 279
  }                                                                                                                    // 280
});                                                                                                                    // 281
                                                                                                                       // 282
Template._configureLoginOnDesktopDialog.events({                                                                       // 283
  'click #configure-on-desktop-dismiss-button': function () {                                                          // 284
    loginButtonsSession.set('configureOnDesktopVisible', false);                                                       // 285
  }                                                                                                                    // 286
});                                                                                                                    // 287
                                                                                                                       // 288
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-ui-unstyled'] = {};

})();

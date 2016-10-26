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
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Random = Package.random.Random;
var Hook = Package['callback-hook'].Hook;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Accounts, EXPIRE_TOKENS_INTERVAL_MS, CONNECTION_CLOSE_DELAY_MS;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-base":{"client_main.js":["./accounts_client.js","./url_client.js","./localstorage_token.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-base/client_main.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({AccountsClient:function(){return AccountsClient},AccountsTest:function(){return AccountsTest}});var AccountsClient;module.import("./accounts_client.js",{"AccountsClient":function(v){AccountsClient=v}});var AccountsTest;module.import("./url_client.js",{"AccountsTest":function(v){AccountsTest=v}});module.import("./localstorage_token.js");
                                                                                                                     // 2
                                                                                                                     // 3
                                                                                                                     //
/**                                                                                                                  // 5
 * @namespace Accounts                                                                                               //
 * @summary The namespace for all client-side accounts-related methods.                                              //
 */                                                                                                                  //
Accounts = new AccountsClient();                                                                                     // 9
                                                                                                                     //
/**                                                                                                                  // 11
 * @summary A [Mongo.Collection](#collections) containing user documents.                                            //
 * @locus Anywhere                                                                                                   //
 * @type {Mongo.Collection}                                                                                          //
 * @importFromPackage meteor                                                                                         //
 */                                                                                                                  //
Meteor.users = Accounts.users;                                                                                       // 17
                                                                                                                     //
                                                                                                                     // 19
                                                                                                                     // 20
                                                                                                                     // 21
                                                                                                                     // 22
                                                                                                                     // 23
                                                                                                                     // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"accounts_client.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","./accounts_common.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-base/accounts_client.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({AccountsClient:function(){return AccountsClient}});var _classCallCheck;module.import("babel-runtime/helpers/classCallCheck",{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import("babel-runtime/helpers/possibleConstructorReturn",{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import("babel-runtime/helpers/inherits",{"default":function(v){_inherits=v}});var AccountsCommon;module.import("./accounts_common.js",{"AccountsCommon":function(v){AccountsCommon=v}});
                                                                                                                     //
                                                                                                                     //
                                                                                                                     // 1
                                                                                                                     //
/**                                                                                                                  // 3
 * @summary Constructor for the `Accounts` object on the client.                                                     //
 * @locus Client                                                                                                     //
 * @class AccountsClient                                                                                             //
 * @extends AccountsCommon                                                                                           //
 * @instancename accountsClient                                                                                      //
 * @param {Object} options an object with fields:                                                                    //
 * @param {Object} options.connection Optional DDP connection to reuse.                                              //
 * @param {String} options.ddpUrl Optional URL for creating a new DDP connection.                                    //
 */                                                                                                                  //
var AccountsClient = function (_AccountsCommon) {                                                                    // 13
  _inherits(AccountsClient, _AccountsCommon);                                                                        // 13
                                                                                                                     //
  function AccountsClient(options) {                                                                                 // 14
    _classCallCheck(this, AccountsClient);                                                                           // 14
                                                                                                                     //
    var _this = _possibleConstructorReturn(this, _AccountsCommon.call(this, options));                               // 14
                                                                                                                     //
    _this._loggingIn = false;                                                                                        // 17
    _this._loggingInDeps = new Tracker.Dependency();                                                                 // 18
                                                                                                                     //
    _this._loginServicesHandle = _this.connection.subscribe("meteor.loginServiceConfiguration");                     // 20
                                                                                                                     //
    _this._pageLoadLoginCallbacks = [];                                                                              // 23
    _this._pageLoadLoginAttemptInfo = null;                                                                          // 24
                                                                                                                     //
    // Defined in url_client.js.                                                                                     // 26
    _this._initUrlMatching();                                                                                        // 27
                                                                                                                     //
    // Defined in localstorage_token.js.                                                                             // 29
    _this._initLocalStorage();                                                                                       // 30
    return _this;                                                                                                    // 14
  }                                                                                                                  // 31
                                                                                                                     //
  ///                                                                                                                // 33
  /// CURRENT USER                                                                                                   // 34
  ///                                                                                                                // 35
                                                                                                                     //
  // @override                                                                                                       // 37
                                                                                                                     //
                                                                                                                     //
  AccountsClient.prototype.userId = function () {                                                                    // 13
    function userId() {                                                                                              // 13
      return this.connection.userId();                                                                               // 39
    }                                                                                                                // 40
                                                                                                                     //
    return userId;                                                                                                   // 13
  }();                                                                                                               // 13
                                                                                                                     //
  // This is mostly just called within this file, but Meteor.loginWithPassword                                       // 42
  // also uses it to make loggingIn() be true during the beginPasswordExchange                                       // 43
  // method call too.                                                                                                // 44
                                                                                                                     //
                                                                                                                     //
  AccountsClient.prototype._setLoggingIn = function () {                                                             // 13
    function _setLoggingIn(x) {                                                                                      // 13
      if (this._loggingIn !== x) {                                                                                   // 46
        this._loggingIn = x;                                                                                         // 47
        this._loggingInDeps.changed();                                                                               // 48
      }                                                                                                              // 49
    }                                                                                                                // 50
                                                                                                                     //
    return _setLoggingIn;                                                                                            // 13
  }();                                                                                                               // 13
                                                                                                                     //
  /**                                                                                                                // 52
   * @summary True if a login method (such as `Meteor.loginWithPassword`, `Meteor.loginWithFacebook`, or `Accounts.createUser`) is currently in progress. A reactive data source.
   * @locus Client                                                                                                   //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsClient.prototype.loggingIn = function () {                                                                 // 13
    function loggingIn() {                                                                                           // 13
      this._loggingInDeps.depend();                                                                                  // 57
      return this._loggingIn;                                                                                        // 58
    }                                                                                                                // 59
                                                                                                                     //
    return loggingIn;                                                                                                // 13
  }();                                                                                                               // 13
                                                                                                                     //
  /**                                                                                                                // 61
   * @summary Log the user out.                                                                                      //
   * @locus Client                                                                                                   //
   * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsClient.prototype.logout = function () {                                                                    // 13
    function logout(callback) {                                                                                      // 13
      var self = this;                                                                                               // 67
      self.connection.apply('logout', [], {                                                                          // 68
        wait: true                                                                                                   // 69
      }, function (error, result) {                                                                                  // 68
        if (error) {                                                                                                 // 71
          callback && callback(error);                                                                               // 72
        } else {                                                                                                     // 73
          self.makeClientLoggedOut();                                                                                // 74
          callback && callback();                                                                                    // 75
        }                                                                                                            // 76
      });                                                                                                            // 77
    }                                                                                                                // 78
                                                                                                                     //
    return logout;                                                                                                   // 13
  }();                                                                                                               // 13
                                                                                                                     //
  /**                                                                                                                // 80
   * @summary Log out other clients logged in as the current user, but does not log out the client that calls this function.
   * @locus Client                                                                                                   //
   * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsClient.prototype.logoutOtherClients = function () {                                                        // 13
    function logoutOtherClients(callback) {                                                                          // 13
      var self = this;                                                                                               // 86
                                                                                                                     //
      // We need to make two method calls: one to replace our current token,                                         // 88
      // and another to remove all tokens except the current one. We want to                                         // 89
      // call these two methods one after the other, without any other                                               // 90
      // methods running between them. For example, we don't want `logout`                                           // 91
      // to be called in between our two method calls (otherwise the second                                          // 92
      // method call would return an error). Another example: we don't want                                          // 93
      // logout to be called before the callback for `getNewToken`;                                                  // 94
      // otherwise we would momentarily log the user out and then write a                                            // 95
      // new token to localStorage.                                                                                  // 96
      //                                                                                                             // 97
      // To accomplish this, we make both calls as wait methods, and queue                                           // 98
      // them one after the other, without spinning off the event loop in                                            // 99
      // between. Even though we queue `removeOtherTokens` before                                                    // 100
      // `getNewToken`, we won't actually send the `removeOtherTokens` call                                          // 101
      // until the `getNewToken` callback has finished running, because they                                         // 102
      // are both wait methods.                                                                                      // 103
      self.connection.apply('getNewToken', [], { wait: true }, function (err, result) {                              // 104
        if (!err) {                                                                                                  // 109
          self._storeLoginToken(self.userId(), result.token, result.tokenExpires);                                   // 110
        }                                                                                                            // 115
      });                                                                                                            // 116
                                                                                                                     //
      self.connection.apply('removeOtherTokens', [], { wait: true }, function (err) {                                // 119
        callback && callback(err);                                                                                   // 124
      });                                                                                                            // 125
    }                                                                                                                // 127
                                                                                                                     //
    return logoutOtherClients;                                                                                       // 13
  }();                                                                                                               // 13
                                                                                                                     //
  return AccountsClient;                                                                                             // 13
}(AccountsCommon);;                                                                                                  // 13
                                                                                                                     //
var Ap = AccountsClient.prototype;                                                                                   // 130
                                                                                                                     //
/**                                                                                                                  // 132
 * @summary True if a login method (such as `Meteor.loginWithPassword`, `Meteor.loginWithFacebook`, or `Accounts.createUser`) is currently in progress. A reactive data source.
 * @locus Client                                                                                                     //
 * @importFromPackage meteor                                                                                         //
 */                                                                                                                  //
Meteor.loggingIn = function () {                                                                                     // 137
  return Accounts.loggingIn();                                                                                       // 138
};                                                                                                                   // 139
                                                                                                                     //
///                                                                                                                  // 141
/// LOGIN METHODS                                                                                                    // 142
///                                                                                                                  // 143
                                                                                                                     //
// Call a login method on the server.                                                                                // 145
//                                                                                                                   // 146
// A login method is a method which on success calls `this.setUserId(id)` and                                        // 147
// `Accounts._setLoginToken` on the server and returns an object with fields                                         // 148
// 'id' (containing the user id), 'token' (containing a resume token), and                                           // 149
// optionally `tokenExpires`.                                                                                        // 150
//                                                                                                                   // 151
// This function takes care of:                                                                                      // 152
//   - Updating the Meteor.loggingIn() reactive data source                                                          // 153
//   - Calling the method in 'wait' mode                                                                             // 154
//   - On success, saving the resume token to localStorage                                                           // 155
//   - On success, calling Accounts.connection.setUserId()                                                           // 156
//   - Setting up an onReconnect handler which logs in with                                                          // 157
//     the resume token                                                                                              // 158
//                                                                                                                   // 159
// Options:                                                                                                          // 160
// - methodName: The method to call (default 'login')                                                                // 161
// - methodArguments: The arguments for the method                                                                   // 162
// - validateResult: If provided, will be called with the result of the                                              // 163
//                 method. If it throws, the client will not be logged in (and                                       // 164
//                 its error will be passed to the callback).                                                        // 165
// - userCallback: Will be called with no arguments once the user is fully                                           // 166
//                 logged in, or with the error on error.                                                            // 167
//                                                                                                                   // 168
Ap.callLoginMethod = function (options) {                                                                            // 169
  var self = this;                                                                                                   // 170
                                                                                                                     //
  options = _.extend({                                                                                               // 172
    methodName: 'login',                                                                                             // 173
    methodArguments: [{}],                                                                                           // 174
    _suppressLoggingIn: false                                                                                        // 175
  }, options);                                                                                                       // 172
                                                                                                                     //
  // Set defaults for callback arguments to no-op functions; make sure we                                            // 178
  // override falsey values too.                                                                                     // 179
  _.each(['validateResult', 'userCallback'], function (f) {                                                          // 180
    if (!options[f]) options[f] = function () {};                                                                    // 181
  });                                                                                                                // 183
                                                                                                                     //
  // Prepare callbacks: user provided and onLogin/onLoginFailure hooks.                                              // 185
  var loginCallbacks = _.once(function (error) {                                                                     // 186
    if (!error) {                                                                                                    // 187
      self._onLoginHook.each(function (callback) {                                                                   // 188
        callback();                                                                                                  // 189
        return true;                                                                                                 // 190
      });                                                                                                            // 191
    } else {                                                                                                         // 192
      self._onLoginFailureHook.each(function (callback) {                                                            // 193
        callback({ error: error });                                                                                  // 194
        return true;                                                                                                 // 195
      });                                                                                                            // 196
    }                                                                                                                // 197
    options.userCallback.apply(this, arguments);                                                                     // 198
  });                                                                                                                // 199
                                                                                                                     //
  var reconnected = false;                                                                                           // 201
                                                                                                                     //
  // We want to set up onReconnect as soon as we get a result token back from                                        // 203
  // the server, without having to wait for subscriptions to rerun. This is                                          // 204
  // because if we disconnect and reconnect between getting the result and                                           // 205
  // getting the results of subscription rerun, we WILL NOT re-send this                                             // 206
  // method (because we never re-send methods whose results we've received)                                          // 207
  // but we WILL call loggedInAndDataReadyCallback at "reconnect quiesce"                                            // 208
  // time. This will lead to makeClientLoggedIn(result.id) even though we                                            // 209
  // haven't actually sent a login method!                                                                           // 210
  //                                                                                                                 // 211
  // But by making sure that we send this "resume" login in that case (and                                           // 212
  // calling makeClientLoggedOut if it fails), we'll end up with an accurate                                         // 213
  // client-side userId. (It's important that livedata_connection guarantees                                         // 214
  // that the "reconnect quiesce"-time call to loggedInAndDataReadyCallback                                          // 215
  // will occur before the callback from the resume login call.)                                                     // 216
  var onResultReceived = function onResultReceived(err, result) {                                                    // 217
    if (err || !result || !result.token) {                                                                           // 218
      // Leave onReconnect alone if there was an error, so that if the user was                                      // 219
      // already logged in they will still get logged in on reconnect.                                               // 220
      // See issue #4970.                                                                                            // 221
    } else {                                                                                                         // 222
      self.connection.onReconnect = function () {                                                                    // 223
        reconnected = true;                                                                                          // 224
        // If our token was updated in storage, use the latest one.                                                  // 225
        var storedToken = self._storedLoginToken();                                                                  // 226
        if (storedToken) {                                                                                           // 227
          result = {                                                                                                 // 228
            token: storedToken,                                                                                      // 229
            tokenExpires: self._storedLoginTokenExpires()                                                            // 230
          };                                                                                                         // 228
        }                                                                                                            // 232
        if (!result.tokenExpires) result.tokenExpires = self._tokenExpiration(new Date());                           // 233
        if (self._tokenExpiresSoon(result.tokenExpires)) {                                                           // 235
          self.makeClientLoggedOut();                                                                                // 236
        } else {                                                                                                     // 237
          self.callLoginMethod({                                                                                     // 238
            methodArguments: [{ resume: result.token }],                                                             // 239
            // Reconnect quiescence ensures that the user doesn't see an                                             // 240
            // intermediate state before the login method finishes. So we don't                                      // 241
            // need to show a logging-in animation.                                                                  // 242
            _suppressLoggingIn: true,                                                                                // 243
            userCallback: function () {                                                                              // 244
              function userCallback(error) {                                                                         // 244
                var storedTokenNow = self._storedLoginToken();                                                       // 245
                if (error) {                                                                                         // 246
                  // If we had a login error AND the current stored token is the                                     // 247
                  // one that we tried to log in with, then declare ourselves                                        // 248
                  // logged out. If there's a token in storage but it's not the                                      // 249
                  // token that we tried to log in with, we don't know anything                                      // 250
                  // about whether that token is valid or not, so do nothing. The                                    // 251
                  // periodic localStorage poll will decide if we are logged in or                                   // 252
                  // out with this token, if it hasn't already. Of course, even                                      // 253
                  // with this check, another tab could insert a new valid token                                     // 254
                  // immediately before we clear localStorage here, which would                                      // 255
                  // lead to both tabs being logged out, but by checking the token                                   // 256
                  // in storage right now we hope to make that unlikely to happen.                                   // 257
                  //                                                                                                 // 258
                  // If there is no token in storage right now, we don't have to                                     // 259
                  // do anything; whatever code removed the token from storage was                                   // 260
                  // responsible for calling `makeClientLoggedOut()`, or the                                         // 261
                  // periodic localStorage poll will call `makeClientLoggedOut`                                      // 262
                  // eventually if another tab wiped the token from storage.                                         // 263
                  if (storedTokenNow && storedTokenNow === result.token) {                                           // 264
                    self.makeClientLoggedOut();                                                                      // 265
                  }                                                                                                  // 266
                }                                                                                                    // 267
                // Possibly a weird callback to call, but better than nothing if                                     // 268
                // there is a reconnect between "login result received" and "data                                    // 269
                // ready".                                                                                           // 270
                loginCallbacks(error);                                                                               // 271
              }                                                                                                      // 272
                                                                                                                     //
              return userCallback;                                                                                   // 244
            }() });                                                                                                  // 244
        }                                                                                                            // 273
      };                                                                                                             // 274
    }                                                                                                                // 275
  };                                                                                                                 // 276
                                                                                                                     //
  // This callback is called once the local cache of the current-user                                                // 278
  // subscription (and all subscriptions, in fact) are guaranteed to be up to                                        // 279
  // date.                                                                                                           // 280
  var loggedInAndDataReadyCallback = function loggedInAndDataReadyCallback(error, result) {                          // 281
    // If the login method returns its result but the connection is lost                                             // 282
    // before the data is in the local cache, it'll set an onReconnect (see                                          // 283
    // above). The onReconnect will try to log in using the token, and *it*                                          // 284
    // will call userCallback via its own version of this                                                            // 285
    // loggedInAndDataReadyCallback. So we don't have to do anything here.                                           // 286
    if (reconnected) return;                                                                                         // 287
                                                                                                                     //
    // Note that we need to call this even if _suppressLoggingIn is true,                                            // 290
    // because it could be matching a _setLoggingIn(true) from a                                                     // 291
    // half-completed pre-reconnect login method.                                                                    // 292
    self._setLoggingIn(false);                                                                                       // 293
    if (error || !result) {                                                                                          // 294
      error = error || new Error("No result from call to " + options.methodName);                                    // 295
      loginCallbacks(error);                                                                                         // 297
      return;                                                                                                        // 298
    }                                                                                                                // 299
    try {                                                                                                            // 300
      options.validateResult(result);                                                                                // 301
    } catch (e) {                                                                                                    // 302
      loginCallbacks(e);                                                                                             // 303
      return;                                                                                                        // 304
    }                                                                                                                // 305
                                                                                                                     //
    // Make the client logged in. (The user data should already be loaded!)                                          // 307
    self.makeClientLoggedIn(result.id, result.token, result.tokenExpires);                                           // 308
    loginCallbacks();                                                                                                // 309
  };                                                                                                                 // 310
                                                                                                                     //
  if (!options._suppressLoggingIn) self._setLoggingIn(true);                                                         // 312
  self.connection.apply(options.methodName, options.methodArguments, { wait: true, onResultReceived: onResultReceived }, loggedInAndDataReadyCallback);
};                                                                                                                   // 319
                                                                                                                     //
Ap.makeClientLoggedOut = function () {                                                                               // 321
  // Ensure client was successfully logged in before running logout hooks.                                           // 322
  if (this.connection._userId) {                                                                                     // 323
    this._onLogoutHook.each(function (callback) {                                                                    // 324
      callback();                                                                                                    // 325
      return true;                                                                                                   // 326
    });                                                                                                              // 327
  }                                                                                                                  // 328
  this._unstoreLoginToken();                                                                                         // 329
  this.connection.setUserId(null);                                                                                   // 330
  this.connection.onReconnect = null;                                                                                // 331
};                                                                                                                   // 332
                                                                                                                     //
Ap.makeClientLoggedIn = function (userId, token, tokenExpires) {                                                     // 334
  this._storeLoginToken(userId, token, tokenExpires);                                                                // 335
  this.connection.setUserId(userId);                                                                                 // 336
};                                                                                                                   // 337
                                                                                                                     //
/**                                                                                                                  // 339
 * @summary Log the user out.                                                                                        //
 * @locus Client                                                                                                     //
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage meteor                                                                                         //
 */                                                                                                                  //
Meteor.logout = function (callback) {                                                                                // 345
  return Accounts.logout(callback);                                                                                  // 346
};                                                                                                                   // 347
                                                                                                                     //
/**                                                                                                                  // 349
 * @summary Log out other clients logged in as the current user, but does not log out the client that calls this function.
 * @locus Client                                                                                                     //
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage meteor                                                                                         //
 */                                                                                                                  //
Meteor.logoutOtherClients = function (callback) {                                                                    // 355
  return Accounts.logoutOtherClients(callback);                                                                      // 356
};                                                                                                                   // 357
                                                                                                                     //
///                                                                                                                  // 360
/// LOGIN SERVICES                                                                                                   // 361
///                                                                                                                  // 362
                                                                                                                     //
// A reactive function returning whether the loginServiceConfiguration                                               // 364
// subscription is ready. Used by accounts-ui to hide the login button                                               // 365
// until we have all the configuration loaded                                                                        // 366
//                                                                                                                   // 367
Ap.loginServicesConfigured = function () {                                                                           // 368
  return this._loginServicesHandle.ready();                                                                          // 369
};                                                                                                                   // 370
                                                                                                                     //
// Some login services such as the redirect login flow or the resume                                                 // 373
// login handler can log the user in at page load time.  The                                                         // 374
// Meteor.loginWithX functions have a callback argument, but the                                                     // 375
// callback function instance won't be in memory any longer if the                                                   // 376
// page was reloaded.  The `onPageLoadLogin` function allows a                                                       // 377
// callback to be registered for the case where the login was                                                        // 378
// initiated in a previous VM, and we now have the result of the login                                               // 379
// attempt in a new VM.                                                                                              // 380
                                                                                                                     //
// Register a callback to be called if we have information about a                                                   // 382
// login attempt at page load time.  Call the callback immediately if                                                // 383
// we already have the page load login attempt info, otherwise stash                                                 // 384
// the callback to be called if and when we do get the attempt info.                                                 // 385
//                                                                                                                   // 386
Ap.onPageLoadLogin = function (f) {                                                                                  // 387
  if (this._pageLoadLoginAttemptInfo) {                                                                              // 388
    f(this._pageLoadLoginAttemptInfo);                                                                               // 389
  } else {                                                                                                           // 390
    this._pageLoadLoginCallbacks.push(f);                                                                            // 391
  }                                                                                                                  // 392
};                                                                                                                   // 393
                                                                                                                     //
// Receive the information about the login attempt at page load time.                                                // 396
// Call registered callbacks, and also record the info in case                                                       // 397
// someone's callback hasn't been registered yet.                                                                    // 398
//                                                                                                                   // 399
Ap._pageLoadLogin = function (attemptInfo) {                                                                         // 400
  if (this._pageLoadLoginAttemptInfo) {                                                                              // 401
    Meteor._debug("Ignoring unexpected duplicate page load login attempt info");                                     // 402
    return;                                                                                                          // 403
  }                                                                                                                  // 404
                                                                                                                     //
  _.each(this._pageLoadLoginCallbacks, function (callback) {                                                         // 406
    callback(attemptInfo);                                                                                           // 407
  });                                                                                                                // 408
                                                                                                                     //
  this._pageLoadLoginCallbacks = [];                                                                                 // 410
  this._pageLoadLoginAttemptInfo = attemptInfo;                                                                      // 411
};                                                                                                                   // 412
                                                                                                                     //
///                                                                                                                  // 415
/// HANDLEBARS HELPERS                                                                                               // 416
///                                                                                                                  // 417
                                                                                                                     //
// If our app has a Blaze, register the {{currentUser}} and {{loggingIn}}                                            // 419
// global helpers.                                                                                                   // 420
if (Package.blaze) {                                                                                                 // 421
  /**                                                                                                                // 422
   * @global                                                                                                         //
   * @name  currentUser                                                                                              //
   * @isHelper true                                                                                                  //
   * @summary Calls [Meteor.user()](#meteor_user). Use `{{#if currentUser}}` to check whether the user is logged in.
   */                                                                                                                //
  Package.blaze.Blaze.Template.registerHelper('currentUser', function () {                                           // 428
    return Meteor.user();                                                                                            // 429
  });                                                                                                                // 430
                                                                                                                     //
  /**                                                                                                                // 432
   * @global                                                                                                         //
   * @name  loggingIn                                                                                                //
   * @isHelper true                                                                                                  //
   * @summary Calls [Meteor.loggingIn()](#meteor_loggingin).                                                         //
   */                                                                                                                //
  Package.blaze.Blaze.Template.registerHelper('loggingIn', function () {                                             // 438
    return Meteor.loggingIn();                                                                                       // 439
  });                                                                                                                // 440
}                                                                                                                    // 441
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"accounts_common.js":["babel-runtime/helpers/classCallCheck",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-base/accounts_common.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({AccountsCommon:function(){return AccountsCommon}});var _classCallCheck;module.import("babel-runtime/helpers/classCallCheck",{"default":function(v){_classCallCheck=v}});
/**                                                                                                                  // 1
 * @summary Super-constructor for AccountsClient and AccountsServer.                                                 //
 * @locus Anywhere                                                                                                   //
 * @class AccountsCommon                                                                                             //
 * @instancename accountsClientOrServer                                                                              //
 * @param options {Object} an object with fields:                                                                    //
 * - connection {Object} Optional DDP connection to reuse.                                                           //
 * - ddpUrl {String} Optional URL for creating a new DDP connection.                                                 //
 */                                                                                                                  //
var AccountsCommon = function () {                                                                                   // 10
  function AccountsCommon(options) {                                                                                 // 11
    _classCallCheck(this, AccountsCommon);                                                                           // 11
                                                                                                                     //
    // Currently this is read directly by packages like accounts-password                                            // 12
    // and accounts-ui-unstyled.                                                                                     // 13
    this._options = {};                                                                                              // 14
                                                                                                                     //
    // Note that setting this.connection = null causes this.users to be a                                            // 16
    // LocalCollection, which is not what we want.                                                                   // 17
    this.connection = undefined;                                                                                     // 18
    this._initConnection(options || {});                                                                             // 19
                                                                                                                     //
    // There is an allow call in accounts_server.js that restricts writes to                                         // 21
    // this collection.                                                                                              // 22
    this.users = new Mongo.Collection("users", {                                                                     // 23
      _preventAutopublish: true,                                                                                     // 24
      connection: this.connection                                                                                    // 25
    });                                                                                                              // 23
                                                                                                                     //
    // Callback exceptions are printed with Meteor._debug and ignored.                                               // 28
    this._onLoginHook = new Hook({                                                                                   // 29
      bindEnvironment: false,                                                                                        // 30
      debugPrintExceptions: "onLogin callback"                                                                       // 31
    });                                                                                                              // 29
                                                                                                                     //
    this._onLoginFailureHook = new Hook({                                                                            // 34
      bindEnvironment: false,                                                                                        // 35
      debugPrintExceptions: "onLoginFailure callback"                                                                // 36
    });                                                                                                              // 34
                                                                                                                     //
    this._onLogoutHook = new Hook({                                                                                  // 39
      bindEnvironment: false,                                                                                        // 40
      debugPrintExceptions: "onLogout callback"                                                                      // 41
    });                                                                                                              // 39
  }                                                                                                                  // 43
                                                                                                                     //
  /**                                                                                                                // 45
   * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.                    //
   * @locus Anywhere but publish functions                                                                           //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsCommon.prototype.userId = function () {                                                                    // 10
    function userId() {                                                                                              // 10
      throw new Error("userId method not implemented");                                                              // 50
    }                                                                                                                // 51
                                                                                                                     //
    return userId;                                                                                                   // 10
  }();                                                                                                               // 10
                                                                                                                     //
  /**                                                                                                                // 53
   * @summary Get the current user record, or `null` if no user is logged in. A reactive data source.                //
   * @locus Anywhere but publish functions                                                                           //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsCommon.prototype.user = function () {                                                                      // 10
    function user() {                                                                                                // 10
      var userId = this.userId();                                                                                    // 58
      return userId ? this.users.findOne(userId) : null;                                                             // 59
    }                                                                                                                // 60
                                                                                                                     //
    return user;                                                                                                     // 10
  }();                                                                                                               // 10
                                                                                                                     //
  // Set up config for the accounts system. Call this on both the client                                             // 62
  // and the server.                                                                                                 // 63
  //                                                                                                                 // 64
  // Note that this method gets overridden on AccountsServer.prototype, but                                          // 65
  // the overriding method calls the overridden method.                                                              // 66
  //                                                                                                                 // 67
  // XXX we should add some enforcement that this is called on both the                                              // 68
  // client and the server. Otherwise, a user can                                                                    // 69
  // 'forbidClientAccountCreation' only on the client and while it looks                                             // 70
  // like their app is secure, the server will still accept createUser                                               // 71
  // calls. https://github.com/meteor/meteor/issues/828                                                              // 72
  //                                                                                                                 // 73
  // @param options {Object} an object with fields:                                                                  // 74
  // - sendVerificationEmail {Boolean}                                                                               // 75
  //     Send email address verification emails to new users created from                                            // 76
  //     client signups.                                                                                             // 77
  // - forbidClientAccountCreation {Boolean}                                                                         // 78
  //     Do not allow clients to create accounts directly.                                                           // 79
  // - restrictCreationByEmailDomain {Function or String}                                                            // 80
  //     Require created users to have an email matching the function or                                             // 81
  //     having the string as domain.                                                                                // 82
  // - loginExpirationInDays {Number}                                                                                // 83
  //     Number of days since login until a user is logged out (login token                                          // 84
  //     expires).                                                                                                   // 85
  // - passwordResetTokenExpirationInDays {Number}                                                                   // 86
  //     Number of days since password reset token creation until the                                                // 87
  //     token cannt be used any longer (password reset token expires).                                              // 88
                                                                                                                     //
  /**                                                                                                                // 90
   * @summary Set global accounts options.                                                                           //
   * @locus Anywhere                                                                                                 //
   * @param {Object} options                                                                                         //
   * @param {Boolean} options.sendVerificationEmail New users with an email address will receive an address verification email.
   * @param {Boolean} options.forbidClientAccountCreation Calls to [`createUser`](#accounts_createuser) from the client will be rejected. In addition, if you are using [accounts-ui](#accountsui), the "Create account" link will not be available.
   * @param {String | Function} options.restrictCreationByEmailDomain If set to a string, only allows new users if the domain part of their email address matches the string. If set to a function, only allows new users if the function returns true.  The function is passed the full email address of the proposed new user.  Works with password-based sign-in and external services that expose email addresses (Google, Facebook, GitHub). All existing users still can log in after enabling this option. Example: `Accounts.config({ restrictCreationByEmailDomain: 'school.edu' })`.
   * @param {Number} options.loginExpirationInDays The number of days from when a user logs in until their token expires and they are logged out. Defaults to 90. Set to `null` to disable login expiration.
   * @param {String} options.oauthSecretKey When using the `oauth-encryption` package, the 16 byte key using to encrypt sensitive account credentials in the database, encoded in base64.  This option may only be specifed on the server.  See packages/oauth-encryption/README.md for details.
   * @param {Number} options.passwordResetTokenExpirationInDays The number of days from when a link to reset password is sent until token expires and user can't reset password with the link anymore. Defaults to 3.
   * @param {Number} options.passwordEnrollTokenExpirationInDays The number of days from when a link to set inital password is sent until token expires and user can't set password with the link anymore. Defaults to 30.
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsCommon.prototype.config = function () {                                                                    // 10
    function config(options) {                                                                                       // 10
      var self = this;                                                                                               // 103
                                                                                                                     //
      // We don't want users to accidentally only call Accounts.config on the                                        // 105
      // client, where some of the options will have partial effects (eg removing                                    // 106
      // the "create account" button from accounts-ui if forbidClientAccountCreation                                 // 107
      // is set, or redirecting Google login to a specific-domain page) without                                      // 108
      // having their full effects.                                                                                  // 109
      if (Meteor.isServer) {                                                                                         // 110
        __meteor_runtime_config__.accountsConfigCalled = true;                                                       // 111
      } else if (!__meteor_runtime_config__.accountsConfigCalled) {                                                  // 112
        // XXX would be nice to "crash" the client and replace the UI with an error                                  // 113
        // message, but there's no trivial way to do this.                                                           // 114
        Meteor._debug("Accounts.config was called on the client but not on the " + "server; some configuration options may not take effect.");
      }                                                                                                              // 117
                                                                                                                     //
      // We need to validate the oauthSecretKey option at the time                                                   // 119
      // Accounts.config is called. We also deliberately don't store the                                             // 120
      // oauthSecretKey in Accounts._options.                                                                        // 121
      if (_.has(options, "oauthSecretKey")) {                                                                        // 122
        if (Meteor.isClient) throw new Error("The oauthSecretKey option may only be specified on the server");       // 123
        if (!Package["oauth-encryption"]) throw new Error("The oauth-encryption package must be loaded to set oauthSecretKey");
        Package["oauth-encryption"].OAuthEncryption.loadKey(options.oauthSecretKey);                                 // 127
        options = _.omit(options, "oauthSecretKey");                                                                 // 128
      }                                                                                                              // 129
                                                                                                                     //
      // validate option keys                                                                                        // 131
      var VALID_KEYS = ["sendVerificationEmail", "forbidClientAccountCreation", "passwordEnrollTokenExpirationInDays", "restrictCreationByEmailDomain", "loginExpirationInDays", "passwordResetTokenExpirationInDays"];
      _.each(_.keys(options), function (key) {                                                                       // 134
        if (!_.contains(VALID_KEYS, key)) {                                                                          // 135
          throw new Error("Accounts.config: Invalid key: " + key);                                                   // 136
        }                                                                                                            // 137
      });                                                                                                            // 138
                                                                                                                     //
      // set values in Accounts._options                                                                             // 140
      _.each(VALID_KEYS, function (key) {                                                                            // 141
        if (key in options) {                                                                                        // 142
          if (key in self._options) {                                                                                // 143
            throw new Error("Can't set `" + key + "` more than once");                                               // 144
          }                                                                                                          // 145
          self._options[key] = options[key];                                                                         // 146
        }                                                                                                            // 147
      });                                                                                                            // 148
    }                                                                                                                // 149
                                                                                                                     //
    return config;                                                                                                   // 10
  }();                                                                                                               // 10
                                                                                                                     //
  /**                                                                                                                // 151
   * @summary Register a callback to be called after a login attempt succeeds.                                       //
   * @locus Anywhere                                                                                                 //
   * @param {Function} func The callback to be called when login is successful.                                      //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsCommon.prototype.onLogin = function () {                                                                   // 10
    function onLogin(func) {                                                                                         // 10
      return this._onLoginHook.register(func);                                                                       // 157
    }                                                                                                                // 158
                                                                                                                     //
    return onLogin;                                                                                                  // 10
  }();                                                                                                               // 10
                                                                                                                     //
  /**                                                                                                                // 160
   * @summary Register a callback to be called after a login attempt fails.                                          //
   * @locus Anywhere                                                                                                 //
   * @param {Function} func The callback to be called after the login has failed.                                    //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsCommon.prototype.onLoginFailure = function () {                                                            // 10
    function onLoginFailure(func) {                                                                                  // 10
      return this._onLoginFailureHook.register(func);                                                                // 166
    }                                                                                                                // 167
                                                                                                                     //
    return onLoginFailure;                                                                                           // 10
  }();                                                                                                               // 10
                                                                                                                     //
  /**                                                                                                                // 169
   * @summary Register a callback to be called after a logout attempt succeeds.                                      //
   * @locus Anywhere                                                                                                 //
   * @param {Function} func The callback to be called when logout is successful.                                     //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  AccountsCommon.prototype.onLogout = function () {                                                                  // 10
    function onLogout(func) {                                                                                        // 10
      return this._onLogoutHook.register(func);                                                                      // 175
    }                                                                                                                // 176
                                                                                                                     //
    return onLogout;                                                                                                 // 10
  }();                                                                                                               // 10
                                                                                                                     //
  AccountsCommon.prototype._initConnection = function () {                                                           // 10
    function _initConnection(options) {                                                                              // 10
      if (!Meteor.isClient) {                                                                                        // 179
        return;                                                                                                      // 180
      }                                                                                                              // 181
                                                                                                                     //
      // The connection used by the Accounts system. This is the connection                                          // 183
      // that will get logged in by Meteor.login(), and this is the                                                  // 184
      // connection whose login state will be reflected by Meteor.userId().                                          // 185
      //                                                                                                             // 186
      // It would be much preferable for this to be in accounts_client.js,                                           // 187
      // but it has to be here because it's needed to create the                                                     // 188
      // Meteor.users collection.                                                                                    // 189
                                                                                                                     //
      if (options.connection) {                                                                                      // 191
        this.connection = options.connection;                                                                        // 192
      } else if (options.ddpUrl) {                                                                                   // 193
        this.connection = DDP.connect(options.ddpUrl);                                                               // 194
      } else if (typeof __meteor_runtime_config__ !== "undefined" && __meteor_runtime_config__.ACCOUNTS_CONNECTION_URL) {
        // Temporary, internal hook to allow the server to point the client                                          // 197
        // to a different authentication server. This is for a very                                                  // 198
        // particular use case that comes up when implementing a oauth                                               // 199
        // server. Unsupported and may go away at any point in time.                                                 // 200
        //                                                                                                           // 201
        // We will eventually provide a general way to use account-base                                              // 202
        // against any DDP connection, not just one special one.                                                     // 203
        this.connection = DDP.connect(__meteor_runtime_config__.ACCOUNTS_CONNECTION_URL);                            // 204
      } else {                                                                                                       // 206
        this.connection = Meteor.connection;                                                                         // 207
      }                                                                                                              // 208
    }                                                                                                                // 209
                                                                                                                     //
    return _initConnection;                                                                                          // 10
  }();                                                                                                               // 10
                                                                                                                     //
  AccountsCommon.prototype._getTokenLifetimeMs = function () {                                                       // 10
    function _getTokenLifetimeMs() {                                                                                 // 10
      return (this._options.loginExpirationInDays || DEFAULT_LOGIN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;           // 212
    }                                                                                                                // 214
                                                                                                                     //
    return _getTokenLifetimeMs;                                                                                      // 10
  }();                                                                                                               // 10
                                                                                                                     //
  AccountsCommon.prototype._getPasswordResetTokenLifetimeMs = function () {                                          // 10
    function _getPasswordResetTokenLifetimeMs() {                                                                    // 10
      return (this._options.passwordResetTokenExpirationInDays || DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;
    }                                                                                                                // 219
                                                                                                                     //
    return _getPasswordResetTokenLifetimeMs;                                                                         // 10
  }();                                                                                                               // 10
                                                                                                                     //
  AccountsCommon.prototype._getPasswordEnrollTokenLifetimeMs = function () {                                         // 10
    function _getPasswordEnrollTokenLifetimeMs() {                                                                   // 10
      return (this._options.passwordEnrollTokenExpirationInDays || DEFAULT_PASSWORD_ENROLL_TOKEN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;
    }                                                                                                                // 224
                                                                                                                     //
    return _getPasswordEnrollTokenLifetimeMs;                                                                        // 10
  }();                                                                                                               // 10
                                                                                                                     //
  AccountsCommon.prototype._tokenExpiration = function () {                                                          // 10
    function _tokenExpiration(when) {                                                                                // 10
      // We pass when through the Date constructor for backwards compatibility;                                      // 227
      // `when` used to be a number.                                                                                 // 228
      return new Date(new Date(when).getTime() + this._getTokenLifetimeMs());                                        // 229
    }                                                                                                                // 230
                                                                                                                     //
    return _tokenExpiration;                                                                                         // 10
  }();                                                                                                               // 10
                                                                                                                     //
  AccountsCommon.prototype._tokenExpiresSoon = function () {                                                         // 10
    function _tokenExpiresSoon(when) {                                                                               // 10
      var minLifetimeMs = .1 * this._getTokenLifetimeMs();                                                           // 233
      var minLifetimeCapMs = MIN_TOKEN_LIFETIME_CAP_SECS * 1000;                                                     // 234
      if (minLifetimeMs > minLifetimeCapMs) minLifetimeMs = minLifetimeCapMs;                                        // 235
      return new Date() > new Date(when) - minLifetimeMs;                                                            // 237
    }                                                                                                                // 238
                                                                                                                     //
    return _tokenExpiresSoon;                                                                                        // 10
  }();                                                                                                               // 10
                                                                                                                     //
  return AccountsCommon;                                                                                             // 10
}();                                                                                                                 // 10
                                                                                                                     //
var Ap = AccountsCommon.prototype;                                                                                   // 241
                                                                                                                     //
// Note that Accounts is defined separately in accounts_client.js and                                                // 243
// accounts_server.js.                                                                                               // 244
                                                                                                                     //
/**                                                                                                                  // 246
 * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.                      //
 * @locus Anywhere but publish functions                                                                             //
 * @importFromPackage meteor                                                                                         //
 */                                                                                                                  //
Meteor.userId = function () {                                                                                        // 251
  return Accounts.userId();                                                                                          // 252
};                                                                                                                   // 253
                                                                                                                     //
/**                                                                                                                  // 255
 * @summary Get the current user record, or `null` if no user is logged in. A reactive data source.                  //
 * @locus Anywhere but publish functions                                                                             //
 * @importFromPackage meteor                                                                                         //
 */                                                                                                                  //
Meteor.user = function () {                                                                                          // 260
  return Accounts.user();                                                                                            // 261
};                                                                                                                   // 262
                                                                                                                     //
// how long (in days) until a login token expires                                                                    // 264
var DEFAULT_LOGIN_EXPIRATION_DAYS = 90;                                                                              // 265
// how long (in days) until reset password token expires                                                             // 266
var DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_DAYS = 3;                                                                // 267
// how long (in days) until enrol password token expires                                                             // 268
var DEFAULT_PASSWORD_ENROLL_TOKEN_EXPIRATION_DAYS = 30;                                                              // 269
// Clients don't try to auto-login with a token that is going to expire within                                       // 270
// .1 * DEFAULT_LOGIN_EXPIRATION_DAYS, capped at MIN_TOKEN_LIFETIME_CAP_SECS.                                        // 271
// Tries to avoid abrupt disconnects from expiring tokens.                                                           // 272
var MIN_TOKEN_LIFETIME_CAP_SECS = 3600; // one hour                                                                  // 273
// how often (in milliseconds) we check for expired tokens                                                           // 274
EXPIRE_TOKENS_INTERVAL_MS = 600 * 1000; // 10 minutes                                                                // 275
// how long we wait before logging out clients when Meteor.logoutOtherClients is                                     // 276
// called                                                                                                            // 277
CONNECTION_CLOSE_DELAY_MS = 10 * 1000;                                                                               // 278
                                                                                                                     //
// loginServiceConfiguration and ConfigError are maintained for backwards compatibility                              // 280
Meteor.startup(function () {                                                                                         // 281
  var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;                                  // 282
  Ap.loginServiceConfiguration = ServiceConfiguration.configurations;                                                // 284
  Ap.ConfigError = ServiceConfiguration.ConfigError;                                                                 // 285
});                                                                                                                  // 286
                                                                                                                     //
// Thrown when the user cancels the login process (eg, closes an oauth                                               // 288
// popup, declines retina scan, etc)                                                                                 // 289
var lceName = 'Accounts.LoginCancelledError';                                                                        // 290
Ap.LoginCancelledError = Meteor.makeErrorType(lceName, function (description) {                                      // 291
  this.message = description;                                                                                        // 294
});                                                                                                                  // 295
Ap.LoginCancelledError.prototype.name = lceName;                                                                     // 297
                                                                                                                     //
// This is used to transmit specific subclass errors over the wire. We should                                        // 299
// come up with a more generic way to do this (eg, with some sort of symbolic                                        // 300
// error code rather than a number).                                                                                 // 301
Ap.LoginCancelledError.numericError = 0x8acdc2f;                                                                     // 302
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"localstorage_token.js":["./accounts_client.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-base/localstorage_token.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var AccountsClient;module.import("./accounts_client.js",{"AccountsClient":function(v){AccountsClient=v}});           // 1
var Ap = AccountsClient.prototype;                                                                                   // 2
                                                                                                                     //
// This file deals with storing a login token and user id in the                                                     // 4
// browser's localStorage facility. It polls local storage every few                                                 // 5
// seconds to synchronize login state between multiple tabs in the same                                              // 6
// browser.                                                                                                          // 7
                                                                                                                     //
// Login with a Meteor access token. This is the only public function                                                // 9
// here.                                                                                                             // 10
Meteor.loginWithToken = function (token, callback) {                                                                 // 11
  return Accounts.loginWithToken(token, callback);                                                                   // 12
};                                                                                                                   // 13
                                                                                                                     //
Ap.loginWithToken = function (token, callback) {                                                                     // 15
  this.callLoginMethod({                                                                                             // 16
    methodArguments: [{                                                                                              // 17
      resume: token                                                                                                  // 18
    }],                                                                                                              // 17
    userCallback: callback                                                                                           // 20
  });                                                                                                                // 16
};                                                                                                                   // 22
                                                                                                                     //
// Semi-internal API. Call this function to re-enable auto login after                                               // 24
// if it was disabled at startup.                                                                                    // 25
Ap._enableAutoLogin = function () {                                                                                  // 26
  this._autoLoginEnabled = true;                                                                                     // 27
  this._pollStoredLoginToken();                                                                                      // 28
};                                                                                                                   // 29
                                                                                                                     //
///                                                                                                                  // 32
/// STORING                                                                                                          // 33
///                                                                                                                  // 34
                                                                                                                     //
// Call this from the top level of the test file for any test that does                                              // 36
// logging in and out, to protect multiple tabs running the same tests                                               // 37
// simultaneously from interfering with each others' localStorage.                                                   // 38
Ap._isolateLoginTokenForTest = function () {                                                                         // 39
  this.LOGIN_TOKEN_KEY = this.LOGIN_TOKEN_KEY + Random.id();                                                         // 40
  this.USER_ID_KEY = this.USER_ID_KEY + Random.id();                                                                 // 41
};                                                                                                                   // 42
                                                                                                                     //
Ap._storeLoginToken = function (userId, token, tokenExpires) {                                                       // 44
  Meteor._localStorage.setItem(this.USER_ID_KEY, userId);                                                            // 45
  Meteor._localStorage.setItem(this.LOGIN_TOKEN_KEY, token);                                                         // 46
  if (!tokenExpires) tokenExpires = this._tokenExpiration(new Date());                                               // 47
  Meteor._localStorage.setItem(this.LOGIN_TOKEN_EXPIRES_KEY, tokenExpires);                                          // 49
                                                                                                                     //
  // to ensure that the localstorage poller doesn't end up trying to                                                 // 51
  // connect a second time                                                                                           // 52
  this._lastLoginTokenWhenPolled = token;                                                                            // 53
};                                                                                                                   // 54
                                                                                                                     //
Ap._unstoreLoginToken = function () {                                                                                // 56
  Meteor._localStorage.removeItem(this.USER_ID_KEY);                                                                 // 57
  Meteor._localStorage.removeItem(this.LOGIN_TOKEN_KEY);                                                             // 58
  Meteor._localStorage.removeItem(this.LOGIN_TOKEN_EXPIRES_KEY);                                                     // 59
                                                                                                                     //
  // to ensure that the localstorage poller doesn't end up trying to                                                 // 61
  // connect a second time                                                                                           // 62
  this._lastLoginTokenWhenPolled = null;                                                                             // 63
};                                                                                                                   // 64
                                                                                                                     //
// This is private, but it is exported for now because it is used by a                                               // 66
// test in accounts-password.                                                                                        // 67
//                                                                                                                   // 68
Ap._storedLoginToken = function () {                                                                                 // 69
  return Meteor._localStorage.getItem(this.LOGIN_TOKEN_KEY);                                                         // 70
};                                                                                                                   // 71
                                                                                                                     //
Ap._storedLoginTokenExpires = function () {                                                                          // 73
  return Meteor._localStorage.getItem(this.LOGIN_TOKEN_EXPIRES_KEY);                                                 // 74
};                                                                                                                   // 75
                                                                                                                     //
Ap._storedUserId = function () {                                                                                     // 77
  return Meteor._localStorage.getItem(this.USER_ID_KEY);                                                             // 78
};                                                                                                                   // 79
                                                                                                                     //
Ap._unstoreLoginTokenIfExpiresSoon = function () {                                                                   // 81
  var tokenExpires = this._storedLoginTokenExpires();                                                                // 82
  if (tokenExpires && this._tokenExpiresSoon(new Date(tokenExpires))) {                                              // 83
    this._unstoreLoginToken();                                                                                       // 84
  }                                                                                                                  // 85
};                                                                                                                   // 86
                                                                                                                     //
///                                                                                                                  // 88
/// AUTO-LOGIN                                                                                                       // 89
///                                                                                                                  // 90
                                                                                                                     //
Ap._initLocalStorage = function () {                                                                                 // 92
  var self = this;                                                                                                   // 93
                                                                                                                     //
  // Key names to use in localStorage                                                                                // 95
  self.LOGIN_TOKEN_KEY = "Meteor.loginToken";                                                                        // 96
  self.LOGIN_TOKEN_EXPIRES_KEY = "Meteor.loginTokenExpires";                                                         // 97
  self.USER_ID_KEY = "Meteor.userId";                                                                                // 98
                                                                                                                     //
  var rootUrlPathPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;                                            // 100
  if (rootUrlPathPrefix || this.connection !== Meteor.connection) {                                                  // 101
    // We want to keep using the same keys for existing apps that do not                                             // 102
    // set a custom ROOT_URL_PATH_PREFIX, so that most users will not have                                           // 103
    // to log in again after an app updates to a version of Meteor that                                              // 104
    // contains this code, but it's generally preferable to namespace the                                            // 105
    // keys so that connections from distinct apps to distinct DDP URLs                                              // 106
    // will be distinct in Meteor._localStorage.                                                                     // 107
    var namespace = ":" + this.connection._stream.rawUrl;                                                            // 108
    if (rootUrlPathPrefix) {                                                                                         // 109
      namespace += ":" + rootUrlPathPrefix;                                                                          // 110
    }                                                                                                                // 111
    self.LOGIN_TOKEN_KEY += namespace;                                                                               // 112
    self.LOGIN_TOKEN_EXPIRES_KEY += namespace;                                                                       // 113
    self.USER_ID_KEY += namespace;                                                                                   // 114
  }                                                                                                                  // 115
                                                                                                                     //
  if (self._autoLoginEnabled) {                                                                                      // 117
    // Immediately try to log in via local storage, so that any DDP                                                  // 118
    // messages are sent after we have established our user account                                                  // 119
    self._unstoreLoginTokenIfExpiresSoon();                                                                          // 120
    var token = self._storedLoginToken();                                                                            // 121
    if (token) {                                                                                                     // 122
      // On startup, optimistically present us as logged in while the                                                // 123
      // request is in flight. This reduces page flicker on startup.                                                 // 124
      var userId = self._storedUserId();                                                                             // 125
      userId && self.connection.setUserId(userId);                                                                   // 126
      self.loginWithToken(token, function (err) {                                                                    // 127
        if (err) {                                                                                                   // 128
          Meteor._debug("Error logging in with token: " + err);                                                      // 129
          self.makeClientLoggedOut();                                                                                // 130
        }                                                                                                            // 131
                                                                                                                     //
        self._pageLoadLogin({                                                                                        // 133
          type: "resume",                                                                                            // 134
          allowed: !err,                                                                                             // 135
          error: err,                                                                                                // 136
          methodName: "login",                                                                                       // 137
          // XXX This is duplicate code with loginWithToken, but                                                     // 138
          // loginWithToken can also be called at other times besides                                                // 139
          // page load.                                                                                              // 140
          methodArguments: [{ resume: token }]                                                                       // 141
        });                                                                                                          // 133
      });                                                                                                            // 143
    }                                                                                                                // 144
  }                                                                                                                  // 145
                                                                                                                     //
  // Poll local storage every 3 seconds to login if someone logged in in                                             // 147
  // another tab                                                                                                     // 148
  self._lastLoginTokenWhenPolled = token;                                                                            // 149
                                                                                                                     //
  if (self._pollIntervalTimer) {                                                                                     // 151
    // Unlikely that _initLocalStorage will be called more than once for                                             // 152
    // the same AccountsClient instance, but just in case...                                                         // 153
    clearInterval(self._pollIntervalTimer);                                                                          // 154
  }                                                                                                                  // 155
                                                                                                                     //
  self._pollIntervalTimer = setInterval(function () {                                                                // 157
    self._pollStoredLoginToken();                                                                                    // 158
  }, 3000);                                                                                                          // 159
};                                                                                                                   // 160
                                                                                                                     //
Ap._pollStoredLoginToken = function () {                                                                             // 162
  var self = this;                                                                                                   // 163
                                                                                                                     //
  if (!self._autoLoginEnabled) {                                                                                     // 165
    return;                                                                                                          // 166
  }                                                                                                                  // 167
                                                                                                                     //
  var currentLoginToken = self._storedLoginToken();                                                                  // 169
                                                                                                                     //
  // != instead of !== just to make sure undefined and null are treated the same                                     // 171
  if (self._lastLoginTokenWhenPolled != currentLoginToken) {                                                         // 172
    if (currentLoginToken) {                                                                                         // 173
      self.loginWithToken(currentLoginToken, function (err) {                                                        // 174
        if (err) {                                                                                                   // 175
          self.makeClientLoggedOut();                                                                                // 176
        }                                                                                                            // 177
      });                                                                                                            // 178
    } else {                                                                                                         // 179
      self.logout();                                                                                                 // 180
    }                                                                                                                // 181
  }                                                                                                                  // 182
                                                                                                                     //
  self._lastLoginTokenWhenPolled = currentLoginToken;                                                                // 184
};                                                                                                                   // 185
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"url_client.js":["./accounts_client.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-base/url_client.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({AccountsTest:function(){return AccountsTest}});var AccountsClient;module.import("./accounts_client.js",{"AccountsClient":function(v){AccountsClient=v}});
                                                                                                                     //
var Ap = AccountsClient.prototype;                                                                                   // 3
                                                                                                                     //
// All of the special hash URLs we support for accounts interactions                                                 // 5
var accountsPaths = ["reset-password", "verify-email", "enroll-account"];                                            // 6
                                                                                                                     //
var savedHash = window.location.hash;                                                                                // 8
                                                                                                                     //
Ap._initUrlMatching = function () {                                                                                  // 10
  // By default, allow the autologin process to happen.                                                              // 11
  this._autoLoginEnabled = true;                                                                                     // 12
                                                                                                                     //
  // We only support one callback per URL.                                                                           // 14
  this._accountsCallbacks = {};                                                                                      // 15
                                                                                                                     //
  // Try to match the saved value of window.location.hash.                                                           // 17
  this._attemptToMatchHash();                                                                                        // 18
};                                                                                                                   // 19
                                                                                                                     //
// Separate out this functionality for testing                                                                       // 21
                                                                                                                     //
Ap._attemptToMatchHash = function () {                                                                               // 23
  _attemptToMatchHash(this, savedHash, defaultSuccessHandler);                                                       // 24
};                                                                                                                   // 25
                                                                                                                     //
// Note that both arguments are optional and are currently only passed by                                            // 27
// accounts_url_tests.js.                                                                                            // 28
function _attemptToMatchHash(accounts, hash, success) {                                                              // 29
  _.each(accountsPaths, function (urlPart) {                                                                         // 30
    var token;                                                                                                       // 31
                                                                                                                     //
    var tokenRegex = new RegExp("^\\#\\/" + urlPart + "\\/(.*)$");                                                   // 33
    var match = hash.match(tokenRegex);                                                                              // 34
                                                                                                                     //
    if (match) {                                                                                                     // 36
      token = match[1];                                                                                              // 37
                                                                                                                     //
      // XXX COMPAT WITH 0.9.3                                                                                       // 39
      if (urlPart === "reset-password") {                                                                            // 40
        accounts._resetPasswordToken = token;                                                                        // 41
      } else if (urlPart === "verify-email") {                                                                       // 42
        accounts._verifyEmailToken = token;                                                                          // 43
      } else if (urlPart === "enroll-account") {                                                                     // 44
        accounts._enrollAccountToken = token;                                                                        // 45
      }                                                                                                              // 46
    } else {                                                                                                         // 47
      return;                                                                                                        // 48
    }                                                                                                                // 49
                                                                                                                     //
    // If no handlers match the hash, then maybe it's meant to be consumed                                           // 51
    // by some entirely different code, so we only clear it the first time                                           // 52
    // a handler successfully matches. Note that later handlers reuse the                                            // 53
    // savedHash, so clearing window.location.hash here will not interfere                                           // 54
    // with their needs.                                                                                             // 55
    window.location.hash = "";                                                                                       // 56
                                                                                                                     //
    // Do some stuff with the token we matched                                                                       // 58
    success.call(accounts, token, urlPart);                                                                          // 59
  });                                                                                                                // 60
}                                                                                                                    // 61
                                                                                                                     //
function defaultSuccessHandler(token, urlPart) {                                                                     // 63
  var self = this;                                                                                                   // 64
                                                                                                                     //
  // put login in a suspended state to wait for the interaction to finish                                            // 66
  self._autoLoginEnabled = false;                                                                                    // 67
                                                                                                                     //
  // wait for other packages to register callbacks                                                                   // 69
  Meteor.startup(function () {                                                                                       // 70
    // if a callback has been registered for this kind of token, call it                                             // 71
    if (self._accountsCallbacks[urlPart]) {                                                                          // 72
      self._accountsCallbacks[urlPart](token, function () {                                                          // 73
        self._enableAutoLogin();                                                                                     // 74
      });                                                                                                            // 75
    }                                                                                                                // 76
  });                                                                                                                // 77
}                                                                                                                    // 78
                                                                                                                     //
// Export for testing                                                                                                // 80
var AccountsTest = {                                                                                                 // 81
  attemptToMatchHash: function () {                                                                                  // 82
    function attemptToMatchHash(hash, success) {                                                                     // 82
      return _attemptToMatchHash(Accounts, hash, success);                                                           // 83
    }                                                                                                                // 84
                                                                                                                     //
    return attemptToMatchHash;                                                                                       // 82
  }()                                                                                                                // 82
};                                                                                                                   // 81
                                                                                                                     //
// XXX these should be moved to accounts-password eventually. Right now                                              // 87
// this is prevented by the need to set autoLoginEnabled=false, but in                                               // 88
// some bright future we won't need to do that anymore.                                                              // 89
                                                                                                                     //
/**                                                                                                                  // 91
 * @summary Register a function to call when a reset password link is clicked                                        //
 * in an email sent by                                                                                               //
 * [`Accounts.sendResetPasswordEmail`](#accounts_sendresetpasswordemail).                                            //
 * This function should be called in top-level code, not inside                                                      //
 * `Meteor.startup()`.                                                                                               //
 * @memberof! Accounts                                                                                               //
 * @name onResetPasswordLink                                                                                         //
 * @param  {Function} callback The function to call. It is given two arguments:                                      //
 *                                                                                                                   //
 * 1. `token`: A password reset token that can be passed to                                                          //
 * [`Accounts.resetPassword`](#accounts_resetpassword).                                                              //
 * 2. `done`: A function to call when the password reset UI flow is complete. The normal                             //
 * login process is suspended until this function is called, so that the                                             //
 * password for user A can be reset even if user B was logged in.                                                    //
 * @locus Client                                                                                                     //
 */                                                                                                                  //
Ap.onResetPasswordLink = function (callback) {                                                                       // 108
  if (this._accountsCallbacks["reset-password"]) {                                                                   // 109
    Meteor._debug("Accounts.onResetPasswordLink was called more than once. " + "Only one callback added will be executed.");
  }                                                                                                                  // 112
                                                                                                                     //
  this._accountsCallbacks["reset-password"] = callback;                                                              // 114
};                                                                                                                   // 115
                                                                                                                     //
/**                                                                                                                  // 117
 * @summary Register a function to call when an email verification link is                                           //
 * clicked in an email sent by                                                                                       //
 * [`Accounts.sendVerificationEmail`](#accounts_sendverificationemail).                                              //
 * This function should be called in top-level code, not inside                                                      //
 * `Meteor.startup()`.                                                                                               //
 * @memberof! Accounts                                                                                               //
 * @name onEmailVerificationLink                                                                                     //
 * @param  {Function} callback The function to call. It is given two arguments:                                      //
 *                                                                                                                   //
 * 1. `token`: An email verification token that can be passed to                                                     //
 * [`Accounts.verifyEmail`](#accounts_verifyemail).                                                                  //
 * 2. `done`: A function to call when the email verification UI flow is complete.                                    //
 * The normal login process is suspended until this function is called, so                                           //
 * that the user can be notified that they are verifying their email before                                          //
 * being logged in.                                                                                                  //
 * @locus Client                                                                                                     //
 */                                                                                                                  //
Ap.onEmailVerificationLink = function (callback) {                                                                   // 135
  if (this._accountsCallbacks["verify-email"]) {                                                                     // 136
    Meteor._debug("Accounts.onEmailVerificationLink was called more than once. " + "Only one callback added will be executed.");
  }                                                                                                                  // 139
                                                                                                                     //
  this._accountsCallbacks["verify-email"] = callback;                                                                // 141
};                                                                                                                   // 142
                                                                                                                     //
/**                                                                                                                  // 144
 * @summary Register a function to call when an account enrollment link is                                           //
 * clicked in an email sent by                                                                                       //
 * [`Accounts.sendEnrollmentEmail`](#accounts_sendenrollmentemail).                                                  //
 * This function should be called in top-level code, not inside                                                      //
 * `Meteor.startup()`.                                                                                               //
 * @memberof! Accounts                                                                                               //
 * @name onEnrollmentLink                                                                                            //
 * @param  {Function} callback The function to call. It is given two arguments:                                      //
 *                                                                                                                   //
 * 1. `token`: A password reset token that can be passed to                                                          //
 * [`Accounts.resetPassword`](#accounts_resetpassword) to give the newly                                             //
 * enrolled account a password.                                                                                      //
 * 2. `done`: A function to call when the enrollment UI flow is complete.                                            //
 * The normal login process is suspended until this function is called, so that                                      //
 * user A can be enrolled even if user B was logged in.                                                              //
 * @locus Client                                                                                                     //
 */                                                                                                                  //
Ap.onEnrollmentLink = function (callback) {                                                                          // 162
  if (this._accountsCallbacks["enroll-account"]) {                                                                   // 163
    Meteor._debug("Accounts.onEnrollmentLink was called more than once. " + "Only one callback added will be executed.");
  }                                                                                                                  // 166
                                                                                                                     //
  this._accountsCallbacks["enroll-account"] = callback;                                                              // 168
};                                                                                                                   // 169
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/accounts-base/client_main.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['accounts-base'] = exports, {
  Accounts: Accounts
});

})();

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

/* Package-scope variables */
var makeInstaller, meteorInstall;

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/modules-runtime/.npm/package/node_modules/install/install.js   //
// This file is in bare mode and is not in its own closure.                //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
makeInstaller = function (options) {                                       // 1
  options = options || {};                                                 // 2
                                                                           // 3
  // These file extensions will be appended to required module identifiers
  // if they do not exactly match an installed module.                     // 5
  var defaultExtensions = options.extensions || [".js", ".json"];          // 6
                                                                           // 7
  // If defined, the options.onInstall function will be called any time    // 8
  // new modules are installed.                                            // 9
  var onInstall = options.onInstall;                                       // 10
                                                                           // 11
  // If defined, the options.override function will be called before       // 12
  // looking up any top-level package identifiers in node_modules          // 13
  // directories. It can either return a string to provide an alternate    // 14
  // package identifier, or a non-string value to prevent the lookup from  // 15
  // proceeding.                                                           // 16
  var override = options.override;                                         // 17
                                                                           // 18
  // If defined, the options.fallback function will be called when no      // 19
  // installed module is found for a required module identifier. Often     // 20
  // options.fallback will be implemented in terms of the native Node      // 21
  // require function, which has the ability to load binary modules.       // 22
  var fallback = options.fallback;                                         // 23
                                                                           // 24
  // Nothing special about MISSING.hasOwnProperty, except that it's fewer  // 25
  // characters than Object.prototype.hasOwnProperty after minification.   // 26
  var hasOwn = {}.hasOwnProperty;                                          // 27
                                                                           // 28
  // The file object representing the root directory of the installed      // 29
  // module tree.                                                          // 30
  var root = new File("/", new File("/.."));                               // 31
  var rootRequire = makeRequire(root);                                     // 32
                                                                           // 33
  // Merges the given tree of directories and module factory functions     // 34
  // into the tree of installed modules and returns a require function     // 35
  // that behaves as if called from a module in the root directory.        // 36
  function install(tree, options) {                                        // 37
    if (isObject(tree)) {                                                  // 38
      fileMergeContents(root, tree, options);                              // 39
      if (isFunction(onInstall)) {                                         // 40
        onInstall(rootRequire);                                            // 41
      }                                                                    // 42
    }                                                                      // 43
    return rootRequire;                                                    // 44
  }                                                                        // 45
                                                                           // 46
  // This constructor will be used to instantiate the module objects       // 47
  // passed to module factory functions (i.e. the third argument after     // 48
  // require and exports), and is exposed as install.Module in case the    // 49
  // caller of makeInstaller wishes to modify Module.prototype.            // 50
  function Module(id) {                                                    // 51
    this.id = id;                                                          // 52
    this.children = [];                                                    // 53
  }                                                                        // 54
                                                                           // 55
  Module.prototype.resolve = function (id) {                               // 56
    return this.require.resolve(id);                                       // 57
  };                                                                       // 58
                                                                           // 59
  install.Module = Module;                                                 // 60
                                                                           // 61
  function getOwn(obj, key) {                                              // 62
    return hasOwn.call(obj, key) && obj[key];                              // 63
  }                                                                        // 64
                                                                           // 65
  function isObject(value) {                                               // 66
    return value && typeof value === "object";                             // 67
  }                                                                        // 68
                                                                           // 69
  function isFunction(value) {                                             // 70
    return typeof value === "function";                                    // 71
  }                                                                        // 72
                                                                           // 73
  function isString(value) {                                               // 74
    return typeof value === "string";                                      // 75
  }                                                                        // 76
                                                                           // 77
  function makeRequire(file) {                                             // 78
    function require(id) {                                                 // 79
      var result = fileResolve(file, id);                                  // 80
      if (result) {                                                        // 81
        return fileEvaluate(result, file.m);                               // 82
      }                                                                    // 83
                                                                           // 84
      var error = new Error("Cannot find module '" + id + "'");            // 85
                                                                           // 86
      if (isFunction(fallback)) {                                          // 87
        return fallback(                                                   // 88
          id, // The missing module identifier.                            // 89
          file.m.id, // The path of the requiring file.                    // 90
          error // The error we would have thrown.                         // 91
        );                                                                 // 92
      }                                                                    // 93
                                                                           // 94
      throw error;                                                         // 95
    }                                                                      // 96
                                                                           // 97
    require.resolve = function (id) {                                      // 98
      var f = fileResolve(file, id);                                       // 99
      if (f) return f.m.id;                                                // 100
      var error = new Error("Cannot find module '" + id + "'");            // 101
      if (fallback && isFunction(fallback.resolve)) {                      // 102
        return fallback.resolve(id, file.m.id, error);                     // 103
      }                                                                    // 104
      throw error;                                                         // 105
    };                                                                     // 106
                                                                           // 107
    return require;                                                        // 108
  }                                                                        // 109
                                                                           // 110
  // File objects represent either directories or modules that have been   // 111
  // installed. When a `File` respresents a directory, its `.c` (contents)
  // property is an object containing the names of the files (or           // 113
  // directories) that it contains. When a `File` represents a module, its
  // `.c` property is a function that can be invoked with the appropriate  // 115
  // `(require, exports, module)` arguments to evaluate the module. If the
  // `.c` property is a string, that string will be resolved as a module   // 117
  // identifier, and the exports of the resulting module will provide the  // 118
  // exports of the original file. The `.p` (parent) property of a File is
  // either a directory `File` or `null`. Note that a child may claim      // 120
  // another `File` as its parent even if the parent does not have an      // 121
  // entry for that child in its `.c` object.  This is important for       // 122
  // implementing anonymous files, and preventing child modules from using
  // `../relative/identifier` syntax to examine unrelated modules.         // 124
  function File(name, parent) {                                            // 125
    var file = this;                                                       // 126
                                                                           // 127
    // Link to the parent file.                                            // 128
    file.p = parent = parent || null;                                      // 129
                                                                           // 130
    // The module object for this File, which will eventually boast an     // 131
    // .exports property when/if the file is evaluated.                    // 132
    file.m = new Module(name);                                             // 133
  }                                                                        // 134
                                                                           // 135
  function fileEvaluate(file, parentModule) {                              // 136
    var contents = file && file.c;                                         // 137
    var module = file.m;                                                   // 138
                                                                           // 139
    if (! hasOwn.call(module, "exports")) {                                // 140
      if (parentModule) {                                                  // 141
        module.parent = parentModule;                                      // 142
        var children = parentModule.children;                              // 143
        if (Array.isArray(children)) {                                     // 144
          children.push(module);                                           // 145
        }                                                                  // 146
      }                                                                    // 147
                                                                           // 148
      // If a Module.prototype.useNode method is defined, give it a chance
      // to define module.exports based on module.id using Node.           // 150
      if (! isFunction(module.useNode) ||                                  // 151
          ! module.useNode()) {                                            // 152
        contents(                                                          // 153
          module.require = module.require || makeRequire(file),            // 154
          module.exports = {},                                             // 155
          module,                                                          // 156
          file.m.id,                                                       // 157
          file.p.m.id                                                      // 158
        );                                                                 // 159
      }                                                                    // 160
                                                                           // 161
      module.loaded = true;                                                // 162
    }                                                                      // 163
                                                                           // 164
    if (isFunction(module.runModuleSetters)) {                             // 165
      module.runModuleSetters();                                           // 166
    }                                                                      // 167
                                                                           // 168
    return module.exports;                                                 // 169
  }                                                                        // 170
                                                                           // 171
  function fileIsDirectory(file) {                                         // 172
    return file && isObject(file.c);                                       // 173
  }                                                                        // 174
                                                                           // 175
  function fileMergeContents(file, contents, options) {                    // 176
    // If contents is an array of strings and functions, return the last   // 177
    // function with a `.d` property containing all the strings.           // 178
    if (Array.isArray(contents)) {                                         // 179
      var deps = [];                                                       // 180
                                                                           // 181
      contents.forEach(function (item) {                                   // 182
        if (isString(item)) {                                              // 183
          deps.push(item);                                                 // 184
        } else if (isFunction(item)) {                                     // 185
          contents = item;                                                 // 186
        }                                                                  // 187
      });                                                                  // 188
                                                                           // 189
      if (isFunction(contents)) {                                          // 190
        contents.d = deps;                                                 // 191
      } else {                                                             // 192
        // If the array did not contain a function, merge nothing.         // 193
        contents = null;                                                   // 194
      }                                                                    // 195
                                                                           // 196
    } else if (isFunction(contents)) {                                     // 197
      // If contents is already a function, make sure it has `.d`.         // 198
      contents.d = contents.d || [];                                       // 199
                                                                           // 200
    } else if (! isString(contents) &&                                     // 201
               ! isObject(contents)) {                                     // 202
      // If contents is neither an array nor a function nor a string nor   // 203
      // an object, just give up and merge nothing.                        // 204
      contents = null;                                                     // 205
    }                                                                      // 206
                                                                           // 207
    if (contents) {                                                        // 208
      file.c = file.c || (isObject(contents) ? {} : contents);             // 209
      if (isObject(contents) && fileIsDirectory(file)) {                   // 210
        Object.keys(contents).forEach(function (key) {                     // 211
          if (key === "..") {                                              // 212
            child = file.p;                                                // 213
                                                                           // 214
          } else {                                                         // 215
            var child = getOwn(file.c, key);                               // 216
            if (! child) {                                                 // 217
              child = file.c[key] = new File(                              // 218
                file.m.id.replace(/\/*$/, "/") + key,                      // 219
                file                                                       // 220
              );                                                           // 221
                                                                           // 222
              child.o = options;                                           // 223
            }                                                              // 224
          }                                                                // 225
                                                                           // 226
          fileMergeContents(child, contents[key], options);                // 227
        });                                                                // 228
      }                                                                    // 229
    }                                                                      // 230
  }                                                                        // 231
                                                                           // 232
  function fileGetExtensions(file) {                                       // 233
    return file.o && file.o.extensions || defaultExtensions;               // 234
  }                                                                        // 235
                                                                           // 236
  function fileAppendIdPart(file, part, extensions) {                      // 237
    // Always append relative to a directory.                              // 238
    while (file && ! fileIsDirectory(file)) {                              // 239
      file = file.p;                                                       // 240
    }                                                                      // 241
                                                                           // 242
    if (! file || ! part || part === ".") {                                // 243
      return file;                                                         // 244
    }                                                                      // 245
                                                                           // 246
    if (part === "..") {                                                   // 247
      return file.p;                                                       // 248
    }                                                                      // 249
                                                                           // 250
    var exactChild = getOwn(file.c, part);                                 // 251
                                                                           // 252
    // Only consider multiple file extensions if this part is the last     // 253
    // part of a module identifier and not equal to `.` or `..`, and there
    // was no exact match or the exact match was a directory.              // 255
    if (extensions && (! exactChild || fileIsDirectory(exactChild))) {     // 256
      for (var e = 0; e < extensions.length; ++e) {                        // 257
        var child = getOwn(file.c, part + extensions[e]);                  // 258
        if (child) {                                                       // 259
          return child;                                                    // 260
        }                                                                  // 261
      }                                                                    // 262
    }                                                                      // 263
                                                                           // 264
    return exactChild;                                                     // 265
  }                                                                        // 266
                                                                           // 267
  function fileAppendId(file, id, extensions) {                            // 268
    var parts = id.split("/");                                             // 269
                                                                           // 270
    // Use `Array.prototype.every` to terminate iteration early if         // 271
    // `fileAppendIdPart` returns a falsy value.                           // 272
    parts.every(function (part, i) {                                       // 273
      return file = i < parts.length - 1                                   // 274
        ? fileAppendIdPart(file, part)                                     // 275
        : fileAppendIdPart(file, part, extensions);                        // 276
    });                                                                    // 277
                                                                           // 278
    return file;                                                           // 279
  }                                                                        // 280
                                                                           // 281
  function fileResolve(file, id, seenDirFiles) {                           // 282
    var extensions = fileGetExtensions(file);                              // 283
                                                                           // 284
    file =                                                                 // 285
      // Absolute module identifiers (i.e. those that begin with a `/`     // 286
      // character) are interpreted relative to the root directory, which  // 287
      // is a slight deviation from Node, which has access to the entire   // 288
      // file system.                                                      // 289
      id.charAt(0) === "/" ? fileAppendId(root, id, extensions) :          // 290
      // Relative module identifiers are interpreted relative to the       // 291
      // current file, naturally.                                          // 292
      id.charAt(0) === "." ? fileAppendId(file, id, extensions) :          // 293
      // Top-level module identifiers are interpreted as referring to      // 294
      // packages in `node_modules` directories.                           // 295
      nodeModulesLookup(file, id, extensions);                             // 296
                                                                           // 297
    // If the identifier resolves to a directory, we use the same logic as
    // Node to find an `index.js` or `package.json` file to evaluate.      // 299
    while (fileIsDirectory(file)) {                                        // 300
      seenDirFiles = seenDirFiles || [];                                   // 301
                                                                           // 302
      // If the "main" field of a `package.json` file resolves to a        // 303
      // directory we've already considered, then we should not attempt to
      // read the same `package.json` file again. Using an array as a set  // 305
      // is acceptable here because the number of directories to consider  // 306
      // is rarely greater than 1 or 2. Also, using indexOf allows us to   // 307
      // store File objects instead of strings.                            // 308
      if (seenDirFiles.indexOf(file) < 0) {                                // 309
        seenDirFiles.push(file);                                           // 310
                                                                           // 311
        var pkgJsonFile = fileAppendIdPart(file, "package.json");          // 312
        var main = pkgJsonFile && fileEvaluate(pkgJsonFile).main;          // 313
        if (isString(main)) {                                              // 314
          // The "main" field of package.json does not have to begin with  // 315
          // ./ to be considered relative, so first we try simply          // 316
          // appending it to the directory path before falling back to a   // 317
          // full fileResolve, which might return a package from a         // 318
          // node_modules directory.                                       // 319
          file = fileAppendId(file, main, extensions) ||                   // 320
            fileResolve(file, main, seenDirFiles);                         // 321
                                                                           // 322
          if (file) {                                                      // 323
            // The fileAppendId call above may have returned a directory,  // 324
            // so continue the loop to make sure we resolve it to a        // 325
            // non-directory file.                                         // 326
            continue;                                                      // 327
          }                                                                // 328
        }                                                                  // 329
      }                                                                    // 330
                                                                           // 331
      // If we didn't find a `package.json` file, or it didn't have a      // 332
      // resolvable `.main` property, the only possibility left to         // 333
      // consider is that this directory contains an `index.js` module.    // 334
      // This assignment almost always terminates the while loop, because  // 335
      // there's very little chance `fileIsDirectory(file)` will be true   // 336
      // for the result of `fileAppendIdPart(file, "index.js")`. However,  // 337
      // in principle it is remotely possible that a file called           // 338
      // `index.js` could be a directory instead of a file.                // 339
      file = fileAppendIdPart(file, "index.js");                           // 340
    }                                                                      // 341
                                                                           // 342
    if (file && isString(file.c)) {                                        // 343
      file = fileResolve(file, file.c, seenDirFiles);                      // 344
    }                                                                      // 345
                                                                           // 346
    return file;                                                           // 347
  };                                                                       // 348
                                                                           // 349
  function nodeModulesLookup(file, id, extensions) {                       // 350
    if (isFunction(override)) {                                            // 351
      id = override(id, file.m.id);                                        // 352
    }                                                                      // 353
                                                                           // 354
    if (isString(id)) {                                                    // 355
      for (var resolved; file && ! resolved; file = file.p) {              // 356
        resolved = fileIsDirectory(file) &&                                // 357
          fileAppendId(file, "node_modules/" + id, extensions);            // 358
      }                                                                    // 359
                                                                           // 360
      return resolved;                                                     // 361
    }                                                                      // 362
  }                                                                        // 363
                                                                           // 364
  return install;                                                          // 365
};                                                                         // 366
                                                                           // 367
if (typeof exports === "object") {                                         // 368
  exports.makeInstaller = makeInstaller;                                   // 369
}                                                                          // 370
                                                                           // 371
/////////////////////////////////////////////////////////////////////////////







(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/modules-runtime/modules-runtime.js                             //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
var options = {};                                                          // 1
var hasOwn = options.hasOwnProperty;                                       // 2
                                                                           // 3
// RegExp matching strings that don't start with a `.` or a `/`.           // 4
var topLevelIdPattern = /^[^./]/;                                          // 5
                                                                           // 6
// This function will be called whenever a module identifier that hasn't   // 7
// been installed is required. For backwards compatibility, and so that we
// can require binary dependencies on the server, we implement the         // 9
// fallback in terms of Npm.require.                                       // 10
options.fallback = function (id, parentId, error) {                        // 11
  // For simplicity, we honor only top-level module identifiers here.      // 12
  // We could try to honor relative and absolute module identifiers by     // 13
  // somehow combining `id` with `dir`, but we'd have to be really careful
  // that the resulting modules were located in a known directory (not     // 15
  // some arbitrary location on the file system), and we only really need  // 16
  // the fallback for dependencies installed in node_modules directories.  // 17
  if (topLevelIdPattern.test(id)) {                                        // 18
    if (typeof Npm === "object" &&                                         // 19
        typeof Npm.require === "function") {                               // 20
      return Npm.require(id);                                              // 21
    }                                                                      // 22
  }                                                                        // 23
                                                                           // 24
  throw error;                                                             // 25
};                                                                         // 26
                                                                           // 27
options.fallback.resolve = function (id, parentId, error) {                // 28
  if (Meteor.isServer &&                                                   // 29
      topLevelIdPattern.test(id)) {                                        // 30
    // Allow any top-level identifier to resolve to itself on the server,  // 31
    // so that options.fallback can have a chance to handle it.            // 32
    return id;                                                             // 33
  }                                                                        // 34
                                                                           // 35
  throw error;                                                             // 36
};                                                                         // 37
                                                                           // 38
meteorInstall = makeInstaller(options);                                    // 39
var Mp = meteorInstall.Module.prototype;                                   // 40
                                                                           // 41
if (Meteor.isServer) {                                                     // 42
  Mp.useNode = function () {                                               // 43
    if (typeof npmRequire !== "function") {                                // 44
      // Can't use Node if npmRequire is not defined.                      // 45
      return false;                                                        // 46
    }                                                                      // 47
                                                                           // 48
    var parts = this.id.split("/");                                        // 49
    var start = 0;                                                         // 50
    if (parts[start] === "") ++start;                                      // 51
    if (parts[start] === "node_modules" &&                                 // 52
        parts[start + 1] === "meteor") {                                   // 53
      start += 2;                                                          // 54
    }                                                                      // 55
                                                                           // 56
    if (parts.indexOf("node_modules", start) < 0) {                        // 57
      // Don't try to use Node for modules that aren't in node_modules     // 58
      // directories.                                                      // 59
      return false;                                                        // 60
    }                                                                      // 61
                                                                           // 62
    try {                                                                  // 63
      npmRequire.resolve(this.id);                                         // 64
    } catch (e) {                                                          // 65
      return false;                                                        // 66
    }                                                                      // 67
                                                                           // 68
    this.exports = npmRequire(this.id);                                    // 69
                                                                           // 70
    return true;                                                           // 71
  };                                                                       // 72
}                                                                          // 73
                                                                           // 74
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['modules-runtime'] = {}, {
  meteorInstall: meteorInstall
});

})();

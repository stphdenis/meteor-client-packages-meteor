'use strict';

const fs = require('fs-extra');
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('clean-meteor-project', function() {
  fs.removeSync('./__meteor__');
});

gulp.task('clean-meteor-output', function() {
  fs.removeSync('./__output__');
});

gulp.task('clean-modules', function() {
  let files = fs.readdirSync('.');
  files.forEach(function(file) {
    const filePath = './' + file;
    if (fs.statSync(filePath).isDirectory() &&
      file !== 'node_modules' &&
      file.startsWith('.') === false &&
      file.startsWith('_') === false
    ) {
      fs.removeSync(filePath);
    }
  });
  fs.removeSync('./__lib__');
});

gulp.task('clean-all', function(callback) {
  return runSequence(
    'clean-meteor-project',
    'clean-meteor-output',
    'clean-modules',
    callback
  );
});


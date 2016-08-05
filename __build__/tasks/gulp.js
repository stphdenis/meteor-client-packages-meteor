'use strict';

require('./clean');
require('./build');

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  return runSequence(
    'clean-all',
    'create-all',
    callback
  );
});

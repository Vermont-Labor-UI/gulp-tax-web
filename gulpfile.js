/// <binding />
"use strict";
var gulp = require("gulp");

var requireDir = require('require-dir')('node_modules/gulp-ius-web');
var requireDir = require('require-dir')('node_modules/gulp-appsettings');

// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js','copyfonts', 'copyimages']);

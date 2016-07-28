/// <binding />
"use strict";
var gulp = require("gulp");
var requireDir = require('require-dir');
var path = require('path');

var iusPath = path.join(process.cwd(), 'node_modules/gulp-ius-web');
var ius = requireDir(iusPath);

var appSettingsPath = path.join(process.cwd(), 'node_modules/gulp-appsettings');
var appSettings = requireDir(appSettingsPath);

// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("build", ['clean', 'sass', 'concat', 'minify:css', 'uglify:js', 'copyfonts', 'copyimages']);
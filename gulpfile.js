/// <binding />
"use strict";
var gulp = require("gulp");
var fileExists = require('file-exists');


if(fileExists("gulp-ius-web/gulpfile.js"))
    require('require-dir')('gulp-ius-web');
else if (fileExists("node_modules/gulp-ius-web/gulpfile.js"))
    require('require-dir')('node_modules/gulp-ius-web');
else
    console.log("Error loading gulp-ius-web package");

if(fileExists("gulp-appsettings/gulpfile.js"))
    require('require-dir')('gulp-appsettings');
else if(fileExists("node_modules/gulp-appsettings/gulpfile.js"))
    require('require-dir')('node_modules/gulp-appsettings');
else
    console.log("Error loading gulp-appsettings package");  

// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js','copyfonts', 'copyimages']);

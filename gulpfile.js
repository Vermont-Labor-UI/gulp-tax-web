/// <binding />
"use strict";
var gulp = require("gulp");

fs.stat('gulp-ius-web', function(err,stat){
    if(err == null)
        require('require-dir')('gulp-ius-web');
});

fs.stat('node_modules/gulp-ius-web', function(err,stat){
    if(err == null)
        require('require-dir')('node_modules/gulp-ius-web');
});

fs.stat('gulp-appsettings', function(err,stat){
    if(err == null)
        require('require-dir')('gulp-appsettings');
});

fs.stat('node_modules/gulp-appsettings', function(err,stat){
    if(err == null)
        require('require-dir')('node/modules/gulp-appsettings');
});


// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js','copyfonts', 'copyimages']);

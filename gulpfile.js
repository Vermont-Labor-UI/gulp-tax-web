/// <binding />
"use strict";
var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var bower = require('gulp-bower');
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var debug = require('gulp-debug');

// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("clean", ["clean:app", "clean:js", "clean:css"]);

gulp.task('clean:app', function () {
    return gulp.src('./wwwroot/app')
        .pipe(clean());
});

gulp.task("clean:js", function () {
    return gulp.src('./wwwroot/js/*.js')
        .pipe(clean());
});

gulp.task("clean:css", function () {
    return gulp.src("./wwwroot/css/*.css")
        .pipe(clean());
});

gulp.task("clean:bower", function () {
    return gulp.src('./' + BOWER_COMPONENTS + '')
        .pipe(clean());
});

gulp.task("concat", ["concat:js", "concat:css"]);


gulp.task('concat:js', ['typescript'], function () {
    return gulp.src([
            './' + BOWER_COMPONENTS + '/jquery/dist/jquery.js',
            './' + BOWER_COMPONENTS + '/jquery-ui/jquery-ui.js',
            './' + BOWER_COMPONENTS + '/jquery-validation/dist/jquery.validate.js',
            './' + BOWER_COMPONENTS + '/jquery-validation/dist/additional-methods.js',
            './' + BOWER_COMPONENTS + '/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
            './' + BOWER_COMPONENTS + '/datatables/media/js/dataTables.js',
            './' + BOWER_COMPONENTS + '/system.js/dist/system.js',
            './wwwroot/app/iUS.UX/*.js'
    ])
    .pipe(debug())
        .pipe(concat(OUTPUT_FILE_NAME + '.js'))
        .pipe(gulp.dest('./wwwroot/js/'));
});

gulp.task('concat:css', ['sass'], function () {
    return gulp.src([
            './' + BOWER_COMPONENTS + '/pure/pure.css',
            './' + BOWER_COMPONENTS + '/pure/grids-responsive.css',
            './' + BOWER_COMPONENTS + '/iUS.UX/fonts/icomoon/style.css',
            './' + BOWER_COMPONENTS + '/iUS.UX/css/external/jquery-ui.css',
            './' + BOWER_COMPONENTS + '/iUS.UX/css/external/jquery-ui.theme.css',
            './wwwroot/app/css/ius.css'
    ])
        .pipe(concat(OUTPUT_FILE_NAME + '.css'))
        .pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('uglify:js', ['concat:js'], function () {
    return gulp.src('./wwwroot/js/*.js')
        .pipe(debug())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./wwwroot/js/'));
});

gulp.task('sass', ['sass:ius']);

gulp.task('sass:ius', function () {
    return gulp.src('./' + BOWER_COMPONENTS + '/iUs.UX/scss/ius.scss')
        .pipe(sass())
        .pipe(rename("ius.css"))
        .pipe(gulp.dest('./wwwroot/app/css'));
});

gulp.task('typescript', ['typescript:ius']);

gulp.task('typescript:ius', function () {
    return gulp.src(['./' + BOWER_COMPONENTS + '/iUS.UX/typescript/**/*.ts'])
        .pipe(ts({
            noExternalResolve: false
        }))
        .pipe(gulp.dest('./wwwroot/app/iUS.UX'));
});

gulp.task('copyfonts', function () {
    return gulp.src(['./wwwroot/lib/iUS.UX/fonts/icomoon/fonts/*'])
      .pipe(gulp.dest('./wwwroot/css/fonts/'));
});

gulp.task('copyimages', function () {
    return gulp.src(['./wwwroot/lib/iUS.UX/images/*'])
      .pipe(gulp.dest('./wwwroot/images/'));
});

gulp.task('appsettings', function() {
        return gulp.src(['./' + BOWER_COMPONENTS + '/iUS.AppSettings/*.json'])
            .pipe(debug())
            .pipe(gulp.dest('./Configuration/'));
});

gulp.task('watch', function () {
    gulp.watch('./wwwroot/**/*.ts', ['typescript']);
    gulp.watch('./wwwroot/**/*.scss', ['sass']);
});

gulp.task('bower', function () {
    return bower();
});

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js','copyfonts', 'copyimages']);

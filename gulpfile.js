var gulp = require('gulp'),
    consolidate = require('gulp-consolidate'),
    iconfont = require('gulp-iconfont'),
    argv = require('yargs').argv,
    rename = require("gulp-rename");

var path_svg = 'svg';
var fontname = 'Geostart-Regular;

if(argv.path){
  path_svg = argv.path;
}
if(argv.fontname){
  fontname = argv.fontname;
}

gulp.task('iconfont', function () {
   return gulp.src('iconfont-src/'+path_svg+'/*.svg')
        .pipe(iconfont({
            fontName: fontname,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            appendCodepoints: true,
            fixedWidth: false,
            appendUnicode: false,
            startUnicode: 0x0020,
            normalize: true,
            fontHeight: 1000,
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src('iconfont-src/iconfont.css')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(rename(fontname+'.css'))
                .pipe(gulp.dest('iconfont'));

            gulp.src('iconfont-src/index.html')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName
                }))
                .pipe(gulp.dest('iconfont'));
        })
        .pipe(gulp.dest('iconfont'));
});

gulp.task('default', ['iconfont'], function() {
  // place code for your default task here
});

const { src, dest, watch, series, parallel } = require ('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function browsersync(){
	browserSync.init({
		server: { baseDir: 'app/'}
	})
}

function scripts(){
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'app/js/app.js',
		])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}

function startwatch(){
	watch(['app/**/*.html', 'app/**/*.js', '!app/**/*.min.js'], scripts)
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.default = parallel(scripts, browsersync, startwatch);
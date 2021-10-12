const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const path = require('path');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const stripdebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

// load paths
const paths = {
	"src": "./src/",
	"dist": "./dist/",

	"scripts": {
		"src": "javascript/",
		"filter": "**/*.+(js)",
		"dist": "javascript/"
	}
};

const scriptFiles = {
	"form-validation.js": [
		"node_modules/formbouncerjs/src/js/bouncer/_classList.polyfill.js",
		"node_modules/formbouncerjs/src/js/bouncer/_closest.polyfill.js",
		"node_modules/formbouncerjs/src/js/bouncer/_customEvent.polyfill.js",
		"node_modules/formbouncerjs/src/js/bouncer/_matches.polyfill.js",
		"node_modules/formbouncerjs/src/js/bouncer/bouncer.js",
		"src/javascript/validation-init.js"
	]
}

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

const autoprefixerOptions = {
    browserlist: ['last 2 versions', '> 1%', 'IE >= 9'],
    cascade: false,
    supports: false
};

function scripts(cb) {
	var scriptNames = Object.keys(scriptFiles);
	scriptNames.forEach(function(scriptName) {
		src(
                scriptFiles[scriptName],
                {
                    cwd: path.join(process.cwd(), './'),
                    nosort: true
                }
            )
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(concat(scriptName))
            .pipe(stripdebug())
            .pipe(uglify({
				mangle: false, 
				compress: false
			}))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(paths.dist + paths.scripts.dist));
	});
	cb();
}

function cleanScripts(cb) {
	del([
		paths.dist + paths.scripts.dist + "*.(js|map)"
	]);
	cb();
}

function watchAll() {
	// watch for script changes
	watch(paths.src + paths.scripts.src + paths.scripts.filter, series(cleanScripts, scripts));
}

function onError(err) {
    console.log(err);
}

exports.build = series(
	parallel(
		cleanScripts
	),
	parallel(
		scripts
	)
);

exports.default = series(
	parallel(
		cleanScripts
	),
	parallel(
		scripts
	),
	watchAll
);

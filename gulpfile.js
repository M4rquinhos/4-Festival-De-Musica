const { src, dest, watch, parallel }  = require('gulp');

// css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js');

function css(callback) {
    src('src/scss/**/*.scss') // Identidficar el archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) // Compilar el archivo SASS
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') ); // Almacenar en el disco duro
    
    callback(); //callback avisa cuando se llega al final de la tarea
}

// Convertir imagenes 

function imagenes(callback) {
    const opciones = {
        optimizationLevel: 3,
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));
    callback();
}

function versionWebp(callback) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones))
        .pipe(dest('build/img'));
    callback();
}

function versionAvif(callback) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe( avif(opciones))
        .pipe(dest('build/img'));
    callback();
}


function javascript(callback) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    callback();
}


function dev(callback) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    callback();
}


// npx gulp "nombre" lo que esta en el archivo gulpfile.js
// npm run  "nombre" lo que esta en el archivo package.json


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);




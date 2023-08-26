const { src, dest, watch, series, parallel} = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    //Compilar sass
    // Pasos: 1._ Identificar archivo, 2._ Compilarla, 3._ Guardar el .css

    src('src/scss/app.scss')
        .pipe( sourcemaps.init)
        .pipe( sass(  ) )
        .pipe( postcss( [autoprefixer()]))
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') )
    
    done();
}

function imagenes(done) {
     src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }))
        .pipe( dest('build/img'))

    done();
}

function imgWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
}

function imgAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
}

function dev() {
    watch( 'src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}



exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;
exports.default = series(imagenes, imgWebp, imgAvif, css, dev);

// series- Se inicia la tarea, y hasta que finaliza, inicia la siguiente tarea
// parallel- Todas inician al mismo tiempo 
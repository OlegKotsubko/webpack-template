const { src, dest, parallel } = require('gulp');
const svgMin = require('gulp-svgmin');
const svgStore = require('gulp-svgstore');
const rename = require('gulp-rename');
const cheerio = require('cheerio');
const gulpCheerio = require('gulp-cheerio');
const through2 = require('through2');
const consolidate = require('gulp-consolidate');
const webp = require('gulp-webp');

function convertWebP() {
  return src('src/images/**/*.png')
    .pipe(webp())
    .pipe(dest('src/images/'))
}

function sprite() {
  return src('src/icons/*.svg')
    .pipe(
      gulpCheerio({
        run($) {
          $('[fill]:not([fill="currentColor"])').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          let w; let h; let size;
          const $svg = $('svg');
          if($svg.attr('height')){
            w = $svg.attr('width').replace(/\D/g,'');
            h = $svg.attr('height').replace(/\D/g,'');
          } else {
            size = $svg.attr('viewbox').split(' ').splice(2);
            w = size[0];
            h = size[1];
            $svg.attr('width', parseInt(w));
            $svg.attr('height', parseInt(h));
          }
          $svg.attr('viewBox', `0 0 ${  parseInt(w)  } ${  parseInt(h)}`);
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(svgMin({
      js2svg: {
        pretty: true
      },
      plugins: [{
        removeDesc: true
      }, {
        cleanupIDs: true
      }, {
        removeViewBox: false
      }, {
        mergePaths: false
      }]
    }))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(through2.obj(function (file, encoding, cb) {
      const $ = cheerio.load(file.contents.toString(), {xmlMode: true});
      const data = $('svg > symbol').map(function() {
        const $this  = $(this);
        const size   = $this.attr('viewBox').split(' ').splice(2);
        const name   = $this.attr('id');
        const ratio  = size[0] / size[1]; // symbol width / symbol height
        const fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
        const stroke = $this.find('[stroke]').attr('stroke');

        return {
          name,
          ratio: +ratio.toFixed(2),
          fill: fill || 'currentColor',
          stroke: stroke || 'currentColor'
        };
      }).get();
      this.push(file);
      src('src/scss/generated/sprite-svg/_sprite-svg.scss')
        .pipe(consolidate('lodash', {
          symbols: data
        }))
        .pipe(dest('src/scss/generated'))
      ;
      cb();
    }))

    .pipe(rename({ basename: 'sprite' }))
    .pipe(dest('src/pug/sprite'))
}

exports.default = parallel(sprite);
exports.webp = parallel(convertWebP)

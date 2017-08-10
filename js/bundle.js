'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  var menu = $('.selector'),
      heightPH = $('#everything'),
      aPIKey = 'ea94cfe26458489e895da92d99390de0';

  var artTitle = void 0,
      artItems = void 0,
      artCapt = void 0,
      artUrl = void 0,
      author = void 0,
      director = void 0,
      artList = void 0,
      artDescript = void 0,
      $artList = $('.articles'),
      nYTUrl = void 0,
      arrImg = '',
      artImg = [],
      oldHeight = heightPH.height,
      clickCount = 0;

  function loading() {
    $('.load').toggleClass('loaded');
    $('.load-screen').toggleClass('loaded-screen');
    $('.load-wrapper').toggleClass('loaded-wrapper');
  }

  loading();

  menu.change(function (event) {
    event.preventDefault();

    loading();

    var selected = $('.selector').val();

    if (clickCount === 0 && selected !== '--top stories--' && selected !== '--selection--') {

      clickCount++;
      $('.container').toggleClass('container-move');
      $('.logo-container').toggleClass('logo-container-move');
      $('.logo').toggleClass('logo-move');
      $('.form-container').toggleClass('form-container-move');
      $('.instructions').toggleClass('instructions-move');
      $('.art-type').toggleClass('art-type-move');
    } //  close if statement for selection animation

    $artList.empty();
    artList, artItems = '';

    if (selected === 'books') {
      //alert( 'books has been clicked and listened too' );
      nYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
      nYTUrl += '?' + $.param({
        'api-key': aPIKey
      }); // close parameters declaration
    } // close books if statement

    else if (selected === 'movies') {
        //alert( 'movies has been clicked and listened too');
        nYTUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';
        nYTUrl += '?' + $.param({
          'api-key': aPIKey
        }); // close parameters
      } //  close movies if statement

      else {

          nYTUrl = 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json';
          nYTUrl += '?' + $.param({
            'api-key': aPIKey
          }); // close parameters declaration
        } //  close top stories if statement

    $.ajax({
      method: 'GET',
      url: nYTUrl,
      dataType: 'json'
    }) // close ajax declaration

    .done(function (data) {
      var artData = '',
          filterData = '',
          artData2 = [],
          i = 0;

      artImg = '';

      artData = data.results;

      $.each(artData, function (key, value) {
        if (selected != 'books' && selected != 'movies' && selected != '--top stories--' && selected != '--sections--') {

          artImg = value.multimedia;

          if (artImg.length > 1) {
            artData2.push(data.results[i]);
            artData = artData2.slice(0, 12);
            i++;
          } else {
            i++;
          }
        } // close set top stories variables IF statement

        else if (selected === 'books') {

            artDescript = value.description;

            if (!!artDescript && (typeof artDescript === 'undefined' ? 'undefined' : _typeof(artDescript)) != undefined) {
              artData2.push(data.results[i]);
              artData = artData2.slice(0, 12);
              i++;
            } else {
              i++;
            }
          } //  close set books variables IF statement

          else if (selected === 'movies') {

              artImg = value.multimedia;

              if (!!artImg && (typeof artImg === 'undefined' ? 'undefined' : _typeof(artImg)) === 'object') {
                artData2.push(data.results[i]);
                artData = artData2.slice(0, 12);
                i++;
              } else {
                i++;
              }
            } //  close set movies variables IF statement
      });
      $.each(artData, function (key, value) {
        if (selected != 'books' && selected != 'movies' && selected != '--top stories--' && selected != '--sections--') {
          artImg = value.multimedia[4].url;
          artUrl = '<a href="' + value.url + '" target="_blank"><img src="' + artImg + '"></a>';
          artCapt = '<div class="caption">\n          <p class="text">' + value.abstract + '</p>\n        </div>';
          artItems += '<li>\n          <div class="art-container">\n            ' + artUrl + '\n            ' + artCapt + '\n          </div>\n        </li>';
        } //  close top stories else statement

        else if (selected === 'movies') {
            artImg = '<img src="' + value.multimedia.src + '">';
            artUrl = '<a href="' + value.link.url + '"target="_blank">' + artImg + '</a>';
            artCapt = '<div class="caption">\n          <p class="text">' + value.summary_short + '"</p>\n        </div>';
            artItems += '<li>\n          <div class="art-container">\n            ' + artUrl + '\n            ' + artCapt + '\n          </div>\n        </li>';
          } // close movies if statement

          else if (selected === 'books') {
              var _author = '<h3 class="author">"' + value.author + '"</h3></div>';
              var arrUrl = '';
              arrUrl = value.sunday_review_link;
              artUrl = '<a href="' + arrUrl + '" target="_blank">';
              artTitle = '<div class=words>\n          <h2 class="title">' + artUrl + value.title + '</a></h2>';
              artCapt = '<div class="caption">\n          <p class="text">' + value.description + '</p>\n        </div>';
              artItems += '<li>\n          <div class="art-container">\n            ' + artTitle + '\n            ' + _author + '\n            ' + artCapt + '\n          </div>\n        </li>';
            } //  close book reviews if statement
      }); // close .each
      $artList.append(artItems);
      var mediaHeight = $('.media-container').height,
          newHeight = oldHeight + mediaHeight;
      heightPH.style.height = newHeight;
    }) // close .done
    .fail(function () {
      alert('failure to load.  Please try again.');
      location.reload();
    }).always(loading());
  });

  $(document).ready();

  /***/
}]
/******/);
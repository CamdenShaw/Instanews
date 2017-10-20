/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    oldHeight = heightPH,
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
        artUrl = '<a href="' + value.url + '" target="_blank"><div class="article-image" style="background:url(' + artImg + ') center; background-size: cover;"></div></a>';
        artCapt = '<div class="caption">\n    <p class="text">' + value.abstract + '</p>\n  </div>';
        artItems += '<li>\n    <div class="art-container">\n      ' + artUrl + '\n      ' + artCapt + '\n    </div>\n  </li>';
      } //  close top stories else statement

      else if (selected === 'movies') {
          artImg = '<img src="' + value.multimedia.src + '">';
          artUrl = '<a href="' + value.link.url + '"target="_blank">' + artImg + '</a>';
          artCapt = '<div class="caption">\n    <p class="text">' + value.summary_short + '"</p>\n  </div>';
          artItems += '<li>\n    <div class="art-container">\n      ' + artUrl + '\n      ' + artCapt + '\n    </div>\n  </li>';
        } // close movies if statement

        else if (selected === 'books') {
            var _author = '<h3 class="author">"' + value.author + '"</h3></div>';
            var arrUrl = '';
            arrUrl = value.sunday_review_link;
            artUrl = '<a href="' + arrUrl + '" target="_blank">';
            artTitle = '<div class=words>\n    <h2 class="title">' + artUrl + value.title + '</a></h2>';
            artCapt = '<div class="caption">\n    <p class="text">' + value.description + '</p>\n  </div>';
            artItems += '<li>\n    <div class="art-container">\n      ' + artTitle + '\n      ' + _author + '\n      ' + artCapt + '\n    </div>\n  </li>';
          } //  close book reviews if statement
    }); // close .each
    $artList.append(artItems);
    var mediaHeight = $('.media-container'),
        newHeight = oldHeight + mediaHeight;
    heightPH.style = newHeight;
  }) // close .done
  .fail(function () {
    alert('failure to load.  Please try again.');
    location.reload();
  }).always(loading());
});

$(document).ready();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2E3ZTI0ODg3YjRlNGZlYzMyYjgiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2N1cC1hLWpvZS5qcyJdLCJuYW1lcyI6WyJtZW51IiwiJCIsImhlaWdodFBIIiwiYVBJS2V5IiwiYXJ0VGl0bGUiLCJhcnRJdGVtcyIsImFydENhcHQiLCJhcnRVcmwiLCJhdXRob3IiLCJkaXJlY3RvciIsImFydExpc3QiLCJhcnREZXNjcmlwdCIsIiRhcnRMaXN0IiwibllUVXJsIiwiYXJySW1nIiwiYXJ0SW1nIiwib2xkSGVpZ2h0IiwiY2xpY2tDb3VudCIsImxvYWRpbmciLCJ0b2dnbGVDbGFzcyIsImNoYW5nZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZWxlY3RlZCIsInZhbCIsImVtcHR5IiwicGFyYW0iLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YVR5cGUiLCJkb25lIiwiZGF0YSIsImFydERhdGEiLCJmaWx0ZXJEYXRhIiwiYXJ0RGF0YTIiLCJpIiwicmVzdWx0cyIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsIm11bHRpbWVkaWEiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJkZXNjcmlwdGlvbiIsInVuZGVmaW5lZCIsImFic3RyYWN0Iiwic3JjIiwibGluayIsInN1bW1hcnlfc2hvcnQiLCJhcnJVcmwiLCJzdW5kYXlfcmV2aWV3X2xpbmsiLCJ0aXRsZSIsImFwcGVuZCIsIm1lZGlhSGVpZ2h0IiwibmV3SGVpZ2h0Iiwic3R5bGUiLCJmYWlsIiwiYWxlcnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsImFsd2F5cyIsImRvY3VtZW50IiwicmVhZHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNB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c0VBQ29Ca0MsTUFBTUssV0FEMUI7QUFHQXhDLDBFQUVNRCxRQUZOLGdCQUdNSSxPQUhOLGdCQUlNRixPQUpOO0FBT0QsV0E5QytCLENBOEM5QjtBQUNELEtBL0NELEVBdERvQixDQXFHaEI7QUFDSk0sYUFBUzBDLE1BQVQsQ0FBZ0JqRCxRQUFoQjtBQUNBLFFBQUlrRCxjQUFjdEQsRUFBRSxrQkFBRixDQUFsQjtBQUFBLFFBQ0V1RCxZQUFZeEMsWUFBWXVDLFdBRDFCO0FBRUFyRCxhQUFTdUQsS0FBVCxHQUFpQkQsU0FBakI7QUFDQyxHQWhIRCxFQWdIRztBQWhISCxHQWlIQ0UsSUFqSEQsQ0FpSE8sWUFBVTtBQUNqQkMsVUFBTSxxQ0FBTjtBQUNBQyxhQUFTQyxNQUFUO0FBQ0MsR0FwSEQsRUFxSENDLE1BckhELENBcUhRNUMsU0FySFI7QUFzSEMsQ0FuS0Q7O0FBcUtBakIsRUFBRThELFFBQUYsRUFBWUMsS0FBWixHIiwiZmlsZSI6Ii4vanMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2E3ZTI0ODg3YjRlNGZlYzMyYjgiLCJjb25zdCBtZW51ID0gJCgnLnNlbGVjdG9yJyksXG5oZWlnaHRQSCA9ICQoJyNldmVyeXRoaW5nJyksXG5hUElLZXkgPSAnZWE5NGNmZTI2NDU4NDg5ZTg5NWRhOTJkOTkzOTBkZTAnO1xuXG5sZXQgYXJ0VGl0bGUsIGFydEl0ZW1zLCBhcnRDYXB0LCBhcnRVcmwsIGF1dGhvciwgZGlyZWN0b3IsIGFydExpc3QsIGFydERlc2NyaXB0LCAkYXJ0TGlzdCA9ICQoJy5hcnRpY2xlcycpLFxubllUVXJsLCBhcnJJbWcgPSAnJyxcbmFydEltZyA9IFtdLFxub2xkSGVpZ2h0ID0gaGVpZ2h0UEgsXG5jbGlja0NvdW50ID0gMDtcblxuZnVuY3Rpb24gbG9hZGluZygpIHtcbiQoJy5sb2FkJykudG9nZ2xlQ2xhc3MoJ2xvYWRlZCcpO1xuJCgnLmxvYWQtc2NyZWVuJykudG9nZ2xlQ2xhc3MoJ2xvYWRlZC1zY3JlZW4nKTtcbiQoJy5sb2FkLXdyYXBwZXInKS50b2dnbGVDbGFzcygnbG9hZGVkLXdyYXBwZXInKTtcbn1cblxubG9hZGluZygpO1xuXG5tZW51LmNoYW5nZSgoZXZlbnQpID0+IHtcbmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbmxvYWRpbmcoKTtcblxubGV0IHNlbGVjdGVkID0gJCgnLnNlbGVjdG9yJykudmFsKCk7XG5cbmlmIChjbGlja0NvdW50ID09PSAwICYmIHNlbGVjdGVkICE9PSAnLS10b3Agc3Rvcmllcy0tJyAmJiBzZWxlY3RlZCAhPT0gJy0tc2VsZWN0aW9uLS0nKXtcblxuY2xpY2tDb3VudCsrO1xuJCgnLmNvbnRhaW5lcicpLnRvZ2dsZUNsYXNzKCdjb250YWluZXItbW92ZScpO1xuJCgnLmxvZ28tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2xvZ28tY29udGFpbmVyLW1vdmUnKTtcbiQoJy5sb2dvJykudG9nZ2xlQ2xhc3MoJ2xvZ28tbW92ZScpO1xuJCgnLmZvcm0tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2Zvcm0tY29udGFpbmVyLW1vdmUnKTtcbiQoJy5pbnN0cnVjdGlvbnMnKS50b2dnbGVDbGFzcygnaW5zdHJ1Y3Rpb25zLW1vdmUnKTtcbiQoJy5hcnQtdHlwZScpLnRvZ2dsZUNsYXNzKCdhcnQtdHlwZS1tb3ZlJyk7XG59IC8vICBjbG9zZSBpZiBzdGF0ZW1lbnQgZm9yIHNlbGVjdGlvbiBhbmltYXRpb25cblxuJGFydExpc3QuZW1wdHkoKTtcbmFydExpc3QsIGFydEl0ZW1zID0gJyc7XG5cbmlmIChzZWxlY3RlZCA9PT0gJ2Jvb2tzJykge1xuLy9hbGVydCggJ2Jvb2tzIGhhcyBiZWVuIGNsaWNrZWQgYW5kIGxpc3RlbmVkIHRvbycgKTtcbm5ZVFVybCA9ICdodHRwczovL2FwaS5ueXRpbWVzLmNvbS9zdmMvYm9va3MvdjMvbGlzdHMvYmVzdC1zZWxsZXJzL2hpc3RvcnkuanNvbic7XG5uWVRVcmwgKz0gJz8nICsgJC5wYXJhbSh7XG4nYXBpLWtleSc6IGFQSUtleVxufSk7IC8vIGNsb3NlIHBhcmFtZXRlcnMgZGVjbGFyYXRpb25cbn0vLyBjbG9zZSBib29rcyBpZiBzdGF0ZW1lbnRcblxuZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdtb3ZpZXMnKSB7XG4vL2FsZXJ0KCAnbW92aWVzIGhhcyBiZWVuIGNsaWNrZWQgYW5kIGxpc3RlbmVkIHRvbycpO1xubllUVXJsID0gJ2h0dHBzOi8vYXBpLm55dGltZXMuY29tL3N2Yy9tb3ZpZXMvdjIvcmV2aWV3cy9zZWFyY2guanNvbic7XG5uWVRVcmwgKz0gJz8nICsgJC5wYXJhbSh7XG4nYXBpLWtleSc6IGFQSUtleVxufSk7IC8vIGNsb3NlIHBhcmFtZXRlcnNcbn0gLy8gIGNsb3NlIG1vdmllcyBpZiBzdGF0ZW1lbnRcblxuZWxzZSB7XG5cbm5ZVFVybCA9ICdodHRwczovL2FwaS5ueXRpbWVzLmNvbS9zdmMvdG9wc3Rvcmllcy92Mi8nICsgc2VsZWN0ZWQgKyAnLmpzb24nO1xubllUVXJsICs9ICc/JyArICQucGFyYW0oe1xuJ2FwaS1rZXknOiBhUElLZXlcbn0pOyAvLyBjbG9zZSBwYXJhbWV0ZXJzIGRlY2xhcmF0aW9uXG59IC8vICBjbG9zZSB0b3Agc3RvcmllcyBpZiBzdGF0ZW1lbnRcblxuJC5hamF4KHtcbm1ldGhvZDogJ0dFVCcsXG51cmw6IG5ZVFVybCxcbmRhdGFUeXBlOiAnanNvbidcbn0pIC8vIGNsb3NlIGFqYXggZGVjbGFyYXRpb25cblxuLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG5sZXQgYXJ0RGF0YSA9ICcnLFxuICBmaWx0ZXJEYXRhID0gJycsXG4gIGFydERhdGEyID0gW10sXG4gIGk9MDtcblxuYXJ0SW1nID0gJyc7XG5cbmFydERhdGEgPSBkYXRhLnJlc3VsdHM7XG5cbiQuZWFjaChhcnREYXRhLCAoa2V5LCB2YWx1ZSkgPT4ge1xuaWYoc2VsZWN0ZWQgIT0gJ2Jvb2tzJyAmJiBzZWxlY3RlZCAhPSAnbW92aWVzJyAmJiBzZWxlY3RlZCAhPSAnLS10b3Agc3Rvcmllcy0tJyAmJiBzZWxlY3RlZCAhPSAnLS1zZWN0aW9ucy0tJyl7XG5cbmFydEltZyA9IHZhbHVlLm11bHRpbWVkaWE7XG5cbmlmIChhcnRJbWcubGVuZ3RoID4gMSl7XG4gIGFydERhdGEyLnB1c2goZGF0YS5yZXN1bHRzW2ldKTtcbiAgYXJ0RGF0YSA9IGFydERhdGEyLnNsaWNlKDAsIDEyKTtcbiAgaSsrO1xufVxuZWxzZSB7XG4gIGkrKztcbn1cbn0gLy8gY2xvc2Ugc2V0IHRvcCBzdG9yaWVzIHZhcmlhYmxlcyBJRiBzdGF0ZW1lbnRcblxuZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdib29rcycpe1xuXG5hcnREZXNjcmlwdCA9IHZhbHVlLmRlc2NyaXB0aW9uO1xuXG5pZiAoISFhcnREZXNjcmlwdCAmJiB0eXBlb2YgYXJ0RGVzY3JpcHQgIT0gdW5kZWZpbmVkKXtcbiAgYXJ0RGF0YTIucHVzaChkYXRhLnJlc3VsdHNbaV0pO1xuICBhcnREYXRhID0gYXJ0RGF0YTIuc2xpY2UoMCwgMTIpO1xuICBpKys7XG59XG5lbHNlIHtcbiAgaSsrO1xufVxufSAvLyAgY2xvc2Ugc2V0IGJvb2tzIHZhcmlhYmxlcyBJRiBzdGF0ZW1lbnRcblxuZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdtb3ZpZXMnKXtcblxuYXJ0SW1nID0gdmFsdWUubXVsdGltZWRpYTtcblxuaWYgKCEhYXJ0SW1nICYmIHR5cGVvZiBhcnRJbWcgPT09ICdvYmplY3QnKXtcbiAgYXJ0RGF0YTIucHVzaChkYXRhLnJlc3VsdHNbaV0pO1xuICBhcnREYXRhID0gYXJ0RGF0YTIuc2xpY2UoMCwgMTIpO1xuICBpKys7XG59XG5lbHNlIHtcbiAgaSsrO1xufVxufSAvLyAgY2xvc2Ugc2V0IG1vdmllcyB2YXJpYWJsZXMgSUYgc3RhdGVtZW50XG5cbn0pXG4kLmVhY2goYXJ0RGF0YSwgKGtleSwgdmFsdWUpID0+IHtcbmlmIChzZWxlY3RlZCAhPSAnYm9va3MnICYmIHNlbGVjdGVkICE9ICdtb3ZpZXMnICYmIHNlbGVjdGVkICE9ICctLXRvcCBzdG9yaWVzLS0nICYmIHNlbGVjdGVkICE9ICctLXNlY3Rpb25zLS0nKSB7XG4gIGFydEltZyA9IHZhbHVlLm11bHRpbWVkaWFbNF0udXJsO1xuICBhcnRVcmwgPSBgPGEgaHJlZj1cIiR7dmFsdWUudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPjxkaXYgY2xhc3M9XCJhcnRpY2xlLWltYWdlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOnVybCgke2FydEltZ30pIGNlbnRlcjsgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcIj48L2Rpdj48L2E+YDtcbiAgYXJ0Q2FwdCA9IGA8ZGl2IGNsYXNzPVwiY2FwdGlvblwiPlxuICAgIDxwIGNsYXNzPVwidGV4dFwiPiR7dmFsdWUuYWJzdHJhY3R9PC9wPlxuICA8L2Rpdj5gO1xuICBhcnRJdGVtcyArPSBgPGxpPlxuICAgIDxkaXYgY2xhc3M9XCJhcnQtY29udGFpbmVyXCI+XG4gICAgICAke2FydFVybH1cbiAgICAgICR7YXJ0Q2FwdH1cbiAgICA8L2Rpdj5cbiAgPC9saT5gO1xufSAvLyAgY2xvc2UgdG9wIHN0b3JpZXMgZWxzZSBzdGF0ZW1lbnRcblxuZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdtb3ZpZXMnKSB7XG4gIGFydEltZyA9IGA8aW1nIHNyYz1cIiR7dmFsdWUubXVsdGltZWRpYS5zcmN9XCI+YDtcbiAgYXJ0VXJsID0gYDxhIGhyZWY9XCIke3ZhbHVlLmxpbmsudXJsfVwidGFyZ2V0PVwiX2JsYW5rXCI+JHthcnRJbWd9PC9hPmA7XG4gIGFydENhcHQgPSBgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICA8cCBjbGFzcz1cInRleHRcIj4ke3ZhbHVlLnN1bW1hcnlfc2hvcnR9XCI8L3A+XG4gIDwvZGl2PmA7XG4gIGFydEl0ZW1zICs9IGA8bGk+XG4gICAgPGRpdiBjbGFzcz1cImFydC1jb250YWluZXJcIj5cbiAgICAgICR7YXJ0VXJsfVxuICAgICAgJHthcnRDYXB0fVxuICAgIDwvZGl2PlxuICA8L2xpPmA7XG59IC8vIGNsb3NlIG1vdmllcyBpZiBzdGF0ZW1lbnRcblxuZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdib29rcycpIHtcbiAgbGV0IGF1dGhvciA9ICc8aDMgY2xhc3M9XCJhdXRob3JcIj5cIicgKyB2YWx1ZS5hdXRob3IgKyAnXCI8L2gzPjwvZGl2Pic7XG4gIGxldCBhcnJVcmwgPSAnJztcbiAgYXJyVXJsID0gdmFsdWUuc3VuZGF5X3Jldmlld19saW5rO1xuICBhcnRVcmwgPSBgPGEgaHJlZj1cIiR7YXJyVXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPmA7XG4gIGFydFRpdGxlID0gYDxkaXYgY2xhc3M9d29yZHM+XG4gICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke2FydFVybH0ke3ZhbHVlLnRpdGxlfTwvYT48L2gyPmA7XG4gIGFydENhcHQgPSBgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICA8cCBjbGFzcz1cInRleHRcIj4ke3ZhbHVlLmRlc2NyaXB0aW9ufTwvcD5cbiAgPC9kaXY+YDtcbiAgYXJ0SXRlbXMgKz0gYDxsaT5cbiAgICA8ZGl2IGNsYXNzPVwiYXJ0LWNvbnRhaW5lclwiPlxuICAgICAgJHthcnRUaXRsZX1cbiAgICAgICR7YXV0aG9yfVxuICAgICAgJHthcnRDYXB0fVxuICAgIDwvZGl2PlxuICA8L2xpPmA7XG59IC8vICBjbG9zZSBib29rIHJldmlld3MgaWYgc3RhdGVtZW50XG59KTsgLy8gY2xvc2UgLmVhY2hcbiRhcnRMaXN0LmFwcGVuZChhcnRJdGVtcyk7XG5sZXQgbWVkaWFIZWlnaHQgPSAkKCcubWVkaWEtY29udGFpbmVyJyksXG4gIG5ld0hlaWdodCA9IG9sZEhlaWdodCArIG1lZGlhSGVpZ2h0O1xuaGVpZ2h0UEguc3R5bGUgPSBuZXdIZWlnaHQ7XG59KSAvLyBjbG9zZSAuZG9uZVxuLmZhaWwgKGZ1bmN0aW9uKCl7XG5hbGVydCgnZmFpbHVyZSB0byBsb2FkLiAgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbmxvY2F0aW9uLnJlbG9hZCgpO1xufSlcbi5hbHdheXMobG9hZGluZygpKTtcbn0pOyBcblxuJChkb2N1bWVudCkucmVhZHkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9zcmMvY3VwLWEtam9lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
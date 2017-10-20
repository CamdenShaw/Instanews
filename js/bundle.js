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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzg3MDU1YjMyM2Y0YTA0NmJhODkiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2N1cC1hLWpvZS5qcyJdLCJuYW1lcyI6WyJtZW51IiwiJCIsImhlaWdodFBIIiwiYVBJS2V5IiwiYXJ0VGl0bGUiLCJhcnRJdGVtcyIsImFydENhcHQiLCJhcnRVcmwiLCJhdXRob3IiLCJkaXJlY3RvciIsImFydExpc3QiLCJhcnREZXNjcmlwdCIsIiRhcnRMaXN0IiwibllUVXJsIiwiYXJySW1nIiwiYXJ0SW1nIiwib2xkSGVpZ2h0IiwiY2xpY2tDb3VudCIsImxvYWRpbmciLCJ0b2dnbGVDbGFzcyIsImNoYW5nZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZWxlY3RlZCIsInZhbCIsImVtcHR5IiwicGFyYW0iLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YVR5cGUiLCJkb25lIiwiZGF0YSIsImFydERhdGEiLCJmaWx0ZXJEYXRhIiwiYXJ0RGF0YTIiLCJpIiwicmVzdWx0cyIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsIm11bHRpbWVkaWEiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJkZXNjcmlwdGlvbiIsInVuZGVmaW5lZCIsImFic3RyYWN0Iiwic3JjIiwibGluayIsInN1bW1hcnlfc2hvcnQiLCJhcnJVcmwiLCJzdW5kYXlfcmV2aWV3X2xpbmsiLCJ0aXRsZSIsImFwcGVuZCIsIm1lZGlhSGVpZ2h0IiwibmV3SGVpZ2h0Iiwic3R5bGUiLCJmYWlsIiwiYWxlcnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsImFsd2F5cyIsImRvY3VtZW50IiwicmVhZHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNB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QS9DLDRFQUNvQmtDLE1BQU1LLFdBRDFCO0FBR0F4QyxzRkFFTUQsUUFGTixzQkFHTUksT0FITixzQkFJTUYsT0FKTjtBQU9ELFdBOUM2QixDQThDNUI7QUFDSCxLQS9DRCxFQXREa0IsQ0FxR2Q7QUFDSk0sYUFBUzBDLE1BQVQsQ0FBZ0JqRCxRQUFoQjtBQUNBLFFBQUlrRCxjQUFjdEQsRUFBRSxrQkFBRixDQUFsQjtBQUFBLFFBQ0l1RCxZQUFZeEMsWUFBWXVDLFdBRDVCO0FBRUFyRCxhQUFTdUQsS0FBVCxHQUFpQkQsU0FBakI7QUFDRCxHQWhIRCxFQWdIRztBQWhISCxHQWlIQ0UsSUFqSEQsQ0FpSE8sWUFBVTtBQUNmQyxVQUFNLHFDQUFOO0FBQ0FDLGFBQVNDLE1BQVQ7QUFDRCxHQXBIRCxFQXFIQ0MsTUFySEQsQ0FxSFE1QyxTQXJIUjtBQXNIRCxDQW5LRDs7QUFxS0FqQixFQUFFOEQsUUFBRixFQUFZQyxLQUFaLEciLCJmaWxlIjoiLi9qcy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ODcwNTViMzIzZjRhMDQ2YmE4OSIsImNvbnN0IG1lbnUgPSAkKCcuc2VsZWN0b3InKSxcbiAgICAgIGhlaWdodFBIID0gJCgnI2V2ZXJ5dGhpbmcnKSxcbiAgICAgIGFQSUtleSA9ICdlYTk0Y2ZlMjY0NTg0ODllODk1ZGE5MmQ5OTM5MGRlMCc7XG5cbmxldCBhcnRUaXRsZSwgYXJ0SXRlbXMsIGFydENhcHQsIGFydFVybCwgYXV0aG9yLCBkaXJlY3RvciwgYXJ0TGlzdCwgYXJ0RGVzY3JpcHQsICRhcnRMaXN0ID0gJCgnLmFydGljbGVzJyksXG4gICAgbllUVXJsLCBhcnJJbWcgPSAnJyxcbiAgICBhcnRJbWcgPSBbXSxcbiAgICBvbGRIZWlnaHQgPSBoZWlnaHRQSCxcbiAgICBjbGlja0NvdW50ID0gMDtcblxuZnVuY3Rpb24gbG9hZGluZygpIHtcbiAgJCgnLmxvYWQnKS50b2dnbGVDbGFzcygnbG9hZGVkJyk7XG4gICQoJy5sb2FkLXNjcmVlbicpLnRvZ2dsZUNsYXNzKCdsb2FkZWQtc2NyZWVuJyk7XG4gICQoJy5sb2FkLXdyYXBwZXInKS50b2dnbGVDbGFzcygnbG9hZGVkLXdyYXBwZXInKTtcbn1cblxubG9hZGluZygpO1xuXG5tZW51LmNoYW5nZSgoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBsb2FkaW5nKCk7XG4gIFxuICBsZXQgc2VsZWN0ZWQgPSAkKCcuc2VsZWN0b3InKS52YWwoKTtcbiAgXG4gIGlmIChjbGlja0NvdW50ID09PSAwICYmIHNlbGVjdGVkICE9PSAnLS10b3Agc3Rvcmllcy0tJyAmJiBzZWxlY3RlZCAhPT0gJy0tc2VsZWN0aW9uLS0nKXtcblxuICAgIGNsaWNrQ291bnQrKztcbiAgICAkKCcuY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2NvbnRhaW5lci1tb3ZlJyk7XG4gICAgJCgnLmxvZ28tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2xvZ28tY29udGFpbmVyLW1vdmUnKTtcbiAgICAkKCcubG9nbycpLnRvZ2dsZUNsYXNzKCdsb2dvLW1vdmUnKTtcbiAgICAkKCcuZm9ybS1jb250YWluZXInKS50b2dnbGVDbGFzcygnZm9ybS1jb250YWluZXItbW92ZScpO1xuICAgICQoJy5pbnN0cnVjdGlvbnMnKS50b2dnbGVDbGFzcygnaW5zdHJ1Y3Rpb25zLW1vdmUnKTtcbiAgICAkKCcuYXJ0LXR5cGUnKS50b2dnbGVDbGFzcygnYXJ0LXR5cGUtbW92ZScpO1xuICB9IC8vICBjbG9zZSBpZiBzdGF0ZW1lbnQgZm9yIHNlbGVjdGlvbiBhbmltYXRpb25cblxuICAkYXJ0TGlzdC5lbXB0eSgpO1xuICBhcnRMaXN0LCBhcnRJdGVtcyA9ICcnO1xuXG4gIGlmIChzZWxlY3RlZCA9PT0gJ2Jvb2tzJykge1xuICAgLy9hbGVydCggJ2Jvb2tzIGhhcyBiZWVuIGNsaWNrZWQgYW5kIGxpc3RlbmVkIHRvbycgKTtcbiAgICBuWVRVcmwgPSAnaHR0cHM6Ly9hcGkubnl0aW1lcy5jb20vc3ZjL2Jvb2tzL3YzL2xpc3RzL2Jlc3Qtc2VsbGVycy9oaXN0b3J5Lmpzb24nO1xuICAgIG5ZVFVybCArPSAnPycgKyAkLnBhcmFtKHtcbiAgICAgICdhcGkta2V5JzogYVBJS2V5XG4gICAgfSk7IC8vIGNsb3NlIHBhcmFtZXRlcnMgZGVjbGFyYXRpb25cbiAgfS8vIGNsb3NlIGJvb2tzIGlmIHN0YXRlbWVudFxuXG4gIGVsc2UgaWYgKHNlbGVjdGVkID09PSAnbW92aWVzJykge1xuICAgLy9hbGVydCggJ21vdmllcyBoYXMgYmVlbiBjbGlja2VkIGFuZCBsaXN0ZW5lZCB0b28nKTtcbiAgICBuWVRVcmwgPSAnaHR0cHM6Ly9hcGkubnl0aW1lcy5jb20vc3ZjL21vdmllcy92Mi9yZXZpZXdzL3NlYXJjaC5qc29uJztcbiAgICBuWVRVcmwgKz0gJz8nICsgJC5wYXJhbSh7XG4gICAgICAnYXBpLWtleSc6IGFQSUtleVxuICAgIH0pOyAvLyBjbG9zZSBwYXJhbWV0ZXJzXG4gIH0gLy8gIGNsb3NlIG1vdmllcyBpZiBzdGF0ZW1lbnRcblxuICBlbHNlIHtcblxuICAgIG5ZVFVybCA9ICdodHRwczovL2FwaS5ueXRpbWVzLmNvbS9zdmMvdG9wc3Rvcmllcy92Mi8nICsgc2VsZWN0ZWQgKyAnLmpzb24nO1xuICAgIG5ZVFVybCArPSAnPycgKyAkLnBhcmFtKHtcbiAgICAgICdhcGkta2V5JzogYVBJS2V5XG4gICAgfSk7IC8vIGNsb3NlIHBhcmFtZXRlcnMgZGVjbGFyYXRpb25cbiAgfSAvLyAgY2xvc2UgdG9wIHN0b3JpZXMgaWYgc3RhdGVtZW50XG4gIFxuICAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiBuWVRVcmwsXG4gICAgZGF0YVR5cGU6ICdqc29uJ1xuICB9KSAvLyBjbG9zZSBhamF4IGRlY2xhcmF0aW9uXG4gIFxuICAuZG9uZShmdW5jdGlvbihkYXRhKXtcbiAgICBsZXQgYXJ0RGF0YSA9ICcnLFxuICAgICAgICBmaWx0ZXJEYXRhID0gJycsXG4gICAgICAgIGFydERhdGEyID0gW10sXG4gICAgICAgIGk9MDtcblxuICAgIGFydEltZyA9ICcnO1xuXG4gICAgYXJ0RGF0YSA9IGRhdGEucmVzdWx0cztcblxuICAgICQuZWFjaChhcnREYXRhLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIGlmKHNlbGVjdGVkICE9ICdib29rcycgJiYgc2VsZWN0ZWQgIT0gJ21vdmllcycgJiYgc2VsZWN0ZWQgIT0gJy0tdG9wIHN0b3JpZXMtLScgJiYgc2VsZWN0ZWQgIT0gJy0tc2VjdGlvbnMtLScpe1xuXG4gICAgICBhcnRJbWcgPSB2YWx1ZS5tdWx0aW1lZGlhO1xuXG4gICAgICBpZiAoYXJ0SW1nLmxlbmd0aCA+IDEpe1xuICAgICAgICBhcnREYXRhMi5wdXNoKGRhdGEucmVzdWx0c1tpXSk7XG4gICAgICAgIGFydERhdGEgPSBhcnREYXRhMi5zbGljZSgwLCAxMik7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSAvLyBjbG9zZSBzZXQgdG9wIHN0b3JpZXMgdmFyaWFibGVzIElGIHN0YXRlbWVudFxuXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdib29rcycpe1xuXG4gICAgICBhcnREZXNjcmlwdCA9IHZhbHVlLmRlc2NyaXB0aW9uO1xuXG4gICAgICBpZiAoISFhcnREZXNjcmlwdCAmJiB0eXBlb2YgYXJ0RGVzY3JpcHQgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgYXJ0RGF0YTIucHVzaChkYXRhLnJlc3VsdHNbaV0pO1xuICAgICAgICBhcnREYXRhID0gYXJ0RGF0YTIuc2xpY2UoMCwgMTIpO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gLy8gIGNsb3NlIHNldCBib29rcyB2YXJpYWJsZXMgSUYgc3RhdGVtZW50XG5cbiAgICBlbHNlIGlmIChzZWxlY3RlZCA9PT0gJ21vdmllcycpe1xuXG4gICAgICBhcnRJbWcgPSB2YWx1ZS5tdWx0aW1lZGlhO1xuXG4gICAgICBpZiAoISFhcnRJbWcgJiYgdHlwZW9mIGFydEltZyA9PT0gJ29iamVjdCcpe1xuICAgICAgICBhcnREYXRhMi5wdXNoKGRhdGEucmVzdWx0c1tpXSk7XG4gICAgICAgIGFydERhdGEgPSBhcnREYXRhMi5zbGljZSgwLCAxMik7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSAvLyAgY2xvc2Ugc2V0IG1vdmllcyB2YXJpYWJsZXMgSUYgc3RhdGVtZW50XG4gICAgXG4gICAgfSlcbiAgICAkLmVhY2goYXJ0RGF0YSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgIGlmIChzZWxlY3RlZCAhPSAnYm9va3MnICYmIHNlbGVjdGVkICE9ICdtb3ZpZXMnICYmIHNlbGVjdGVkICE9ICctLXRvcCBzdG9yaWVzLS0nICYmIHNlbGVjdGVkICE9ICctLXNlY3Rpb25zLS0nKSB7XG4gICAgICAgIGFydEltZyA9IHZhbHVlLm11bHRpbWVkaWFbNF0udXJsO1xuICAgICAgICBhcnRVcmwgPSBgPGEgaHJlZj1cIiR7dmFsdWUudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPjxkaXYgY2xhc3M9XCJhcnRpY2xlLWltYWdlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOnVybCgke2FydEltZ30pIGNlbnRlcjsgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcIj48L2Rpdj48L2E+YDtcbiAgICAgICAgYXJ0Q2FwdCA9IGA8ZGl2IGNsYXNzPVwiY2FwdGlvblwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGV4dFwiPiR7dmFsdWUuYWJzdHJhY3R9PC9wPlxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgICBhcnRJdGVtcyArPSBgPGxpPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAke2FydFVybH1cbiAgICAgICAgICAgICR7YXJ0Q2FwdH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9saT5gO1xuICAgICAgfSAvLyAgY2xvc2UgdG9wIHN0b3JpZXMgZWxzZSBzdGF0ZW1lbnRcblxuICAgICAgZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdtb3ZpZXMnKSB7XG4gICAgICAgIGFydEltZyA9IGA8aW1nIHNyYz1cIiR7dmFsdWUubXVsdGltZWRpYS5zcmN9XCI+YDtcbiAgICAgICAgYXJ0VXJsID0gYDxhIGhyZWY9XCIke3ZhbHVlLmxpbmsudXJsfVwidGFyZ2V0PVwiX2JsYW5rXCI+JHthcnRJbWd9PC9hPmA7XG4gICAgICAgIGFydENhcHQgPSBgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInRleHRcIj4ke3ZhbHVlLnN1bW1hcnlfc2hvcnR9XCI8L3A+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICAgIGFydEl0ZW1zICs9IGA8bGk+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFydC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICR7YXJ0VXJsfVxuICAgICAgICAgICAgJHthcnRDYXB0fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xpPmA7XG4gICAgICB9IC8vIGNsb3NlIG1vdmllcyBpZiBzdGF0ZW1lbnRcblxuICAgICAgZWxzZSBpZiAoc2VsZWN0ZWQgPT09ICdib29rcycpIHtcbiAgICAgICAgbGV0IGF1dGhvciA9ICc8aDMgY2xhc3M9XCJhdXRob3JcIj5cIicgKyB2YWx1ZS5hdXRob3IgKyAnXCI8L2gzPjwvZGl2Pic7XG4gICAgICAgIGxldCBhcnJVcmwgPSAnJztcbiAgICAgICAgYXJyVXJsID0gdmFsdWUuc3VuZGF5X3Jldmlld19saW5rO1xuICAgICAgICBhcnRVcmwgPSBgPGEgaHJlZj1cIiR7YXJyVXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPmA7XG4gICAgICAgIGFydFRpdGxlID0gYDxkaXYgY2xhc3M9d29yZHM+XG4gICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke2FydFVybH0ke3ZhbHVlLnRpdGxlfTwvYT48L2gyPmA7XG4gICAgICAgIGFydENhcHQgPSBgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInRleHRcIj4ke3ZhbHVlLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgYXJ0SXRlbXMgKz0gYDxsaT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgJHthcnRUaXRsZX1cbiAgICAgICAgICAgICR7YXV0aG9yfVxuICAgICAgICAgICAgJHthcnRDYXB0fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xpPmA7XG4gICAgICB9IC8vICBjbG9zZSBib29rIHJldmlld3MgaWYgc3RhdGVtZW50XG4gICAgfSk7IC8vIGNsb3NlIC5lYWNoXG4gICAgJGFydExpc3QuYXBwZW5kKGFydEl0ZW1zKTtcbiAgICBsZXQgbWVkaWFIZWlnaHQgPSAkKCcubWVkaWEtY29udGFpbmVyJyksXG4gICAgICAgIG5ld0hlaWdodCA9IG9sZEhlaWdodCArIG1lZGlhSGVpZ2h0O1xuICAgIGhlaWdodFBILnN0eWxlID0gbmV3SGVpZ2h0O1xuICB9KSAvLyBjbG9zZSAuZG9uZVxuICAuZmFpbCAoZnVuY3Rpb24oKXtcbiAgICBhbGVydCgnZmFpbHVyZSB0byBsb2FkLiAgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSlcbiAgLmFsd2F5cyhsb2FkaW5nKCkpO1xufSk7IFxuXG4kKGRvY3VtZW50KS5yZWFkeSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3NyYy9jdXAtYS1qb2UuanMiXSwic291cmNlUm9vdCI6IiJ9

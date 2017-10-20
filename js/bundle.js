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
    largeIcon = true,
    clickCount = 0;

$(function () {
  function loading() {
    $('.load').toggleClass('loaded');
    $('.load-screen').toggleClass('loaded-screen');
    $('.load-wrapper').toggleClass('loaded-wrapper');
  }

  function move() {
    $('.container').toggleClass('container-move');
    $('.logo-container').toggleClass('logo-container-move');
    $('.logo').toggleClass('logo-move');
    $('.form-container').toggleClass('form-container-move');
    $('.instructions').toggleClass('instructions-move');
    $('.art-type').toggleClass('art-type-move');
  }

  loading();

  menu.change(function (event) {
    event.preventDefault();

    loading();

    var selected = $('.selector').val();

    if (selected !== '--top stories--' && selected !== '--sections--') {

      clickCount++;
      move();
      largeIcon = !largeIcon;
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

      else if (selected === '--top stories--') {
          event.preventDefault();
          alert('Sorry, the top stories indicator is not a category.  Try selecting another category!');
          if (!largeIcon) {
            move();
            largeIcon = !largeIcon;
          }
        } else if (selected === '--sections--') {
          event.preventDefault();
          alert('Sorry, the selections indicator is not a category.  Try selecting another category!');
          if (!largeIcon) {
            move();
            largeIcon = !largeIcon;
          }
        } else {

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
          artCapt = '<div class="caption">\n            <p class="text">' + value.abstract + '</p>\n          </div>';
          artItems += '<li>\n            <div class="art-container">\n              ' + artUrl + '\n              ' + artCapt + '\n            </div>\n          </li>';
        } //  close top stories else statement

        else if (selected === 'movies') {
            artImg = '<img src="' + value.multimedia.src + '">';
            artUrl = '<a href="' + value.link.url + '"target="_blank">' + artImg + '</a>';
            artCapt = '<div class="caption">\n            <p class="text">' + value.summary_short + '"</p>\n          </div>';
            artItems += '<li>\n            <div class="art-container">\n              ' + artUrl + '\n              ' + artCapt + '\n            </div>\n          </li>';
          } // close movies if statement

          else if (selected === 'books') {
              var _author = '<h3 class="author">"' + value.author + '"</h3></div>';
              var arrUrl = '';
              arrUrl = value.sunday_review_link;
              artUrl = '<a href="' + arrUrl + '" target="_blank">';
              artTitle = '<div class=words>\n            <h2 class="title">' + artUrl + value.title + '</a></h2>';
              artCapt = '<div class="caption">\n            <p class="text">' + value.description + '</p>\n          </div>';
              artItems += '<li>\n            <div class="art-container">\n              ' + artTitle + '\n              ' + _author + '\n              ' + artCapt + '\n            </div>\n          </li>';
            } //  close book reviews if statement
      }); // close .each
      $artList.append(artItems);
      var mediaHeight = $('.media-container'),
          newHeight = oldHeight + mediaHeight;
      heightPH.style = newHeight;
    }) // close .done
    .fail(function () {
      if (selected === '--top stories--' || '--sections--') {
        event.preventDefault();
        return;
      } else {
        alert('failure to load.  Please try again.');
        location.reload();
      }
    }).always(function () {
      setTimeout(loading(), 1000);
    });
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzQyYzAzYzA1Mjg5MzBhZWEyY2QiLCJ3ZWJwYWNrOi8vLy4vanMvc3JjL2N1cC1hLWpvZS5qcyJdLCJuYW1lcyI6WyJtZW51IiwiJCIsImhlaWdodFBIIiwiYVBJS2V5IiwiYXJ0VGl0bGUiLCJhcnRJdGVtcyIsImFydENhcHQiLCJhcnRVcmwiLCJhdXRob3IiLCJkaXJlY3RvciIsImFydExpc3QiLCJhcnREZXNjcmlwdCIsIiRhcnRMaXN0IiwibllUVXJsIiwiYXJySW1nIiwiYXJ0SW1nIiwib2xkSGVpZ2h0IiwibGFyZ2VJY29uIiwiY2xpY2tDb3VudCIsImxvYWRpbmciLCJ0b2dnbGVDbGFzcyIsIm1vdmUiLCJjaGFuZ2UiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2VsZWN0ZWQiLCJ2YWwiLCJlbXB0eSIsInBhcmFtIiwiYWxlcnQiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YVR5cGUiLCJkb25lIiwiZGF0YSIsImFydERhdGEiLCJmaWx0ZXJEYXRhIiwiYXJ0RGF0YTIiLCJpIiwicmVzdWx0cyIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsIm11bHRpbWVkaWEiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJkZXNjcmlwdGlvbiIsInVuZGVmaW5lZCIsImFic3RyYWN0Iiwic3JjIiwibGluayIsInN1bW1hcnlfc2hvcnQiLCJhcnJVcmwiLCJzdW5kYXlfcmV2aWV3X2xpbmsiLCJ0aXRsZSIsImFwcGVuZCIsIm1lZGlhSGVpZ2h0IiwibmV3SGVpZ2h0Iiwic3R5bGUiLCJmYWlsIiwibG9jYXRpb24iLCJyZWxvYWQiLCJhbHdheXMiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FB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cy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNDJjMDNjMDUyODkzMGFlYTJjZCIsImNvbnN0IG1lbnUgPSAkKCcuc2VsZWN0b3InKSxcbiAgICAgIGhlaWdodFBIID0gJCgnI2V2ZXJ5dGhpbmcnKSxcbiAgICAgIGFQSUtleSA9ICdlYTk0Y2ZlMjY0NTg0ODllODk1ZGE5MmQ5OTM5MGRlMCc7XG5cbmxldCBhcnRUaXRsZSwgYXJ0SXRlbXMsIGFydENhcHQsIGFydFVybCwgYXV0aG9yLCBkaXJlY3RvciwgYXJ0TGlzdCwgYXJ0RGVzY3JpcHQsICRhcnRMaXN0ID0gJCgnLmFydGljbGVzJyksXG4gICAgbllUVXJsLCBhcnJJbWcgPSAnJyxcbiAgICBhcnRJbWcgPSBbXSxcbiAgICBvbGRIZWlnaHQgPSBoZWlnaHRQSCxcbiAgICBsYXJnZUljb24gPSB0cnVlLFxuICAgIGNsaWNrQ291bnQgPSAwO1xuXG4kKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBsb2FkaW5nKCkge1xuICAgICQoJy5sb2FkJykudG9nZ2xlQ2xhc3MoJ2xvYWRlZCcpO1xuICAgICQoJy5sb2FkLXNjcmVlbicpLnRvZ2dsZUNsYXNzKCdsb2FkZWQtc2NyZWVuJyk7XG4gICAgJCgnLmxvYWQtd3JhcHBlcicpLnRvZ2dsZUNsYXNzKCdsb2FkZWQtd3JhcHBlcicpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZSgpIHtcbiAgICAkKCcuY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2NvbnRhaW5lci1tb3ZlJyk7XG4gICAgJCgnLmxvZ28tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ2xvZ28tY29udGFpbmVyLW1vdmUnKTtcbiAgICAkKCcubG9nbycpLnRvZ2dsZUNsYXNzKCdsb2dvLW1vdmUnKTtcbiAgICAkKCcuZm9ybS1jb250YWluZXInKS50b2dnbGVDbGFzcygnZm9ybS1jb250YWluZXItbW92ZScpO1xuICAgICQoJy5pbnN0cnVjdGlvbnMnKS50b2dnbGVDbGFzcygnaW5zdHJ1Y3Rpb25zLW1vdmUnKTtcbiAgICAkKCcuYXJ0LXR5cGUnKS50b2dnbGVDbGFzcygnYXJ0LXR5cGUtbW92ZScpO1xuICB9XG5cbiAgbG9hZGluZygpO1xuXG4gIG1lbnUuY2hhbmdlKChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsb2FkaW5nKCk7XG4gICAgXG4gICAgbGV0IHNlbGVjdGVkID0gJCgnLnNlbGVjdG9yJykudmFsKCk7XG4gICAgXG4gICAgaWYgKHNlbGVjdGVkICE9PSAnLS10b3Agc3Rvcmllcy0tJyAmJiBzZWxlY3RlZCAhPT0gJy0tc2VjdGlvbnMtLScpe1xuXG4gICAgICBjbGlja0NvdW50Kys7XG4gICAgICBtb3ZlKCk7XG4gICAgICBsYXJnZUljb24gPSAhbGFyZ2VJY29uO1xuICAgIH0gLy8gIGNsb3NlIGlmIHN0YXRlbWVudCBmb3Igc2VsZWN0aW9uIGFuaW1hdGlvblxuXG4gICAgJGFydExpc3QuZW1wdHkoKTtcbiAgICBhcnRMaXN0LCBhcnRJdGVtcyA9ICcnO1xuXG4gICAgaWYgKHNlbGVjdGVkID09PSAnYm9va3MnKSB7XG4gICAgLy9hbGVydCggJ2Jvb2tzIGhhcyBiZWVuIGNsaWNrZWQgYW5kIGxpc3RlbmVkIHRvbycgKTtcbiAgICAgIG5ZVFVybCA9ICdodHRwczovL2FwaS5ueXRpbWVzLmNvbS9zdmMvYm9va3MvdjMvbGlzdHMvYmVzdC1zZWxsZXJzL2hpc3RvcnkuanNvbic7XG4gICAgICBuWVRVcmwgKz0gJz8nICsgJC5wYXJhbSh7XG4gICAgICAgICdhcGkta2V5JzogYVBJS2V5XG4gICAgICB9KTsgLy8gY2xvc2UgcGFyYW1ldGVycyBkZWNsYXJhdGlvblxuICAgIH0vLyBjbG9zZSBib29rcyBpZiBzdGF0ZW1lbnRcblxuICAgIGVsc2UgaWYgKHNlbGVjdGVkID09PSAnbW92aWVzJykge1xuICAgIC8vYWxlcnQoICdtb3ZpZXMgaGFzIGJlZW4gY2xpY2tlZCBhbmQgbGlzdGVuZWQgdG9vJyk7XG4gICAgICBuWVRVcmwgPSAnaHR0cHM6Ly9hcGkubnl0aW1lcy5jb20vc3ZjL21vdmllcy92Mi9yZXZpZXdzL3NlYXJjaC5qc29uJztcbiAgICAgIG5ZVFVybCArPSAnPycgKyAkLnBhcmFtKHtcbiAgICAgICAgJ2FwaS1rZXknOiBhUElLZXlcbiAgICAgIH0pOyAvLyBjbG9zZSBwYXJhbWV0ZXJzXG4gICAgfSAvLyAgY2xvc2UgbW92aWVzIGlmIHN0YXRlbWVudFxuXG4gICAgZWxzZSBpZiAoIHNlbGVjdGVkID09PSAnLS10b3Agc3Rvcmllcy0tJyApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBhbGVydCgnU29ycnksIHRoZSB0b3Agc3RvcmllcyBpbmRpY2F0b3IgaXMgbm90IGEgY2F0ZWdvcnkuICBUcnkgc2VsZWN0aW5nIGFub3RoZXIgY2F0ZWdvcnkhJyk7XG4gICAgICBpZiAoIWxhcmdlSWNvbikge1xuICAgICAgICBtb3ZlKCk7XG4gICAgICAgIGxhcmdlSWNvbiA9ICFsYXJnZUljb247XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCBzZWxlY3RlZCA9PT0gJy0tc2VjdGlvbnMtLScgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgYWxlcnQoJ1NvcnJ5LCB0aGUgc2VsZWN0aW9ucyBpbmRpY2F0b3IgaXMgbm90IGEgY2F0ZWdvcnkuICBUcnkgc2VsZWN0aW5nIGFub3RoZXIgY2F0ZWdvcnkhJyk7XG4gICAgICBpZiAoICFsYXJnZUljb24gKSB7XG4gICAgICAgIG1vdmUoKTtcbiAgICAgICAgbGFyZ2VJY29uID0gIWxhcmdlSWNvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbHNlIHtcblxuICAgICAgbllUVXJsID0gJ2h0dHBzOi8vYXBpLm55dGltZXMuY29tL3N2Yy90b3BzdG9yaWVzL3YyLycgKyBzZWxlY3RlZCArICcuanNvbic7XG4gICAgICBuWVRVcmwgKz0gJz8nICsgJC5wYXJhbSh7XG4gICAgICAgICdhcGkta2V5JzogYVBJS2V5XG4gICAgICB9KTsgLy8gY2xvc2UgcGFyYW1ldGVycyBkZWNsYXJhdGlvblxuICAgIH0gLy8gIGNsb3NlIHRvcCBzdG9yaWVzIGlmIHN0YXRlbWVudFxuICAgIFxuICAgICQuYWpheCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiBuWVRVcmwsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSkgLy8gY2xvc2UgYWpheCBkZWNsYXJhdGlvblxuICAgIFxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgbGV0IGFydERhdGEgPSAnJyxcbiAgICAgICAgICBmaWx0ZXJEYXRhID0gJycsXG4gICAgICAgICAgYXJ0RGF0YTIgPSBbXSxcbiAgICAgICAgICBpPTA7XG5cbiAgICAgIGFydEltZyA9ICcnO1xuXG4gICAgICBhcnREYXRhID0gZGF0YS5yZXN1bHRzO1xuXG4gICAgICAkLmVhY2goYXJ0RGF0YSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgIGlmKHNlbGVjdGVkICE9ICdib29rcycgJiYgc2VsZWN0ZWQgIT0gJ21vdmllcycgJiYgc2VsZWN0ZWQgIT0gJy0tdG9wIHN0b3JpZXMtLScgJiYgc2VsZWN0ZWQgIT0gJy0tc2VjdGlvbnMtLScpe1xuXG4gICAgICAgIGFydEltZyA9IHZhbHVlLm11bHRpbWVkaWE7XG5cbiAgICAgICAgaWYgKGFydEltZy5sZW5ndGggPiAxKXtcbiAgICAgICAgICBhcnREYXRhMi5wdXNoKGRhdGEucmVzdWx0c1tpXSk7XG4gICAgICAgICAgYXJ0RGF0YSA9IGFydERhdGEyLnNsaWNlKDAsIDEyKTtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9IC8vIGNsb3NlIHNldCB0b3Agc3RvcmllcyB2YXJpYWJsZXMgSUYgc3RhdGVtZW50XG5cbiAgICAgIGVsc2UgaWYgKHNlbGVjdGVkID09PSAnYm9va3MnKXtcblxuICAgICAgICBhcnREZXNjcmlwdCA9IHZhbHVlLmRlc2NyaXB0aW9uO1xuXG4gICAgICAgIGlmICghIWFydERlc2NyaXB0ICYmIHR5cGVvZiBhcnREZXNjcmlwdCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgIGFydERhdGEyLnB1c2goZGF0YS5yZXN1bHRzW2ldKTtcbiAgICAgICAgICBhcnREYXRhID0gYXJ0RGF0YTIuc2xpY2UoMCwgMTIpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gIGNsb3NlIHNldCBib29rcyB2YXJpYWJsZXMgSUYgc3RhdGVtZW50XG5cbiAgICAgIGVsc2UgaWYgKHNlbGVjdGVkID09PSAnbW92aWVzJyl7XG5cbiAgICAgICAgYXJ0SW1nID0gdmFsdWUubXVsdGltZWRpYTtcblxuICAgICAgICBpZiAoISFhcnRJbWcgJiYgdHlwZW9mIGFydEltZyA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgIGFydERhdGEyLnB1c2goZGF0YS5yZXN1bHRzW2ldKTtcbiAgICAgICAgICBhcnREYXRhID0gYXJ0RGF0YTIuc2xpY2UoMCwgMTIpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gIGNsb3NlIHNldCBtb3ZpZXMgdmFyaWFibGVzIElGIHN0YXRlbWVudFxuICAgICAgXG4gICAgICB9KVxuICAgICAgJC5lYWNoKGFydERhdGEsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSAnYm9va3MnICYmIHNlbGVjdGVkICE9ICdtb3ZpZXMnICYmIHNlbGVjdGVkICE9ICctLXRvcCBzdG9yaWVzLS0nICYmIHNlbGVjdGVkICE9ICctLXNlY3Rpb25zLS0nKSB7XG4gICAgICAgICAgYXJ0SW1nID0gdmFsdWUubXVsdGltZWRpYVs0XS51cmw7XG4gICAgICAgICAgYXJ0VXJsID0gYDxhIGhyZWY9XCIke3ZhbHVlLnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj48ZGl2IGNsYXNzPVwiYXJ0aWNsZS1pbWFnZVwiIHN0eWxlPVwiYmFja2dyb3VuZDp1cmwoJHthcnRJbWd9KSBjZW50ZXI7IGJhY2tncm91bmQtc2l6ZTogY292ZXI7XCI+PC9kaXY+PC9hPmA7XG4gICAgICAgICAgYXJ0Q2FwdCA9IGA8ZGl2IGNsYXNzPVwiY2FwdGlvblwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0XCI+JHt2YWx1ZS5hYnN0cmFjdH08L3A+XG4gICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICBhcnRJdGVtcyArPSBgPGxpPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFydC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgJHthcnRVcmx9XG4gICAgICAgICAgICAgICR7YXJ0Q2FwdH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgfSAvLyAgY2xvc2UgdG9wIHN0b3JpZXMgZWxzZSBzdGF0ZW1lbnRcblxuICAgICAgICBlbHNlIGlmIChzZWxlY3RlZCA9PT0gJ21vdmllcycpIHtcbiAgICAgICAgICBhcnRJbWcgPSBgPGltZyBzcmM9XCIke3ZhbHVlLm11bHRpbWVkaWEuc3JjfVwiPmA7XG4gICAgICAgICAgYXJ0VXJsID0gYDxhIGhyZWY9XCIke3ZhbHVlLmxpbmsudXJsfVwidGFyZ2V0PVwiX2JsYW5rXCI+JHthcnRJbWd9PC9hPmA7XG4gICAgICAgICAgYXJ0Q2FwdCA9IGA8ZGl2IGNsYXNzPVwiY2FwdGlvblwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0XCI+JHt2YWx1ZS5zdW1tYXJ5X3Nob3J0fVwiPC9wPlxuICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgYXJ0SXRlbXMgKz0gYDxsaT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICR7YXJ0VXJsfVxuICAgICAgICAgICAgICAke2FydENhcHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2xpPmA7XG4gICAgICAgIH0gLy8gY2xvc2UgbW92aWVzIGlmIHN0YXRlbWVudFxuXG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdGVkID09PSAnYm9va3MnKSB7XG4gICAgICAgICAgbGV0IGF1dGhvciA9ICc8aDMgY2xhc3M9XCJhdXRob3JcIj5cIicgKyB2YWx1ZS5hdXRob3IgKyAnXCI8L2gzPjwvZGl2Pic7XG4gICAgICAgICAgbGV0IGFyclVybCA9ICcnO1xuICAgICAgICAgIGFyclVybCA9IHZhbHVlLnN1bmRheV9yZXZpZXdfbGluaztcbiAgICAgICAgICBhcnRVcmwgPSBgPGEgaHJlZj1cIiR7YXJyVXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPmA7XG4gICAgICAgICAgYXJ0VGl0bGUgPSBgPGRpdiBjbGFzcz13b3Jkcz5cbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+JHthcnRVcmx9JHt2YWx1ZS50aXRsZX08L2E+PC9oMj5gO1xuICAgICAgICAgIGFydENhcHQgPSBgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dFwiPiR7dmFsdWUuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgYXJ0SXRlbXMgKz0gYDxsaT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICR7YXJ0VGl0bGV9XG4gICAgICAgICAgICAgICR7YXV0aG9yfVxuICAgICAgICAgICAgICAke2FydENhcHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2xpPmA7XG4gICAgICAgIH0gLy8gIGNsb3NlIGJvb2sgcmV2aWV3cyBpZiBzdGF0ZW1lbnRcbiAgICAgIH0pOyAvLyBjbG9zZSAuZWFjaFxuICAgICAgJGFydExpc3QuYXBwZW5kKGFydEl0ZW1zKTtcbiAgICAgIGxldCBtZWRpYUhlaWdodCA9ICQoJy5tZWRpYS1jb250YWluZXInKSxcbiAgICAgICAgICBuZXdIZWlnaHQgPSBvbGRIZWlnaHQgKyBtZWRpYUhlaWdodDtcbiAgICAgIGhlaWdodFBILnN0eWxlID0gbmV3SGVpZ2h0O1xuICAgIH0pIC8vIGNsb3NlIC5kb25lXG4gICAgLmZhaWwgKGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoIHNlbGVjdGVkID09PSAnLS10b3Agc3Rvcmllcy0tJyB8fCAnLS1zZWN0aW9ucy0tJyApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgYWxlcnQoJ2ZhaWx1cmUgdG8gbG9hZC4gIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQobG9hZGluZygpLCAxMDAwKTtcbiAgICB9KVxuICB9KTsgXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9zcmMvY3VwLWEtam9lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
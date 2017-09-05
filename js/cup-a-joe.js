'use strict';

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
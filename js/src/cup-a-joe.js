const menu = $('.selector'),
      heightPH = $('#everything'),
      aPIKey = 'ea94cfe26458489e895da92d99390de0';

let artTitle, artItems, artCapt, artUrl, author, director, artList, artDescript, $artList = $('.articles'),
    nYTUrl, arrImg = '',
    artImg = [],
    oldHeight = heightPH,
    clickCount = 0;

function loading() {
  $('.load').toggleClass('loaded');
  $('.load-screen').toggleClass('loaded-screen');
  $('.load-wrapper').toggleClass('loaded-wrapper');
}

loading();

menu.change((event) => {
  event.preventDefault();

  loading();
  
  let selected = $('.selector').val();
  
  if (clickCount === 0 && selected !== '--top stories--' && selected !== '--selection--'){

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
  }// close books if statement

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
  
  .done(function(data){
    let artData = '',
        filterData = '',
        artData2 = [],
        i=0;

    artImg = '';

    artData = data.results;

    $.each(artData, (key, value) => {
    if(selected != 'books' && selected != 'movies' && selected != '--top stories--' && selected != '--sections--'){

      artImg = value.multimedia;

      if (artImg.length > 1){
        artData2.push(data.results[i]);
        artData = artData2.slice(0, 12);
        i++;
      }
      else {
        i++;
      }
    } // close set top stories variables IF statement

    else if (selected === 'books'){

      artDescript = value.description;

      if (!!artDescript && typeof artDescript != undefined){
        artData2.push(data.results[i]);
        artData = artData2.slice(0, 12);
        i++;
      }
      else {
        i++;
      }
    } //  close set books variables IF statement

    else if (selected === 'movies'){

      artImg = value.multimedia;

      if (!!artImg && typeof artImg === 'object'){
        artData2.push(data.results[i]);
        artData = artData2.slice(0, 12);
        i++;
      }
      else {
        i++;
      }
    } //  close set movies variables IF statement
    
    })
    $.each(artData, (key, value) => {
      if (selected != 'books' && selected != 'movies' && selected != '--top stories--' && selected != '--sections--') {
        artImg = value.multimedia[4].url;
        artUrl = `<a href="${value.url}" target="_blank"><div class="article-image" style="background:url(${artImg}) center; background-size: cover;"></div></a>`;
        artCapt = `<div class="caption">
          <p class="text">${value.abstract}</p>
        </div>`;
        artItems += `<li>
          <div class="art-container">
            ${artUrl}
            ${artCapt}
          </div>
        </li>`;
      } //  close top stories else statement

      else if (selected === 'movies') {
        artImg = `<img src="${value.multimedia.src}">`;
        artUrl = `<a href="${value.link.url}"target="_blank">${artImg}</a>`;
        artCapt = `<div class="caption">
          <p class="text">${value.summary_short}"</p>
        </div>`;
        artItems += `<li>
          <div class="art-container">
            ${artUrl}
            ${artCapt}
          </div>
        </li>`;
      } // close movies if statement

      else if (selected === 'books') {
        let author = '<h3 class="author">"' + value.author + '"</h3></div>';
        let arrUrl = '';
        arrUrl = value.sunday_review_link;
        artUrl = `<a href="${arrUrl}" target="_blank">`;
        artTitle = `<div class=words>
          <h2 class="title">${artUrl}${value.title}</a></h2>`;
        artCapt = `<div class="caption">
          <p class="text">${value.description}</p>
        </div>`;
        artItems += `<li>
          <div class="art-container">
            ${artTitle}
            ${author}
            ${artCapt}
          </div>
        </li>`;
      } //  close book reviews if statement
    }); // close .each
    $artList.append(artItems);
    let mediaHeight = $('.media-container'),
        newHeight = oldHeight + mediaHeight;
    heightPH.style = newHeight;
  }) // close .done
  .fail (function(){
    alert('failure to load.  Please try again.');
    location.reload();
  })
  .always(loading());
}); 

$(document).ready();
// alert('java script is kinda working');// set background to 'colour' to know that javascript is working

var menu = $('.selector');
var aPIKey = 'ea94cfe26458489e895da92d99390de0';
var artItems, artImg, artCapt, artUrl, artList = $('.articles');
var nYTUrl = '';

menu.change( function(event) {
  event.preventDefault();

  var selected = $('.selector').val();

  artList.empty();

  if (selected === 'books') {
    alert( 'books has been clicked and listened too' );
    nYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    console.log(nYTUrl);
  }
  else if (selected === 'community') {
    alert( 'community has been clicked and listened too');
    nYTUrl = 'http://api.nytimes.com/svc/community/v3/user-content/recent.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    console.log(nYTUrl);
  }
  else if (selected === 'movies') {
    alert( 'movies has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    console.log(nYTUrl);
  }
  else if (selected === 'top stories'){
    alert('top stories has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/topstories/v2/opinion.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    console.log(nYTUrl);
  }
  

  $.ajax ({
    method: 'GET',
    url: nYTUrl,
    dataType: 'json'
  })
  .done(function(data){

    var artData = data.results;
    console.log(artData);
    $.each(artData, function(key, value){

      // artUrl += '<a href="' + value.multimedia.url + '"</a>';
      // console.log(artUrl);
      artImg = '<img src="' + value.multimedia.src + /* + artUrl + */'"/>';
      console.log(artImg);
      artCapt = '<p>' + value.summary_short + '"</p>';
      console.log(artCapt);

      artItems += '<li>' + artImg + artCapt + '</li>';

      console.log(artItems);

    }); // close .each
    artList.append(artItems);
  }) // close .done
  .fail (function(){
    alert('failure to load.  Please try again.')
  }); // close .fail
}); // close .change
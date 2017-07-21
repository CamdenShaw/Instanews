// alert('java script is kinda working');// set background to 'colour' to know that javascript is working

var menu = $('.selector');
var aPIKey = 'ea94cfe26458489e895da92d99390de0';
var artImg, artCapt, artUrl = $('.articles');
var nYTUrl = '';

menu.change( function(event) {
  event.preventDefault();

  var selected = $('.selector').val();

  if (selected === 'books') {
    alert( 'books has been clicked and listened too' );
    nYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
  }
  else if (selected === 'community') {
    alert( 'community has been clicked and listened too');
    nYTUrl = 'http://api.nytimes.com/svc/community/v3/user-content/recent.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
  }
  else if (selected === 'movies') {
    alert( 'movies has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
  }
  else if (selected === 'top stories'){
    alert('top stories has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/topstories/v2/opinion.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
  }

  $ajax ({
    method: 'GET',
    url: nYTUrl
  })
  .done(function(data){

    var artData = data.results;
    console.log(artData);
    $.each(artData, function(key, value){

      // artImg = ;
      // artCapt = ;
      // artUrl = ;

    });// close .each

  })// close .done
});// close .change
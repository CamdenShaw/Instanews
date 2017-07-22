// alert('java script is kinda working');// set background to 'colour' to know that javascript is working

var menu = $('.selector');
var aPIKey = 'ea94cfe26458489e895da92d99390de0';
var artItems, artTitle, artImg, artCapt, artUrl, artList = $('.articles');
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
    //console.log(nYTUrl);
  }
  else if (selected === 'community') {
    alert( 'community has been clicked and listened too');
    nYTUrl = 'http://api.nytimes.com/svc/community/v3/user-content/recent.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    //console.log(nYTUrl);
  }
  else if (selected === 'movies') {
    alert( 'movies has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    //console.log(nYTUrl);
  }
  else if (selected === 'top stories'){
    alert('top stories has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/topstories/v2/opinion.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });
    //console.log(nYTUrl);
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
      if (selected === 'books') {
        // var author = '<p>"' + value.author + '"</p>';
        var arrUrl = value.sunday_review_link;
        // artUrl = '<a href="' + arrUrl.slice(5) + '" target="_blank">';
        console.log(arrUrl);
        // artTitle = '<p>' + artUrl + value.title + '</a></p>';
        // artCapt = '<p>' + value.description + '</p>';

        // artItems += '<li>' + artTitle + author + artCapt + '</li>';
        //console.log(artItems);
      }
      else if (selected === 'community') {

      }
      else if (selected === 'movies') {
        artImg = '<img src="' + value.multimedia.src + '"/>';
        //console.log(artImg);
        artUrl = '<a href="' + value.link.url + '"target="_blank">' + artImg + '</a>';
        //console.log(artUrl);
        artCapt = '<p>' + value.summary_short + '"</p>';
        //console.log(artCapt);

        artItems += '<li>' + artUrl + artCapt + '</li>';

        //console.log(artItems);
      }
      else if (selected === 'top stories') {

      }
    }); // close .each
    artList.append(artItems);
    // console.log(arrUrl);
  }) // close .done
  .fail (function(){
    alert('failure to load.  Please try again.')
  }); // close .fail
}); // close .change
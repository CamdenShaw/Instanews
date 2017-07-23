// alert('java script is kinda working');// set background to 'colour' to know that javascript is working

var menu = $('.selector');
var aPIKey = 'ea94cfe26458489e895da92d99390de0';
var artItems, artTitle, artImg, artCapt, artUrl, author, director, artList, $artList = $('.articles');
var nYTUrl, arrImg = '';

menu.change( function(event) {
  event.preventDefault();

  var selected = $('.selector').val();

  $artList.empty();
  artList, artItems = '';

  if (selected === 'books') {
    alert( 'books has been clicked and listened too' );
    nYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    }); // close parameters declaration

    

    //console.log(nYTUrl);
  }// close books if statement

  else if (selected === 'community') {
    alert( 'community has been clicked and listened too');
    nYTUrl = 'http://api.nytimes.com/svc/community/v3/user-content/recent.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    });  // close parameters declaration
    //console.log(nYTUrl);
  } //close community if statement

  else if (selected === 'movies') {
    alert( 'movies has been clicked and listened too');
    nYTUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    }); // close parameters
    //console.log(nYTUrl);
  } //  close movies if statement

  else {
    alert('top stories has been clicked and listened too');

    nYTUrl = 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json';
    nYTUrl += '?' + $.param({
      'api-key': aPIKey
    }); // close parameters declaration
    //console.log(nYTUrl);
  } //  close top stories if statement
  
  $.ajax ({
    method: 'GET',
    url: nYTUrl,
    dataType: 'json'
  }) // close ajax declaration
  .done(function(data){
    var artData = '';
    var filterData = '';

      function filterItems(query) {
        return filterData.filter(function(el) {
          return el.toString().toLowerCase().indexOf(query.toLowerCase()) > -1;
        }) // close function in 1st return
      } //  close query function

    filterData = data.results;
    artData = filterItems('', null, 'undeclared', undefined, 0, '0');
    console.log(artData);

    

    $.each(artData, function(key, value){


        if (selected !== 'books' || selected !== 'community' || selected !== 'movies' || selected !== '--top stories--' || selected !== '--section--' ) {
          // var array = value.multimedia;
          // arrImg = array.slice(0,1);
          // console.log(arrImg);

          artImg = value.multimedia[4].url;
          console.log(artImg);
          // console.log(filterItems('a'));
          //console.log(artImg);
          artUrl = '<a href="' + value.url + '"target="_blank"><img src="' + artImg + '"</img></a>';
          //console.log(artUrl);
          artCapt = '<p>' + value.abstract + '</p>';
          //console.log(artCapt);

          artItems += '<li>' + artUrl + artCapt + '</li>';

          //console.log(artItems);
        } //  close top stories else statement
      else if (selected === 'community') {

      } //  community

      else if (selected === 'movies') {
        artImg = '<img src="' + value.multimedia.src + '"/>';
        //console.log(artImg);
        artUrl = '<a href="' + value.link.url + '"target="_blank">' + artImg + '</a>';
        //console.log(artUrl);
        artCapt = '<p>' + value.summary_short + '"</p>';
        //console.log(artCapt);

        artItems += '<li>' + artUrl + artCapt + '</li>';

        //console.log(artItems);
      } // close movies if statement

      else if (selected === 'books') {
        var author = '<p>"' + value.author + '"</p>';
        var arrUrl = '';
        arrUrl = value.sunday_review_link;
        if (arrUrl !== 0 || arrUrl !== null || arrUrl !=='' || arrUrl !== 'undefined') {
          artUrl = '<a href="' + arrUrl + '" target="_blank">';
          console.log(arrUrl);
          artTitle = '<p>' + artUrl + value.title + '</a></p>';
          artCapt = '<p>' + value.description + '</p>';
          artItems += '<li>' + artTitle + author + artCapt + '</li>';
          //console.log(artItems);
        }
        else {
          arrUrl = '';
        }

      } //  close book reviews if statement
      else {

      }

    }); // close .each

    $artList.append(artItems);
    // console.log(arrUrl);
  }) // close .done

  .fail (function(){
    alert('failure to load.  Please try again.')
  }); // close .fail
}); // close .change
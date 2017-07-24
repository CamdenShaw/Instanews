// alert('java script is kinda working');// set background to 'colour' to know that javascript is working

var menu = $('.selector');
var aPIKey = 'ea94cfe26458489e895da92d99390de0';
var artTitle, artItems, artCapt, artUrl, author, director, artList, artDescript, $artList = $('.articles');
var nYTUrl, arrImg = '';
var artImg = [];

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
    artImg = '';
    var filterData = '';
    var artData2 = [];
    var i=0;

    artData = data.results;
    //console.log(artData);

    // function filterItem (item){
    //     return item.toString().length > 0;
    //   }

    $.each(artData, function(key, value){
    if(selected != 'books' && selected != 'movies' && selected != '--top stories--' && selected != '--sections--'){

      artImg = value.multimedia;

      console.log(artImg.length);

      if (artImg.length > 1){
        artData2.push(data.results[i]);
        artData = artData2.slice(0, 12);
        i++;
      }
      else {
        i++;
      }
      console.log('count', i, 'art', artData, 'art2', artData2);

      console.log('art',artData);
    } // close set top stories variables IF statement

    else if (selected === 'books'){

      artDescript = value.description;

      //console.log('length', artDescript.length);

      if (!!artDescript && typeof artDescript != undefined){
        artData2.push(data.results[i]);
        artData = artData2.slice(0, 12);
        i++;
      }
      else {
        i++;
      }
      console.log('count', i, '/nart', artData, '/nart2', artData2);
    } //  close set books variables IF statement

    else if (selected === 'movies'){

      artImg = value.multimedia;

      //console.log(artImg.length);

      if (!!artImg && typeof artImg === 'object'){
        artData2.push(data.results[i]);
        artData = artData2.slice(0, 12);
        i++;
      }
      else {
        i++;
      }
      //console.log('count', i, '/nart', artData, '/nart2', artData2);

      //console.log('art',artData);
    } //  close set movies variables IF statement
    
    })
    $.each(artData, function(kay, value){
        if (selected != 'books' && selected != 'movies' && selected != '--top stories--' && selected != '--sections--') {

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
        var author = '<h3>"' + value.author + '"</h3>';
        var arrUrl = '';
        arrUrl = value.sunday_review_link;
          artUrl = '<a href="' + arrUrl + '" target="_blank">';
          console.log(arrUrl);
          artTitle = '<h2>' + artUrl + value.title + '</a></h2>';
          artCapt = '<p>' + value.description + '</p>';
          artItems += '<li>' + artTitle + author + artCapt + '</li>';
          //console.log(artItems);

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
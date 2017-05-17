// Asynchronous Flickr Search
$(document).on('ready', function(){  //function that executes once document has loaded
    var searchImages = function(tags) { //function for taking user's search terms and sends them to Flickr
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; //Flickr APT link

    $.getJSON(flickrAPI, { //call to Flickr allowing users to search with tags
      tags: tags,
      tagmode: "any",
      format: "json",
    }).done(function(data) { //displays and freshes content
      $("#images").empty();
      $.each(data.items, function(i, item) {
        var newListItem = $('<li>').addClass("col-md-4");  //adds items to a list inside of the images class and uses bootstrap to make a grid
        var newTitle = $('<p class = "image-title">').html(item.title).appendTo(newListItem); //adds the title of the image above image
        var newDate = $('<p class = "image-date">').text(item.date_taken).appendTo(newListItem); //adds another container that holds the data of the image
        var newDescription = $('<p class = "image-description">').html(item.description).appendTo(newListItem); //here is one for the description of image
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').addClass("flickr-link btn btn-sm").appendTo(newListItem); //adds the link to take user to Flickr
        //button for making image larger
        var newButton = $("<button class='btn btn-sm btn-primary'> Enlarge</button>").attr({ 
          "data-title": item.title, //gets title of image
          "data-toggle": "modal", // adds a jQuery modal
          "data-target": "#infoModal", //adds data to infoModal class
          "data-imgsrc": item.media.m, // adds image source
          "data-description": item.description, //gets description
          "type": "button" 
        }).appendTo(newListItem); //This makes everything in the newButton work
        $(newListItem).appendTo('#images'); //adds listitem to the images class
        if (i === 15) {
          return false;
        }
      });
    });
  };
    //function for when search button is clicked
    $('button.search').on('click', function(event) { 
      event.preventDefault();
      var searchValue = $(event.target.parentElement).find('input[name = "searchText"]')[0]; //parameter for search that is looking for tags that is inside of the field searchText
      searchImages(searchValue.value);
    });
});
var Trackster = {};
const API_KEY = 'ae8e08d1da1c31090107c383d0a059d4';

$(document).ready(function() {
  $('#search-button').click( function() {
    var inputBox = $('#search-input').val();
    Trackster.searchTracksByTitle(inputBox);
});
  $('#search-input').on('keypress', function(event){
    if(event.keyCode == 13){
      $('#search-button').click( function() {
        var inputBox = $('#search-input').val();
        Trackster.searchTracksByTitle(inputBox);
      });
    }
  })
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  /* console.log(tracks); */
  $('#song-list').empty();
  for (var i=0; i<tracks.length; i++) {
    var mediumAlbumArt = tracks[i].image[1]["#text"];
    var $trackRow = $(''+
    '<div class="row track">'+
    ' <div class="col-xs-1 col-xs-offset-1 play-button">'+
    '    <a href="'+tracks[i].url+'"><i class="fa fa-play-circle-o fa-2x"></i></a>'+
    '  </div>'+
    '  <div class="col-xs-4">'+tracks[i].name+'</div>'+
    '  <div class="col-xs-2">'+tracks[i].artist+'</div>'+
    '  <div class="col-xs-2"><img src="'+mediumAlbumArt+'" /></div>'+
    '  <div class="col-xs-2">'+tracks[i].listeners.number+'</div>'+
    '</div>');
    $('#song-list').append($trackRow);
  }
};
 var $something = $('<div class="row"></div>')
/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
      datatype: 'jsonp',
      success: function(response) {
        Trackster.renderTracks(response.results.trackmatches.track);
      }
    });
};

$(document).ready(function() {
  // api base url
  var api = "https://api.twitch.tv/kraken/";
  //channels list
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "medrybw", "brunofin", "comster404", "rocketbeanstv"];

  $.each(channels, function(i, username) {
    var output;
    
    $.getJSON(api + "streams/" + username, function(result) {
      // check if each channel is streaming
      var streaming = result.stream;
      // if streaming get details to put into display and show as online and current show
      if (streaming !== null) {

        $.getJSON(api + "channels/" + username, function(result) {
          $.each(result, function(index, data) {

            output = "<div class='online'><a target='_blank' href='" + result.url + "'" + result.name + "' class='list-group-item list-group-item-success'><img src='" + result.logo + "'alt='" + result.name + "'width='50' height='50'>" + " " + result.display_name + "<span class='glyphicon glyphicon-ok'></span>" + "<p>Now streaming - " + result.game + "</p></a></div>";

          });
          $(".list-group").append(output);
        });
      } else {
        // if not streaming get details and show as offline
        $.getJSON(api + "channels/" + username, function(result) {
          $.each(result, function(index, data) {

            output = "<div class='offline'><a target='_blank' href='" + result.url + "'" + result.name + "' class='list-group-item list-group-item-danger'><img src='" + result.logo + "'alt='" + result.name + "'width='50' height='50'>" + " " + result.display_name + "<span class='glyphicon glyphicon-remove'></span></a></div>";

          });
          $(".list-group").append(output);
        });

      }
    });
  });

  // menu functions
  
  
  $("#allButton").click(function() {
    $(".online").css("display", "");
    $(".offline").css("display", "");
    $("this").addClass("active");
    $("#onlineButton #offlineButton").removeClass("active");
  })
  $("#onlineButton").click(function() {
    $(".offline").css("display", "none");
    $(".online").css("display", "");
    $("this").addClass("active");
    $("#allButton #offlineButton").removeClass("active");
  });
  $("#offlineButton").click(function() {
    $(".online").css("display", "none");
    $(".offline").css("display", "");
    $("this").addClass("active");
    $("#allButton #onlineButton").removeClass("active");
  });

  //search function
  
  //expression to make search case insensitive
  jQuery.expr[':'].Contains = function(a,i,m){
		  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	  };
  
  $("input").change(function() {
      //get the value of the input field
      var filter = $(this).val();
      //show all if no input
      if (filter) {
        //hide elements that don't match
        $("#channel-list").find("a:not(:Contains(" + filter + "))").parent().slideUp();
        //find the search string
        $("#channel-list").find("a:Contains(" + filter + ")").parent().slideDown();
      } else {
        //show all
        $("#channel-list").find("div").slideDown();
      }
      return false;
    })
    .keyup(function() {
      $(this).change();
    })
});
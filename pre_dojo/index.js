
var jsdom = require("jsdom");
var _ = require('underscore');

var seats = [["A",4],["B",4],["C",4],["D",4],["E",4]];

var seating = function(users, seats){
  var seatedUsers = [];

  var i = 0;
  users.forEach(function(user) {
    if (!seatedUsers[i]) seatedUsers[i] = [seats[i][0], []];
    while (true) {
      if (seatedUsers[i][1].length < seats[i][1]) {
        seatedUsers[i][1].push(user);
        i++;
        i = i % seats.length;
        break;
      }
      i++;
      i = i % seats.length;
    }
  });
  return  seatedUsers;
}

jsdom.env(
  "http://connpass.com/event/1801/",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    var $ = window.$;
    var participant_area = $(".side_article_area").first();
    var users = [];
    $(".user a", participant_area).each(function () {
      users.push($(this).text());
    });

    var shuffledUsers = _.shuffle(users);
    var seatedList = seating(shuffledUsers, seats);

    console.log(_.shuffle(users));
    console.log(seatedList);
    console.log("count = ", users.length);
  }
);

var jsdom = require('jsdom');
var _ = require('underscore');

var teamList = require('./teamList');

jsdom.env(
  'http://connpass.com/event/1664/',
  ['http://code.jquery.com/jquery.js'],
  function(errors, window) {
    var $ = window.$;
    var $participantArea = $('.side_article_area').first();

    var resources = [];

    $participantArea.find('.participant_list_article').each(function() {
      var src = $(this).find('img').attr('src');
      if (src[0] === '/') {
        src = 'http://connpass.com' + src;
      }

      var username = $(this).find('.user').text();
      username = username.replace(/^[ \n]+|[ \n]+$/g, '');

      resources.push({
        name: username,
        icon: src
      });
    });

    _.each(teamList, function(list, teamName) {
      var nameWithIcon = _.map(list, function(name) {
        var user = _.findWhere(resources, {name: name});
        if (user) {
          return name + ' ' + '![](' + user.icon + ')';
        } else {
          console.log('* skip - %s', name);
        }
      });
      console.log('| ' + teamName + ' | ' + nameWithIcon.join(' | ') + ' |');
    });
  }
);

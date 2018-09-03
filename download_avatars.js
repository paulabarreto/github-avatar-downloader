var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: secret
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    var avatar = [];
    obj.forEach(function(user){
      avatar.push(user.avatar_url);
    })
    cb(err, avatar);

  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  if(err){
    console.log('error');
  }
  console.log(result);
});

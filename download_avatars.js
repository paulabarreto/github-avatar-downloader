var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + secret["GITHUB_TOKEN"]
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    obj.forEach(function(user){
      cb(err, user.avatar_url, `./avatar/${user.id}.jpg`);
    })

  });

}

getRepoContributors("jquery", "jquery", function(err, avatarUrl, filePath) {
  downloadImageByURL(avatarUrl, filePath);
});

function downloadImageByURL(avatarUrl, filePath) {
  request.get(avatarUrl)
  .on('error', function(err){
    console.log('error!');
  })
  .on('response', function (response) {
       response.on('end', function(){
         console.log('Download complete.');
       })
     })

  .pipe(fs.createWriteStream(filePath))
}

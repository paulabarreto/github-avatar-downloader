var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

var repoOwner = "";
var repoName = "";
repoOwner += process.argv[2];
repoName += process.argv[3];


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

getRepoContributors(repoOwner, repoName, function(err, avatarUrl, filePath) {
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

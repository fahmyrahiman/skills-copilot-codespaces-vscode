// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

var server = http.createServer(function(req, res) {
  var parseUrl = url.parse(req.url, true);
  var pathName = parseUrl.pathname;
  if (pathName === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        res.end('404 Not Found');
      } else {
        res.end(data);
      }
    });
  } else if (pathName === '/post') {
    var comment = parseUrl.query;
    comments.push(comment);
    res.end(JSON.stringify(comments));
  } else {
    fs.readFile('.' + pathName, function(err, data) {
      if (err) {
        res.end('404 Not Found');
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(3000, function() {
  console.log('listening on 3000');
});
```

###
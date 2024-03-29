//From:http://blog.modulus.io/build-your-first-http-server-in-nodejs
//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');

//Define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
//This is the entry point to the server.
function handleRequest(request, response){
  try {
    //log the request on console
    console.log(request.url);
    //dispatch
    dispatcher.dispatch(request, response);
  } catch (err) {
    console.console.log(err);
  }

  //For all your static (js/css/images/etc.) set the directory name (relative path).
  dispatcher.setStatic('resources');

  //A sample GET request
  dispatcher.onGet("/page1", function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Page One');
  });

  //A sample POST request
  dispatcher.onPost("/post1", function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Got Post Data');
  });

    //response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

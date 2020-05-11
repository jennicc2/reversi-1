/*include static file webserver library */
var static = require('node-static');
/*include http server library */
var http = require('http');

/*assumption run on heroku*/
var port = process.env.PORT;
var directory = __dirname + '/public';

/*not on heroku so adjust port and directory*/
if(typeof port == 'undefined' || !port){
	directory = './public';
	port = 8080;
}

/*set up static web server to deliver the files */
var file = new static.Server(directory);

/*construct http server to get files from server */
var app = http.createServer(
	function(request,response){
		request.addListener('end',
			function(){
				file.serve(request,response);
			}
		).resume();
	}
).listen(port);

console.log('The server is running');


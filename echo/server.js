"use strict";
var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

// 1. Echo sockjs server
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);

var theThing = null;



sockjs_echo.on('connection', function(conn) {
    var replaceThing = function () {
        var originalThing = theThing;
        var unused = function () {
            if (originalThing)
                console.log("hi");
        };
        theThing = {
            longStr: new Array(1000000).join('*'),
            someMethod: function () {
                console.log(someMessage);
            }
        };
    };
    setInterval(replaceThing, 1000);


    conn.on('data', function(message) {
        console.log(message);
        setInterval(()=>{
            conn.write(JSON.stringify(process.memoryUsage()));
        },1000)
    });
});

// 2. Static files server
var static_directory = new node_static.Server(__dirname);

// 3. Usual http stuff
var server = http.createServer();
server.addListener('request', function(req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function(req,res){
    res.end();
});

sockjs_echo.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:9999' );
server.listen(9999, '0.0.0.0');

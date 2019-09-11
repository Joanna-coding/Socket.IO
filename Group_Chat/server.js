var express = require("express");
var path = require("path");
var session = require("express-session")
var bodyParser = require('body-parser');
var app = express();
app.use(session({ secret: 'myname' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render("index", {key: messages});
})

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});

let messages = [];


var io = require('socket.io').listen(server);
io.on("connection", function(socket){
    socket.on("creatuser", function(data){

    })

    socket.on("createmessage", function(data){
        let a= data.name;
        let b= data.message;

        messages.push({
            name:a,
            message:b
        })


        io.emit("updated_message", {
            name: data.name,
            message:data.message,
            allmassages:messages
        })
    })

})
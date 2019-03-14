var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var request = require("request");
var port = process.env.PORT || 80;

// app.get('/api', (req, res) => res.send('Hello World!'));


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.post('/api', function(req, res){
    // res.send('Hello World!');
    console.log(req.body.txref);
    request.post(
        {
            url:'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify',
            json: {
            txref:req.body.txref,
            SECKEY: "FLWSECK-61037cfe3cfc53b03e339ee201fa98f5-X"
                },
            headers: {
                'Content-Type': 'application/json'
            }
        },
      function(error, response, body){
        if (error) {
            return console.error('Error Occurred:', error);
        }
        console.log(response.statusCode);
        console.log(body);
        res.send(body);
      });
});

app.listen(port, err => {
    if(err) {
        console.error(err);
    }else {
        console.log('App listening on port %s', port);
    }
})
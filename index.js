
//libraries include
var express=require('express');
var fs = require('fs');
var getLine = require('get-line');
var bodyParser = require("body-parser");

var request = require('request');
var app=express();

app.use(bodyParser.json()); //for fetching the data hidden in body packet eg. POST request form data or JSON
app.use(bodyParser.urlencoded({extended: true}));

// // public middleware for front-end
app.use(express.static("public"));

var newcsv;
global.newcsv;

  //collecting Agg.api data
app.get("/set",function (req,res) {
    console.log("Aggregation api call");
    res.send("Aggregation Api flow");





    //for callback first
    var options1 = {
        headers: {'Authorization':'Basic M2I0YmY3MjliMjYwMjA6YmM1NjdkMzBiNDc3OTc='},
        url: 'https://sandbox.watershedlrs.com/api/organizations/4521/aggregation/csv?config={"filter":{"groupTypeNames": null ,"activityIds":null,"personIds":null,"groupIds":null,"dateFilter":null},"dimensions":[{"type":"STATEMENT_PROPERTY","statementProperty":"result.durationCentiseconds"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.email"},{"type":"STATEMENT_PROPERTY","statementProperty":"context.contextActivities.parent.id"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.id"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.name"},{"type":"TIME","timePeriod":"CUSTOM","format": "ha"}],"measures":[{"name":"Interaction Count","valueProducer":{"statementProperty":"id","type":"STATEMENT_PROPERTY"},"aggregation":{"type":"COUNT"}}]}'

};
    request(options1, callback1);

    function callback1(error, response, body) {
        if (!error) {
            //console.log(body);
            var lines = body.split('\n')
            lines.splice(1, 1);
             newcsv = lines.join('\n');
            console.log(newcsv);

        } else {
            console.log("error with first call back");
        }

    }



/*
    var options2;
    options2 = {
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'neuron-application': '63aa7e3d040c3aa3eca58680ff5330a661628f2a',
            'neuron-application-key': '9'
        },
        url: 'http://34.233.93.143/1.0/datasets/'
        //body: 'newcsv'
    };
    request(options2,callback2);
    function callback2(error, response, body) {
        if (error) {
            console.log("error with second call back");
        } else {
            console.log("response of second callback " + response);
        }

    }
  */

});

app.get("/post",function (req,res) {
    console.log("POST data to analytics Engine");
    res.send("posting data to analytics engine");

    request.post({
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'neuron-application': '63aa7e3d040c3aa3eca58680ff5330a661628f2a',
            'neuron-application-key': '9'
        },
        url: 'http://34.233.93.143/1.0/datasets/',
        body: {'file':newcsv}
    }, function(error, response, body){
        console.log(body);
    });


});

app.get("/version",function (req,res) {
    console.log("checking for version...");

    request.get({
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'neuron-application': '63aa7e3d040c3aa3eca58680ff5330a661628f2a',
            'neuron-application-key': '9'
        },
        url: 'http://34.233.93.143/1.0/about/versioninfo',
    }, function(error, response, body){
        console.log(body);
    });


});



//deployment on server
var port=process.env.PORT || 3007;
app.listen(port,function (req,res) {
    console.log("server started");


})


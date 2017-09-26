
//libraries include
var express=require('express');
var fs = require('fs');
var util = require('util');
var CSV = require('csv-string');
var jsonparser = require('jsonparser');
var http = require("http");
var csv=require('csv-parser');
var json2csv=require('json2csv');

var FormData = require('form-data');
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
    console.log("getting aggregated data from LRS.....");
    res.send("Aggregation Api flow");


    //for callback first
    var options1 = {
        headers: {'Authorization':'Basic M2I0YmY3MjliMjYwMjA6YmM1NjdkMzBiNDc3OTc='},
        url: 'https://sandbox.watershedlrs.com/api/organizations/4521/aggregation/csv?config={"filter":{"groupTypeNames": null ,"activityIds":null,"personIds":null,"groupIds":null,"dateFilter":null},"dimensions":[{"type":"STATEMENT_PROPERTY","statementProperty":"timestamp"},{"type":"STATEMENT_PROPERTY","statementProperty":"stored"},{"type":"STATEMENT_PROPERTY","statementProperty":"result.durationCentiseconds"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.email"},{"type":"STATEMENT_PROPERTY","statementProperty":"context.contextActivities.parent.id"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.id"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.name"},{"type":"TIME","timePeriod":"CUSTOM","format": "ha"}],"measures":[{"name":"Interaction Count","valueProducer":{"statementProperty":"id","type":"STATEMENT_PROPERTY"},"aggregation":{"type":"COUNT"}}]}'
};
    request(options1, callback1);

    function callback1(error, response, body) {
        if (!error) {
            let lines = body.split('\n');
            lines.splice(1, 1);
            newcsv = lines.join('\n');
            console.log(newcsv);


        } else {
            console.log("error with first call back");
        }

    }
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
        res.send(body)
    });

});

app.get("/data",function (req,res) {
    console.log("Existing datasets...");

    request.get({
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'neuron-application-id': '63aa7e3d040c3aa3eca58680ff5330a661628f2a',
            'neuron-application-key': '9'
        },
        url: 'http://34.233.93.143/1.0/datasets',
    }, function(error, response, body){
        console.log(body);
        res.send(body);

    });

});
app.get("/writefile",function (req,res) {

    fs.writeFile('newfile.csv',newcsv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });




});


app.get("/up",function (req,res) {


    console.log("uploading dataset...please wait");
    var options = { method: 'POST',
        url: 'http://10.76.2.96:8080/analytics/1.0/datasets/sample4/data',
        headers:
            {   'cache-control': 'no-cache',
                'neuron-application-key': 'analytics',
                'neuron-application-id': 'analytics',
                'accept': 'application/json',
                'content-type': 'multipart/form-data' },
        formData:
            { file:
                { value: fs.createReadStream("newfile.csv"),
                    options: { filename: 'newfile.csv', contentType: null } } } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(fs.createReadStream("num.csv"));
        console.log(body);
        res.send('data going');

    });

});



//deployment on server
var port=process.env.PORT || 3026;
app.listen(port,function (req,res) {
    console.log("server started");


})


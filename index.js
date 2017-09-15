
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

var csv;
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
        if (error) {
            console.log("error with first call back");
        } else {
            //console.log(body);
            var lines = body.split('\n')
            lines.splice(1,1);
            var newcsv=lines.join('\n');

        }
        if(newcsv!=null){

            console.log("service 1 works good");
            console.log(newcsv);

        var options2;
        options2 = {
            headers: {
                'Accept': 'application/json',
                'neuron-application': '63aa7e3d040c3aa3eca58680ff5330a661628f2a',
                'neuron-application-key': '9'
            },
            url: 'http://34.233.93.143/1.0/datasets/PLMS_datsets',
            body: 'newcsv'
        };

        request(options2,callback2);
            function callback2(error, response, body) {
                if (error) {
                    console.log("error with second call back");
                } else {
                    console.log("response of second callback" +response);
                }
            }

    }}

})
//deployment on server
var port=process.env.PORT || 3006;
app.listen(port,function (req,res) {
    console.log("server started");


})


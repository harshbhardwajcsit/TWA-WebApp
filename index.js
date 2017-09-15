
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
  //collecting Agg.api data
app.get("/set",function (req,res) {
    console.log("Aggregation api call");
    res.send("Aggregation Api flow");

    var options = {
        headers: {'Authorization':'Basic M2I0YmY3MjliMjYwMjA6YmM1NjdkMzBiNDc3OTc='},
        url: 'https://sandbox.watershedlrs.com/api/organizations/4521/aggregation/csv?config={"filter":{"groupTypeNames": null ,"activityIds":null,"personIds":null,"groupIds":null,"dateFilter":null},"dimensions":[{"type":"STATEMENT_PROPERTY","statementProperty":"result.durationCentiseconds"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.email"},{"type":"STATEMENT_PROPERTY","statementProperty":"context.contextActivities.parent.id"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.id"},{"type":"STATEMENT_PROPERTY","statementProperty":"actor.person.name"},{"type":"TIME","timePeriod":"CUSTOM","format": "ha"}],"measures":[{"name":"Interaction Count","valueProducer":{"statementProperty":"id","type":"STATEMENT_PROPERTY"},"aggregation":{"type":"COUNT"}}]}'

};
    request(options, callback);

    function callback(error, response, body) {
        if (error) {
            console.log("NO error");
        } else {
            console.log(body);
            var lines = body.split('\n')
            lines.splice(1,1);
            var newcsv=lines.join('\n');
            console.log(newcsv);
        }
    }




})
//deployment on server
var port=process.env.PORT || 3006;
app.listen(port,function (req,res) {
    console.log("server started");


})


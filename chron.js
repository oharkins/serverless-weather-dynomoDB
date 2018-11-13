'use strict';
const request = require('request');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const lambda = new AWS.Lambda({  
    region: "us-west-2"
  });

module.exports.getWeather = (event, context, callback) => {
    request('https://api.openweathermap.org/data/2.5/weather?id='+event+'&APPID='+process.env.WEATHER_APPID, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //console.log(body.url);
        //console.log(body);
        if(res.statusCode != 200){return console.log(res);}
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: body,
        };

        // write the reading to the database
        dynamoDb.put(params, (error) => {
            // handle potential errors
            if (error) {
                console.log(error);
                console.error(error);
                return;
            }
        });
        const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: `Weather from ${event} was requested!`
            })
          };
          callback(null, response);
    });
};

// The cron Lambda
module.exports.cron_launcher = (event, context, callback) => {  
    const requestedID = [
        "5640350", //Billigns 
        "5641727",  //Bozeman
        "5650548", //Ekalaka, Mt
        "5056280", //Bute, Mt
        "5673390", //Redlodge, MT
        "5838198" //Sheridan, WY
    ];
  
    requestedID.forEach(requestedID => {
      const params = {
        FunctionName: process.env.HANDLER_LOCATION + "-getWeather",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(requestedID)
      };
  
      return lambda.invoke(params, function(error, data) {
        if (error) {
          console.error(JSON.stringify(error));
          return new Error(`Error printing messages: ${JSON.stringify(error)}`);
        } else if (data) {
          console.log(data);
        }
      });
    });
  };
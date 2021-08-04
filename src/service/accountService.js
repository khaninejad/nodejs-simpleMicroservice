'use strict';

var async = require('async');
var redisStream = require('redis');
var User = require('../user/user.js');
var config = require('../config/config.js');

var redisClient = redisStream.createClient();


// create the group
redisClient.xgroup("CREATE", config.stream.STREAMS_KEY, config.stream.APPLICATION_ID, '$', function(err) {
    if (err) {
        if (err.code == 'BUSYGROUP' ) {
            console.log(`Group ${config.stream.APPLICATION_ID} already exists`);
        } else {
            console.log(err);
            process.exit();    
        }
    }
});

async.forever(
    function(next) {
        redisClient.xreadgroup('GROUP', config.stream.APPLICATION_ID, config.stream.CONSUMER_ID, 'BLOCK', 500, 'STREAMS',  config.stream.STREAMS_KEY , '>', function (err, stream) {
            if (err) {
                console.error(err);
                next(err);
            }

            if (stream) {
                var messages = stream[0][1]; 
                // print all messages
                messages.forEach(function(message){
                    var id = message[0];
                    var values = message[1];
                    var msgObject = { id : id};
                    for (var i = 0 ; i < values.length ; i=i+2) {
                        msgObject[values[i]] = values[i+1];
                    }   
                User.add_user({
                    firstname: msgObject.firstname,
                    lastname: msgObject.lastname,
                    email: msgObject.email
                }, function(err){
                    console.log(err);
                })
                                        
                    
                });
                
            } else {
                // No message in the consumer buffer
                console.log("No new message...");
            }

            next();
        });
    },
    function(err) {
        console.log(" ERROR " + err);
        process.exit()
    }
);


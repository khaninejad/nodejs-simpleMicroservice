var redisStream = require('redis');
var config = require('../config/config.js');
var async = require('async');
var redisClient = redisStream.createClient();
var User = require('../user/user.js');

var createGroup =  {
   clientStatus: "",
    create: function() { redisClient.xgroup("CREATE", config.stream.STREAMS_KEY, config.stream.APPLICATION_ID, '$', function(err) {
            if (err) {
                this.clientStatus = err.code 
            }
            this.clientStatus = "created"
        })
    }
    
} 

var groupStream = function(groupName = 'GROUP') {
    async.forever(
        function(next) {
            redisClient.xreadgroup(groupName, config.stream.APPLICATION_ID, config.stream.CONSUMER_ID, 'BLOCK', 500, 'STREAMS',  config.stream.STREAMS_KEY , '>', function (err, stream) {
                if (err) {
                    console.log(err);
                    next(err);
                }
    
                if (stream) {
                    var messages = stream[0][1]; 
                    messages.forEach(function(message){
                         var msgObject = extractMessage(message);   
                         if (msgObject.email != ""){
                            User.add_user({firstname: msgObject.firstname,lastname: msgObject.lastname, email: msgObject.email}, 
                                function(err){
                                console.log(err);
                            });
                         }
                        
                    });
                    
                } else {
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
    
}
var extractMessage = function extractMessage(message) {
    
    if(message[0] && message[1] && message.length > 0) {
        var id = message[0];
        var values = message[1];
        var msgObject = { id: id };
        for (var i = 0; i < values.length; i = i + 2) {
            msgObject[values[i]] = values[i + 1];
        }
        return msgObject;
    }else{
        return false;
    }
}


module.exports.createGroup = createGroup;
module.exports.groupStream = groupStream;
module.exports.extractMessage = extractMessage;


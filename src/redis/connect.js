
var connect = {
    _redis: null,
    redis: function () {
        if(connect._redis == null){
            var redis = require('redis');
            connect._redis = redis.createClient("6379", "127.0.0.1");
            connect._redis.select("local",function(error,response){
            });

            connect._redis.on('error', function(error) {
                console.log('Error Connecting: '+error);
            });
        }
        return connect._redis;
    }
};


module.exports = connect;
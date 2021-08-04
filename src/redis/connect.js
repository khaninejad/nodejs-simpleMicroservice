var redis = require('redis');
var config = require('../config/config')
var Connector = {
    _redis: null,

    /**
     * @return {null}
     */
    redis: function () {
        if(Connector._redis == null){
            
            Connector._redis = redis.createClient(config.redis.port, config.redis.host);
            Connector._redis.select(config.redis.db,function(err,resp){
                //console.log(resp);
            });

             Connector._redis.on('error', function(err) {
                console.log('Error Connecting: '+err);
            });

            Connector._redis.on('exit', function(err) {
                Connector.quit();
            });
        }
        return Connector._redis;
    }
};


module.exports = Connector;
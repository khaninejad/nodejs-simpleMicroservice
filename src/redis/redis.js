var connect = require('./connect');

var redisDB = {
    client: connect.redis(),



    add_set: function (dset,callback){
          var key = dset.key.id
        this.client.hmset(key,dset.data,function(err,data){
            if(err) return callback(err);
            else{
                return callback(true);
            }
        });
    },

    get_set: function(key, field,callback){
        this.client.hgetall(key.id, function(err,data){
            if(err) return false;
            else {
                if (field) {
                    data = data.field;
                }
                return callback(data);
            }
        });
    },

    delete_set: function(key,callback){
        this.client.del(key,function(err,reply){
            if(err) return false;
            else if(reply == "null"){
               return false;
            }else{
                callback(reply)
            }
                
        });
    },
    delete_all: function(key,callback){
        this.client.flushdb(function(err){
            if(err) return false;
        });
    }
};

module.exports = redisDB;
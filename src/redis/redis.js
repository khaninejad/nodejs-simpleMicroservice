var connect = require('./connect');


var redisDB = {
    client: connect.redis(),

    add_set: function (dset,callback){
        if (!('key' in dset) || !('data' in dset) || !('id' in dset.key) ){
             return callback(false);
        }else{
            var key = dset.key.id
            this.client.hmset(key,dset.data,function(err,data){
                if(err) return callback(err);
                else{
                    return callback(true);
                }
            });
        }
        
    },

    get_set: function(key, field,callback){
        if (!('id' in key) || key.id == ""  ){
            return callback(false);
        }else{
            this.client.hgetall(key.id, function(err,data){
                if(err) return false;
                else {
                    if (field) {
                        data = data.field;
                    }
                    return callback(data);
                }
            });
        }
        
    },

    delete_set: function(key,callback){
        if (!('id' in key) || key.id == ""  ){
            return false;
        }else{
            this.client.del(key,function(err,reply){
                if(err) return false;
                else if(reply == "null"){
                   return false;
                }else{
                    callback(reply)
                }
                    
            });
        }
        
    },
    delete_all: function(){
        this.client.flushdb(function(err){
            if(err) return false;
        });
       return true
    }
};

module.exports = redisDB;
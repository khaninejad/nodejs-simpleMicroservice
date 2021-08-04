var redis = require('../redis/redis');
var validator = require('validator');

var User = {

    add_user: function (data, callback) {

        if(!validator.isEmail(data.email)) {
            return callback({err: true, response: "email is not valid"}, 400);
        }

        if(validator.isEmpty(data.firstname)) {
            return callback({err: true, response: "Firstname is empty"}, 400);
        }

        if(validator.isEmpty(data.lastname)) {
            return callback({err: true, response: "Lastname is empty"}, 400);
        }

     redis.get_set({"id": data.email}, null, function (resp) {
            if (resp){
                return callback({err: true, response: "User already exists"}, 400);
            }else{
                redis.add_set({key: {"id": data.email}, data: data}, function (resp) {
                    if (resp){
                        return callback({err: false, response: "Data was added successfully "}, 200);
                    }else{
                        return callback({err: true, response: "User was not added successfully "}, 400);
                    }
                })
            }
        })
       


        
    },

    

};

module.exports = User;
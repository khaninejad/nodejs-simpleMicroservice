'use strict';


var stream = require('../stream/stream.js');


var streamGroups = ['Group']

var group = stream.createGroup
group.create()
if (group.clientStatus == "" || group.clientStatus == "created"){
    streamGroups.forEach(function(groupName) {
        stream.groupStream(groupName)
    })
    
}




'use strict';

var redis = require('redis');
var redisClient = redis.createClient();
var config = require('../config/config.js');





function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function main() {
     
    var sleep_time = 500;

    var { argv } = require("yargs")
    .scriptName("Simple Microservice")
  .usage("Usage: npm run register {args}")
  .example(
    "node src/register/register.js --email=\"khaninejad@gmail.com\" --firstname=\"Payam\" --lastname=\"Khaninejad\""
  )
  .option("email", {
    alias: "Email adress",
    describe: "Used for user identity",
    demandOption: "The email is required.",
    type: "string",
    nargs: 1,
  })
  .option("firstname", {
    alias: "FirstName",
    describe: "The user firstname",
    demandOption: "The firstname is required.",
    type: "string",
    nargs: 1,
  })
  .option("lastname", {
    alias: "LastName",
    describe: "The user lastname",
    demandOption: "The lastname is required.",
    type: "string",
    nargs: 1,
  });

const { email, firstname , lastname} = argv;

        console.log(`\tSending message`);

        SendCommand(email, firstname, lastname);

        await sleep(sleep_time);
        process.exit()

    
    
}

main();

function SendCommand(email, firstname, lastname) {
  redisClient.xadd(config.stream.STREAMS_KEY, '*',
    'email', email,
    'firstname', firstname,
    'lastname', lastname,
    function (err) {
      if (err) { console.log(err); };
    });
}

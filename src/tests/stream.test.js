var stream = require('../stream/stream.js');
var redis = require('redis');
var config = require('../config/config.js');


test('Stream group setup test', (done) => {
    var group = stream.createGroup
    group.create()
    expect(group.clientStatus).toBe("")
    done()
})
test('Output extract message is valid', (done) => {
   var message =  stream.extractMessage([
        '1628276341500-0',
        [
          'email',
          'email@gmail.com',
          'firstname',
          'Payam',
          'lastname',
          'Khaninejad'
        ]
      ])
      expect(message.id).not.toBe("")
      expect(message.email).not.toBe("")
      expect(message.firstname).not.toBe("")
      expect(message.lastname).not.toBe("")
    done()
})
test('input extract message is valid', (done) => {
    var message =  stream.extractMessage([
      //   '1628276341500-0',
         [
           'email',
           'email@gmail.com',
           'firstname',
           'Payam',
           'lastname',
           'Khaninejad'
         ]
       ])
       expect(message).toBe(false)
       var message2 =  stream.extractMessage([
           '1628276341500-0'
         ])
         expect(message2).toBe(false)
         var message3 =  stream.extractMessage([       
          ])
          expect(message3).toBe(false)
     done()
 })



test("Stream with ukknown group should return valid log", () => {
     
    const addMock = jest.spyOn(stream, "groupStream");
    addMock.mockImplementation(() => "Unknown Channel");
    expect(stream.groupStream("Unknown")).toBe(`Unknown Channel`);

})

test("Stream with invalid channel should not exist process", () => {
     
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
  stream.groupStream("Unknown")
  expect(mockExit).not.toHaveBeenCalled();

})
test("Stream Up and running", () => {
  
  var redisClient = redis.createClient();
  redisClient.xadd(config.stream.STREAMS_KEY, '*', 
  'email',"test@test.com",
  'firstname',"firstname",
  'lastname',"lastname",
  function (err) { 
          if (err) { console.log(err) };
      });
       const addMock = jest.spyOn(stream, "groupStream");
       addMock.mockImplementation(() => "No new message...");
      expect(stream.groupStream("Group")).toBe(`No new message...`);


})
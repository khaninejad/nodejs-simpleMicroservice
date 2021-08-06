var stream = require('../stream/stream.js');

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
           '1628276341500-0',
        //    [
        //      'email',
        //      'email@gmail.com',
        //      'firstname',
        //      'Payam',
        //      'lastname',
        //      'Khaninejad'
        //    ]
         ])
         expect(message2).toBe(false)
         var message3 =  stream.extractMessage([       
          ])
          expect(message3).toBe(false)
     done()
 })


test('Stream throw error no group', (done) => {
    stream.groupStream("Group")
    const consoleSpy = jest.spyOn(console, 'log');
    expect(consoleSpy).toHaveBeenCalledWith('No new message...');
  });
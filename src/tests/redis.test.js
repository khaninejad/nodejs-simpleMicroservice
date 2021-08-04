var redisTest = require('../redis/redis.js');

test('Check redis valid connection', (done) => {
    const redisClient = redisTest.client
    expect(redisClient).not.toBe(null);
    done()
})

test('check param has valid keys', (done)=> {
    redisTest.add_set({key: {"id": "hello@hello.com"}, data: {}},  function (resp) {
        expect(resp).toBe(true)
     })
     done()
    
})

test('check add_set param has valid keys', (done)=> {
    redisTest.add_set({key: {"id": "hello@hello.com"}, data: {}},  function (resp) {
        expect(resp).toBe(true)
     })
     done()
    
})

test('check get_set param has valid keys', (done)=> {
    redisTest.get_set({"id": "is"}, null, function (resp) {
        expect(resp).toBe(true)
     })
     redisTest.get_set({"id": ""}, null, function (resp) {
        expect(resp).toBe(false)
     })
     redisTest.get_set({"vvv": "id"}, null, function (resp) {
        expect(resp).toBe(false)
     })
     done()
    
})

test('check add_set param has valid keys', (done)=> {
    redisTest.delete_set({"id": "is"}, null, function (resp) {
        expect(resp).toBe(true)
     })
     redisTest.delete_set({"id": ""}, null, function (resp) {
        expect(resp).toBe(false)
     })
     redisTest.delete_set({"vvv": "id"}, null, function (resp) {
        expect(resp).toBe(false)
     })
     done()
    
})

test('check add_all output', (done)=> {
   let result = redisTest.delete_all()
   expect(result).toBe(true)
    
     done()
    
})

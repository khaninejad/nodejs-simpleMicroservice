var User = require('../user/user.js');
var validator = require('validator');
var redis = require('../redis/redis.js');


afterEach(() => {
    redis.delete_all("local")
  });

  
test('Check result is json', (done) => {
    const user = {    firstname: "foo",    lastname: "bar",    email: "hello@hello"}
    User.add_user(user, function(response){
        expect(validator.isJSON(JSON.stringify(response))).toBe(true)
     })
   done()
})

test('Check user Email is valid', (done) => {
    const user = {    firstname: "foo",    lastname: "bar",    email: "hello@hello"}
    User.add_user(user, function(response){
        expect(response.err).toBe(true)
     })
   done()
})

test('Check user firstname Should not be empty or null', (done) => {
    const user = {    firstname: "",    lastname: "bar",    email: "hello@hello.com"}
     User.add_user(user, function(response){
        expect(response.err).toBe(true)
     })
   done()
})

test('Check user last Should not be empty or null', (done) => {
    const user = {    firstname: "test",    lastname: "",    email: "hello@hello.com"}
     User.add_user(user, function(response){
        expect(response.err).toBe(true)
     })
   done()
})

test('Check user inserted', (done) => {
    const user = {    firstname: "test",    lastname: "test",    email: "hello@hello2.com"}
     User.add_user(user, function(response){
        expect(response.err).toBe(false)
     })
   done()
})

test('Check user duplication', (done) => {
    const user = {    firstname: "test",    lastname: "test",    email: "hello@hello.com"}
    User.add_user(user, function(response){
        
        expect(response.err).toBe(false)
        User.add_user(user, function(response){
            expect(response.err).toBe(true)
         })
     })
     
   done()
})

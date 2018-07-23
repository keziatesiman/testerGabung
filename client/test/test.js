// var app = require('../src/post/login');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

const app = request.agent('http://localhost:3001/authenticate')

describe('Login Tests', function() {
  it('LOGIN NOT OK | Username not provided', function(done) {
    app.post('/authenticate')
      .send({
            username:'',
            password:'',
      })
      .expect(404)
      .end(function(err, res) {
        if (err) {
            throw err
        }
        expect(res.body).to.be.not.null
        expect(res.body.version).to.be.ok
        expect(res.body.statusCode).to.be.not.null
        expect(res.body.loginStatus).to.be.not.null
        expect(res.body.message).to.be.not.null
        expect(res.body.statusCode).to.be.equals(404)
        expect(res.body.loginStatus).to.be.equals(false)
        expect(res.body.message).to.be.equals("Failed : Username does not exist")
        done()
      });
  });
});

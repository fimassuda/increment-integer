const should = require('should');
const supertest = require('supertest');
const server = require('../src/server');
const debug = require('debug')('ii-api:test')
let acces_token = '';
const request = require('request');

describe('Incrementing Integer API', function(done) {
  
  context('when creating a new user', function(done) {
    it('should return token', function(done) {
      supertest(server)
        .post('/v1/auth')
        .send({
          email: 'john@doe.com',
          password: 'password',
        })
        .expect(201)
        .end(function(err, res) {
          should(res.body.access_token).not.be.empty();
          access_token = res.body.access_token
          done(err);
        })
    });
  });

  context('when getting next integer', function(done) {
    it('should return 1', function(done) {
      console.log(access_token);
      supertest(server)
        .get('/v1/next')
        .set({Authorization: 'Bearer ' + access_token})
        .expect(200)
        .end(function(err, res) {
          console.log(res.body);
          should(res.body.value).be.eql(1);
          done(err);
        })
    });
  });

  context('when getting current integer', function(done) {
    it('should return 1', function(done) {
      supertest(server)
        .get('/v1/current')
        .set({Authorization: 'Bearer ' + access_token})
        .expect(200)
        .end(function(err, res) {
          should(res.body.value).be.eql(1);
          done(err);
        });
    });
  });

  context('when reseting to 1000', function(done) {
    it('should return no content', function(done) {
      supertest(server)
        .put('/v1/current')
        .set({Authorization: 'Bearer ' + access_token})
        .send({
          current: 1000,
        })
        .expect(204)
        .end(function(err, res) {
          should(res.body).be.empty();
          done(err);
        })
    })
  })
  context('when getting the new value', function(done) {
    it('should return 1000', function(done) {
      supertest(server)
        .get('/v1/current')
        .set({Authorization: 'Bearer ' + access_token})
        .expect(200)
        .end(function(err, res) {
          should(res.body.value).be.eql(1000);
          done(err);
        });
    })
  })
});

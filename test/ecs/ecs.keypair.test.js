require('should')
var nock = require('nock')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

describe('ECS::Keypair', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('get keypair', function () {
    var respBody = require('./data/keypair-get-keypair-resp.json')
    var keypairName = respBody.keypair.name
    var url = `/v2/${projectId}/os-keypairs/${keypairName}`
    it('get volumes', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.getKeypair(keypairName, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal keypair name should throw error', () => {
      client.getKeypair.bind(client, null).should.throw()
      client.getKeypair.bind(client, '').should.throw()
      client.getKeypair.bind(client, []).should.throw()
      client.getKeypair.bind(client, {}).should.throw()
    })
  })

  describe('create keypair', function () {
    var respBody = require('./data/keypair-create-keypair-resp.json')
    var keypairName = respBody.keypair.name
    var publicKey = 'public-key-sample'
    var url = `/v2/${projectId}/os-keypairs`

    it('create keypair without public key', done => {
      var formdata = {
        'keypair': {
          'name': keypairName
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.createKeypair(keypairName, null, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('create keypair with public key', done => {
      var formdata = {
        'keypair': {
          'name': keypairName,
          'public_key': 'public-key-sample'
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.createKeypair(keypairName, publicKey, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal keypair name should throw error', () => {
      client.createKeypair.bind(client, null).should.throw()
      client.createKeypair.bind(client, null, null).should.throw()
      client.createKeypair.bind(client, '', null).should.throw()
      client.createKeypair.bind(client, '', '').should.throw()
      client.createKeypair.bind(client, '', []).should.throw()
      client.createKeypair.bind(client, '', {}).should.throw()
      client.createKeypair.bind(client, keypairName, '').should.throw()
      client.createKeypair.bind(client, keypairName, []).should.throw()
      client.createKeypair.bind(client, keypairName, {}).should.throw()
    })
  })

  describe('delete keypair', function () {
    var keypairName = 'keypair-name'
    var url = `/v2/${projectId}/os-keypairs/${keypairName}`

    it('delete keypair', done => {
      nock(endpoint).intercept(url, 'DELETE').reply(200, '')
      client.deleteKeypair(keypairName, function (err, response) {
        (err || !response.ok).should.be.false()
        response.text.should.eql('')
        done()
      })
    })

    it('illegal keypair name should throw error', () => {
      client.deleteKeypair.bind(client).should.throw()
      client.deleteKeypair.bind(client, null).should.throw()
      client.deleteKeypair.bind(client, '').should.throw()
      client.deleteKeypair.bind(client, []).should.throw()
      client.deleteKeypair.bind(client, {}).should.throw()
    })
  })

  describe('list keypair', function () {
    var url = `/v2/${projectId}/os-keypairs`
    var respBody = require('./data/keypair-list-keypairs-resp.json')

    it('list keypair', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.listKeypairs(function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })
  })
})

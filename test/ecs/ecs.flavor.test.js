require('should')
var nock = require('nock')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

describe('ECS::Flavor', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('Get Flavor', function () {
    var respBody = require('./data/flavor-get-flavor-resp.json')
    var flavorId = respBody.flavor.id
    var url = `/v2/${projectId}/flavors/${flavorId}`

    it('Get Flavor by id', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.getFlavor(flavorId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal flavor id will throw error', () => {
      client.getFlavor.bind(client, null).should.throw()
      client.getFlavor.bind(client, '').should.throw()
      client.getFlavor.bind(client, []).should.throw()
      client.getFlavor.bind(client, {}).should.throw()
    })
  })

  describe('List Flavor Details', function () {
    var respBody = require('./data/flavor-list-flavor-details-resp.json')
    var url = `/v2/${projectId}/flavors/detail`
    it('list flavor details', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.listFlavorDetails({}, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('list flavor details with filter', done => {
      var filters = {sort_key: 'memory_mb', minDisk: '10'}
      nock(endpoint).get(url).query(true).reply(200, respBody)
      client.listFlavorDetails(filters, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })
  })

  describe('List Cloud-Server Flavor and extension', function () {
    var respBody = require('./data/flavor-list-cloud-server-flavors-resp.json')
    var url = `/v1/${projectId}/cloudservers/flavors`
    it('list', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.listCloudServerFlavors(function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })
  })
})

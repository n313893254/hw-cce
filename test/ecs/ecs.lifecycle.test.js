require('should')
var nock = require('nock')
var sinon = require('sinon')

var config = require('./config.js')
var HW = require('../../index.js')

var client = new HW.ECS(config)

describe('ECS::Lifecycle', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId
  var successTaskResponse = require('./data/success-task-response.json')

  describe('Create Cloud Server', function () {
    it('Create Cloud Server successfully', done => {
      var url = `/v1/${projectId}/cloudservers`
      nock(endpoint).post(url).reply(200, successTaskResponse)

      var payload = require('./data/create-cloud-server.json')
      client.createCloudServer(payload, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Delete Cloud Server', function () {
    var url = `/v1/${projectId}/cloudservers/delete`
    var serverId = 'ThisIsAServerIdToDelete'
    var deletePublicIp = true
    var deleteVolume = true

    var formdata = {
      'servers': [
        {
          'id': serverId
        }
      ],
      'delete_publicip': deletePublicIp,
      'delete_volume': deleteVolume
    }

    it('if any argument is not present, throw error', () => {
      var callback = sinon.spy()
      client.deleteCloudServer(null, null, null, callback)
      client.deleteCloudServer(serverId, null, null, callback)
      client.deleteCloudServer(serverId, deletePublicIp, null, callback)
      client.deleteCloudServer([], deletePublicIp, deleteVolume, callback)
      client.deleteCloudServer([''], deletePublicIp, deleteVolume, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('Delete single Cloud Server task', done => {
      nock(endpoint).post(url).reply(200, successTaskResponse)
      client.deleteCloudServer(serverId, deletePublicIp, deleteVolume, function (err, response) {
        (err || !response.ok).should.be.false()
        formdata.should.containDeep(JSON.parse(response.request._data))
        done()
      })
    })

    it('Delete multiply Cloud Server task', done => {
      nock(endpoint).post(url).reply(200, successTaskResponse)
      client.deleteCloudServer([serverId], deletePublicIp, deleteVolume, function (err, response) {
        (err || !response.ok).should.be.false()
        formdata.should.containDeep(JSON.parse(response.request._data))
        done()
      })
    })
  })

  describe('Get Cloud Server', function () {
    it('Get Cloud Server successfully', done => {
      var responseBody = require('./data/get-cloud-server-response.json')
      var serverId = responseBody.server.id
      var url = `/v2/${projectId}/servers/${serverId}`
      nock(endpoint).get(url).reply(200, responseBody)

      client.getCloudServer(serverId, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })

    it('without server-id argument will throw error', () => {
      var callback = sinon.spy()
      client.getCloudServer(null, callback)
      client.getCloudServer('', callback)
      client.getCloudServer('  ', callback)
      client.getCloudServer({}, callback)
      client.getCloudServer([], callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })
  })

  describe('List Cloud Servers', function () {
    var responseBody = require('./data/list-cloud-servers-response.json')
    var url = `/v2/${projectId}/servers`
    it('List Cloud-Servers with no filter', done => {
      nock(endpoint).get(url).reply(200, responseBody)
      client.listCloudServers(null, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(responseBody)
        done()
      })
    })

    it('List Cloud-Servers with filter', done => {
      nock(endpoint).get(url).query(true).reply(200, responseBody)
      client.listCloudServers({limit: 10}, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(responseBody)
        done()
      })
    })
  })

  describe('List Cloud Server details', function () {
    var responseBody = require('./data/list-cloud-server-details-response.json')
    var url = `/v2/${projectId}/servers/detail`
    it('List Cloud-Server details with no filter', done => {
      nock(endpoint).get(url).reply(200, responseBody)
      client.listCloudServerDetails(null, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(responseBody)
        done()
      })
    })

    it('List Cloud-Servers with filter', done => {
      nock(endpoint).get(url).query(true).reply(200, responseBody)
      client.listCloudServerDetails({limit: 10}, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(responseBody)
        done()
      })
    })
  })
})

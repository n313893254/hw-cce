require('should')
var nock = require('nock')
var sinon = require('sinon')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

function getServers (serverIds) {
  return HW.ECS.Utils.map(serverIds, (serverId) => { return {'id': serverId} })
}

describe('ECS::Status', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('Modify Cloud Server Name', function () {
    var newName = 'example2' // updated name
    var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // the server-id you want to update
    var url = `/v2/${projectId}/servers/${serverId}`
    var respBody = require('./data/status-modify-cloud-server-resp.json')
    var formdata = {
      'server': {
        'name': newName
      }
    }

    it('if any argument is not present, throw error', () => {
      var callback = sinon.spy()
      client.modifyCloudServer(null, null, callback)
      client.modifyCloudServer(serverId, null, callback)
      client.modifyCloudServer(null, newName, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('modify name successfully', done => {
      nock(endpoint).put(url, formdata).reply(200, respBody)
      client.modifyCloudServer(serverId, newName, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Batch Start Cloud Server', function () {
    var url = `/v1/${projectId}/cloudservers/action`
    var respBody = require('./data/success-task-response.json')

    it('if serverId is not legal, throw error', () => {
      var callback = sinon.spy()
      client.startBatchCloudServers(null, callback)
      client.startBatchCloudServers('xxxxx', callback)
      client.startBatchCloudServers({}, callback)
      client.startBatchCloudServers([], callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('batch start cloud server successfully', done => {
      var serverIds = ['616fb98f-46ca-475e-917e-2563e5a8cd19', '726fb98f-46ca-475e-917e-2563e5a8cd20']
      var formdata = {
        'os-start': {
          'servers': getServers(serverIds)
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.startBatchCloudServers(serverIds, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Batch Stop Cloud Server', function () {
    var url = `/v1/${projectId}/cloudservers/action`
    var respBody = require('./data/success-task-response.json')
    var serverIds = ['616fb98f-46ca-475e-917e-2563e5a8cd19', '726fb98f-46ca-475e-917e-2563e5a8cd20']

    it('if argument is not legal, throw error', () => {
      var callback = sinon.spy()
      client.stopBatchCloudServers(null, true, callback)
      client.stopBatchCloudServers('xxxxx', true, callback)
      client.stopBatchCloudServers({}, true, callback)
      client.stopBatchCloudServers([], true, callback)
      client.stopBatchCloudServers(serverIds, '', callback)
      client.stopBatchCloudServers(serverIds, 1, callback)
      client.stopBatchCloudServers(serverIds, 0, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('batch force stop cloud server', done => {
      var formdata = {
        'os-stop': {
          'type': 'HARD',
          'servers': getServers(serverIds)
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.stopBatchCloudServers(serverIds, true, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })

    it('batch normal stop cloud server', done => {
      var formdata = {
        'os-stop': {
          'type': 'SOFT',
          'servers': getServers(serverIds)
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.stopBatchCloudServers(serverIds, false, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Batch Reboot Cloud Server', function () {
    var url = `/v1/${projectId}/cloudservers/action`
    var respBody = require('./data/success-task-response.json')
    var serverIds = ['616fb98f-46ca-475e-917e-2563e5a8cd19', '726fb98f-46ca-475e-917e-2563e5a8cd20']

    it('if argument is not legal, throw error', () => {
      var callback = sinon.spy()
      client.rebootBatchCloudServers(null, true, callback)
      client.rebootBatchCloudServers('xxxxx', true, callback)
      client.rebootBatchCloudServers({}, true, callback)
      client.rebootBatchCloudServers([], true, callback)
      client.rebootBatchCloudServers(serverIds, '', callback)
      client.rebootBatchCloudServers(serverIds, 1, callback)
      client.rebootBatchCloudServers(serverIds, 0, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('batch force reboot cloud server', done => {
      var formdata = {
        'reboot': {
          'type': 'HARD',
          'servers': getServers(serverIds)
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.rebootBatchCloudServers(serverIds, true, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })

    it('batch normal reboot cloud server', done => {
      var formdata = {
        'reboot': {
          'type': 'SOFT',
          'servers': getServers(serverIds)
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.rebootBatchCloudServers(serverIds, false, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Start Cloud Server', function () {
    var serverId = '616fb98f-46ca-475e-917e-2563e5a8cd19'
    var respBody = require('./data/success-task-response.json')
    var url = `/v2/${projectId}/servers/${serverId}/action`

    it('if argument is not legal, throw error', () => {
      var callback = sinon.spy()
      client.startCloudServer(null, callback)
      client.startCloudServer('', callback)
      client.startCloudServer({}, callback)
      client.startCloudServer([], callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('start cloud server', done => {
      var formdata = {
        'os-start': {}
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.startCloudServer(serverId, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Reboot Cloud Server', function () {
    var serverId = '616fb98f-46ca-475e-917e-2563e5a8cd19'
    var respBody = require('./data/success-task-response.json')
    var url = `/v2/${projectId}/servers/${serverId}/action`

    it('if argument is not legal, throw error', () => {
      var callback = sinon.spy()
      client.rebootCloudServer(null, null, callback)
      client.rebootCloudServer(null, true, callback)
      client.rebootCloudServer('', true, callback)
      client.rebootCloudServer({}, true, callback)
      client.rebootCloudServer([], true, callback)
      client.rebootCloudServer(null, false, callback)
      client.rebootCloudServer('', false, callback)
      client.rebootCloudServer({}, false, callback)
      client.rebootCloudServer([], false, callback)
      client.rebootCloudServer(serverId, null, callback)
      client.rebootCloudServer(serverId, '', callback)
      client.rebootCloudServer(serverId, {}, callback)
      client.rebootCloudServer(serverId, [], callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('force reboot cloud server', done => {
      var formdata = {
        'reboot': {'type': 'HARD'}
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.rebootCloudServer(serverId, true, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })

    it('normal reboot cloud server', done => {
      var formdata = {
        'reboot': {'type': 'SOFT'}
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.rebootCloudServer(serverId, false, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Stop Cloud Server', function () {
    var serverId = '616fb98f-46ca-475e-917e-2563e5a8cd19'
    var respBody = require('./data/success-task-response.json')
    var url = `/v2/${projectId}/servers/${serverId}/action`

    it('if argument is not legal, throw error', () => {
      var callback = sinon.spy()
      client.stopCloudServer(null, null, callback)
      client.stopCloudServer(null, true, callback)
      client.stopCloudServer('', true, callback)
      client.stopCloudServer({}, true, callback)
      client.stopCloudServer([], true, callback)
      client.stopCloudServer(null, false, callback)
      client.stopCloudServer('', false, callback)
      client.stopCloudServer({}, false, callback)
      client.stopCloudServer([], false, callback)
      client.stopCloudServer(serverId, null, callback)
      client.stopCloudServer(serverId, '', callback)
      client.stopCloudServer(serverId, {}, callback)
      client.stopCloudServer(serverId, [], callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('force stop cloud server', done => {
      var formdata = {
        'os-stop': {'type': 'HARD'}
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.stopCloudServer(serverId, true, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })

    it('normal stop cloud server', done => {
      var formdata = {
        'os-stop': {'type': 'SOFT'}
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.stopCloudServer(serverId, false, function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })

  describe('Resize Cloud Server', function () {
    var serverId = '616fb98f-46ca-475e-917e-2563e5a8cd19'
    var respBody = require('./data/success-task-response.json')
    var url = `/v1/${projectId}/cloudservers/${serverId}/resize`

    it('if argument is not legal, throw error', () => {
      var callback = sinon.spy()
      client.resizeCloudServer(null, null, callback)
      client.resizeCloudServer(null, true, callback)
      client.resizeCloudServer('', true, callback)
      client.resizeCloudServer({}, true, callback)
      client.resizeCloudServer([], true, callback)
      client.resizeCloudServer(serverId, null, callback)
      client.resizeCloudServer(serverId, '', callback)
      client.resizeCloudServer(serverId, {}, callback)
      client.resizeCloudServer(serverId, [], callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })

    it('resize cloud server', done => {
      var formdata = {
        'resize': {
          'flavorRef': 'c1.large'
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.resizeCloudServer(serverId, 'c1.large', function (err, response) {
        (err || !response.ok).should.be.false()
        done()
      })
    })
  })
})

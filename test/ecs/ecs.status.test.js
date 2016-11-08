require('should')
var nock = require('nock')

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
      client.modifyCloudServer.bind(client, null).should.throw()
      client.modifyCloudServer.bind(client, null, null).should.throw()
      client.modifyCloudServer.bind(client, serverId, null).should.throw()
      client.modifyCloudServer.bind(client, null, newName).should.throw()
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
      client.startBatchCloudServers.bind(client).should.throw()
      client.startBatchCloudServers.bind(client, null).should.throw()
      client.startBatchCloudServers.bind(client, 'xxxxx').should.throw()
      client.startBatchCloudServers.bind(client, {}).should.throw()
      client.startBatchCloudServers.bind(client, []).should.throw()
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
      client.stopBatchCloudServers.bind(client, null, true).should.throw()
      client.stopBatchCloudServers.bind(client, 'xxxxx', true).should.throw()
      client.stopBatchCloudServers.bind(client, {}, true).should.throw()
      client.stopBatchCloudServers.bind(client, [], true).should.throw()
      client.stopBatchCloudServers.bind(client, serverIds).should.throw()
      client.stopBatchCloudServers.bind(client, serverIds, '').should.throw()
      client.stopBatchCloudServers.bind(client, serverIds, 1).should.throw()
      client.stopBatchCloudServers.bind(client, serverIds, 0).should.throw()
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
      client.rebootBatchCloudServers.bind(client, null, true).should.throw()
      client.rebootBatchCloudServers.bind(client, 'xxxxx', true).should.throw()
      client.rebootBatchCloudServers.bind(client, {}, true).should.throw()
      client.rebootBatchCloudServers.bind(client, [], true).should.throw()
      client.rebootBatchCloudServers.bind(client, serverIds).should.throw()
      client.rebootBatchCloudServers.bind(client, serverIds, '').should.throw()
      client.rebootBatchCloudServers.bind(client, serverIds, 1).should.throw()
      client.rebootBatchCloudServers.bind(client, serverIds, 0).should.throw()
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
      client.startCloudServer.bind(client, null).should.throw()
      client.startCloudServer.bind(client, '').should.throw()
      client.startCloudServer.bind(client, {}).should.throw()
      client.startCloudServer.bind(client, []).should.throw()
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
      client.rebootCloudServer.bind(client, null, null).should.throw()
      client.rebootCloudServer.bind(client, null, true).should.throw()
      client.rebootCloudServer.bind(client, '', true).should.throw()
      client.rebootCloudServer.bind(client, {}, true).should.throw()
      client.rebootCloudServer.bind(client, [], true).should.throw()
      client.rebootCloudServer.bind(client, null, false).should.throw()
      client.rebootCloudServer.bind(client, '', false).should.throw()
      client.rebootCloudServer.bind(client, {}, false).should.throw()
      client.rebootCloudServer.bind(client, [], false).should.throw()
      client.rebootCloudServer.bind(client, serverId, null).should.throw()
      client.rebootCloudServer.bind(client, serverId, '').should.throw()
      client.rebootCloudServer.bind(client, serverId, {}).should.throw()
      client.rebootCloudServer.bind(client, serverId, []).should.throw()
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
      client.stopCloudServer.bind(client, null, null).should.throw()
      client.stopCloudServer.bind(client, null, true).should.throw()
      client.stopCloudServer.bind(client, '', true).should.throw()
      client.stopCloudServer.bind(client, {}, true).should.throw()
      client.stopCloudServer.bind(client, [], true).should.throw()
      client.stopCloudServer.bind(client, null, false).should.throw()
      client.stopCloudServer.bind(client, '', false).should.throw()
      client.stopCloudServer.bind(client, {}, false).should.throw()
      client.stopCloudServer.bind(client, [], false).should.throw()
      client.stopCloudServer.bind(client, serverId, null).should.throw()
      client.stopCloudServer.bind(client, serverId, '').should.throw()
      client.stopCloudServer.bind(client, serverId, {}).should.throw()
      client.stopCloudServer.bind(client, serverId, []).should.throw()
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
      client.resizeCloudServer.bind(client, null, null).should.throw()
      client.resizeCloudServer.bind(client, null, true).should.throw()
      client.resizeCloudServer.bind(client, '', true).should.throw()
      client.resizeCloudServer.bind(client, {}, true).should.throw()
      client.resizeCloudServer.bind(client, [], true).should.throw()
      client.resizeCloudServer.bind(client, serverId, null).should.throw()
      client.resizeCloudServer.bind(client, serverId, '').should.throw()
      client.resizeCloudServer.bind(client, serverId, {}).should.throw()
      client.resizeCloudServer.bind(client, serverId, []).should.throw()
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

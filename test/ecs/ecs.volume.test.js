require('should')
var nock = require('nock')
var sinon = require('sinon')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

describe('ECS::Volume', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('Get Cloud-Server Volumes', function () {
    var respBody = require('./data/volume-get-cloud-server-volumes-resp.json')
    var serverId = respBody.volumeAttachments[0].serverId
    var url = `/v2/${projectId}/servers/${serverId}/os-volume_attachments`
    it('get volumes', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.getCloudServerVolumes(serverId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal server id should throw error', () => {
      var callback = sinon.spy()
      client.getCloudServerVolumes(null, callback)
      client.getCloudServerVolumes('', callback)
      client.getCloudServerVolumes([], callback)
      client.getCloudServerVolumes({}, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })
  })

  describe('Get Cloud-Server Volume', function () {
    var respBody = require('./data/volume-get-cloud-server-volume-resp.json')
    var serverId = respBody.volumeAttachments[0].serverId
    var volumeId = respBody.volumeAttachments[0].volumeId
    var url = `/v2/${projectId}/servers/${serverId}/os-volume_attachments/${volumeId}`

    it('get volume', done => {
      nock(endpoint).get(url).reply(200, respBody)
      client.getCloudServerVolume(serverId, volumeId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal arguments should throw error', () => {
      var callback = sinon.spy()
      client.getCloudServerVolume(null, null, callback)
      client.getCloudServerVolume('', '', callback)
      client.getCloudServerVolume([], '', callback)
      client.getCloudServerVolume({}, '', callback)
      client.getCloudServerVolume('', volumeId, callback)
      client.getCloudServerVolume([], volumeId, callback)
      client.getCloudServerVolume({}, volumeId, callback)
      client.getCloudServerVolume('server-id', '', callback)
      client.getCloudServerVolume('server-id', [], callback)
      client.getCloudServerVolume('server-id', {}, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })
  })

  describe('Attach Cloud-Server Volume', function () {
    var respBody = require('./data/success-task-response.json')
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
    var volumeId = 'dafc8dc4-e9a7-404d-afd7-5e49cd0d29e0'
    var url = `/v1/${projectId}/cloudservers/${serverId}/attachvolume`
    var device = '/dev/sdb'
    var formdata = {
      'volumeAttachment': {
        'volumeId': volumeId,
        'device': device
      }
    }

    it('attach volume', done => {
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.attachCloudServerVolume(serverId, volumeId, device, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal arguments should throw error', () => {
      var callback = sinon.spy()
      client.attachCloudServerVolume(null, null, null, callback)
      client.attachCloudServerVolume('', '', '', callback)
      client.attachCloudServerVolume([], '', '', callback)
      client.attachCloudServerVolume({}, '', '', callback)
      client.attachCloudServerVolume('server-id', '', '', callback)
      client.attachCloudServerVolume('server-id', 'volume-id', '', callback)
      client.attachCloudServerVolume('server-id', '', 'device', callback)
      client.attachCloudServerVolume('', 'volume-id', 'device', callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })
  })

  describe('Detach Cloud-Server Volume', function () {
    var respBody = require('./data/success-task-response.json')
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
    var volumeId = 'dafc8dc4-e9a7-404d-afd7-5e49cd0d29e0'
    var url = `/v1/${projectId}/cloudservers/${serverId}/detachvolume/${volumeId}`

    it('detach volume', done => {
      nock(endpoint).intercept(url, 'DELETE').reply(200, respBody)
      client.detachCloudServerVolume(serverId, volumeId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal arguments should throw error', () => {
      var callback = sinon.spy()
      client.detachCloudServerVolume(null, null, callback)
      client.detachCloudServerVolume('', '', callback)
      client.detachCloudServerVolume([], '', callback)
      client.detachCloudServerVolume({}, '', callback)
      client.detachCloudServerVolume('', [], callback)
      client.detachCloudServerVolume('', {}, callback)
      client.detachCloudServerVolume('server-id', '', callback)
      client.detachCloudServerVolume('server-id', {}, callback)
      client.detachCloudServerVolume('server-id', [], callback)
      client.detachCloudServerVolume('', volumeId, callback)
      client.detachCloudServerVolume([], volumeId, callback)
      client.detachCloudServerVolume({}, volumeId, callback)
      callback.alwaysCalledWithMatch(sinon.match.instanceOf(Error), null)
    })
  })
})

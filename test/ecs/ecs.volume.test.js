require('should')
var nock = require('nock')

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
  })
})

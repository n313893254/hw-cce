require('should')
var nock = require('nock')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

describe('ECS::Quota', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId
  var respBody = require('./data/quota-show-cloud-server-quota-resp.json')

  it('Get cloud server quota', done => {
    var url = `/v1/${projectId}/cloudservers/limits`
    nock(endpoint).get(url).reply(200, respBody)
    client.showCloudServerQuota(function (err, response) {
      (err || !response.ok).should.be.false()
      response.body.should.containDeep(respBody)
      done()
    })
  })
})

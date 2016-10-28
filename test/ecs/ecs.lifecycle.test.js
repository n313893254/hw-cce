require('should')
var nock = require('nock')

var config = require('./config.js')
var HW = require('../../index.js')

var client = new HW.ECS(config)

describe('ECS::Lifecycle', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('Create Cloud Server', function () {
    it('create cloud server successfully', done => {
      var url = `/v1/${projectId}/cloudservers`
      nock(endpoint).post(url).reply(200, function (uri, reqBody) {

      })

      var payload = require('./data/create-cloud-server.json')
      client.createCloudServer(payload, function (err, response) {
        done()
      })
    })
  })
})

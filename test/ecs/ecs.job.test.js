require('should')
var nock = require('nock')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

describe('ECS::Job', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('show ecs job', function () {
    it('show Job by id', done => {
      var responseBody = require('./data/job-show-ecs-job-resp.json')
      var jobId = responseBody.job_id
      var url = `/v1/${projectId}/jobs/${jobId}`
      nock(endpoint).get(url).reply(200, responseBody)
      client.showEcsJob(jobId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(responseBody)
        done()
      })
    })
  })
})

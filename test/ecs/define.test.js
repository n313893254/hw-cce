require('should')

var config = require('./config.js')
var HW = require('../../index.js')

describe('ECS::namespace define', function () {
  it('throws an error if you try to instantiate without ak, sk, project-id', () => {
    function wrapper (options) {
      var _ = new HW.ECS(options)
      _.bio
    }
    wrapper.bind(null).should.throw()
    wrapper.bind(null, null).should.throw()
    wrapper.bind(null, {}).should.throw()
    wrapper.bind(null, { 'ak': 'ak' }).should.throw()
    wrapper.bind(null, { 'ak': 'ak', 'sk': 'sk' }).should.throw()
    wrapper.bind(null, { 'ak': 'ak', 'sk': 'sk', 'projectId': 'projectId' }).should.not.throw()
  })

  it('endpoint, region, service should have default initial value', () => {
    var endpoint = 'https://ecs.cn-north-1.myhwclouds.com'
    var service = 'ecs'
    var region = 'cn-north-1'

    var ECS = new HW.ECS({ 'ak': 'ak', 'sk': 'sk', 'projectId': 'projectId' })
    ECS.endpoint.should.eql(endpoint)
    ECS.service.should.eql(service)
    ECS.region.should.eql(region)
  })
})

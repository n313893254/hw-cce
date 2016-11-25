require('should')

var sinon = require('sinon')
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

  it('validated should handle exception', () => {
    var errorMsg = 'should passed to callback function'
    var ECSClient = new HW.ECS({ 'ak': 'ak', 'sk': 'sk', 'projectId': 'projectId' })

    var stub = sinon.stub()
    stub.throws(new Error(errorMsg))
    ECSClient.validated(stub, function (error, response) {
      (error === null).should.be.false()
      error.should.be.an.instanceof(Error)
      error.message.should.eql(errorMsg)
    })
  })
})

require('should')
var sinon = require('sinon')
var nock = require('nock')
var Requestor = require('../lib/requestor.js')
var Utils = require('../lib/utils.js')
var _config = {
  'ak': 'ThisIsFakeAk',
  'sk': 'ThisIsFakeSK',
  'endpoint': 'https://ecs.cn-north-1.myhwclouds.com',
  'projectId': 'c6df6980813f463199d89bd2044a1308',
  'region': 'cn-north-1'
}

describe('Common base Http requestor', function () {
  var endpoint = _config.endpoint
  var requestor = new Requestor(_config)

  it('throws an error if you try to instantiate without ak, sk, project-id', () => {
    function wrapper (options) {
      var _ = new Requestor(options)
      _.userAgent
    }
    wrapper.bind(null).should.throw()
    wrapper.bind(null, null).should.throw()
    wrapper.bind(null, {}).should.throw()
    wrapper.bind(null, { 'ak': 'ak' }).should.throw()
    wrapper.bind(null, { 'ak': 'ak', 'sk': 'sk' }).should.throw()
    wrapper.bind(null, { 'ak': 'ak', 'sk': 'sk', 'projectId': 'xx' }).should.throw()
    var c = Object.assign({}, _config)
    delete c.region
    wrapper.bind(null, c).should.not.throw()
  })

  it('required http headers present', done => {
        // mock http request
    nock(endpoint).get('/headers')
            .reply(200, function (uri, requestBody) {
                // return request headers to client
              return this.req.headers
            })

        // stub current DateTime for header x-sdk-date
    var now = new Date()
    var clock = sinon.useFakeTimers(now.getTime())

    requestor.get('/headers', null, function (e, response) {
      response.status.should.be.eql(200)
      var headers = response.body
      var userAgent = requestor.userAgent
      var type = 'application/x-www-form-urlencoded'
      var sdkdate = Utils.Date.sdkdate(now)
      userAgent.should.be.eql(headers['user-agent'])
      endpoint.should.endWith(headers['host'])
      type.should.eql(headers['content-type'])
      sdkdate.should.eql(headers['x-sdk-date'])
      headers.should.have.keys('authorization')
      done()
    })

    clock.restore()
  })

  it('http requestor get works', done => {
    nock(endpoint).get('/get').reply(200, { 'result': 'ok' })
    requestor.get('/get', null, function (e, response) {
      response.status.should.be.eql(200)
      response.body.should.containDeep({ 'result': 'ok' })
      done()
    })
  })

  it('http requestor post works', done => {
        // mock http request
    nock(endpoint).post('/post').reply(200, function (uri, requestBody) {
      return this.req.headers
    })

    requestor.post('/post', null, function (e, response) {
      response.status.should.be.eql(200)
      var headers = response.body
      var userAgent = requestor.userAgent
      var type = 'application/json; charset=UTF-8'
      userAgent.should.be.eql(headers['user-agent'])
      endpoint.should.endWith(headers['host'])
      type.should.eql(headers['content-type'])
      headers.should.have.keys('authorization')
      done()
    })
  })

  // it('log error when request rejected', done => {
  //       // mock http request
  //   nock(endpoint).post('/unauthorized').reply(401)

  //   var _r = new Requestor(_config)
  //   var spy = sinon.spy(_r, 'logError')

  //   _r.post('/unauthorized', null, function (e, response) {
  //     response.status.should.be.eql(401)
  //     spy.calledOnce.should.be.true()
  //     done()
  //   })
  // })

  // it('log error when request failed', done => {
  //   var _r = new Requestor(_config)
  //   var spy = sinon.spy(_r, 'logError')
  //   nock(endpoint).post('/failed').replyWithError({ code: 'TIMEDOUT' })

  //   _r.post('/failed', null, function (e, response) {
  //     spy.calledOnce.should.be.true()
  //     done()
  //   })
  // })
})

'use strict'

var Utils = require('./utils.js')
var Url = require('url')
var Singer = require('./signer.js')

class Requestor {

  /**
   * Requestor's constructor, initial ak, sk, http-requestor
   *
   * @private
   * @method   constructor
   * @param    {Object} options
   * @param    {string} options.endpoint   request endpoint -> https://www.example.com/v1
   * @param    {string} options.ak         access-key
   * @param    {string} options.sk         secret-key
   * @param    {string} options.service    [option] service-name, if not provided, auto detect from domain
   * @param    {string} options.region     [option] region-name, if not provided, auto detect from domain
   * @param    {string} options.projectId  project-id
   * @return
   */
  constructor (options) {
    if (!options || !options.endpoint || !options.ak || !options.sk || !options.projectId) {
      var error = 'Could not instantiate HW.ECS -> ' +
                  'option `endpoint`, `ak`, `sk`, `projectId` must be present'
      throw new Error(error)
    }

    // global endpoint, remove end slash if exists
    var endpoint = Utils.String.removeEnd(options.endpoint, '/')

    var _options = Object.assign({}, options)
    // setup endpoint & host
    var host = Url.parse(options.endpoint).host
    _options.endpoint = endpoint
    _options.host = host
     // detect service & region from domain
    var segment = host.split('.')
    _options.service = options.service || segment[0]
    _options.region = options.region || segment[1]

    // add fields
    Object.assign(this, _options)

    this.userAgent = Utils.getUserAgent()
    this.requestor = require('superagent') // initial http Requestor

    this.signer = new Singer.V4(_options)
  }

  /**
   * generate required http headers
   *
   * Credential=`${access-key}/20150907/region/service[ec2]/sdk_request
   *
   * user-agent     -> sdk env when node, browser default useragent when browser
   * x-sdk-date     -> request time with format YYYYMMDD'T'HHMMSS'Z'
   * Authorization  -> SDK-HMAC-SHA256 Credential=ZIRRKMTWPTQFQI1WKNKB/20150907//ec2/sdk_request, SignedHeaders=content-type;host;x-sdk-date, Signature=55741b610f3c9fa3ae40b5a8021ebf7ebc2a28a603fc62d25cb3bfe6608e1994
   * Host           -> code.test.com:443
   * Content-type   -> application/json
   * Content-Length -> 1234, required for post/put request, none for get request
   * X-Project-Id   -> e9993fc787d94b6c886cbaa340f9c0f4
   *
   * @private
   * @return    http headers that ECS-API required
   */
  headers () {
    // do not need to add user-agent & host header in browser env
    // browser will auto add user-agent header
    /* istanbul ignore else */
    if (Utils.isNode()) {
      return {
        'User-Agent': this.userAgent,
        'Host': this.host
      }
    } else {
      return {}
    }
  }

  /**
   * generate required http headers
   *
   * @private
   * @param     resource {string}  relatived path -> /{project_id}/cloudservers
   * @return    complete URL with endpoint -> https://www.example.com/v1/{project_id}/cloudservers
   */
  getURL (resource) {
    return this.endpoint + resource
  }

  /**
   * HW cloud api http get method shortcut
   *
   * @public
   * @method   get
   * @param    resource {string}      resource path (path without domain)
   * @param    qs {json}              request query string
   * @param    callback {Function}    callback Function when request done
   * @return
   */
  get (resource, qs, callback) {
    // console.info('Access HW cloud api: ' + url)
    var self = this
    var URL = self.getURL(resource)
    var request = self.requestor.get(URL).query(qs || {})
          .type('form')
          .set(self.headers())

    // sign request
    this.signer.sign(request)
    request.end(function (err, response) {
      // self.logError(URL, err, response)
      // execute callback if required
      callback && callback(err, response)
    })

    // console.log(request)
  }

  /**
   * HW cloud api http post method shortcut
   *
   * @public
   * @method   post
   * @param    resource {string}      resource path (path without domain)
   * @param    json {json}            post json body
   * @param    callback {Function}    callback Function when request done
   * @return
   */
  post (resource, json, callback) {
    var self = this
    var URL = self.getURL(resource)
    var payload = json ? JSON.stringify(json) : ''
    var request = self.requestor.post(URL)
                    .set(self.headers())
                    .set('content-type', 'application/json; charset=UTF-8')
                    // .set('content-length', Buffer.byteLength(payload, 'utf-8'))
                    .send(payload)
    // sign request
    this.signer.sign(request)

    // callback
    request.end(function (err, response) {
      // self.logError(URL, err, response)
      callback && callback(err, response)
    })
  }

  /**
   * HW cloud api http put method shortcut
   *
   * @public
   * @method   put
   * @param    resource {string}      resource path (path without domain)
   * @param    json     {json}        put json body
   * @param    callback {Function}    callback Function when request done
   * @return
   */
  put (resource, json, callback) {
    var self = this
    var URL = self.getURL(resource)
    var payload = json ? JSON.stringify(json) : ''
    var request = self.requestor.put(URL)
                    .set(self.headers())
                    .set('content-type', 'application/json; charset=UTF-8')
                    // .set('content-length', Buffer.byteLength(payload, 'utf-8'))
                    .send(payload)
    // sign request
    this.signer.sign(request)

    // callback
    request.end(function (err, response) {
      // self.logError(URL, err, response)
      callback && callback(err, response)
    })
  }

   /**
   * HW cloud api http DELETE method shortcut
   *
   * @public
   * @method   del
   * @param    resource {string}      resource path (path without domain)
   * @param    callback {Function}    callback Function when request done
   * @return
   */
  del (resource, callback) {
    var self = this
    var URL = self.getURL(resource)
    var request = self.requestor.del(URL).set(self.headers())

    // sign request
    this.signer.sign(request)

    // callback
    request.end(function (err, response) {
      // self.logError(URL, err, response)
      callback && callback(err, response)
    })
  }

}

module.exports = Requestor

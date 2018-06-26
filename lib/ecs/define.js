'use strict'

var Requestor = require('../requestor.js')
var Utils = require('../utils.js')

/**
 * ECS API constructor
 * @param {Object} [options] options
 * @param {String} options.endpoint='https://ecs.cn-north-1.myhwclouds.com' ECS API server url
 * @param {String} options.ak access key
 * @param {String} options.sk secret key
 * @param {String} options.region region
 * @param {String} options.projectId project-id
 * @constructor
 */
var ECS = function (options) {
  // validate options
  if (!options.ak || !options.sk || !options.projectId || !options.region || !options.endpoint) {
    var error = 'Could not construct HW.ECS -> option `ak`, `sk`, `projectId` must be present'
    throw new Error(error)
  }

  // initial ECS options
  var _options = Object.assign({
    'endpoint': `https://vpc.cn-north-1.myhwclouds.com`,
    'service': 'vpc',
    'region': 'cn-north-1',
  }, options)

  // merge options to ECS instance
  Object.assign(this, _options)

  // initial HTTP requestor
  this.requestor = new Requestor(_options)
}

/**
 * validated
 * @private
 * @method validated
 * @param {Function}  wrapped  function which should be wrapped for validation
 * @param {Function}  callback Function to be called when error throws
 * @return
 */
ECS.prototype.validated = function (wrapped, callback) {
  try {
    wrapped.call(this) // apply function context to ECS instance
  } catch (err) {
    // var _error = `Access api failed, reason is -> '${err.message}'; `
    // console.error(_error)
    callback && callback(err, null)
  }
}

/**
 * wrap callback to log http request error if neccessary
 * @private
 * @method   logging
 * @param    {String}     request target URL
 * @param    {Object}     err provided by superagent
 * @param    {Object}     response provided by superagent
 * @return
 */
ECS.prototype.logging = function (callback, apiName) {
  var startOn = new Date()
  return function (err, response) {
    /* istanbul ignore if */
    if (err || !response || !response.ok) {
      var endOn = new Date()
      var humanable = err instanceof Error ? err : JSON.stringify(err)
      // 接口名称，请求时间，响应时间，请求字段，返回消息字段
      var _error = `Access api [${apiName}] failed, reason is -> '${humanable}'; `
      if (response && response.status) {
        var details = {
          'api name': apiName,
          'request on': startOn,
          'response on': endOn,
          'http status': response.status,
          'request path': response.request && response.request.url || '',
          'request data': response.request && response.request._data || {},
          'response data': response.body
        }

        console.error(_error + 'details -> ' + JSON.stringify(details, null, 4))
      } else {
        console.error(_error)
      }
    }
    return callback && callback(err, response)
  }
}

ECS.Utils = Utils
ECS.bio = 'HuaWei ECS API Client for NodeJs&browser'

module.exports = ECS

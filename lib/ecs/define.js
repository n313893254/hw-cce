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
  if (!options.ak || !options.sk || !options.projectId) {
    var error = 'Could not construct HW.ECS -> option `ak`, `sk`, `projectId` must be present'
    throw new Error(error)
  }

  // initial ECS options
  var _options = Object.assign({
    'endpoint': 'https://ecs.cn-north-1.myhwclouds.com',
    'service': 'ecs',
    'region': 'cn-north-1'
  }, options)

  // merge options to ECS instance
  Object.assign(this, _options)

  // iniitial HTTP requestor
  this.requestor = new Requestor(_options)

  // add common exception wrapping for input validation
  this.validated = function (wrapped, callback) {
    try {
      wrapped.call(this) // apply function context to ECS instance
    } catch (err) {
      var _error = `Access api failed, reason is -> '${err.message}'; `
      console.error(_error)
      callback && callback(err, null)
    }
  }
}

ECS.Utils = Utils
ECS.bio = 'HuaWei ECS API Client for NodeJs&browser'

module.exports = ECS

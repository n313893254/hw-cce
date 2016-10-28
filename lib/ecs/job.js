'use strict'

// import ECS constuctor
var ECS = require('./define.js')

/**
 * create ECS cloud server
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212668.html
 *
 * @param {string} projectId  租户Id
 * @param {Object} settings   cloud server settings
 * @return
 */
ECS.prototype.getJob = function (jobId, callback) {
  var resource = '/v1/' + this.projectId + '/jobs/' + jobId
  this.requestor.get(resource, null, callback)
}

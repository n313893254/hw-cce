'use strict'

// import ECS constuctor
var ECS = require('./define.js')

/**
 * get job details
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212668.html
 * @method showEcsJob
 * @param {String}    jobId    job id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.showEcsJob = function (jobId, callback) {
  var resource = '/v1/' + this.projectId + '/jobs/' + jobId
  this.requestor.get(resource, null, callback)
}

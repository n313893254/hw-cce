'use strict'

/**
 * job related apis
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0022225397.html
 */

// import ECS constuctor
var ECS = require('./define.js')

/**
 * show ecs job
 * @path GET /v1/{project_id}/jobs/{job_id}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0022225398.html
 * @method showEcsJob
 * @param {String}    jobId    job id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.showEcsJob = function (jobId, callback) {
  var resource = '/v1/' + this.projectId + '/jobs/' + jobId
  this.requestor.get(resource, null, callback)
}

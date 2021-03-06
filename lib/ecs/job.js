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
  var _callback = this.logging(callback, 'ECS.showEcsJob')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(jobId)) {
      throw new Error('Argument `jobId` must be a non-blank String')
    }
    var resource = '/v1/' + this.projectId + '/jobs/' + jobId
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

module.exports = ECS

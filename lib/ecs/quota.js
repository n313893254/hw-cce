'use strict'

/**
 * quota related apis
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212673.html
 */

// import ECS constuctor
var ECS = require('./define.js')

/**
 * show cloud server quota
 *
 * @path GET /v1/{project_id}/cloudservers/limits
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212674.html
 * @method showCloudServerQuota
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.showCloudServerQuota = function (callback) {
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/cloudservers/limits'
    this.requestor.get(resource, null, callback)
  }, callback)
}

module.exports = ECS

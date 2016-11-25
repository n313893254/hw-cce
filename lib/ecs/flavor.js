'use strict'

// import ECS constuctor
var ECS = require('./define.js')

/**
 * list all available cloud server flavors
 *
 * @path GET /v1/{project_id}/cloudservers/flavors
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212656.html
 * @method listCloudServerFlavors
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.listCloudServerFlavors = function (callback) {
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/cloudservers/flavors'
    this.requestor.get(resource, null, callback)
  }, callback)
}

/**
 * list flavors
 *
 * @path GET /v2/{project_id}/flavors/detail
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212658.html
 * @method listFlavorDetails
 * @param {json}      filters  condition used to filter result
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.listFlavorDetails = function (filters, callback) {
  this.validated(function () {
    var resource = '/v2/' + this.projectId + '/flavors/detail'
    this.requestor.get(resource, filters, callback)
  }, callback)
}

/**
 * get flavor
 *
 * @path GET /v2/{project_id}/flavors/{flavors_id}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212659.html
 * @method getFlavor
 * @param {string} flavorId flavor id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.getFlavor = function (flavorId, callback) {
  this.validated(function () {
    if (ECS.Utils.String.isBlank(flavorId)) {
      throw new Error('Argument flavorId must be a non-blank String')
    }
    var resource = '/v2/' + this.projectId + '/flavors/' + flavorId
    this.requestor.get(resource, null, callback)
  }, callback)
}

module.exports = ECS

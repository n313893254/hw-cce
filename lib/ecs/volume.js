'use strict'

// import ECS constuctor
var ECS = require('./define.js')

/**
 * get Cloud Server attached Volumes
 *
 * @path GET /v2/{project_id}/servers/{server_id}/os-volume_attachments
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212671.html
 * @method getCloudServerVolumes
 * @param {String}    serverId server id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.getCloudServerVolumes = function (serverId, callback) {
  var _callback = this.logging(callback, 'ECS.getCloudServerVolumes')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId`must be a non-blank String')
    }
    var resource = '/v2/' + this.projectId + '/servers/' + serverId + '/os-volume_attachments'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

/**
 * get Cloud Server attached Volume detail
 *
 * @path GET /v2/{project_id}/servers/{server_id}/os-volume_attachments/{volume_id}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212672.html
 * @method getCloudServerVolume
 * @param {String}    serverId server id
 * @param {String}    volumeId volume id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.getCloudServerVolume = function (serverId, volumeId, callback) {
  var _callback = this.logging(callback, 'ECS.getCloudServerVolume')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (ECS.Utils.String.isBlank(volumeId)) {
      throw new Error('Argument `volumeId` must be a non-blank String')
    }

    var resource = '/v2/' + this.projectId + '/servers/' + serverId +
                 '/os-volume_attachments/' + volumeId
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

/**
 * attach a volume to cloud server
 *
 * @path POST /v1/{project_id}/cloudservers/{server_id}/attachvolume
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0022472987.html
 * @method attachCloudServerVolume
 * @param {String}    serverId server id
 * @param {String}    volumeId id of the volume you want to detach
 * @param {String}    device   device name, eg: /dev/sda
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.attachCloudServerVolume = function (serverId, volumeId, device, callback) {
  var _callback = this.logging(callback, 'ECS.attachCloudServerVolume')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (ECS.Utils.String.isBlank(volumeId)) {
      throw new Error('Argument `volumeId` must be a non-blank String')
    }

    if (ECS.Utils.String.isBlank(device)) {
      throw new Error('Argument `device` must be a non-blank String')
    }

    var formdata = {
      'volumeAttachment': {
        'volumeId': volumeId,
        'device': device
      }
    }
    var resource = '/v1/' + this.projectId + '/cloudservers/' + serverId + '/attachvolume'
    this.requestor.post(resource, formdata, _callback)
  }, _callback)
}

/**
 * detach a volume to cloud server
 *
 * @path DELETE /v1/{project_id}/cloudservers/{server_id}/detachvolume/{attachment_id}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0022472988.html
 * @method attachCloudServerVolume
 * @param {String}    serverId server id
 * @param {String}    volumeId id of the volume you want to detach
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.detachCloudServerVolume = function (serverId, volumeId, callback) {
  var _callback = this.logging(callback, 'ECS.detachCloudServerVolume')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (ECS.Utils.String.isBlank(volumeId)) {
      throw new Error('Argument `volumeId` must be a non-blank String')
    }

    var resource = '/v1/' + this.projectId + '/cloudservers/' + serverId + '/detachvolume/' + volumeId
    this.requestor.del(resource, _callback)
  }, _callback)
}

module.exports = ECS

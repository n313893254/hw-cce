'use strict'

var ECS = require('./define.js')

/**
 * modify ECS cloud server, we can only modify Cloud-Server's name for now
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212692.html
 * @method modifyCloudServer
 * @param {String}    serverId server id
 * @param {String}    name     updated server name
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.modifyCloudServer = function (serverId, name, callback) {
  var _callback = this.logging(callback, 'ECS.modifyCloudServer')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (ECS.Utils.String.isBlank(name)) {
      throw new Error('Argument `name` must be a non-blank String')
    }

    var resource = '/v2/' + this.projectId + '/servers/' + serverId
    var formdata = {
      'server': {
        'name': name
      }
    }
    this.requestor.put(resource, formdata, _callback)
  }, _callback)
}

/**
 * submit batch action to cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212207.html
 * @method batchActionCloudServer
 * @param {Array}     serverIds server id list
 * @param {String}    action    action -> 'os-start', 'reboot', 'os-stop'
 * @param {Boolean}   force     force to stop if true, used in action reboot and os-stop
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.batchActionCloudServer = function (serverIds, action, force, callback) {
  if (!Array.isArray(serverIds) || serverIds.length === 0) {
    throw new Error('Argument `serverIds` should be an Array like ["server-id-1", "server-id-2"]')
  }

  if ((action === 'os-stop' || action === 'reboot')) {
    force = (force === null) ? false : force
    if (typeof force !== 'boolean') {
      throw new Error('Argument `force` should be boolean [true|false] or null(same as false)')
    }
  }

  var servers = ECS.Utils.map(serverIds, function (server, idx) {
    return {'id': server}
  })

    // build addition parameters {'servers' : [{'id' : 'xxx'}], 'type' : 'HARD|SOFT'}
  var addition = { 'servers': servers }
  if (force !== null) {
    addition.type = force ? 'HARD' : 'SOFT'
  }

  // build formdata {'os-start|reboot|os-stop': {'servers' : [{'id' : 'xxx'}], 'type' : 'HARD|SOFT'}}
  var formdata = {}
  formdata[action] = addition

  var resource = '/v1/' + this.projectId + '/cloudservers/action'
  this.requestor.post(resource, formdata, callback)
}

/**
 * batch start cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212207.html
 * @method startBatchCloudServers
 * @param {Array}     serverIds server id list
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.startBatchCloudServers = function (serverIds, callback) {
  var _callback = this.logging(callback, 'ECS.startBatchCloudServers')
  this.validated(function () {
    this.batchActionCloudServer(serverIds, 'os-start', null, _callback)
  }, _callback)
}

/**
 * batch reboot cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212649.html
 * @method rebootBatchCloudServers
 * @param {Array}     serverIds server id list
 * @param {Boolean}   force     force to stop
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.rebootBatchCloudServers = function (serverIds, force, callback) {
  var _callback = this.logging(callback, 'ECS.rebootBatchCloudServers')
  this.validated(function () {
    this.batchActionCloudServer(serverIds, 'reboot', force, _callback)
  }, _callback)
}

/**
 * batch stop cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212651.html
 * @method stopBatchCloudServers
 * @param {Array}     serverIds server id list
 * @param {Boolean}   force     force to stop
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.stopBatchCloudServers = function (serverIds, force, callback) {
  var _callback = this.logging(callback, 'ECS.stopBatchCloudServers')
  this.validated(function () {
    this.batchActionCloudServer(serverIds, 'os-stop', force, _callback)
  }, _callback)
}

/**
 * common method for submit action to cloud server
 *
 * @method submitActionToCloudServer
 * @param {Array}     serverId server id
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.submitActionToCloudServer = function (serverId, action, force, callback) {
  if (ECS.Utils.String.isBlank(serverId)) {
    throw new Error('Argument serverId must be a non-blank String')
  }

  if ((action === 'os-stop' || action === 'reboot')) {
    force = (force === null) ? false : force
    if (typeof force !== 'boolean') {
      throw new Error('Argument `force` should be boolean [true|false] or null(same as false)')
    }
  }

  // build addition parameters {'type' : 'HARD|SOFT'}
  var addition = {}
  if (force !== null) {
    addition.type = force ? 'HARD' : 'SOFT'
  }

  // build formdata {'os-start|reboot|os-stop': {'type' : 'HARD|SOFT'}}
  var formdata = {}
  formdata[action] = addition

  var resource = '/v2/' + this.projectId + '/servers/' + serverId + '/action'
  this.requestor.post(resource, formdata, callback)
}

/**
 * start cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212648.html
 * @method startCloudServer
 * @param {Array}     serverId server id
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.startCloudServer = function (serverId, callback) {
  var _callback = this.logging(callback, 'ECS.startCloudServer')
  this.validated(function () {
    this.submitActionToCloudServer(serverId, 'os-start', null, _callback)
  }, _callback)
}

/**
 * stop cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212652.html
 * @method stopCloudServer
 * @param {Array}     serverId server id
 * @param {Boolean}   force     force to stop
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.stopCloudServer = function (serverId, force, callback) {
  var _callback = this.logging(callback, 'ECS.stopCloudServer')
  this.validated(function () {
    this.submitActionToCloudServer(serverId, 'os-stop', force, _callback)
  }, _callback)
}

/**
 * reboot cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212650.html
 * @method rebootCloudServer
 * @param {Array}     serverId server id
 * @param {Boolean}   force     force to stop
 * @param {Function}  callback  Function to be called when request done
 * @return
 */
ECS.prototype.rebootCloudServer = function (serverId, force, callback) {
  var _callback = this.logging(callback, 'ECS.rebootCloudServer')
  this.validated(function () {
    this.submitActionToCloudServer(serverId, 'reboot', force, _callback)
  }, _callback)
}

/**
 * resize cloud servers
 *
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212653.html
 * @method resizeCloudServer
 * @param {String}    serverId server id
 * @param {String}    flavorId flavor id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.resizeCloudServer = function (serverId, flavorId, callback) {
  var _callback = this.logging(callback, 'ECS.resizeCloudServer')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }
    if (ECS.Utils.String.isBlank(flavorId)) {
      throw new Error('Argument `flavorId` must be a non-blank String')
    }

    var formdata = {
      'resize': {
        'flavorRef': flavorId
      }
    }
    var resource = '/v1/' + this.projectId + '/cloudservers/' + serverId + '/resize'
    this.requestor.post(resource, formdata, _callback)
  }, _callback)
}

module.exports = ECS

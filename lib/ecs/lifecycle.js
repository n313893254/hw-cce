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
ECS.prototype.createCloudServer = function (settings, callback) {
  var _callback = this.logging(callback, 'ECS.createCloudServer')
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/cloudservers'
    this.requestor.post(resource, settings, _callback)
  }, _callback)
}

/**
 * delete ECS cloud server
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212679.html
 *
 * @param {string} projectId  租户Id
 * @param {Array|String} servers server id Array -> ['server-id-1', 'server-id-2', '...']
 * @param {Boolean} [option] deletePublicIp delete the public ip bound to the servers
 * @param {Boolean} [option] delete the volume bound to the servers
 * @return
 */
ECS.prototype.deleteCloudServer = function (servers, deletePublicIp, deleteVolume, callback) {
  var _callback = this.logging(callback, 'ECS.deleteCloudServer')
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/cloudservers/delete'

    if (typeof deletePublicIp !== 'boolean') {
      throw new Error('Argument `deletePublicIp` is required and should be boolean [true|false]')
    }
    if (typeof deleteVolume !== 'boolean') {
      throw new Error('Argument `deleteVolume` is required and should be boolean [true|false]')
    }

    // transfer servers to the required structure
    var _servers = []
    if (ECS.Utils.String.isNotBlank(servers)) {
      // if user-input is String - single server
      _servers.push({ 'id': servers })
    } else {
      if (!Array.isArray(servers) || servers.length === 0) {
        throw new Error('Argument `servers` should be a not empty Array or a non-blank string')
      }
      // if user-input is array - server list
      _servers = ECS.Utils.map(servers, function (server, key) {
        if (ECS.Utils.String.isBlank(server)) {
          throw new Error('Argument `servers` Array should not contains blank string')
        }
        return {'id': server}
      })
    }

    var formdata = {
      'servers': _servers,
      'delete_publicip': deletePublicIp,
      'delete_volume': deleteVolume
    }

    // console.log(formdata)
    this.requestor.post(resource, formdata, _callback)
  }, _callback)
}

/**
 * get ECS cloud server
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212690.html
 *
 * @param {string} projectId  租户Id
 * @param {string} serverId   server id
 * @return
 */
ECS.prototype.getCloudServer = function (serverId, callback) {
  var _callback = this.logging(callback, 'ECS.getCloudServer')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument serverId must be a non-blank String')
    }

    var resource = '/v2/' + this.projectId + '/servers/' + serverId
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

/**
 * list ECS cloud servers
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212688.html
 *
 * @param {string} projectId  租户Id
 * @param {Object} [options] filters changes-since,image,flavor,name,status,host,limit,marker,not-tags
 * @param {String} filters.changes-since
 * @param {String} filters.image
 * @param {String} filters.flavor
 * @param {String} filters.name
 * @param {String} filters.status
 * @param {String} filters.host
 * @param {Integer} filters.limit
 * @param {String} filters.marker
 * @param {String} filters.not-tags
 * @return {Object} servers json
 */
ECS.prototype.listCloudServers = function (filters, callback) {
  var _callback = this.logging(callback, 'ECS.listCloudServers')
  this.validated(function () {
    var resource = '/v2/' + this.projectId + '/servers'
    this.requestor.get(resource, filters, _callback)
  }, _callback)
}

/**
 * list ECS cloud server details
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212689.html
 *
 * @param {string} projectId  租户Id
 * @param {Object} [options] filters changes-since,image,flavor,name,status,host,limit,marker,not-tags
 * @param {String} filters.changes-since
 * @param {String} filters.image
 * @param {String} filters.flavor
 * @param {String} filters.name
 * @param {String} filters.status
 * @param {String} filters.host
 * @param {Integer} filters.limit
 * @param {String} filters.marker
 * @param {String} filters.not-tags
 * @return {Object} servers json
 */
ECS.prototype.listCloudServerDetails = function (filters, callback) {
  var _callback = this.logging(callback, 'ECS.listCloudServerDetails')
  this.validated(function () {
    var resource = '/v2/' + this.projectId + '/servers/detail'
    this.requestor.get(resource, filters, _callback)
  }, _callback)
}

module.exports = ECS

'use strict'

var ECS = require('./define.js')

/**
 * modify ECS cloud server, we can only modify Cloud-Server's name for now
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212692.html
 *
 * @param {String} projectId  租户Id
 * @param {String} serverId   server id
 * @param {Function} callback Function to be called when request done
 * @return {Object}
 */
ECS.prototype.modifyCloudServer = function (projectId, serverId, name, callback) {

}

module.exports = ECS

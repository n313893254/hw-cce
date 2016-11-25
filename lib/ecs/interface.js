'use strict'

/**
 * cloud server interface related apis
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212660.html
 */

// import ECS constuctor
var ECS = require('./define.js')

/**
 * list cloud-server's interfaces
 *
 * @path GET /v2/{project_id}/servers/{server_id}/os-interface
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212661.html
 * @method listCloudServerInterfaces
 * @param {String}    serverId server id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.listCloudServerInterfaces = function (serverId, callback) {
  var _callback = this.logging(callback, 'ECS.listCloudServerInterfaces')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }
    var resource = '/v2/' + this.projectId + '/servers/' + serverId + '/os-interface'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

/**
 * get cloud-server's interface
 * @path GET /v2/{project_id}/servers/{server_id}/os-interface/{id}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212662.html
 * @method getCloudServerInterface
 * @param {String}    serverId job id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.getCloudServerInterface = function (serverId, portId, callback) {
  var _callback = this.logging(callback, 'ECS.getCloudServerInterface')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }
    if (ECS.Utils.String.isBlank(portId)) {
      throw new Error('Argument `portId` must be a non-blank String')
    }
    var resource = '/v2/' + this.projectId + '/servers/' + serverId +
    '/os-interface/' + portId
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

/**
 * attach an interface to a cloud-server
 *
 * @path POST /v2/{project_id}/servers/{server_id}/os-interface
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212664.html
 * @method attachCloudServerInterface
 * @param {String}    serverId server id
 * @param {String}    portId   port id
 * @param {String}    netId    net id - has no meaning if portId is present
 * @param {String}    fixedIp  fixed ips - has no meaning if portId is present, only work with net id
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.attachCloudServerInterface = function (serverId, portId, netId, fixedIp, callback) {
  var _callback = this.logging(callback, 'ECS.attachCloudServerInterface')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    var valid = false
    var parameters = {}
    if (ECS.Utils.String.isNotBlank(portId)) {
      valid = true
      parameters['port_id'] = portId
    }

    if (ECS.Utils.String.isNotBlank(netId)) {
      valid = true
      parameters['net_id'] = netId
    // if fixedIp presents, use it
      if (ECS.Utils.String.isNotBlank(fixedIp)) {
        parameters['fixed_ips'] = [{
          'ip_address': fixedIp
        }]
      }
    }

    if (!valid) {
      throw new Error('One of Argument `portId` and `netId` must be present as a non-blank string')
    }

    var formdata = { 'interfaceAttachment': parameters }
    var resource = '/v2/' + this.projectId + '/servers/' + serverId + '/os-interface'
    this.requestor.post(resource, formdata, _callback)
  }, _callback)
}

/**
 * batch attach interfaces to a cloud-server
 * ----
 * subnets data structure: [{
 *    'subnetId' : 'd32019d3-bc6e-4319-9c1d-6722fc136a23',
 *    'ipAddress' : '10.10.1.2',
 *    'securityGroupId' : 'f0ac4394-7e4a-4409-9701-ba8be283dbc3'
 * } , {
 *    'subnetId' : 'd32019d3-bc6e-4319-9c1d-6722fc136a23',
 *    'ipAddress' : '10.10.1.2',
 *    'securityGroupId' : 'f0ac4394-7e4a-4409-9701-ba8be283dbc3'
 * }]
 *
 * @path POST /v1/{project_id}/cloudservers/{server_id}/nics
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212663.html
 * @method attachBatchCloudServerInterface
 * @param {String}    serverId server id
 * @param {Array}     subnets  subnets
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.attachBatchCloudServerInterface = function (serverId, subnets, callback) {
  var _callback = this.logging(callback, 'ECS.attachBatchCloudServerInterface')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (!Array.isArray(subnets) || subnets.length === 0) {
      throw new Error('Argument `subnets` should be a not empty Array')
    }

  // make sure all subnet's id is present
    ECS.Utils.each(subnets, function (subnet, idx) {
      if (ECS.Utils.String.isBlank(subnet.subnetId)) {
        throw new Error('Argument subnets[' + idx + '].subnetId is missing')
      }
    })

  // generate subnets
    var _subnets = ECS.Utils.map(subnets, function (subnet, idx) {
      var mapped = { 'subnet_id': subnet.subnetId }
      if (ECS.Utils.String.isNotBlank(subnet.ipAddress)) {
        mapped['ip_address'] = subnet.ipAddress
      }
      if (ECS.Utils.String.isNotBlank(subnet.securityGroupId)) {
        mapped['security_groups'] = [{
          'id': subnet.securityGroupId
        }]
      }
      return mapped
    })

  // formdata to be post
    var formdata = {
      'nics': _subnets
    }

    var resource = '/v1/' + this.projectId + '/cloudservers/' + serverId + '/nics'
    this.requestor.post(resource, formdata, _callback)
  }, _callback)
}

/**
 * detach an interface of a cloud-server
 *
 * @path DELETE /v2/{ project_id}/servers/{server_id}/os-interface/{id}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212666.html
 * @method detachCloudServerInterface
 * @param {String}    serverId server id
 * @param {String}    portId   port id - id of interface which you want to detach
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.detachCloudServerInterface = function (serverId, portId, callback) {
  var _callback = this.logging(callback, 'ECS.detachCloudServerInterface')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (ECS.Utils.String.isBlank(portId)) {
      throw new Error('Argument `portId` must be a non-blank String')
    }

    var resource = '/v2/' + this.projectId + '/servers/' + serverId +
    '/os-interface/' + portId
    this.requestor.del(resource, _callback)
  }, _callback)
}

/**
 * batch detach interface of a cloud-server
 *
 * @path POST /v1/{project_id}/cloudservers/{server_id}/nics/delete
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212665.html
 * @method detachBatchCloudServerInterface
 * @param {String}    serverId server id
 * @param {String}    ports    port id list - id of interface which you want to detach
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.detachBatchCloudServerInterface = function (serverId, ports, callback) {
  var _callback = this.logging(callback, 'ECS.detachBatchCloudServerInterface')
  this.validated(function () {
    if (ECS.Utils.String.isBlank(serverId)) {
      throw new Error('Argument `serverId` must be a non-blank String')
    }

    if (!Array.isArray(ports) || ports.length === 0) {
      throw new Error('Argument `ports` should be a not empty Array')
    }

    var _ports = ECS.Utils.map(ports, function (portId, idx) {
      if (ECS.Utils.String.isBlank(portId)) {
        throw new Error('Argument ports[' + idx + '] is illegal')
      }
      return { 'id': portId }
    })

    var formdata = { 'nics': _ports }

    var resource = '/v1/' + this.projectId + '/cloudservers/' + serverId + '/nics/delete'
    this.requestor.post(resource, formdata, _callback)
  }, _callback)
}

module.exports = ECS

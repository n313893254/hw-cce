'use strict'

// import ECS constuctor
var ECS = require('./define.js')

ECS.prototype.getVpcs = function (callback) {
  var _callback = this.logging(callback, 'ECS.getVpcs')
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/vpcs'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

ECS.prototype.getSubnet = function (callback) {
  var _callback = this.logging(callback, 'ECS.getSubnet')
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/subnets'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}


module.exports = ECS

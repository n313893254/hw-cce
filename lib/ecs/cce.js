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

ECS.prototype.getPublicips = function (callback) {
  var _callback = this.logging(callback, 'ECS.getPublicips')
  this.validated(function () {
    var resource = '/v1/' + this.projectId + '/publicips'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

ECS.prototype.getAvaliableZone = function (callback) {
  var _callback = this.logging(callback, 'ECS.getAvaliableZone')
  this.validated(function () {
    var resource = '/v2/' + this.projectId + '/os-availability-zone'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}

ECS.prototype.getPorts = function (callback) {
  var _callback = this.logging(callback, 'ECS.getPorts')
  this.validated(function () {
    var resource = '/v1/ports'
    this.requestor.get(resource, null, _callback)
  }, _callback)
}


module.exports = ECS

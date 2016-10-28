// Convenience file to require the SDK from the root of the repository

// TODO hwclouds.com has informal https certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

// namespace define
var HW = {}

// cloud modules registor
HW.ECS = require('./lib/ecs-all.js')

// we could add other modules later
// eg: HW.EVS = require('lib/xxx')

// exports modules
module.exports = HW

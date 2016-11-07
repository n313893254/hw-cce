'use strict'

// include all ECS modules into ECS namespace
var ECS = require('./ecs/lifecycle.js') // lifecycle module
require('./ecs/status.js')  // status module
require('./ecs/flavor.js')  // flavor module
require('./ecs/interface.js')  // interface module
require('./ecs/volume.js')  // volume module
require('./ecs/quota.js')   // quota module
require('./ecs/keypair.js') // keypair module
require('./ecs/job.js')     // job module

module.exports = ECS

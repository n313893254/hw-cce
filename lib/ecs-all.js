'use strict'

// include all ECS modules into ECS namespace
var ECS = require('./ecs/lifecycle.js') // lifecycle module
require('./ecs/status.js')  // status module
require('./ecs/flavor.js')  // flavor module
require('./ecs/job.js')  // job module

module.exports = ECS

/**
 * 批量关闭云服务器例子
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212651.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

ECSClient.listCloudServers({limit: 5, name: 'example'}, function (err, response) {
  if (!err && response.ok) {
    // 获取最多5个名称包含 example的云服务列表
    var servers = response.body.servers
    // 得到云服务器ID
    var serverIds = HW.ECS.Utils.map(servers, function (server, idx) {
      return server.id
    })

    // 是否强制关机
    var forceStop = false
    // 批量关闭这几个云服务器
    ECSClient.stopBatchCloudServers(serverIds, forceStop, function (err, response) {
      if (!err && response.ok) {
        console.log(JSON.stringify(response.body, null, 2))
      } else {
        console.log(err)
      }
    })
  }
})

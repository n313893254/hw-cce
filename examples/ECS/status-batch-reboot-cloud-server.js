/**
 * 批量重启云服务器例子
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212649.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

ECSClient.listCloudServers({limit: 5}, function (err, response) {
  if (!err && response.ok) {
    // 获取最多5个名称包含 example的云服务列表
    var servers = response.body.servers
    // 得到云服务器ID
    var serverIds = HW.ECS.Utils.map(servers, function (server, idx) {
      return server.id
    })

    // serverIds = ['33e19653-0f87-40ba-a13b-17727cc989e1', 'f479cc36-a510-4d69-b433-6960c1b99f01',
    //   '89351b6c-3ffd-497d-8f06-822ecfbedab1']
    // 是否强制关机
    var forceStop = false
    // 批量重启这几个云服务器
    ECSClient.rebootBatchCloudServers(serverIds, forceStop, function (err, response) {
      if (!err && response.ok) {
        console.log(JSON.stringify(response.body, null, 2))
      } else {
        console.log(err)
      }
    })
  }
})

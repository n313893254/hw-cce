/**
 * 获取云服务器实例例子
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 获取已有的云服务器列表
var filters = { limit: 1, 'name': 'example' }
ECSClient.listCloudServers(filters, function (err, response) {
  if (!err && response.ok) {
    var servers = response.body.servers
    var serverId = servers.length === 1 && servers[0].id // 获取serverId
    if (serverId) {
      // 获取云服务器详情 API：https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212690.html
      ECSClient.getCloudServer(serverId, function (err, response) {
        if (!err && response.ok) {
          console.log(JSON.stringify(response.body, null, 2))
        } else {
          console.log(err)
        }
      })
    }
  }
})


/**
 * 删除云服务器列表例子
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212679.html
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
    // 获取serverId
    var serverIds = servers.length === 1 && servers[0].id
    if (serverIds) {
      var deletePublicId = true
      var deleteVolume = true
      // 删除云服务器API详情：https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212679.html

      // serverIds 可以是数组，包含多个需要删除的server
      // serverIds 也可以是string，只删除单个server
      ECSClient.deleteCloudServer(serverIds, deletePublicId, deleteVolume, function (err, response) {
        if (!err && response.ok) {
          console.log(JSON.stringify(response.body, null, 2))
        } else {
          console.log(err)
        }
      })
    }
  }
})


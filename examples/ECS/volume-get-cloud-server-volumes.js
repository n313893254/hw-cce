/**
 * 查询弹性云服务器挂载磁盘信息
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212671.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 调用查询云服务器列表API，获取一个云服务器ID
var filters = { limit: 1, 'name': 'example' }
ECSClient.listCloudServers(filters, function (err, response) {
  if (!err && response.ok) {
    var servers = response.body.servers
    if (servers && servers.length > 0) {
      // 得到服务器ID
      var serverId = servers[0].id
      // 获取该云服务器挂载的磁盘信息
      ECSClient.getCloudServerVolumes(serverId, function (err, response) {
        if (!err && response.ok) {
          console.log(JSON.stringify(response.body, null, 2))
        } else {
          console.log(err)
        }
      })
    }
  }
})


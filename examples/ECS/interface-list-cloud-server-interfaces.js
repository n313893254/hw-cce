/**
 * 查询云服务器网卡信息
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212661.html
 */

var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 获取一个云服务器
ECSClient.listCloudServers({limit: 1}, function (err, response) {
  if (!err && response.ok) {
    var servers = response.body.servers
    // 获取serverId，也可以直接云服务器ID
    var serverId = servers.length === 1 && servers[0].id
    if (serverId) {
      console.log('try to list interfaces of cloud-server ' + serverId)
      // 查询云服务器网卡信息
      ECSClient.listCloudServerInterfaces(serverId, function (err, response) {
        if (!err && response.ok) {
          console.log(JSON.stringify(response.body, null, 2))
        } else {
          console.log(err)
        }
      })
    }
  }
})


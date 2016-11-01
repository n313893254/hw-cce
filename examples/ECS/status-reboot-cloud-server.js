/**
 * 重启云服务器例子
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212650.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 是否强制关机
var forceStop = false
var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // 改成想要操作的云服务器ID
ECSClient.rebootCloudServers(serverId, forceStop, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

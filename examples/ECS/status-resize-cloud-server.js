/**
 * 调整云服务器配额例子
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212652.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

var flavorId = 'c1.large' // http://support.hwclouds.com/usermanual-ecs/zh-cn_topic_0035470096.html
var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // 改成想要操作的云服务器ID

// 注意需要先关闭服务器，才能进行修改配额操作
ECSClient.resizeCloudServer(serverId, flavorId, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

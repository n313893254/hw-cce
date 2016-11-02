/**
 * 查询弹性云服务器挂载的单个磁盘信息
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212672.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 这个API似乎有点多余，getCloudServerVolumes API中已经能取到所有的磁盘信息
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'  // 改成你的云服务ID
var volumeId = 'be663283-4d1b-4ea4-a44d-7841d15882cd'  // 改成你的磁盘ID
ECSClient.getCloudServerVolume(serverId, volumeId, function (err, response) {
  if (!err && response.ok) {
    console.log(response.body)
  } else {
    console.log(err)
  }
})


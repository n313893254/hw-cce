/**
 * 查询云服务器规格详情和扩展信息列表
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212656.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)


// 获取所有云服务器规格详情和扩展信息列表
ECSClient.listCloudServerFlavors(function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

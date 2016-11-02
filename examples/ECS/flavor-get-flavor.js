/**
 * 查询云服务器规格详情
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212659.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 查询云服务器规格详情列表
ECSClient.listFlavorDetails(function (err, response) {
  if (!err && response.ok) {
    var flavors = response.body.flavors
    var flavorId = flavors[0].id  // 获取flavorId

    // 调用接口获取flavor详情
    ECSClient.getFlavor(flavorId, function (err, response) {
      if (!err && response.ok) {
        console.log(JSON.stringify(response.body, null, 2))
      } else {
        console.log(err)
      }
    })
  }
})

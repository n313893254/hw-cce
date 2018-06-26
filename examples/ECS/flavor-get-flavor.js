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
ECSClient.getPorts((err, response) => {
  if (!err && response.ok) {
    console.log(response.body)
  }
})

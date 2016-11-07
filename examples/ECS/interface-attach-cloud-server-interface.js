/**
 * 查询云服务器网卡信息 TODO
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212661.html
 */

var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 获取一个云服务器
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
var portId = '4b022d6b-74a9-4d39-8678-356d403f985a' // 网卡ID
var netId = 'e860e98c-3475-4725-bf6e-6a4956078245'  // vpc下的子网ID(subnet id)
var fixedIp = '10.10.3.10' // 内网IP，必须在子网内，且未被使用

// 从原来卸载的某个网卡中添加，这时候 net-id 和 fixed-ip 参数是无效的（传了也没有效果）
ECSClient.attachCloudServerInterface(serverId, portId, null, null, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

// 从子网中添加网卡，这时候，port-id不能传，只能为 null
// ECSClient.attachCloudServerInterface(serverId, null, netId, fixedIp, function (err, response) {
//   if (!err && response.ok) {
//     console.log(JSON.stringify(response.body, null, 2))
//   } else {
//     console.log(err)
//   }
// })




/**
 * 创建云服务器列表例子
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 参数详见，https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212668.html
// 下面的部分参数需要修改成您管理后台中 对应的ID
var vpcid = '1e162a02-7612-45d8-a1e6-b01d5fde1872' // 虚拟私有云
var subnetId = 'c2c7425e-5e35-4767-a524-74a52c217b49' // 子网
var securityGroupId = '40c74dbd-aaca-4d93-b03e-9736ed856f25' // 安全组
var flavorId = 'c1.medium' // 服务器规格，可以通过接口 ECSClient.listCloudServerFlavors 获取

var formdata = {
  'server': {
    'availability_zone': 'cn-north-1a',
    'name': 'example',
    'imageRef': '34cbafb2-33ae-4e7f-9a2b-540d9f27ab96',
    'root_volume': {
      'volumetype': 'SSD'
    },
    'flavorRef': flavorId,
    'personality': [
      {
        'path': '/etc/banner.txt',
        'contents': 'ICAgICAgDQoiQmFjaA=='
      }
    ],
    'security_groups': [
      {
        'id': securityGroupId
      }
    ],
    'vpcid': vpcid,
    'nics': [
      {
        'subnet_id': subnetId
      }
    ],
    // 'key_name': 'sshkey-123',
    'adminPass': '$%#@WErfG00%',
    'count': 1,
    'extendparam': {
      'regionID': 'cn-north-1'
    }
  }
}

// 调用创建云服务器列表API
ECSClient.createCloudServer(formdata, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})


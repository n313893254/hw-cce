## 弹性云服务器生命周期管理

### 1. 创建云服务器 ([例子](../examples/ECS/lifecycle-create-cloud-server.js)) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212668.html)

```
ECSClient.createCloudServer(formdata, callback)
```

|   参数   | 类型     | 是否必填 | 说明                 | 例子         |
|:--------:|:--------:|:--------:|----------------------|--------------|
| formdata | json     |    是    | 要创建的云服务器配置 | 详见官方文档 |
| callback | function |    是    | 请求回调             |              |

formdata例子

```
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
```


### 2. 删除云服务器 [例子](../examples/ECS/lifecycle-delete-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212679.html)

```
var servers = ['server-id-1', 'server-id-2'] // servers可以是数组，包含多个需要删除的server
var servers = 'server-id-1'                  // servers也可以是string，只删除单个server     
ECSClient.deleteCloudServer(servers, deletePublicId, deleteVolume, callback)
```

|      参数      |     类型     | 必填 | 说明                         | 例子                         |
|:--------------:|:------------:|:----:|------------------------------|------------------------------|
|     servers    | String,array |  是  | 要删除的服务器ID             | 既可以是数组，也可以是string |
| deletePublicId |    boolean   |  是  | 是否删除云服务器绑定的弹性IP |                              |
|  deleteVolume  |    boolean   |  是  | 是否删除云服务器数据盘       |                              |
|    callback    |   function   |  否  | 请求回调                     |                              |

> servers可以是数组，包含多个需要删除的server-id，也可以是string，只删除单个server  

### 3. 查询云服务器列表 [例子](../examples/ECS/lifecycle-list-cloud-servers.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212688.html)

```
var filters = { limit: 10, 'name': 'example' }
ECSClient.listCloudServers(filters, callback)
```

| 参数     | 类型     | 必填 | 说明     | 例子                             |
|:--------:|:--------:|:----:|----------|----------------------------------|
| filters  | json     | 否   | 查询条件 | { limit: 10, 'name': 'example' } |
| callback | function | 否   | 请求回调 |                                  |

`filters` 参数可设置的属性

| 名称          | 是否必选 | 参数类型        | 说明                               |
|---------------|----------|-----------------|------------------------------------|
| changes-since | 否       | String:DateTime | 云服务器上次更新状态的时间戳信息。 |
| image         | 否       | String          | 镜像ID。                           |
| flavor        | 否       | String          | 云服务器类型ID。                   |
| name          | 否       | String          | 云服务器名称。                     |
| status        | 否       | String          | 云服务器状态。                     |
| host          | 否       | String          | 主机节点名称。                     |
| limit         | 否       | Integer         | 查询返回云服务器数量限制。         |

### 4. 查询云服务器详情列表 [例子](../examples/ECS/lifecycle-list-cloud-server-details.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212689.html)

```
var filters = { limit: 10, 'name': 'example' }
ECSClient.listCloudServerDetails(filters, callback)
```

| 参数     | 类型     | 必填 | 说明     | 例子                             |
|:--------:|:--------:|:----:|----------|----------------------------------|
| filters  | json     | 否   | 查询条件 | { limit: 10, 'name': 'example' } |
| callback | function | 否   | 请求回调 |                                  |

`filters` 参数可设置的属性

| 名称          | 是否必选 | 参数类型        | 说明                               |
|---------------|----------|-----------------|------------------------------------|
| changes-since | 否       | String:DateTime | 云服务器上次更新状态的时间戳信息。 |
| image         | 否       | String          | 镜像ID。                           |
| flavor        | 否       | String          | 云服务器类型ID。                   |
| name          | 否       | String          | 云服务器名称。                     |
| status        | 否       | String          | 云服务器状态。                     |
| host          | 否       | String          | 主机节点名称。                     |
| limit         | 否       | Integer         | 查询返回云服务器数量限制。         |

### 5.查询云服务器详情 [例子](../examples/ECS/lifecycle-get-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212689.html)

```
ECSClient.getCloudServer(serverId, callback)
```

| 参数     | 类型     | 必填 | 说明       | 例子 |
|:--------:|:--------:|:----:|------------|------|
| serverId | string   | 是   | 云服务器Id |      |
| callback | function | 否   | 请求回调   |      |
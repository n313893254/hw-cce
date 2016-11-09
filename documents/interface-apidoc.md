## 弹性云服务器网卡管理 [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212660.html)

### 1. 查询云服务器网卡信息 [例子](../examples/ECS/interface-list-cloud-server-interfaces.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212661.html)

```
ECSClient.listCloudServerInterfaces(serverId, portId, callback)
```

|   参数   |   类型   | 是否必填 | 说明       | 例子 |
|:--------:|:--------:|:--------:|------------|------|
| serverId |  string  |    是    | 云服务器ID |      |
| callback | function |    否    | 请求回调   |      |


### 2. 查询指定云服务器网卡信息 [例子](../examples/ECS/interface-get-cloud-server-interface.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212661.html)

```
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99' // 云服务器ID
var portId = '98bcc1ea-0afa-441c-a457-79457112d14e' // 网卡ID
ECSClient.getCloudServerInterface(serverId, portId, callback)
```

|   参数   |   类型   | 是否必填 | 说明       | 例子 |
|:--------:|:--------:|:--------:|------------|------|
| serverId |  string  |    是    | 云服务器ID |      |
|  portId  |  string  |    是    | 网卡Id     |      |
| callback | function |    否    | 请求回调   |      |


### 3. 批量添加云服务器网卡 [例子](../examples/ECS/interface-attach-batch-cloud-server-interface.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212663.html)

```
var subnets = [{
  'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
  'securityGroupId': 'b4b7153c-bf90-444a-b696-e63518031c15',
  'ipAddress': '10.10.2.20'
}, {
  'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
  'securityGroupId': 'b4b7153c-bf90-444a-b696-e63518031c15',
  'ipAddress': '10.10.2.21'
}]

// 提交批量添加网卡请求
ECSClient.attachBatchCloudServerInterface(serverId, subnets, callback)
```

|   参数   |   类型   | 是否必填 | 说明           | 例子         |
|:--------:|:--------:|:--------:|----------------|--------------|
| serverId |  string  |    是    | 云服务器ID     |              |
|  subnets |   array  |    是    | 新增的网卡设置 | 见上面的例子 |
| callback | function |    否    | 请求回调       |              |

`subnets` 参数可设置的属性

|       参数      |   类型   | 是否必填 | 说明                           | 例子 |
|:---------------:|:--------:|:--------:|--------------------------------|------|
|     subnetId    |  string  |    是    | 子网Id                         |      |
| securityGroupId |  string  |    否    | 安全组ID                       |      |
|    ipAddress    |  string  |    否    | IP，必须在对应的安全组IP范围内 |      |
|     callback    | function |    否    | 请求回调                       |      |

### 4. 添加云服务器网卡 [例子](../examples/ECS/interface-attach-batch-cloud-server-interface.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212664.html)

```
ECSClient.attachCloudServerInterface(serverId, portId, netId, fixedIp, callback)
```

|   参数   |   类型   | 是否必填 | 说明       | 例子                       |
|:--------:|:--------:|:--------:|------------|----------------------------|
| serverId |  string  |    是    | 云服务器ID |                            |
|  portId  |  string  |    否    | 网卡ID     | 如果不指定网卡，设置为Null |
|   netId  |  string  |    否    | 子网ID     | 有portId时，该参数不起作用 |
|  fixedIp |  string  |    否    | 指定IP     | 有portId时，该参数不起作用 |
| callback | function |    否    | 请求回调   |                            |

> 如果portId不为null，则添加已有的网卡。如果portId为null，则新创建网卡，并绑定指定的子网和IP。


### 5. 批量删除云服务器网卡 [例子](../examples/ECS/interface-detach-batch-cloud-server-interface.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212665.html)

```
var ports = ['2df10824-025a-45e3-8fea-304a3ccf65ed', '46328e74-53bf-4144-bfc8-437aef96f665']
ECSClient.detachBatchCloudServerInterface(serverId, ports, callback)
```

|   参数   |   类型   | 是否必填 | 说明           | 例子         |
|:--------:|:--------:|:--------:|----------------|--------------|
| serverId |  string  |    是    | 云服务器ID     |              |
|  ports   |   array  |    是    | 网卡ID列表     | 见上面的例子 |
| callback | function |    否    | 请求回调       |              |

### 6. 删除云服务器网卡 [例子](../examples/ECS/interface-detach-cloud-server-interface.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212666.html)

```
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99' // 改成你的云服务器ID
var portId = '4b022d6b-74a9-4d39-8678-356d403f985a' // 改成你的网卡ID，不能是主网卡
ECSClient.detachCloudServerInterface(serverId, portId, callback)
```

|   参数   |   类型   | 是否必填 | 说明       | 例子         |
|:--------:|:--------:|:--------:|------------|--------------|
| serverId |  string  |    是    | 云服务器ID |              |
|  portId  |  string  |    是    | 网卡ID     | 不能是主网卡 |
| callback | function |    否    | 请求回调   |              |
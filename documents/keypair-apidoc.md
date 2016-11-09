## 弹性云服务器SSH密钥管理 [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212675.html)

### 1. 查询SSH密钥列表 [例子](../examples/ECS/keypair-list-keypairs.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212676.html)

```
ECSClient.listKeypairs(callback)
```

|   参数   |   类型   | 是否必填 | 说明                   | 例子 |
|:--------:|:--------:|:--------:|------------------------|------|
| callback | function |    否    | 请求回调               |      |

### 2. 查询SSH密钥详情 [例子](../examples/ECS/keypair-get-keypair.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212677.html)

```
ECSClient.getKeypair(keypairName, callback)
```

|     参数    |   类型   | 是否必填 | 说明        | 例子 |
|:-----------:|:--------:|:--------:|-------------|------|
| keypairName |  string  |    是    | SSH-key名称 |      |
|   callback  | function |    否    | 请求回调    |      |

### 3. 创建和导入SSH密钥 [例子](../examples/ECS/keypair-create-keypair.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212678.html)

```
ECSClient.createKeypair(keypairName, publicKey, callback)
```

|     参数    |   类型   | 是否必填 | 说明        | 例子                         |
|:-----------:|:--------:|:--------:|-------------|------------------------------|
| keypairName |  string  |    是    | SSH-key名称 |                              |
|  publicKey  |  string  |    否    | SSH公钥     | 假如为空，则由服务器自行创建 |
|   callback  | function |    否    | 请求回调    |                              |


### 4. 删除SSH密钥 [例子](../examples/ECS/keypair-delete-keypair.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212680.html)

```
ECSClient.deleteKeypair(keypairName, callback)
```

|     参数    |   类型   | 是否必填 | 说明        | 例子 |
|:-----------:|:--------:|:--------:|-------------|------|
| keypairName |  string  |    是    | SSH-key名称 |      |
|   callback  | function |    否    | 请求回调    |      |
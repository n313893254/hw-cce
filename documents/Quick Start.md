# Quick Start

## 开始使用

1. 在使用之前，确认你的本地环境安装好了 `Node` 和 `npm`
2. 从github上clone一份到本地，并安装所需依赖库
```
> cd your-workspace
> git clone git@github.com:Huawei/eSDK_HWS_ECS_JS.git hw-ecs
> cd hw-ecs
> npm install
```

3. 设置 Access-Key，Secret-Key 和 ProjectId，编辑 `examples\config.json`
```
> vi examples/config.json
{
  "ak": "改成你的AccessKey",
  "sk": "改成你的SecretKey",
  "projectId": "改成你的ProjectId",
  "endpoint": "https: //ecs.cn-north-1.myhwclouds.com",
  "region": "cn-north-1"
}
```

4. 运行第一个API示例 - 获取所有ECS云服务器
```
> node examples\list-cloud-servers.js
```



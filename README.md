# HuaWei ECS Javascript Library

[![Build Status](https://travis-ci.org/Huawei/eSDK_HWS_ECS_JS.svg?branch=master)](https://travis-ci.org/Huawei/eSDK_HWS_ECS_JS)

The official HW ECS SDK for JavaScript, available for browsers & Node.js

## Installation

### In Node.js

Use [npm](http://npmjs.org) package manager for Node.js. Simply type the following into a terminal window:

```bash
npm install hw-ecs
```

>Not support for now, the SDK will be published to npm when released

### In the Browser

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

```Javascript
    <script src="dist/hw-ecs-version.standalone.js"></script>
```

## Usage and Getting Started

Step 1: instantiate ECS Client (ak, sk and projectId could be found on your admin dashboard)

```Javascript
var config = {
  'ak': 'Your Access Key',
  'sk': 'Your Secret Key',
  'projectId': 'Your Project Id', 
  'endpoint': 'https://ecs.cn-north-1.myhwclouds.com', // same as default
  'region': 'cn-north-1'  // same as default
}

var client = new HW.ECS(config)
```

Step 2: access ECS API through ECS client, for example, you can list ECS servers with code :

```Javascript
var callback = function (err, response) {
  // if success, err is null and response is an object describe the HTTP response returned by server
  if (!err && response.ok) {
    // response.body is the content returned from server
    console.log(response.body) 
  }

  // if access API failed, `err` will show the reason
  // 1. err occurs before response transfer, response will be null
  // 2. err occurs after response transfer, response is an object describe the HTTP response returned by server
  if (err) {
    console.error(err)
  }
}

// list cloud ECS servers
client.listCloudServers({ limit: 10 }, callback)
```

Step 3: API documents
- official [document](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212657.html)
- ECS Client API [document](TODO)

## License

This SDK is distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0), see LICENSE.txt for more information.


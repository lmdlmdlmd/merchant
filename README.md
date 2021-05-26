# merchant

------

## 项目设置 Project setup

### 环境安装 Environment Install
```shell
# npm安装
npm install -g @vue/cli
# cnpm安装 在已经安装了cnpm情况下，没有安装cnpm，请执行下一步
# npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm install -g @vue/cli
# yarn安装
yarn add @vue/cli -g
```

### 创建uni-app项目 Create uni-app Project
- 使用正式版（对应HBuilderX最新正式版）
```shell
vue create -p dcloudio/uni-preset-vue my-project
# 选择默认模板
```

------

### 安装依赖 Install Libraries
```shell
# yarn安装 网速允许情况下，推荐
yarn install

# cnpm安装 在已经安装了cnpm情况下，没有安装cnpm，请执行下一步
# npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm install

# npm安装
npm install
```

------

### 编译和热重装以进行开发 Compiles and hot-reloads for development
```shell
# yarn运行
yarn serve
# npm运行
npm serve
```

------

### 编译并最小化生产 Compiles and minifies for production
```shell
# yarn运行
yarn build
# npm运行
npm build
```

------

### 自定义配置 Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

------

------

## 代码规范

### 页面 src/pages
- 命名: 小写`home`, 连接符`-`, `user-info`
- 目录: `home/index.vue`, `user-info/index.vue`

### 组件 src/components
- 规范: 高可用/复用的抽离到公共组件中
- 命令: 大写`Tab`, `GlobalHeader`
- 目录: `Tab/index.vue`, `GlobalHeader/index.vue`

### 本地数据 mock
- 统一的本地测试接口文件目录

### 接口 src/api
- `api`: 统一的启用文职存放到`api`目录下

### 静态资源 static
- 图标建议引用`iconfont`，引入的静态资源全部放到`static`目录下。
 

## 参考链接 Link

> https://uniapp.dcloud.io/quickstart-cli

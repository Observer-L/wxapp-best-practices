<div align=center>

</div>

# wxapp-best-practices

> 贴合小程序开发的最新能力，探索Web常见组件开发在小程序上的最佳实践

项目开源，持续维护，欢迎[反馈](https://github.com/Observer-L/wxapp-best-practices/issues)、 [PR](https://github.com/Observer-L/wxapp-best-practices/pulls) 和 Star⭐️！


## ⚡️ 组件列表

- [x] [skeleton screen](https://github.com/Observer-L/wxapp-best-practices/tree/master/src/components/skeleton)
- [x] [lazy-load](https://github.com/Observer-L/wxapp-best-practices/tree/master/src/components/lazy-load)（intersectionObserver）
- [ ] parallax
...

## 🔩 项目结构

```
├─dist                             // 编译之后的项目文件
├─src                              // 开发目录
│  │  app.ts                       // 小程序入口文件
│  │  app.json
│  │  app.less
│  │
│  ├─assets                     	// 静态资源
│     ├─styles                  	// 公共less
│     ├─images                  	// 图片资源
│  ├─components                   // 组件
│  ├─pages                        // 页面
│
├─template                        // 页面模板
├─typing                          // 官方typing库
├─eslintrc.js                     // eslint配置文件
│
├─gulpfile.js                     // 工具配置
├─package.json                    // 项目配置
├─project.config.json             // 小程序配置文件
├─tsconfig.json                   // typescript配置
```

## 📋 使用指南

1. 克隆项目至本地

```shell
git clone https://github.com/Observer-L/wxapp-best-practices.git
npm install
```

> 可根据组件文档进行个性化定制，通过本地开发者工具进行效果浏览

2. 执行打包
```shell
npm run build
```

3. 拷贝目标组件至您的开发目录，拆包即用
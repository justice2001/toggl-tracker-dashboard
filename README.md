# 时间追踪面板

一个用图形化的方式统计时间利用情况的面板，使用Toggl Tracker作为数据源，包含多种统计数据方式。

## 📁统计类别

- 每日总时间
- 三个月时间汇总
- 三个月内专注热力图
- 当前时间
- 日期倒计时
- 今日专注时间分布饼状图（可按任务、Tag、项目分类）
- 最近N天的专注柱状图
- 今日专注时间线

## 💻使用方法

当前项目仅仅支持自行编译/调试运行，计划将在2.0版本使用electron进行封装。

1. 安装node.js

2. 拷贝 `cfg_example.js` 为 `cfg.js`

    修改配置文件 `cfg.js`
    
    ```js
    export default {
        email: "account@example.com", // 登陆邮箱
        password: "password"  // 登陆密码
   }
    ```

3. 安装依赖 & 执行调试命令

    ```shell
    npm install
    npm run dev
    ```

4. 访问 `http://localhost:5127`

## 📒 TODO:

### v1.4
- [ ] 添加时间记录组件
- [ ] 添加时间线范围设置

### FUTURE

- [ ] 使用electron封装
- [ ] 使用echart渲染时间线

## 🧑‍💻关于作者

开发者： 正义OvO(zhengyi59)

发布仓库：
[Gitee](https://gitee.com/zhengyi59/toggl-tracker-dashboard) |
[Github](https://github.com/justice2001/toggl-tracker-dashboard)

## 🔧开发工具

- 使用Vscode / Jetbrains Webstorm进行编写
- 使用Vue.js(Vite3)前段框架
- 使用TDesign UI框架

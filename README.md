# 官网后台管理

## 技术栈

umi+dva+antd

## 环境配置

config/env.config.ts prod: 生产 test: 测试 dev: 开发

## 登录与权限

接入了 sso 登录和 4a 权限中心由于服务端是 Node 不能使用 4a 提供的接口权限控制（jar 包） 所以把用户与 sso 账号做了关联用户登录后 查询 user 表是否有该用户

- 用户不存在 就清除缓存 刷新页面（回到登录界面）
- 用户存在 保存 jwt（Authorization）请求接口时 写入 header: Authorization: xxx node 端会校验该用户是否有对应接口权限

## 临时使用环境 pre

目前测试环境数据在使用 不能随意修改 使用 pre 环境

```
# 命令
npm run start:pre

# 访问地址
localhost:8000/cms-web/

# 临时账号 hxuan 密码 123456

```

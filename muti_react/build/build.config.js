const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = "./public/index.html";
const templateWechat = "./public/wechat.html";
const PUBLIC_URL = "./public";

const config = {
    entry: {
        home: "./src/pages/Home/index.js",
        signin: "./src/pages/SignIn/index.js",
        pwdmanage: "./src/pages/PasswordManage/index.js",
        recrecord: "./src/pages/RecRecord/index.js",
        candidate: "./src/pages/Candidate/index.js",
        homeConfig:"./src/pages/HomeConfig/index.js",
        forgetChangePwd: "./src/pages/forgetChangePwd/index.js",
        wechat: "./src/pages/wechat/index.js",
        menuContent: "./src/pages/content/index.js",
        announcement: "./src/pages/Announcement/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: template,
            filename: 'home.html',
            hash: true,
            chunks: ["vendor", "home"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "猎头"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'signin.html',
            hash: true,
            chunks: ["vendor", "signin"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "猎头登录"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'pwdmanage.html',
            hash: true,
            chunks: ["vendor", "pwdmanage"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "用户管理"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'recrecord.html',
            hash: true,
            chunks: ["vendor", "recrecord"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "推荐记录"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'candidate.html',
            hash: true,
            chunks: ["vendor", "candidate"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "候选人"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'homeConfig.html',
            hash: true,
            chunks: ["vendor", "homeConfig"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "配置"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'forgetChangePwd.html',
            hash: true,
            chunks: ["vendor", "forgetChangePwd"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "修改密码"
        }),
        new HtmlWebpackPlugin({
            template: templateWechat,
            filename: 'wechat.html',
            hash: true,
            chunks: ["vendor", "wechat"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "扫码登录"
        }),
        new HtmlWebpackPlugin({
            template: templateWechat,
            filename: 'menuContent.html',
            hash: true,
            chunks: ["vendor", "menuContent"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "猎头"
        }),
        new HtmlWebpackPlugin({
            template: template,
            filename: 'announcement.html',
            hash: true,
            chunks: ["vendor", "announcement"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "公告"
        })
    ]
}

module.exports = config;

"use strict";
var protocol = process.env.protocol || "http",
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || "3000",
    baseUrl = `${protocol}://${host}:${port}`,
    path = require("path"),
    rootPath = `${__dirname}/../../..`,
    nodemailer=require('nodemailer');

process.env.TMPDIR = `${rootPath}/.tmp`;

module.exports = {
    server: {
        protocol: protocol,
        host: host,
        port: port,
        baseURL: process.env.BASEURL || baseUrl,
        root: rootPath,
        temp: `${rootPath}/.tmp`
    },
    db: {
        host: process.env.DB_HOST || host,
        port: process.env.DB_PORT || 12706,
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
        dbName: process.env.DB_DATABASE || "payload",
        baseUrl: `mongodb://localhost:/payload`
    },
    transport : nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "83508e03121818",
        pass: "54f36dac3fad82"
      }
    }),
    JWT_SECRET: 'PAYLOADSECRETKEY',
    SESSION_SECRET: 'PAYLOADSECRETKEY',

};

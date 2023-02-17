"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const selenium_webdriver_1 = require("selenium-webdriver");
const chai_1 = require("chai");
require('chromedriver');
const HomePage = require("../../pages/HomePage");
const chrome = require('selenium-webdriver/chrome');
(0, cucumber_1.Before)(async function () {
    const options = new chrome.Options().headless();
    this.driver = await new selenium_webdriver_1.Builder()
        .setChromeOptions(options)
        .forBrowser('chrome')
        .build();
    this.driver.manage().setTimeouts({ implicit: 100000 });
    this.driver.manage().window().maximize();
    this.homePage = new HomePage(this.driver);
});
(0, cucumber_1.After)(async function () {
    await this.driver.quit();
});
(0, cucumber_1.Given)('que acesso o site BlazeDemo', async function () {
    await this.driver.get('https://www.blazedemo.com');
});
(0, cucumber_1.When)('seleciono origem como {string} e seleciono destino como {string}', async function (from, to) {
    await this.homePage.selectFromToFlight(from, to);
});
(0, cucumber_1.Then)('exibe o titulo da guia como {string}', async function (title) {
    const currentlyTitle = await this.homePage.getTitleTab();
    chai_1.assert.equal(title, currentlyTitle);
});

import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Builder } from 'selenium-webdriver';
import { assert } from 'chai';
require('chromedriver');
import HomePage = require('../../pages/HomePage');
const chrome = require('selenium-webdriver/chrome');

Before(async function () {
    const options = new chrome.Options().headless();

    this.driver = await new Builder()
        .setChromeOptions(options)
        .forBrowser('chrome')
        .build();
    this.driver.manage().setTimeouts({ implicit: 100000 });
    this.driver.manage().window().maximize();

    this.homePage = new HomePage(this.driver);
});

After(async function () {
    await this.driver.quit();
});

Given('que acesso o site BlazeDemo', async function () {
    await this.driver.get('https://www.blazedemo.com');
});

When('seleciono origem como {string} e seleciono destino como {string}', async function (from, to) {
    await this.homePage.selectFromToFlight(from, to);
});


Then('exibe o titulo da guia como {string}', async function (title) {
    const currentlyTitle = await this.homePage.getTitleTab();
    assert.equal(title, currentlyTitle);
});
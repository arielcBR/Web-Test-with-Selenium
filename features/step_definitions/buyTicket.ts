import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Builder } from 'selenium-webdriver';
import { assert } from 'chai';
require('chromedriver');

import HomePage = require('../../pages/HomePage');

Before(async function () {
    this.driver = await new Builder().forBrowser('chrome').build();
    this.driver.manage().setTimeouts({ implicity: 50000 });
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
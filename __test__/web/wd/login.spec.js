const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');
require('chromedriver');

describe('Login page', () => {
    let driver;

    // Antes do teste
    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        driver.manage().setTimeouts({ implicit: 60000 });
        driver.manage().window().maximize();
    });

    // Depois do teste
    afterEach(async () => {
        await driver.quit();
    });

    //Os testes
    it('Testando Login', async () => {
        await driver.get('https://www.blazedemo.com/');
        await driver.findElement(By.linkText('home')).click();
        
        let headerPage = await driver.findElement(By.css('div.panel-heading')).getText();
        assert(headerPage == 'Login');           // Verifica se está na página de login

        await driver.findElement(By.id('email')).sendKeys('user@live.com.br');      // Cola
        await driver.findElement(By.id('password')).sendKeys(Key.chord('abcde1!')); // Escreve letra por letra
        await driver.findElement(By.css('button.btn-primary')).click();

        let codePage = await driver.findElement(By.css('div.code')).getText();
        assert(codePage == '419');

        let titlePage = await driver.getTitle();
        assert(titlePage == 'Page Expired');

    });

});

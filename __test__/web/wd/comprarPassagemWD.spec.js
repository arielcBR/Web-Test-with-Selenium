// Bibliotecas
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
require('chromedriver');

// Suíte de teste

describe('Comprar passagem WD', () => {
    let driver;

    // Inicialização Selenium com o browser
    beforeEach(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().setTimeouts({ implicit: 50000 });
        driver.manage().window().maximize();
    });

    // Finalização
    afterEach(async () => {
        await driver.quit();
    });

    // Teste
    it('Comprar passagem SAO - CAI', async () => {
        await driver.get('https://www.blazedemo.com');  // Abre navegador no site a ser testado

        {
            const dropDown = await driver.findElement(By.name('fromPort')); 
            await dropDown.findElement(By.xpath("//option[. = 'São Paolo']")).click(); 
        }

        {
            const dropDown = await driver.findElement(By.name('toPort')); 
            await dropDown.findElement(By.xpath("//option[. = 'Cairo']")).click(); 
        }

        await driver.findElement(By.css('input.btn.btn-primary')).click();

        // Validação título da guia e título da seleção dos vôos
 
        assert(await driver.getTitle() == 'BlazeDemo - reserve');
        assert(await driver.findElement(By.css('h3')).getText() == 'Flights from São Paolo to Cairo:');
    });
});
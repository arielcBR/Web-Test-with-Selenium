const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
require('chromedriver')

describe('Comprar Passagem', function() {
  //this.timeout(15000)  // Espera implicita
  let driver           // Objeto do Selenium WebDriver
  let vars             // Lista para guardar variáveis e informações

  // Antes de cada teste - Inicialização
  beforeEach(async function () {
    // Instancia o objeto Selenium WebDrive para controlar o Chrome Driver
    driver = await new Builder().forBrowser('chrome').build()
    driver.manage().setTimeouts({ implicit: 50000 })
    vars = {}
  })

  // Depois de cada teste - Finalização
  afterEach(async function() {
    await driver.quit();
  })

  // O teste
  it('Comprar Passagem', async function() {
    await driver.get("https://www.blazedemo.com/") // Abre o site alvo - SUT (Software Under Test)
    await driver.manage().window().setRect({ width: 1366, height: 728 })
    await driver.findElement(By.name("fromPort")).click()
    {
      const dropdown = await driver.findElement(By.name("fromPort"))
      await dropdown.findElement(By.xpath("//option[. = 'Philadelphia']")).click()
    }
    await driver.findElement(By.name("toPort")).click()
    {
      const dropdown = await driver.findElement(By.name("toPort"))
      await dropdown.findElement(By.xpath("//option[. = 'Cairo']")).click()
    }
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css("tr:nth-child(1) .btn")).click()

    await driver.findElement(By.id("inputName")).click()
    await driver.findElement(By.id("inputName")).sendKeys("ariel")

    await driver.findElement(By.id("address")).sendKeys("rivadavia 19843")
    await driver.findElement(By.id("city")).sendKeys("Buenos Aires")
    await driver.findElement(By.id("state")).sendKeys("Buenos Aires")
    await driver.findElement(By.id("zipCode")).sendKeys("17984")
    await driver.findElement(By.id("cardType")).click()
    await driver.findElement(By.id("cardType")).click()
    await driver.findElement(By.id("creditCardNumber")).click()
    await driver.findElement(By.id("creditCardNumber")).sendKeys("5467543245679844")
    await driver.findElement(By.id("creditCardMonth")).click()
    await driver.findElement(By.id("creditCardMonth")).sendKeys("07")
    await driver.findElement(By.id("creditCardYear")).sendKeys("2024")
    await driver.findElement(By.id("nameOnCard")).sendKeys("ariel campos luiz")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css(".hero-unit")).click()
    await driver.findElement(By.css("h1")).click()

    assert(await driver.findElement(By.css("h1")).getText() == "Thank you for your purchase today!")
    
    await driver.findElement(By.css("tr:nth-child(3) > td:nth-child(2)")).click()

    assert(await driver.findElement(By.css("tr:nth-child(3) > td:nth-child(2)")).getText() == "555 USD")
  })
})

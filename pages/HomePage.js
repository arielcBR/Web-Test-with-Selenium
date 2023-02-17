const BasePage = require("./BasePage");
const By = require('selenium-webdriver').By;

class HomePage extends BasePage{
    constructor(driver) {
        super(driver);
        this.byDropDownFrom = By.name('fromPort');
        this.byDropDownTo = By.name('toPort');
        this.btnSearch = By.css('input.btn.btn-primary');
    }

    async selectFromToFlight(from, to) {
        const dropDownFrom = await this.driver.findElement(this.byDropDownFrom);
        await dropDownFrom.findElement(By.css(`[value="${from}"]`)).click();

        const dropDownTo = await this.driver.findElement(this.byDropDownTo);
        await dropDownTo.findElement(By.css(`[value="${to}"]`)).click();

        const btnFindFlight = await this.driver.findElement(this.btnSearch);
        btnFindFlight.click();
    }
}

module.exports = HomePage;
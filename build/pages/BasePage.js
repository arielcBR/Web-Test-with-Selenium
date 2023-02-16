class BasePage {
    constructor(driver) {
        this.driver = driver;
    }
    async getTitleTab() {
        return await this.driver.getTitle();
    }
}
module.exports = BasePage;

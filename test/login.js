const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Tugas Sesi 8 Muhammad Amir Naufal Pandia", function () {
    let driver;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments("--disable-features=PasswordLeakDetection");
        options.setUserPreferences({
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false,
            "profile.password_manager_leak_detection": false
        });

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
    });
    
    it("Should login", async function () {
        await driver.get("https://belajar-bareng.onrender.com");

        let usernameInput = await driver.findElement(
            By.xpath('//*[@id="loginOverlay"]/div/form/input')
        );
        let passwordInput = await driver.findElement(
            By.xpath('//*[@id="loginOverlay"]/div/form/div/input')
        );
        let loginButton = await driver.findElement(
            By.xpath('//*[@id="loginOverlay"]/div/form/button')
        );

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();

        let addUser = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div/div/button[1]')),
            10000
        );
        assert.strictEqual(await addUser.isDisplayed(), true);

        let updateUser = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div/div/button[2]')),
            10000
        );
        assert.strictEqual(await updateUser.isDisplayed(), true);

        let deleteUser = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div/div/button[3]')),
            10000
        );
        assert.strictEqual(await deleteUser.isDisplayed(), true);
    });

    it("Should Click AddUser Button", async function () {
        let addUserButton = await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div/button[1]')
        );

        await addUserButton.click();

        let listUserButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[1]')),
            10000
        );
        assert.strictEqual(await listUserButton.isDisplayed(), true);

        let listUpdateButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[2]')),
            10000
        );
        assert.strictEqual(await listUpdateButton.isDisplayed(), true);

        let deleteUserButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[3]')),
            10000
        );
        assert.strictEqual(await deleteUserButton.isDisplayed(), true);
    });

    it("Should add a user", async function () {
        let userInput = await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/form/input[1]')
        );
        let ageInput = await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/form/input[2]')
        );
        let submitButton = await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/form/button')
        );

        let userName = "Amir"
        await userInput.sendKeys(userName);
        await ageInput.sendKeys("22");
        await submitButton.click();

        let popup = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="success-added"]/div[1]/div[2]')),
        10000);

        let popupText = await popup.getText();
        
        assert.strictEqual(popupText, popupText);
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});
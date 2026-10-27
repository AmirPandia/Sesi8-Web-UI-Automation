const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Tugas Sesi 9 Muhammad Amir Naufal Pandia", function () {
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

    beforeEach(async function () {
        await driver.get("https://belajar-bareng.onrender.com");

        console.log("Test Started")

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
    })

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

    it("Should Click UpdateUser Button", async function () {
        let updateUserButton = await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div/button[2]') 
        ); 

        await updateUserButton.click();

        let listAddButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[1]')),
            10000
        );
        assert.strictEqual(await listAddButton.isDisplayed(), true);

        let listUserButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[2]')),
            10000
        );
        assert.strictEqual(await listUserButton.isDisplayed(), true);

        let deleteUserButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[3]')),
            10000
        );
        assert.strictEqual(await deleteUserButton.isDisplayed(), true);
    });

    it("Should Click DeleteUser Button", async function () {
        let deleteUserButton = await driver.findElement(
            By.xpath('//*[@id="app"]/div/div/div/div/button[3]') 
        ); 

        await deleteUserButton.click();

        let listAddButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[1]')),
            10000
        );
        assert.strictEqual(await listAddButton.isDisplayed(), true);

        let listUserButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[2]')),
            10000
        );
        assert.strictEqual(await listUserButton.isDisplayed(), true);

        let updateUserButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="app"]/div/div/div[2]/button[3]')),
            10000
        );
        assert.strictEqual(await updateUserButton.isDisplayed(), true);
    });

    afterEach(async function () {
        await driver.manage().deleteAllCookies();

        console.log("Test Completed");
    })

    after(async function () {
        if (driver) {
            await driver.quit();

            console.log ("Browser Close");
        }
    });
});
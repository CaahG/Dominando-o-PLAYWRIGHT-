const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { customWorld } = require('../support/world');

Given('I navigate to {string}', async function (url) {
  await this.page.goto(url);
});

Then('the title should be {string}', async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).toBe(expectedTitle);
});

const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.init();
});

After(async function () {
  await this.close();
});
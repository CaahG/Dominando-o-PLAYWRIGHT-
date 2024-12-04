const { test, expect } = require('@playwright/test');

test('login Gmail', async ({ page }) => {

  await page.goto('https://mail.google.com/mail/u/0/');

  await page.locator('input[type="email"]').fill('carolinegonzaga04@gmail.com');

  await page.locator('input[type="email"]').press('Enter');
  
  await page.waitForNavigation();

  await page.locator('input[type="password"]').fill('150515@Arua', { timeout: 60000 });

  await page.locator('input[type="password"]').press('Enter');

  await page.waitForNavigation(); 

  const results = page.locator('div[id="search"]');

  await expect(results).toBeVisible();
});


 
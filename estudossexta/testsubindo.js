const { test, expect } = require('@playwright/test');

test('busca por livros de Sylvia Plath no Google Livros', async ({ page }) => {

 await page.goto('https://books.google.com/');

  await page.fill('input[type="text"]', 'Sylvia Plath');
  await page.press('input[type="text"]', 'Enter');

  await page.waitForSelector('h3');

  const livroEspecifico = await page.isVisible('text="A Redoma de Vidro"');
  expect(livroEspecifico).toBeTruthy();

  const resultadoDaBusca = await page.isVisible('h3');
  expect(resultadoDaBusca).toBeTruthy();
});

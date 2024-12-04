(async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')

    await page.fill('input[type = "email"]')
    await page.press('input[type = "email"]', 'Tab')
    await page.type('input[type = "password"]', 'test123')
    await page.click('form >> "Sign in"')

    await page.waitForTimeout(5000)

    const logoText = await page.$eval('.navbar-brand', el => el.innerText)
    expect(logoText).toBe('conduit')

    const logoHref = await page.$eval('.navbar-brand', el => el.href)
    expect(logoHref).toBeDefined()

    const popularTagsCount = await page.$$eval('.tag-default', el => el.length)
    expect(popularTagsCount).toBeGreaterThanOrEqual(5)
    expect(popularTagsCount).toBeLessThanOrEqual(30)
    expect(popularTagsCount).toEqual(20)


    const content = await page.textContent('.navbar-brand')
    // console.log('content: ' + content)

    const text = await page.innerText('.navbar-brand')
    // console.log('text: ' + text)

    const html = await page.innerHTML('.feed-toggle')
    expect(html).toMatch('Your Feed')
    // expect(html).toMatch('Global Feed')
    expect(html).toMatch('Global Feeds')    // should fail

    const href = await page.getAttribute('.navbar-brand', 'href')
    expect(href).not.toMatch('https://react-redux.realworld.io')

    await browser.close()
})()
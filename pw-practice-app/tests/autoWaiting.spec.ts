import {expect, test} from '@playwright/test'

test.beforeEach(async({page}, testInfo)=> {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

    testInfo.setTimeout(testInfo.timeout + 2000) // increase default test timemout by 2 seconds for each test in this spec file

})

test.skip('Auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    // await successButton.click()

    // const text = await successButton.textContent() // this will wait for 30 seconds by default
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents() // this will not wait by default

    // expect(text).toContain('Data loaded with AJAX get request.')

    // this will wait for 5 seconds by default, but we override to wait 20 seconds
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    // ___ wait for element
    // await page.waitForSelector('.bg-success')

    // ___ wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ___ wait for network calls to be completed (NOT recommended)
    await page.waitForLoadState('networkidle')

    // hardcoded wait (NOT recommended)
    // await page.waitForTimeout(25000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test.skip('Timeouts', async({page}) => {
    // ====Timeout types==== (can be set through playwright.config.ts)
    // Global timeout - not set by default
    // Test timeout - 30 seconds by default and no longer than Global timeout
    // Action timeout (e.g. click(), fill()) - not set by default, but no longer than Test timeout
    // Navigation timeout (e.g. page.goto('/')) - not set by default, but no longer than Test timeout
    // Expect (assertion) timeout - 5 seconds by defualt and no longer than Test timeout

    // test.setTimeout(10000) // override test timeout

    test.slow() // increases default timeout 3 times

    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000}) //override action timeout

})

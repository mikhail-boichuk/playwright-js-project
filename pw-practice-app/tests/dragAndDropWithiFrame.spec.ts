import {expect} from '@playwright/test'
import {test} from '../test-options'

test.beforeEach(async ({page, globalsQaURL}) => {
    await page.goto(globalsQaURL)
})

test('Drag and Drop with iFrame', async ({page}) => {

    // Switch inside iFrame
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

    // using dragTo() methond
    await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

    // using more precise control with a mouse move
    await frame.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})
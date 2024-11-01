import {test} from '@playwright/test'

// Hook before all tests (more rarely used)
test.beforeAll(() => {

})

// Hook before each test
test.beforeEach(async ({page}) => {
    await page.goto('/') // common action before each test including suites
})

test('navigate to layouts', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('navigate to datepicker page', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

test.afterEach(() => {

})

// Test suite structure
test.describe('test suite one', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Charts').first().click() // common action before each test in this parcticular suite, executed after global beforeEach()
    })
    
    test('navigate to echarts #1', async ({page}) => {
        await page.getByText('Echarts').click()
    })
    
    test('navigate to echarts #2', async ({page}) => {
        await page.getByText('Echarts').click()
    })
})


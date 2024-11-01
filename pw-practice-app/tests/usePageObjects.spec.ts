import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.describe.configure({mode: 'parallel'}) // force parallel execution for the test file

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test('Navigate to Form Page', async ({page}) => {
    const navigateTo = new NavigationPage(page)

    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Parametrized methods', async ({page}) => {
    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatepickerPage = new DatepickerPage(page)

    //using page manager instead of creating multiple pages

    const pm = new PageManager(page)
    // Generate fake data
    const randomFullName = faker.person.fullName({sex: 'male'})
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
        process.env.USERNAME,
        process.env.PASSWORD,
        "Option 1"
    )

    // take screenshot of the whole screen
    await page.screenshot({path: 'screenshots/formlayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(
        randomFullName,
        randomEmail,
        true
    )
    // take screenshot of an element
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})
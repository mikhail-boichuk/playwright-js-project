import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
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

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
        "test@test.com",
        "Welcome1",
        "Option 1"
    )
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(
        "John Smith",
        "test@test.com",
        true
    )

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})
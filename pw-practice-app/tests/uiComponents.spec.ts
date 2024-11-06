import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe.parallel('Form Layouts page @block', () => {

    test.describe.configure({retries: 0}) // override global retries

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({page}, testInfo) => {

        if (testInfo.retry) {
            console.log('This is a retry. Some code can be here no cleanup first attempt data')
        }

        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 100})

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
    })

    test.only('Radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGridForm.getByLabel('Option 1').check({force: true}) //using force cuz this radio button has class 'visually-hidden'
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()

        // ======= Visual testing =====
        // will create a screenshot on first run (aka baseline) and will compare the next runs as an assertion
        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels:150})
        // ============================

        // expect(radioStatus).toBeTruthy()
        // await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })
})

test('Checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const allBoxes = page.getByRole('checkbox') // not a JS array yet, needs to be converted as shown in foreach loop below

    for (const box of await allBoxes.all()) {
        await box.check({force: true})
        expect (await box.isChecked()).toBeTruthy
    }
})

test('Lists and Dropdowns', async ({page}) => {
    const dropDownMenu = await page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    // page.getByRole('list') // when the list has UL tag
    // page.getByRole('listitem') // when the list has LI tag

    // const optionsList = await page.getByRole('list').locator('nb-option')
    const optionsList = await page.locator('nb-option-list nb-option')
    await expect(optionsList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    
    await optionsList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()
    for (const color in colors) {
        await optionsList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
            await dropDownMenu.click()
    }

})

test('Tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await tooltipCard.getByRole('button', {name: "Top"}).hover()

    // page.getByRole('tooltip') // only if your web element has role 'tooltip' assigned to it
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual("This is a tooltip")
    
})

test('Browser dialog boxes', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // Need to create a special listener for a browser dialog, cuz pw cancel it by default
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com"')
})


test('Web Tables', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // get the row by any text in this row
    const tagetRow = page.getByRole('row', {name: "twitter@outlook.com"}) // will select <tr> by the text in any child element
    await tagetRow.locator(".nb-edit").click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await tagetRow.locator(".nb-checkmark").click()

    // get the row by value in ID column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator(".nb-edit").click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator(".nb-checkmark").click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // test filter of the table
    const ages = ["20", "30", "40", "200"]

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)

        // wait for table to apply filter
        await page.waitForTimeout(500)

        const ageRows = await page.locator('tbody tr').all()

        for(let row of ageRows) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Datepicker', async ({page}) => {
    
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form picker')
    await calendarInputField.click()

    // Pick a date by hardcoded value (NOT real world)
    // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click() // added exact property cuz by defaut it serches for partial match
    // await expect(calendarInputField).toHaveValue('Oct 21, 2024')

    // Pick a date based on current date
    let date = new Date()
    date.setDate(date.getDate() + 200) // 200 days from today
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    // handle jump to another month and year
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click() // added exact property cuz by defaut it serches for partial match
    await expect(calendarInputField).toHaveValue(dateToAssert)

})

test('Sliders', async ({page}) => {
    
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    // Update attribute directly by evaluating JS on object
    await tempGauge.evaluate ( node => {
        node.setAttribute('cx','232.630')
        node.setAttribute('cy','232.630')
    })

    await tempGauge.click() // need to perform any action on element for changes from above to take place

    // Update with Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded() // make sure entire box is displayed on the page

    const box = await tempBox.boundingBox() // pw will create new coordinates grid inside the temBox, left top corner is (0,0)
    // Put mouse into the center of a bounding box
    const x = box.x + box.width / 2
    const y = box.y + box.height /2
    await page.mouse.move(x, y)
    
    // move mouse around
    await page.mouse.down() // press mouse button
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up() // release mouse button
    
    await expect(tempBox).toContainText('30')

})
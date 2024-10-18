import { Locator, Page, expect} from "@playwright/test";
import { start } from "repl";

export class DatepickerPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerFromToday(numberOfDaysFromToday : number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        await expect(calendarInputField).toHaveValue(await this.selectDateInTheCalendar(numberOfDaysFromToday))
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

        const startDateToAssert = await this.selectDateInTheCalendar(startDayFromToday)
        const endDateToAssert = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        return dateToAssert
    }

}
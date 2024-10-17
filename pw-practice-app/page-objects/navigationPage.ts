import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    readonly formLayoutsMenuItem : Locator
    readonly datepickerMenuItem : Locator
    readonly smartTableMenuItem : Locator
    readonly toastrMenuItem : Locator
    readonly tooltipMenuItem : Locator

    constructor(page: Page) {
        super(page)
        // Having locators assigned to a class fields is recommended approach by pw, 
        // however this creates overhead if you have a lot of them, so it make sense not to follow this recomendation.
        // I'll keep it like this just for exapmple
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datepickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        // await this.page.waitForTimeout(1000)
        await this.waitForNumberOfSeconds(2)
        await this.formLayoutsMenuItem.click()
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.datepickerMenuItem.click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }


    /**
     * Handle the click on nav bar section depending on if it collapsed or not
     * @param groupItemTitle
     */
    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false") {
            await groupMenuItem.click()
        }
    }
}
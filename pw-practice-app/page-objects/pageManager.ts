import { Page } from "@playwright/test"
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

export class PageManager {
    private readonly page: Page
    private readonly navigatioPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigatioPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo() {
        return this.navigatioPage
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage
    }

    onDatepickerPage() {
        return this.datepickerPage
    }

}
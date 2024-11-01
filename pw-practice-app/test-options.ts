import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPageAuto: string,
    formLayoutsPage: string,
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['',{option: true}],

    // will run before each test in the fixture
    formLayoutsPageAuto: [async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    }, {auto: true}],

    // will only run when explicitly passed in test function
    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        // after use() block you can put tear down block which will run aftert the test
    },
    
    pageManager: async({page, formLayoutsPage}, use) => { // this will run formLayoutsPage first and then it's own code
        const pm = new PageManager(page)
        await use(pm)
    }
})
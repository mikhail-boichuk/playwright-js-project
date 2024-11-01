import { test } from '../test-options'
import { faker } from '@faker-js/faker'

test.describe.configure({mode: 'parallel'}) // force parallel execution for the test file


test('Parametrized methods', async ({pageManager}) => {
    const randomFullName = faker.person.fullName({sex: 'male'})
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
        process.env.USERNAME,
        process.env.PASSWORD,
        "Option 1"
    )
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(
        randomFullName,
        randomEmail,
        true
    )
})
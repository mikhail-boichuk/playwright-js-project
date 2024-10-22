import { request, test as setup } from '@playwright/test';
import user from '../../.auth/user.json'
import { writeFileSync } from 'fs-extra'

const authFile = './.auth/user.json'

// This will run as a separate task before running any tests
setup('authentication', async ({page, request}) => {
    //Auth via UI
    // await page.goto('https://conduit.bondaracademy.com/')
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox', {name: "Email"}).fill('astartes@test.com')
    // await page.getByRole('textbox', {name: "Password"}).fill('password123')
    // page.getByRole('button').click()

    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // await page.context().storageState({path: authFile})

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
          "user":{"email":"astartes@test.com","password":"password123"}
        }
      })
    
    const resposeBody = await response.json()
    const acessToken = resposeBody.user.token
    process.env['ACCESS_TOKEN'] = acessToken

    user.origins[0].localStorage[0].value = acessToken
    writeFileSync(authFile, JSON.stringify(user))
})
import { expect, request } from '@playwright/test';
import user from '../pw-apitest-app/.auth/user.json'
import * as fs from 'fs'

async function globalSetup() {

    const context = await request.newContext()
    const authFile = '.auth/user.json'

    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
          "user":{"email":"astartes@test.com","password":"password123"}
        }
      })
    
    const resposeBody = await responseToken.json()
    const acessToken = resposeBody.user.token
    process.env['ACCESS_TOKEN'] = acessToken

    user.origins[0].localStorage[0].value = acessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
          "article": {
            "title" : "API. Global Likes test article ",
            "description" : "API. Test article description",
            "body" : "API. Test article body",
            "tagList" : []
          },
        },
        headers: {
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    })
    expect(articleResponse.status()).toEqual(201)

    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup
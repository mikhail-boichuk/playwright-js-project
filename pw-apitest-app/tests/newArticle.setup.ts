import { request, test as setup, expect } from '@playwright/test';

setup('Create new article', async ({request}) => {

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
          "article": {
            "title" : "API. Likes test article ",
            "description" : "API. Test article description",
            "body" : "API. Test article body",
            "tagList" : []
          }
        }
    })
    expect(articleResponse.status()).toEqual(201)

    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
})
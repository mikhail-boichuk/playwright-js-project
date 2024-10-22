import { test, expect, request } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async ({page}) => {

  // mock needs to be placed before page call to take effect
  await page.route('*/**/api/tags', async route  => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(tags)
    })
  })

  await page.goto('https://conduit.bondaracademy.com/')
})

test('API response mocking', async ({ page }) => {
  await page.route('*/**/api/articles*', async route  => {
    const response = await route.fetch()
    const resposeBody = await response.json()

    resposeBody.articles[0].title = "This is a MOCK test title"
    resposeBody.articles[0].description = "This is a MOCK test description"

    await route.fulfill({
      body: JSON.stringify(resposeBody)
    })
  })

  await page.waitForTimeout(3000)
  await page.getByText('Globa Feed')
  await expect(page.locator('.navbar-brand')).toHaveText('conduit')

  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
  await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK test description')
});


test('Delete arcticle created via API', async ({ page, request }) => {
  
  // login request to obtain token
  // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
  //   data: {
  //     "user":{"email":"astartes@test.com","password":"password123"}
  //   }
  // })

  // const resposeBody = await response.json()
  // const acessToken = resposeBody.user.token

  // create acrticle via API
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {
        "title" : "API. Test article title ",
        "description" : "API. Test article description",
        "body" : "API. Test article body",
        "tagList" : []
      }
    },
    // headers: {
    //   Authorization: `Token ${acessToken}`
    // }
  })

  expect(articleResponse.status()).toEqual(201)
  
  // Delete article from UI
  await page.getByText('Global Feed').click()
  await page.getByText('API. Test article title').click()
  await page.getByRole('button', {name: "Delete Article"}).first().click()
  await page.getByText('Global Feed').click()

  await expect(page.locator('app-article-list h1').first()).not.toContainText('API. Test article title')
})

test('Create article via UI and intercept browser request', async ({ page, request }) => {
  // create article
  await page.getByText('New Article ').click()
  await page.getByRole('textbox', {name: 'Article Title'}).fill('Playwright is awesome')
  await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('About the playwright')
  await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('We like to use PW for automation')
  await page.getByRole('button', {name: 'Publish Article'}).click()

  // intercept the response and obtain article slug ID (unique identifier)
  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleResponseBody = await articleResponse.json()
  const slugId = articleResponseBody.article.slug

  await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')

  // validate it's displayed in feed
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')

  // Now clean up created article with API
  // const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
  //   data: {
  //     "user":{"email":"astartes@test.com","password":"password123"}
  //   }
  // })

  // const resposeBody = await loginResponse.json()
  // const acessToken = resposeBody.user.token

  const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    // headers: {
    //   Authorization: `Token ${acessToken}`
    // }
  })

  expect(deleteResponse.status()).toEqual(204)

})
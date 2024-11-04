import { request, test as setup, expect } from '@playwright/test';

setup('Delete created article', async ({request}) => {

    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`)
    expect(deleteResponse.status()).toEqual(204)
})
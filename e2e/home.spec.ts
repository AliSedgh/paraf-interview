import { expect, test } from '@playwright/test'

test('بدون ورود، کاربر به صفحه‌ی ورود هدایت می‌شود', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/login/)
  await expect(page.getByRole('heading', { name: 'ورود به پاراف' })).toBeVisible()
})

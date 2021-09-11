import { test, expect } from '@playwright/test'

test('renders an empty grid', async ({ page }) => {
  await page.goto('http://localhost:8000')
  const $grid = page.locator('.grid').first()
  await expect($grid).toBeVisible()
})

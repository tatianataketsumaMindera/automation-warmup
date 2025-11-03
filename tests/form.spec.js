import { test, expect } from '@playwright/test';
import { users } from './data/form';

test('test', async ({ page }) => {

const user = users[0];
  await page.goto('https://playground-drab-six.vercel.app/form');
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill(user.Name);
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill(user.Email);
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill(user.Password);
  await page.getByLabel('Country *').selectOption(user.Country);
  await page.locator('label').filter({ hasText: user.Gender }).click();

  for (const hobbie of user.Hobbies) {
    await page.getByRole('checkbox', { name: hobbie }).check();
  }
  
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByText('Success!').click();
  await page.getByText('The form has been submitted').click();
});
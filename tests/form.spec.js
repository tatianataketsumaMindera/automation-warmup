import { test, expect } from '@playwright/test';
import { users } from './data/form';

test.describe('Form with Multiple Users', () => {
    users.forEach(user => {
        test(`Fill the form to ${user.Name}`, async ({ page }) => {
            await page.goto('/form');
            await page.getByRole('textbox', { name: 'Name *' }).click();
            await page.getByRole('textbox', { name: 'Name *' }).fill(user.Name);
            await page.getByRole('textbox', { name: 'Email *' }).click();
            await page.getByRole('textbox', { name: 'Email *' }).fill(user.Email);
            await page.getByRole('textbox', { name: 'Password *' }).click();
            await page.getByRole('textbox', { name: 'Password *' }).fill(user.Password);
            await page.getByLabel('Country *').selectOption(user.Country);
            await page.getByRole('radio', { name: user.Gender, exact: true }).check();

            if (user.Hobbies && user.Hobbies.length > 0){
               for (const hobbie of user.Hobbies) {
                     await page.getByRole('checkbox', { name: hobbie }).check();
               }
            }
            
            await page.getByRole('button', { name: 'Send' }).click();
            await page.getByText('Success!').click();
            await page.getByText('The form has been submitted').click();
        })
    })
});
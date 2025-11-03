import test, { expect } from "@playwright/test";

test('Login successfully', async ({page}) => {
    
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('User successfully logged in!')).toBeVisible();

});

test('Blocked Account', async ({page}) => {

    await page.goto('/login');
    await page.getByRole('textbox',{ name: 'Type your username' }).fill('testblock');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
    await page.getByRole('button', { name: 'Login'}).click();

    await expect(page.getByText('User blocked!')).toBeVisible();
});

test('Invalid User', async ({page}) => {

    await page.goto('/login');
    await page.getByRole('textbox',{ name: 'Type your username' }).fill('bonita');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
    await page.getByRole('button', { name: 'Login'}).click();

    await expect(page.getByText('User not found!')).toBeVisible();
});

test('Wrong password', async ({page}) => {

    await page.goto('/login');
    await page.getByRole('textbox',{ name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('123');
    await page.getByRole('button', { name: 'Login'}).click();

    await expect(page.getByText('Incorrect username or password!')).toBeVisible();
});

test('Wrong password 3 times blocked temporary', async ({page}) => {

    await page.goto('/login');
    await page.getByRole('textbox',{ name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('123');
    await page.getByRole('button', { name: 'Login'}).click({ clickCount: 3 });

    await expect(page.getByText('User temporarily blocked!')).toBeVisible();
});

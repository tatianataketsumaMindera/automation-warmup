import { test, expect } from '@playwright/test';
import hpCharacters from './data/json/hpCharacters.json';

for(const c of hpCharacters ){
    test('Character ' + c.name + ' ' + c.house, async ({ page }) => {
    
    await page.goto('/table');
    const nameWithoutSpace = c.name.replace(' ','');
    await expect(page.locator('#tableCharacterName' + nameWithoutSpace)).toBeVisible();
    await expect(page.getByRole(' img ', { name: c.name })).toBeVisible();
    await expect(page.locator('#tableCharacterHouse' + nameWithoutSpace)).toBeVisible();

    //pode-se usar o if como condição
    if (c.dateOfBirth !== null){
        await expect(page.getByRole('cell', { name: c.dateOfBirth })).toBeVisible();
    } else {
        await expect(page.getByRole('cell', { name: 'Unknown' })).toBeVisible();
    }

    //pode-se usar o ternario 
    const birth = c.dateOfBirth ? c.dateOfBirth : "Unknown";
    await expect(page.getByRole('cell', { name: birth })).toBeVisible();
  })
}




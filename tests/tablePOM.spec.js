import test from "@playwright/test";
import { HpTablePage } from "./pages/hpTablePage";
import hpCharacters from "./data/json/hpCharacters.json";

for (const character of hpCharacters) {
    test('Validate HP Character: ' + character.name + ' from ' + character.house, async ({ page }) => {
        const hpTablePage = new HpTablePage(page);
        await hpTablePage.goToTable();
        await hpTablePage.validateCharacterData(character);
    });
}

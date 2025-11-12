import { expect, test } from "@playwright/test";

export class HpTablePage {
    constructor(page) {
        this.page = page;

        this.table = page.locator("#charactersTable");
        this.header = page.locator("thread th");
        this.body = page.locator("tbody tr");

        this.imageByAlt = (name) => page.getByRole("img", { name });
        this.nameCell = (name) => page.locator("#tableCharacterName" + name.replace(/\s/g, ""));
        this.houseCell = (name) => page.locator("#tableCharacterHouse" + name.replace(/\s/g, ""));
        this.birthCell = (birth) => page.getByRole("cell", { name: birth });
        this.actorCell = (actor) => page.getByRole("cell", { name: actor });
    }

    async goToTable() {
        await test.step("Navigate to HP Table page", async () => {
            await this.page.goto("/table");
            //await this.table.waitFor({ state: "visible" });
        });
    }

    async validateCharacterData(character) {
        await test.step(`Validate data for character: ${character.name}`, async () => {
            const nameWithoutSpace = character.name.replace(/\s/g, "");

            await expect(this.nameCell(character.name)).toBeVisible();
            await expect(this.imageByAlt(character.name)).toBeVisible();
            await expect(this.houseCell(character.name)).toBeVisible(); 
        
            const birth = character.dateOfBirth ? character.dateOfBirth : "Unknown";
            await expect(this.birthCell(birth)).toBeVisible();

            await expect(this.actorCell(character.actor)).toBeVisible();
        });
    }
};
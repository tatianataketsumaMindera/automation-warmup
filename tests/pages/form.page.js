import { expect } from "@playwright/test";

export class FormPage {
    constructor(page){
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Form' });
        this.nameInput = page.getByRole('textbox', { name: 'Name *' });
        this.emailInput = page.getByRole('textbox', { name: 'Email *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.countrySelect = page.getByLabel('Country *');

        this.hobbieCheckbox = (value) => page.getByRole('checkbox', { name: value });
        this.genderRadio = (value) => page.getByRole('radio', { name: value, exact: true });

        this.genderGroup = page.locator('#genderGroup');
        this.sendButton = page.getByRole('button', { name: 'Send' });
        this.successTitle = page.getByText('Success!');
        this.successBody = page.getByText('The form has been submitted');
    }

    async navigateToForm() {
        await this.page.goto('/form');
    }

    async fillName(userName) {
        await this.nameInput.fill(userName);
    }

    async fillEmail(userEmail){
        await this.emailInput.fill(userEmail);
    }

    async fillPassword(userPassword){
        await this.passwordInput.fill(userPassword);
    }

    async selectCountry(userCountry){
        await this.countrySelect.selectOption(userCountry);
    }

    async selectHobbies(userHobbies){
        for(const hobby of userHobbies){
            await this.hobbieCheckbox(hobby).check();
        }
    }

    async selectGender(userGender){
        await this.genderRadio(userGender).check();
    }

    async submitForm(){
        await this.sendButton.click();
    }

    async validateSuccess(){
        await expect(this.successTitle).toBeVisible();
        await expect(this.successBody).toBeVisible();
    }
}
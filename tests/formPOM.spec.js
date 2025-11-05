import test from "@playwright/test";
import { FormPage } from "./pages/form.page";
import { USERS } from "./data/form.data";

for(const user of USERS){
    test('FORM FILLING '+ user.name, async ({page}) => {
        const form = new FormPage(page);
        await form.navigateToForm();
        await form.fillName(user.name);
        await form.fillEmail(user.email);
        await form.fillPassword(user.password);
        await form.selectCountry(user.countryValue);
        await form.selectHobbies(user.hobbies);
        await form.selectGender(user.gender);
        await form.submitForm();
        await form.validateSuccess();
    });
}





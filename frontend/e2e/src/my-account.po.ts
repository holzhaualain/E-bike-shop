import { browser, by, element } from 'protractor';
import {Login} from '../../src/app/services/user/login';
import {User} from '../../src/app/services/user/user';

export class  MyAccountPo {
  public static async navigateToMyAccount() {
    return await browser.get('/my-account');
  }

  public static async navigateToHome() {
    return await browser.get('/home');
  }

  public static async login(login: Login) {
    element(by.css('[name="loginEmail"]')).sendKeys(login.email);
    element(by.css('[name="loginPassword"]')).sendKeys(login.pwd);
    element(by.css('[aria-label="Anmelden"]')).click();
    await browser.waitForAngular();
  }

  public static async logOut() {
    element.all(by.className('fa-sign-out-alt')).get(0).click();
    await browser.waitForAngular();
  }

  public static async createUser(user: User)  {
    element(by.css('[name="accountNewName"]')).clear();
    element(by.css('[name="accountNewName"]')).sendKeys(user.name);
    element(by.css('[name="accountNewFirstname"]')).clear();
    element(by.css('[name="accountNewFirstname"]')).sendKeys(user.firstname);
    element(by.css('[name="accountNewEmail"]')).clear();
    element(by.css('[name="accountNewEmail"]')).sendKeys(user.email);
    element(by.css('[name="accountNewPassword"]')).clear();
    element(by.css('[name="accountNewPassword"]')).sendKeys(user.pwd);
    element(by.css('[aria-label="Konto erstellen"]')).click();
    await browser.waitForAngular();
  }


  public static createUserObj(userToCreate: { name: string; firstname: string }): User {
    const email = (userToCreate.name + '.' + userToCreate.firstname + '@earth.com').toLowerCase().replace(' ', '');
    const pwd = userToCreate.name.substr(0, 1) + userToCreate.firstname.substr(0, 2);
    return new User(null, userToCreate.firstname, userToCreate.name, email, pwd, null);
  }

  public static userToLogin(user: User): Login {
    return new Login(user.email, user.pwd);
  }

}

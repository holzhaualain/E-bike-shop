import { browser, by, element } from 'protractor';
import {Login} from '../../src/app/services/user/login';

export class  ShoppingBasketPo {
  private static DELAY_MS = 200;

  public static async navigateToArticle() {
    return await browser.get('/article-detail?article=Superbike-E-Bike-Modell-1');
  }

  public static async addArticle() {
    element(by.className('form-btn')).click();
    await browser.waitForAngular();

  }

  public static async navigateToShoppingBasket() {
    element.all(by.className('bottom-basket-info')).get(0).click();
    await browser.waitForAngular();

  }

  public static async navigateToLogin() {
    element(by.css('[aria-label="checkout"]')).click();
    await browser.waitForAngular();

  }

  public static async getShoppingBasketLength() {
    return element(by.id('mat-badge-content-0')).getText();
  }

  public static async loginUser(login: Login) {
    element(by.css('[name="loginEmail"]')).sendKeys(login.email);
    element(by.css('[name="loginPassword"]')).sendKeys(login.pwd);
    element(by.css('[aria-label="Anmelden"]')).click();
    await browser.waitForAngular();
  }
  public static async writeCustomerData(customerData: object) {
     element(by.css('[aria-label="street"]')).clear();
    element(by.css('[aria-label="street"]')).sendKeys(customerData[0].street);

    element(by.css('[aria-label="post code"]')).clear();
    element(by.css('[aria-label="post code"]')).sendKeys(customerData[0].plz);

    element(by.css('[aria-label="city"]')).clear();
    element(by.css('[aria-label="city"]')).sendKeys(customerData[0].city);

    element.all(by.className('matStepperNext')).get(0).click();
    browser.sleep(ShoppingBasketPo.DELAY_MS);

    element(by.css('[aria-label="phone"]')).clear();
    element(by.css('[aria-label="phone"]')).sendKeys(customerData[0].phone);
    element.all(by.className('matStepperNext')).get(1).click();
    browser.sleep(ShoppingBasketPo.DELAY_MS);

    element.all(by.css('[aria-label="PostPac Priority"]')).get(0).click();
    element.all(by.className('matStepperNext')).get(2).click();
    browser.sleep(ShoppingBasketPo.DELAY_MS);

    element.all(by.css('[aria-label="Paypal"]')).get(0).click();
    element.all(by.className('matStepperNext')).get(3).click();
    browser.sleep(ShoppingBasketPo.DELAY_MS);

    element(by.css('[aria-label="Jetzt bestellen"]')).click();
    await browser.waitForAngular();
  }
  public static async orderDetail() {
    return element(by.css('[aria-label="confirm title"]')).getText();
  }
  public static async logoutUser() {
    element.all(by.className('fa-sign-out-alt')).get(0).click();
    browser.sleep(ShoppingBasketPo.DELAY_MS);

  }
}

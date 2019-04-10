import {browser} from 'protractor';
import {ShoppingBasketPo} from './shopping-basket.po';
import {TestData} from './test-data';
import {User} from '../../src/app/services/user/user';
import {MyAccountPo} from './my-account.po';

describe('shopping basket / order', () => {

  beforeEach(async () => {
  });

  it('navigate to article', async () => {
    await ShoppingBasketPo.navigateToArticle();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/article-detail?article=Superbike-E-Bike-Modell-1');

  });
  it('add article', async () => {
    await ShoppingBasketPo.addArticle();

  });

  it('check if article is in shopping basket', async () => {
    ShoppingBasketPo.getShoppingBasketLength().then(function (amount) {
      expect(amount).toBeGreaterThan(0);    });
   });

  it('navigate to shopping basket', async () => {
    await ShoppingBasketPo.navigateToShoppingBasket();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/shopping-basket');
  });

  it('navigate to login', async () => {
    await ShoppingBasketPo.navigateToLogin();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');

  });

  it('login user', async () => {
    await ShoppingBasketPo.loginUser(TestData.LOGIN_OK);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/checkout');
  });

  it('write customer data', async () => {
    await ShoppingBasketPo.writeCustomerData(TestData.CUSTOMER_DATA);
   });

  it('order-detail - order completed', async () => {
    ShoppingBasketPo.orderDetail().then(function (title) {
      expect(title).toEqual('Vielen Dank für Ihre Bestellung!');  });
  });

  it('logout user', async () => {
    await ShoppingBasketPo.logoutUser();
  });

  function createOrder(user: User) {
    it('create shopping basket & order for "' + user.name + ' ' + user.firstname + '"', async () => {
      await ShoppingBasketPo.navigateToArticle();
      await ShoppingBasketPo.addArticle();
      await ShoppingBasketPo.navigateToShoppingBasket();
      await ShoppingBasketPo.navigateToLogin();
      await ShoppingBasketPo.loginUser(MyAccountPo.userToLogin(user));
      await ShoppingBasketPo.writeCustomerData(TestData.CUSTOMER_DATA);
      await ShoppingBasketPo.orderDetail();
      await ShoppingBasketPo.logoutUser();
    });
  }

  TestData.USERS.forEach(async user => {
    for (let i = 0; i < 1; i++)  {
      createOrder(MyAccountPo.createUserObj(user));
    }
  });

});

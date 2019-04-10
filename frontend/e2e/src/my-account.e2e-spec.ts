import {browser} from 'protractor';
import {User} from '../../src/app/services/user/user';
import {MyAccountPo} from './my-account.po';
import {TestData} from './test-data';

describe('myAccount login / create user', () => {

  beforeEach(async () => {
    await MyAccountPo.navigateToMyAccount();
  });

  it('when login fails - stay on page', async () => {
    await MyAccountPo.login(TestData.LOGIN_NOK);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
  });

  it('when login is successful -  redicret to home page', async () => {
    await MyAccountPo.login(TestData.LOGIN_OK);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
  });

  function createUserLogIn(testUser: { name: string; firstname: string }) {
    it('when user "' + testUser.name + ' ' +  testUser.firstname
      + '" is created (ignore, if already exists)  & login is successful -  redicret to my account page', async () => {
      const user: User = MyAccountPo.createUserObj(testUser);
      await MyAccountPo.createUser(user);
      await MyAccountPo.navigateToMyAccount();
      await MyAccountPo.login(MyAccountPo.userToLogin(user));
      await expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
    });
  }

  TestData.USERS.forEach(async user => {
    createUserLogIn(user);
  });

  it('when logout is successful -  redicret to home page', async () => {
    await MyAccountPo.navigateToHome();
    await MyAccountPo.logOut();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
  });


});

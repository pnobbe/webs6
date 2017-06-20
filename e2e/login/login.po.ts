import {browser, by, element} from "protractor";

export class LoginPage {
  navigateTo() {
    return browser.get("/login");
  }

  getTitleText() {
    return element(by.css(".site-name")).getText();
  }

  getLoginButton() {
    return element(by.css("#login"));
  }

  login() {

  }
}

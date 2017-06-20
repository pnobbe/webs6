import {LoginPage} from "./login.po";

describe("Login page", () => {
  let page: LoginPage;

  beforeAll(() => {
    page = new LoginPage();
    page.navigateTo();
  });


  it("should display app title", () => {
    expect(page.getTitleText()).toEqual("SPACE MAYHEM");
  });

  it("should have a login button", () => {
    expect(page.getLoginButton()).toBeTruthy();
  });

});


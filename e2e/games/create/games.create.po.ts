import {browser, by, element} from "protractor";

export class GameCreatePage {

  navigateTo() {
    return browser.get("/games/create");
  }

  getSubmitButton() {
    return element(by.css("#submit"));
  }

  getTitleText() {
    return element(by.css("app-game-create h1")).getText();
  }

  getNoBoardSelected() {
    return element(by.css("app-game-create div h3"));
  }

  getMinPlayersSelector() {
    return element(by.css("#min-players"));
  }

  getMaxPlayersSelector() {
    return element(by.css("#max-players"));
  }

  getTemplateSelector() {
    return element(by.css("#template"));
  }

  selectShanghaiTemplate() {
    element.all(by.css("#template option")).first().click();
    return element.all(by.css("#template option")).first().getAttribute("value");
  }

  setInputValues() {
    const max = this.getMaxPlayersSelector();
    const min = this.getMinPlayersSelector();
    min.clear();
    max.clear();
    max.sendKeys("2");
    min.sendKeys("2");
    return min.getAttribute("value").then(val => {
      return max.getAttribute("value").then(val2 => {
          return (val === "2" && val2 === "2");
      });
    });
  }

  getBoard() {
    return element(by.css("app board"));
  }

}

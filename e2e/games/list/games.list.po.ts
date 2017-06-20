import {browser, by, element} from "protractor";

export class GamesPage {

  navigateTo() {
    return browser.get("/games");
  }

  getTitleText() {
    return element(by.css("app-game-list h1")).getText();
  }

  navigateToStartedGames() {
    return element(by.css("#started")).click().then(data => {
      return element(by.css(".status")).getText().then(string => {
        return string === "playing";
      });
    });
  }

  navigateToFavoritedGames() {
    browser.waitForAngularEnabled(false);
    return element(by.css("#favorites")).click().then(data => {
      return element(by.css(".status")).getText().then(string => {
        return string === "favorites";
      });
    });
  }

  getGamesList() {
    return element.all(by.css(".game"));
  }

  getGamesListSize() {
    return this.getGamesList().count().then(size => {
      return size;
    });
  }

  favoriteGame() {
    const game = this.getGamesList().first();
    const fav = game.$(".favorite");
    fav.click();
    return game.getAttribute("id");
  }

  gameHasSpectateButton(id: string) {
    const game = element(by.css("#" + id));
    return game.element(by.css(".spectate"));
  }

  spectateGame() {
    return element.all(by.css(".spectate")).first().click().then(data => {
      return true;
    });
  }

}

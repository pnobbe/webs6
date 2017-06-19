import {Pipe, PipeTransform} from "@angular/core";
import {Game} from "../../models/game";

@Pipe({
  name: "gameFilter",
})
export class GameListFilterPipe implements PipeTransform {

  transform(games: Game[], status: string, user: string): Game[] {

    if (status === "" || games == null) {
      return games;
    }

    if (status === "favorites") {
      return games.filter(
        game => game.isFavorite);
    }

    let newGames;
    if (status === "mine" || status === "finished") {
      newGames = games.filter(
        game => game.players.filter(s => s._id === user).length > 0 || game.createdBy._id === user);
    } else {
      newGames = games;
    }

    if (status === "mine") {
      return newGames.filter(
        game => game.state !== "finished");
    }
    return newGames.filter(
      game => game.state === status);
  }
}

import { GameController } from "@/controllers/games.controller";
import { Router } from 'express';
import { GameRepositorySqlite } from "@/repositories/game-repository.sqlite";
import { GamesFeedByRequest } from "@/repositories/game-feed.request";
import { GameService } from "@/domain/game.service";
export class GamesRouter {


  private gameController = new GameController(new GameService(new GameRepositorySqlite()), new GamesFeedByRequest())
  public router = Router();
  constructor() {
    this.defineRoutes();
  }


  private defineRoutes() {

    this.router.get('/', (req, res) => { this.gameController.getGames(req, res) });
    this.router.post('/', (req, res) => { 

      return this.gameController.createGame(req, res)
    });
    this.router.delete('/:id', (req, res) => { this.gameController.deleteGame(req, res) });
    this.router.put('/:id', (req, res) => {
      this.gameController.updateGame(req, res)
    });
    this.router.post('/search', (req, res) => {
      this.gameController.searchGames(req, res)
    });
    this.router.post('/populate', (req, res) => { this.gameController.populate(req, res) });
  }
}

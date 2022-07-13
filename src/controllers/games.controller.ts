import { GameService } from "@/domain/game.service";
import GameFeed from "@/repositories/game-feed";


import { Request, Response } from 'express';

export class GameController {

    private gameService: GameService;
    private gameFeed: GameFeed;
    constructor(gameService: GameService, gameFeed: GameFeed) {
        this.gameService = gameService
        this.gameFeed = gameFeed;
    }

    public async getGames(req: Request, res: Response) {
        try {
            const games = await this.gameService.getGames()
            return res.send(games)
        } catch (err) {
            console.error('There was an error querying games', err);
            return res.send(err);
        }
    }

    public async searchGames(req: Request, res: Response) {

        try {
            const { name, platform } = req.body;

            const games = await this.gameService.searchGames(name, platform)
            return res.send(games)
        } catch (err) {
            console.error('***Error Searching games game', err);
            return res.status(400).send(err);
        }
    }
    public async createGame(req, res) {
        console.log('hila.')
        const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
        try {
            const game = await this.gameService.createGame(publisherId, name, platform, storeId, bundleId, appVersion, isPublished);
            console.log('ghabemus game',game)
            return res.send(game)
        } catch (err) {
            console.error('***There was an error creating a game', err);
            return res.status(400).send(err);
        }
    }

    public async deleteGame(req, res) {

        try {
            const gameId = req.params.id
            await this.gameService.deleteGame(gameId)
            return res.send({ id: gameId })
        } catch (err) {
            console.error('***Error deleting game', err);
            return res.status(400).send(err);
        }

    }

    public async updateGame(req, res) {

        try {
            const id = parseInt(req.params.id)
            const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;

            const game = await  this.gameService.updateGame(id, publisherId, name, platform, storeId, bundleId, appVersion, isPublished)
            return res.send(game)
        } catch (err) {
            console.error('***Error updating game', err);
            return res.status(400).send(err);
        }
    }

    public async populate(req, res) {
        try {
            const games = await this.gameFeed.getGames();

            await this.gameService.createOrUpdateGames(games);

            res.sendStatus(201);
        } catch (err) {
            console.log('si..error');
            console.error('***Error populating game', err);
            return res.status(400).send(err);
        }
    }
}
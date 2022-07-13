
import { Game } from "@/domain/games";
import { GameRepository } from "./game-repository";
import {Op} from 'sequelize';
import GameDbModel from './game-repository.model.sqlite';
import { logger } from "@/utils/logger";


export class GameRepositorySqlite implements GameRepository{


    public async getGames(): Promise<Game[]> {
        return GameDbModel.findAll();
    }
    public async getGame(id: string): Promise<Game> {

        return GameDbModel.findByPk(id);
    }
    public async createGame(game: Game): Promise<Game> {

            const gameCreated = await GameDbModel.create(game)
            console.log('------------------created',gameCreated)
            logger.info(`GameRepositorySqlite.createGame ${gameCreated}`)
            return gameCreated;


    }
    public async updateGame(game: Game): Promise<Game> {
        try{
            console.log('finding the game: ',game.name, game.id)
            const gameFromDb = await GameDbModel.findByPk(game.id)
            if(!gameFromDb){
                throw {msg:'Trying to update a Game that does not exist', game:gameFromDb}
            }

            await GameDbModel.update(game, {where:{id:game.id}})
            return GameDbModel;
        }catch(e){
            console.error(e)
            return null;
        }

    }

    public async deleteGame(id: number): Promise<Game> {
        const game = await GameDbModel.findByPk(id)
        await game.destroy({ force: true })
        return game;

    }
    public async searchGames(name: string, platform: string): Promise<Game[]> {

        let whereClauses = {};
        if (name && platform) {
            whereClauses = { [Op.and]: [{ name: { [Op.like]: `%${name}%` } }, { platform }] }
        }
        else if (name && !platform) {
            whereClauses = { name: { [Op.like]: `%${name}%` } }
        }
        else if (!name && platform) {
            whereClauses = { platform }
        }


        const games = await GameDbModel.findAll({
            where: whereClauses
        })
        return games;
    }

    public async getGameByNamePlatformStoreId(name: string, platform: string, storeId: string): Promise<Game> {
        const game = await GameDbModel.findOne({
            where: {
                name,
                platform,
                storeId
            }
        })
        return game;
    }
}
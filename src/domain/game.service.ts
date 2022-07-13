import { GameRepository } from "@/repositories/game-repository";
import { Game } from "./games";



export class GameService{
    public gameRepository: GameRepository;

    constructor(gameRepository:GameRepository){
        this.gameRepository = gameRepository;
    }

    public async getGames():Promise<Game[]>{
        return  await this.gameRepository.getGames();
    }
    public async getGame(id:string):Promise<Game>{
        return await this.gameRepository.getGame(id);
    }
    public async createGame(publisherId, name, platform, storeId, bundleId, appVersion, isPublished):Promise<Game>{

        const game = new Game(null , publisherId, name, platform, storeId, bundleId, appVersion, isPublished);
        return await this.gameRepository.createGame(game);
    }
    public async updateGame(id, publisherId, name, platform, storeId, bundleId, appVersion, isPublished ):Promise<Game>{


        const game =  { id, publisherId, name, platform, storeId, bundleId, appVersion, isPublished } as Game;


        return await this.gameRepository.updateGame(game);

          
    }
    public async deleteGame(id:number):Promise<void>{
    
       await this.gameRepository.deleteGame(id);
    }
    public async searchGames(name:string, platform:string):Promise<Game[]>{

        return await this.gameRepository.searchGames(name, platform);
    }
    public async createOrUpdateGames(games:Game[]):Promise<Game[]>{
        try{
                for (const game of games) {

                const haveGame = await this.gameRepository.getGameByNamePlatformStoreId(game.name, game.platform, game.storeId);
                
                if(!haveGame){
                    await this.gameRepository.createGame(game);
                }
                else{
                    const res = await this.gameRepository.updateGame(haveGame);

                }
                
            }
            
            return games;
        }
        catch(e){
            console.error(e);
        }
    }
}
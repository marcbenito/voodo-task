import { Game } from "@/domain/games";



export interface GameRepository{

    getGames():Promise<Game[]>;
    getGame(id:string):Promise<Game>;
    createGame(game:Game):Promise<Game>;
    updateGame(game:Game):Promise<Game>;
    deleteGame(id:number):Promise<Game>;
    searchGames(name:string, platform:string):Promise<Game[]>;
    getGameByNamePlatformStoreId(name:string, platform:string, storeId:string):Promise<Game>;
    
}
import { Game } from "@/domain/games";
import axios from "axios";
import GameFeed from "@/repositories/game-feed";
import config from "@/config/config";



export class GamesFeedByRequest implements GameFeed{

    private async populate (url:string){
        const { data } = await axios.get(url);

        return data.map( element => {
            const game = element[0];
            return  {
                publisherId: game.publisher_id,
                name: game.name,
                platform: game.os,
                storeId: game.appId,
                bundleId: game.bundle_id,
                appVersion: game.version,
                isPublished: true
            }
        });
    }
  
    public async getGames():Promise<Game[]>{

       const androidGames = await this.populate(config.androidFeed);
       const iosGames=  await this.populate(config.iosFeed);
       return androidGames.concat(iosGames);
    }

}
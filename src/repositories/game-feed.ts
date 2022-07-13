import { Game } from "@/domain/games";

export  default interface GameFeed{
    getGames():Promise<Game[]>;
}
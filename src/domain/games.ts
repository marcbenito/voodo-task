


export class Game {
    id: string;
    publisherId: string;
    name: string;
    platform: string;
    storeId: string;
    bundleId: string;
    appVersion: string;
    isPublished: boolean;


    constructor(id: string, publisherId: string, name: string, platform: string, storeId: string, bundleId: string, appVersion: string, isPublished: boolean) {
        this.id = id;
        this.publisherId = publisherId;
        this.name = name;
        this.platform = platform;
        this.storeId = storeId;
        this.bundleId = bundleId;
        this.appVersion = appVersion;
        this.isPublished = isPublished;
    }

}
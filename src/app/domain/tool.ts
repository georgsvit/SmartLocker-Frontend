import { ServiceBook } from "./servicebook";

export class Tool {
    public id: string;
    public name: string;
    public description: string;
    public imgUrl: string;
    public accessLevel: number;
    public userId: string;
    public serviceBookId: string;
    public lockerId: string;
    public serviceBook: ServiceBook;
    public serviceState: string;
    
    constructor(
        id: string,
        name: string,
        description: string,
        imgUrl: string,
        accessLevel: number,
        userId: string,
        serviceBookId: string,
        lockerId: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.accessLevel = accessLevel;
        this.userId = userId;
        this.serviceBookId = serviceBookId;
        this.lockerId = lockerId;
        this.serviceBook = new ServiceBook("", "", 0, 0, 0, "")    
    }
}
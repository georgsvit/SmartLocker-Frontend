import { Tool } from "../domain/tool";

export class ToolDTO {
    public id: string;
    public name: string;
    public description: string;
    public imgUrl: string;
    public accessLevel: number;
    public lastServiceDate: string;
    public msBetweenServices: number;
    public maxUsages : number;
    public usages : number;

    constructor(tool: Tool) {
        this.id = tool.id
        this.name = tool.name
        this.description = tool.description
        this.imgUrl = tool.imgUrl
        this.accessLevel = tool.accessLevel
        this.lastServiceDate = tool.serviceBook.lastServiceDate
        this.msBetweenServices = tool.serviceBook.msBetweenServices
        this.maxUsages = tool.serviceBook.maxUsages
        this.usages = tool.serviceBook.usages
    }
}
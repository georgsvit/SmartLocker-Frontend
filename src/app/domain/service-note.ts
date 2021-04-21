import { Tool } from "./tool";
import { User } from "./user";

export class ServiceNote {
    public id: string;
    public date: string;
    public userId: string;
    public toolId: string;
    public cost: number;

    public user: User;
    public tool: Tool;    
}
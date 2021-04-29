import { Tool } from "./tool";
import { User } from "./user";

export class AccountingNote {
    public id: string;
    public date: string;
    public userId: string;
    public toolId: string;

    public isTaken: boolean;

    public user: User;
    public tool: Tool;
}
import { Locker } from "./locker";
import { Tool } from "./tool";
import { User } from "./user";

export class ViolationNote {
    public id: string;
    public date: string;
    public userId: string;
    public toolId: string;
    public lockerId: string;

    public user: User;
    public tool: Tool;
    public locker: Locker;
}
import { Tool } from "./tool";

export class Locker {
    public id: string;
    public isFull: boolean;
    public isBlocked: boolean;
    public login: string;
    public tools: Tool[];
}
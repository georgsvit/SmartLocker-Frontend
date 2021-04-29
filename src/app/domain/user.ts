import { AccountingNote } from "./accounting-note";
import { ServiceNote } from "./service-note";
import { Tool } from "./tool";
import { ViolationNote } from "./violation-note";

export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public role: string;
    public accessLevel: number;
    public login: string;
    public password: string;

    public tools: Tool[];
    public accountingNotes: AccountingNote[];
    public serviceNotes: ServiceNote[];
    public violationNotes: ViolationNote[];

    constructor(
        firstName: string,
        lastName: string,
        role: string,
        accessLevel: number,
        login: string,
        password: string
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.role = role
        this.accessLevel = accessLevel
        this.login = login
        this.password = password
    }
}
export class NotificationItem {
    public id: string;
    public type: string;
    public content: string;
    public date: string;

    constructor(
        id: string,
        type: string,
        content: string,
        date: string
    ) {
        this.id = id;
        this.type = type;
        this.content = content
        this.date = date
    }
}
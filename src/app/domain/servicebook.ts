export class ServiceBook {
    public id: string;
    public lastServiceDate: string;
    public msBetweenServices: number;
    public maxUsages : number;
    public usages : number;
    public toolId : string;

    constructor(
        id: string,
        lastServiceDate: string,
        msBetweenServices: number,
        maxUsages : number,
        usages : number,
        toolId : string,
    ) {
        this.id = id;
        this.lastServiceDate = lastServiceDate;
        this.msBetweenServices = msBetweenServices;
        this.maxUsages = maxUsages;
        this.usages = usages;
        this.toolId = toolId;
    }
}
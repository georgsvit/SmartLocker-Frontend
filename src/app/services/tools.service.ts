import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Tool } from "../domain/tool";
import { ToolDTO } from "../dto/tool-dto";
import { ServiceBook } from "../domain/servicebook";

@Injectable({
    providedIn: 'root'
})
export class ToolsService {

    constructor(
        private http: HttpClient,
    ) { }

    public async getAllToolsAsync(): Promise<Tool[]>  {
        const list = await this.http.get<Tool[]>(environment.endpoints.tool)
            .toPromise();

            list.forEach(element => {
                console.log(element)
            });
        return list;
    }
    
    public createTool(tool: ToolDTO): Promise<void> {
        return this.http.post<void>(environment.endpoints.tool, tool).toPromise()
    }

    public requestService(toolId: string): Promise<void> {
        return this.http.post<void>(environment.endpoints.service, { 'toolId': toolId, 'date': new Date().toJSON()}).toPromise()
    }

    public deleteTool(id: string): Promise<void> {
        return this.http.delete<void>(environment.endpoints.tool + `/${id}`).toPromise()
    }

    public edit(tool: Tool, dto: ToolDTO): void {
        console.log(dto)
        this.editTool(new Tool(dto.id, dto.name, dto.description, dto.imgUrl, dto.accessLevel, tool.userId, tool.serviceBookId, tool.lockerId))
        this.editServiceBook(new ServiceBook(tool.serviceBookId, dto.lastServiceDate, dto.msBetweenServices, dto.maxUsages, dto.usages, tool.id))
    }

    public editTool(tool: Tool): Promise<void> {
        return this.http.patch<void>(environment.endpoints.tool + `/${tool.id}`, tool).toPromise()
    }

    public editServiceBook(serviceBook: ServiceBook): Promise<void> {
        return this.http.patch<void>(environment.endpoints.servicebook + `/${serviceBook.id}`, serviceBook).toPromise()
    }

    private getErrorMessage(error: any) {
        
        if (error.error.message) {
            return error.error.message
        }

        return Object.values(error.error.errors).join('\n');
    }
}

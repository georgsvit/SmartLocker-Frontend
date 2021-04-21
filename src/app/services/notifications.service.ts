import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { NotificationsDTO } from "../dto/notifications-dto";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(
        private http: HttpClient,
    ) { }

    public async getAllAsync(): Promise<NotificationsDTO>  {
        const response = await this.http.get<NotificationsDTO>(environment.endpoints.notification)
            .toPromise();

        return response;
    }

    public async setViewed(id: string): Promise<void>  {
        return await this.http.get<void>(environment.endpoints.notification + `/${id}`).toPromise();            
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Locker } from "../domain/locker";

@Injectable({
    providedIn: 'root'
})
export class LockersService {

    constructor(
        private http: HttpClient,
    ) { }

    public async getAllLockersAsync(): Promise<Locker[]>  {
        const list = await this.http.get<Locker[]>(environment.endpoints.locker)
            .toPromise();
        return list;
    }

    public blockLockerAsync(id: string): Promise<void> {
        const url = environment.endpoints.blockLocker.replace('{id}', id)
        return this.http.post<void>(url, {}).toPromise();
    }

    public unblockLockerAsync(id: string): Promise<void> {
        const url = environment.endpoints.unblockLocker.replace('{id}', id)
        return this.http.post<void>(url, {}).toPromise();
    }

    public createLocker(login: string): Promise<void> {
        return this.http.post<void>(environment.endpoints.locker, { "login": login, "password": "password" }).toPromise()
    }

    public deleteLocker(id: string): Promise<void> {
        return this.http.delete<void>(environment.endpoints.locker + `/${id}`, { }).toPromise()
    }

    public editLocker(locker: Locker): Promise<void> {
        return this.http.patch<void>(environment.endpoints.locker + `/${locker.id}`, locker).toPromise()
    }

    private getErrorMessage(error: any) {
        
        if (error.error.message) {
            return error.error.message
        }

        return Object.values(error.error.errors).join('\n');
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { User } from "../domain/user";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private http: HttpClient,
    ) { }

    public async getAllUsersAsync(): Promise<User[]>  {
        const list = await this.http.get<User[]>(environment.endpoints.user)
            .toPromise();

            console.log(list);
        return list;
    }
    
    public registerUser(user: User): Promise<void> {
        return this.http.post<void>(environment.endpoints.register, user).toPromise()
    }
    
    public editUser(user: User): Promise<void> {
        return this.http.patch<void>(environment.endpoints.user + `/${user.id}`, user).toPromise()
    }

    public blockUser(user: User): Promise<void> {
        console.log(user)
        user.accessLevel = 0
        user.password = ""
        return this.http.patch<void>(environment.endpoints.user + `/${user.id}`, user).toPromise()
    }
}

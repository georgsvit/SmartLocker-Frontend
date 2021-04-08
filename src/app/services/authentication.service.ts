import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserManagerService } from "./user-manager.service";
import { Credentials } from "../domain/credentials";
import { Token } from "../domain/token";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private userManagerService: UserManagerService
    ) { }

    public loginAsync(credentials: Credentials): Promise<string>  {
        return this.http.post(environment.endpoints.login, credentials)
            .toPromise()
            .then<string>(
                (token: Token) => {
                    this.userManagerService.setToken(token)
                    return null;
                }
            )
            .catch<string>(this.getErrorMessage)            
    }

    private getErrorMessage(error: any) {
        
        if (error.error.message) {
            return error.error.message
        }

        return Object.values(error.error.errors).join('\n');
    }
}


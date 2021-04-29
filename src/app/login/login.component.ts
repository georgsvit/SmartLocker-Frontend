import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Credentials } from "../domain/credentials";
import { AuthenticationService } from "../services/authentication.service";

@Component({
    selector: 'login-comp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public error: string;
    public login: string;
    public password: string;

    ngOnInit(): void{}

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    public async loginAsync(): Promise<void> {
        const credentials: Credentials = {
            login: this.login,
            password: this.password
        };
    
        let res = await this.authService.loginAsync(credentials);
        
        if (!res) {
            console.log("Success")            
            this.router.navigate(['/home'])
            return;
        }
        this.error = res;
    }
}
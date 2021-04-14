import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserManagerService } from "../user-manager.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private userManagerService: UserManagerService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const userToken = this.userManagerService.getToken();

        if (userToken !== null) {
            const authRequest = request.clone(
                {
                    headers: request.headers.set('Authorization', `Bearer ${userToken.token}`)
                }
            )
            return next.handle(authRequest)
        }
        return next.handle(request)
    }
}
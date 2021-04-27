import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LanguageSelectorService } from "../language-selector-service";

@Injectable({
    providedIn: 'root'
})
export class LanguageInterceptor implements HttpInterceptor {
    constructor(
        private languageService: LanguageSelectorService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const preferredLanguage = this.languageService.getLanguage();
    
        const languageRequest = request.clone({
          headers: request.headers.set('Accept-Language', preferredLanguage),
          url: request.url + `?culture=${preferredLanguage}`
        });
        console.log(languageRequest.url)
        return next.handle(languageRequest);
      }    
}
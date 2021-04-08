import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { Token } from "../domain/token";

const STORAGE_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {
    constructor() { }

    private $tokenUpdateStream: BehaviorSubject<null> = new BehaviorSubject(null);

    public getTokenUpdateStream(): Observable<null> {
        return this.$tokenUpdateStream;
    }

    public getToken(): Token {
        const tokenJSON = sessionStorage.getItem(STORAGE_KEY);

        if (tokenJSON) 
            return JSON.parse(tokenJSON)

        return null;
    }

    public setToken(token: Token): void {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(token));
        this.$tokenUpdateStream.next(null);
    }

    public removeToken(): void {
        sessionStorage.removeItem(STORAGE_KEY);
        this.$tokenUpdateStream.next(null);
    }
}
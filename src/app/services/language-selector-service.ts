import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const CHOSEN_LANGUAGE = 'language';
const DEFAULT_LANGUAGE = 'ua';

@Injectable({
    providedIn: "root"
})
export class LanguageSelectorService {
    constructor() {}

    public getLanguage(): string {
        const language = localStorage[CHOSEN_LANGUAGE]

        if (language) {
            return language
        }
        return DEFAULT_LANGUAGE
    }

    public setLanguage(language: string): void {
        localStorage[CHOSEN_LANGUAGE] = language
        const a = document.createElement("a")

        if (language == "ua") {
            a.href = environment.ua_version
        } else {
            a.href = environment.en_version
        }

        document.body.appendChild(a)
        a.click()
        a.remove()
    }
}

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const CHOSEN_LANGUAGE = 'language';
const DEFAULT_LANGUAGE = 'en';

@Injectable({
    providedIn: "root"
})
export class LanguageSelectorService {
    constructor() {

    }

    public getLanguage(): string {
        // const language = localStorage[CHOSEN_LANGUAGE]

        // if (language) {
        //     return language
        // }
        // return DEFAULT_LANGUAGE

        if (window.location.href.indexOf("4201") != -1) {
            return "ua"
        } else {
            return "en"
        }
    }

    public setLanguage(language: string): void {
        localStorage[CHOSEN_LANGUAGE] = language
        const a = document.createElement("a")

        if (language == "ua") {
            a.href = window.location.href.replace("4202", "4201")
        } else {
            a.href = window.location.href.replace("4201", "4202")
        }

        document.body.appendChild(a)
        a.click()
        a.remove()
    }
}

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

const DEFAULT_DURATION = 3000;
const DEFAULT_ACTION = 'OK';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private snackBar: MatSnackBar
    ) {}

    public displayMessage(message: string, duration?: number, action?: string): void {
        this.snackBar.open(message, action ?? DEFAULT_ACTION, { 
            duration: duration ?? DEFAULT_DURATION
        })
    }
}
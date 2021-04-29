import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LanguageSelectorService } from "../services/language-selector-service";

export interface LockerEditDialogData {
    login: string
}

@Component({
    selector: `locker-edit-dialog`,
    template: `
        <h2 mat-dialog-title i18n="@@locker-edit-dialog-title">Enter locker data</h2>
        <div mat-dialog-content>
        <p *ngIf="error" style="color: #e43e32;">{{error}}</p>            
        <mat-form-field>
            <mat-label i18n="@@locker-edit-dialog-login">Locker's login</mat-label>
            <input matInput [(ngModel)]="data.login">
        </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-button mat-dialog-close i18n="@@locker-edit-dialog-close-btn">Close</button>
            <button mat-button (click)="onCreate()" i18n="@@locker-edit-dialog-save-btn">Save</button>
        </div>`
})
export class LockerEditDialog {

    public error: string

    constructor(
        public dialogRef: MatDialogRef<LockerEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: LockerEditDialogData,
        private languageService: LanguageSelectorService
    ) {}

    public onCreate(): void {
        if (this.data.login != "") {
            this.dialogRef.close(this.data.login)
        } else {
            if (this.languageService.getLanguage() == "ua") {          
                this.error = "Некоректні дані"
            } else {                
                this.error = "Invalid input"
            }
        }        
    }
}
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface LockerEditDialogData {
    login: string
}

@Component({
    selector: `locker-edit-dialog`,
    template: `
        <h2 mat-dialog-title>Enter locker data</h2>
        <div mat-dialog-content>
        <p *ngIf="error" style="color: #e43e32;">{{error}}</p>            
        <mat-form-field>
            <mat-label>Locker's login</mat-label>
            <input matInput [(ngModel)]="data.login">
        </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-button mat-dialog-close>Close</button>
            <button mat-button (click)="onCreate()">Save</button>
        </div>`
})
export class LockerEditDialog {

    public error: string

    constructor(
        public dialogRef: MatDialogRef<LockerEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: LockerEditDialogData
    ) {}

    public onCreate(): void {
        if (this.data.login != "") {
            this.dialogRef.close(this.data.login)
        } else {
            this.error = "Invalid input"
        }        
    }
}
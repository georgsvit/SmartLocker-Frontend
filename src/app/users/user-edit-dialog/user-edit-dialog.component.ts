import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';
import { LanguageSelectorService } from 'src/app/services/language-selector-service';

@Component({
  selector: 'user-edit-dialog-comp',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {

  public error: string

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,    
    private languageService: LanguageSelectorService
  ) {
    if (this.data == null) {
      this.data = new User("", "", "", 0, "", "")
    }
   }

  public onCreate(): void {
    if (this.data.login != "") {
      if (this.data.password == null) {
        this.data.password = ""
      }
        this.dialogRef.close(this.data)
    } else {
      if (this.languageService.getLanguage() == "ua") {          
        this.error = "Некоректні дані"
      } else {          
        this.error = "Invalid input"
      }      
    }        
  }
}

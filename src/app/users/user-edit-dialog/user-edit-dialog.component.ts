import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'user-edit-dialog-comp',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {

  public error: string

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
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
        this.error = "Invalid input"
    }        
  }
}

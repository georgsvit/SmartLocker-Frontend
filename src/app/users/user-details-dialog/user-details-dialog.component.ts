import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';
import { UsersService } from 'src/app/services/users.service';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'user-details-dialog-comp',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent implements OnInit {

  public user: User

  constructor(
    public dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private usersService: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.data
  }

  public onBlock(): void {
    this.usersService.blockUser(this.user)
    this.dialogRef.close(true)
  }

  public onEdit(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, { data: this.data })
    
    dialogRef.afterClosed().subscribe((user: User) => {
      this.usersService.editUser(user)
      this.dialogRef.close(true)
    })
  }
}
